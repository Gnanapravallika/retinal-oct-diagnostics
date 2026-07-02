import torch
import numpy as np

def calculate_ece(confidences: np.ndarray, accuracies: np.ndarray, num_bins: int = 10) -> float:
    """
    Calculates the Expected Calibration Error (ECE) across confidence bins.
    """
    bin_boundaries = np.linspace(0, 1, num_bins + 1)
    ece = 0.0
    n_samples = len(confidences)
    
    for i in range(num_bins):
        bin_lower = bin_boundaries[i]
        bin_upper = bin_boundaries[i + 1]
        
        # Identify samples falling into the current bin
        in_bin = (confidences >= bin_lower) & (confidences < bin_upper)
        prop_in_bin = np.mean(in_bin)
        
        if prop_in_bin > 0:
            accuracy_in_bin = np.mean(accuracies[in_bin])
            avg_confidence_in_bin = np.mean(confidences[in_bin])
            ece += prop_in_bin * np.abs(avg_confidence_in_bin - accuracy_in_bin)
            
    return ece

def calculate_saliency_entropy(cam: torch.Tensor) -> float:
    """
    Computes Saliency Entropy to quantify the visual attention focus.
    Lower entropy indicates localized attention (disease biomarkers);
    higher entropy indicates dispersed attention (background noise/artifacts).
    """
    # Normalize CAM to sum to 1.0 (probability distribution)
    cam_normalized = cam.clone()
    cam_sum = cam_normalized.sum()
    
    if cam_sum > 0:
        cam_normalized = cam_normalized / cam_sum
    else:
        return 0.0
        
    cam_flat = cam_normalized.flatten()
    # Mask zero values to avoid log(0)
    non_zero = cam_flat[cam_flat > 0]
    
    entropy = -torch.sum(non_zero * torch.log(non_zero)).item()
    return entropy

def run_deletion_test(
    model: torch.nn.Module, 
    input_tensor: torch.Tensor, 
    cam: torch.Tensor, 
    class_idx: int, 
    steps: int = 10
) -> tuple:
    """
    Performs the quantitative deletion test by progressively masking high-attribution
    pixels in 10% steps and measuring the model's confidence drop.
    Returns: (list_of_confidences, aopc_score, percentage_drop)
    """
    model.eval()
    device = input_tensor.device
    
    # Get baseline classification confidence
    with torch.no_grad():
        baseline_out = torch.softmax(model(input_tensor), dim=1)
        baseline_conf = baseline_out[0, class_idx].item()
        
    # Flatten CAM and sort pixel indices descending
    cam_flat = cam.flatten()
    sorted_indices = torch.argsort(cam_flat, descending=True)
    
    total_pixels = cam_flat.numel()
    confidence_scores = [baseline_conf]
    
    # Progressive deletion loop
    for step in range(1, steps + 1):
        fraction = step / steps
        num_mask = int(total_pixels * fraction)
        
        # Clone input tensor for modification
        perturbed_tensor = input_tensor.clone()
        c, h, w = perturbed_tensor.shape[1], perturbed_tensor.shape[2], perturbed_tensor.shape[3]
        
        # Create boolean mask
        mask = torch.ones(h * w, dtype=torch.bool, device=device)
        mask[sorted_indices[:num_mask]] = False
        mask = mask.view(h, w)
        
        # Apply mask (set deleted pixels to baseline zero intensity)
        for channel in range(c):
            perturbed_tensor[0, channel] = perturbed_tensor[0, channel] * mask
            
        with torch.no_grad():
            perturbed_out = torch.softmax(model(perturbed_tensor), dim=1)
            perturbed_conf = perturbed_out[0, class_idx].item()
            
        confidence_scores.append(perturbed_conf)
        
    # Calculate AOPC
    # AOPC = 1/(k+1) * sum(f(x)_0 - f(x)_i) for i = 1 to k
    diffs = [baseline_conf - confidence_scores[i] for i in range(1, len(confidence_scores))]
    aopc_score = sum(diffs) / (steps + 1)
    
    # Calculate percentage confidence drop
    percentage_drop = (baseline_conf - confidence_scores[-1]) / baseline_conf if baseline_conf > 0 else 0.0
    
    return confidence_scores, aopc_score, percentage_drop

def run_insertion_test(
    model: torch.nn.Module, 
    input_tensor: torch.Tensor, 
    cam: torch.Tensor, 
    class_idx: int, 
    steps: int = 10
) -> tuple:
    """
    Performs the quantitative insertion test by starting with a blank canvas
    and progressively inserting the highest-attribution pixels in 10% steps.
    Returns: (list_of_confidences, aopc_score, final_confidence)
    """
    model.eval()
    device = input_tensor.device
    
    # Flatten CAM and sort pixel indices descending
    cam_flat = cam.flatten()
    sorted_indices = torch.argsort(cam_flat, descending=True)
    
    total_pixels = cam_flat.numel()
    
    # Baseline: Fully masked image
    perturbed_tensor = input_tensor.clone()
    c, h, w = perturbed_tensor.shape[1], perturbed_tensor.shape[2], perturbed_tensor.shape[3]
    for channel in range(c):
        perturbed_tensor[0, channel] = torch.zeros(h, w, device=device)
        
    with torch.no_grad():
        baseline_out = torch.softmax(model(perturbed_tensor), dim=1)
        baseline_conf = baseline_out[0, class_idx].item()
        
    confidence_scores = [baseline_conf]
    
    # Progressive insertion loop
    for step in range(1, steps + 1):
        fraction = step / steps
        num_insert = int(total_pixels * fraction)
        
        # Clone raw input tensor
        perturbed_tensor = input_tensor.clone()
        
        # Create boolean mask for pixels to keep
        mask = torch.zeros(h * w, dtype=torch.bool, device=device)
        mask[sorted_indices[:num_insert]] = True
        mask = mask.view(h, w)
        
        # Set non-attributed pixels to zero intensity
        for channel in range(c):
            perturbed_tensor[0, channel] = perturbed_tensor[0, channel] * mask
            
        with torch.no_grad():
            perturbed_out = torch.softmax(model(perturbed_tensor), dim=1)
            perturbed_conf = perturbed_out[0, class_idx].item()
            
        confidence_scores.append(perturbed_conf)
        
    # Calculate Insertion AOPC
    # AOPC = 1/(k+1) * sum(f(x)_i - f(x)_0)
    diffs = [confidence_scores[i] - baseline_conf for i in range(1, len(confidence_scores))]
    aopc_score = sum(diffs) / (steps + 1)
    
    return confidence_scores, aopc_score, confidence_scores[-1]
