import cv2
import numpy as np
import torch
import torchvision.transforms as T
from PIL import Image
from src.preprocessing.filters import bilateral_filter, clahe_filter, min_max_scale

class RetinalPipelineTransform:
    """
    Transforms and standardizes retinal OCT scans for training and evaluation.
    Applies Resize, Normalization, and training-time augmentations (ColorJitter, Sharpness).
    """
    def __init__(self, is_training: bool = False):
        self.is_training = is_training
        
        # Define basic transformations
        transform_list = [
            T.Resize((224, 224)),
            T.ToTensor()  # Automatically scales pixels to [0.0, 1.0]
        ]
        
        # Inject augmentations from paper section 4.1 if in training mode
        if self.is_training:
            transform_list.insert(1, T.ColorJitter(brightness=0.15, contrast=0.15))
            transform_list.insert(2, T.RandomAutocontrast(p=0.3))
            transform_list.insert(3, T.RandomAdjustSharpness(sharpness_factor=2.0, p=0.3))
            
        self.transform_pipeline = T.Compose(transform_list)

    def __call__(self, img_pil: Image.Image) -> torch.Tensor:
        return self.transform_pipeline(img_pil)

def load_and_preprocess_scan(
    file_path: str, 
    apply_bilateral: bool = True, 
    apply_clahe: bool = False, 
    apply_min_max: bool = False
) -> Image.Image:
    """
    Loads an image from disk and applies selected signal preprocessing filters.
    Returns a PIL Image ready for RetinalPipelineTransform.
    """
    # Load gray-scale image
    img = cv2.imread(file_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise ValueError(f"Could not load image at path: {file_path}")
        
    # Apply filters based on pipeline configuration
    if apply_bilateral:
        img = bilateral_filter(img)
        
    if apply_clahe:
        img = clahe_filter(img)
        
    if apply_min_max:
        # Scale to [0, 255] range for PIL conversion
        norm_img = min_max_scale(img)
        img = (norm_img * 255).astype(np.uint8)
        
    # Convert grayscale to 3-channel RGB for ResNet-50 backbone
    img_rgb = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
    return Image.fromarray(img_rgb)
