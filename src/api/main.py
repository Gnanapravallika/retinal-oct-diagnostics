import os
import io
import base64
import tempfile
import shutil
import cv2
import numpy as np
import torch
from fastapi import FastAPI, UploadFile, File, HTTPException, Query
from pydantic import BaseModel
from PIL import Image

from src.models.ae_resnet import AEResNet
from src.preprocessing.standardizer import RetinalPipelineTransform, load_and_preprocess_scan
from src.xai.layercam import LayerCAM
from src.xai.evaluation import run_deletion_test

# Initialize FastAPI app
app = FastAPI(
    title="AE-ResNet Retinal Diagnostics API",
    description="Production-grade API for diagnostic classification and LayerCAM XAI auditing of Optical Coherence Tomography (OCT) B-scans.",
    version="1.0.0"
)

# Device configuration
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load model weights on startup
model = AEResNet(num_classes=7, pretrained=False)
weights_path = "models/ae_resnet_baseline.pth"
if os.path.exists(weights_path):
    try:
        model.load_state_dict(torch.load(weights_path, map_location=device))
        print("✅ AE-ResNet model weights loaded successfully.")
    except Exception as e:
        print(f"⚠️ Error loading model weights: {e}")
else:
    print("⚠️ Pre-trained weights not found. Running with randomly initialized weights.")
model.to(device)
model.eval()

# Class labels
CLASSES = ["AMD", "DME", "ERM", "Normal", "RAO", "RVO", "VID"]

class PredictionResponse(BaseModel):
    class_name: str
    confidence: float
    all_scores: dict
    heatmap_b64: str = None
    aopc_score: float = None
    confidence_drop_pct: float = None

@app.get("/")
def read_root():
    return {"message": "AE-ResNet Retinal Diagnostics API is running.", "device": str(device)}

@app.post("/predict", response_model=PredictionResponse)
async def predict(
    file: UploadFile = File(...),
    apply_bilateral: bool = Query(True, description="Apply edge-preserving bilateral filter."),
    apply_clahe: bool = Query(False, description="Apply CLAHE contrast standardization (Extension Project)."),
    apply_min_max: bool = Query(False, description="Apply Min-Max scaling (Extension Project)."),
    run_audit: bool = Query(False, description="Run quantitative deletion test to calculate AOPC score.")
):
    # Verify image file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")
        
    # Save upload file to a temp file to allow OpenCV reading
    with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as temp_file:
        shutil.copyfileobj(file.file, temp_file)
        temp_path = temp_file.name
        
    try:
        # Load and preprocess using filters
        pil_img = load_and_preprocess_scan(
            temp_path,
            apply_bilateral=apply_bilateral,
            apply_clahe=apply_clahe,
            apply_min_max=apply_min_max
        )
        
        # Convert to tensor and batch dimension
        transform = RetinalPipelineTransform(is_training=False)
        tensor_img = transform(pil_img).unsqueeze(0).to(device)
        
        # Inference
        with torch.no_grad():
            logits = model(tensor_img)
            scores = torch.softmax(logits, dim=1).squeeze(0)
            
        pred_idx = torch.argmax(scores).item()
        pred_class = CLASSES[pred_idx]
        confidence = scores[pred_idx].item()
        
        all_scores = {CLASSES[i]: scores[i].item() for i in range(len(CLASSES))}
        
        # Generate LayerCAM visual attribution
        cam_generator = LayerCAM(model, model.layer4)
        cam = cam_generator.generate(tensor_img, class_idx=pred_idx)
        cam_generator.release()
        
        # Generate heatmap overlay image
        cam_np = cam.cpu().numpy()
        cam_resized = np.uint8(255 * cam_np)
        heatmap_colored = cv2.applyColorMap(cam_resized, cv2.COLORMAP_JET)
        
        # Convert original PIL image to numpy array
        img_np = np.array(pil_img)
        img_bgr = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)
        
        # Superimpose heatmap
        overlay = cv2.addWeighted(img_bgr, 0.6, heatmap_colored, 0.4, 0)
        _, buffer = cv2.imencode('.png', overlay)
        heatmap_b64 = base64.b64encode(buffer).decode('utf-8')
        
        # Explainability Auditing (AOPC Deletion Test)
        aopc_score = None
        drop_pct = None
        if run_audit:
            _, aopc_score, drop_pct = run_deletion_test(
                model=model,
                input_tensor=tensor_img,
                cam=cam,
                class_idx=pred_idx
            )
            
        return PredictionResponse(
            class_name=pred_class,
            confidence=confidence,
            all_scores=all_scores,
            heatmap_b64=heatmap_b64,
            aopc_score=aopc_score,
            confidence_drop_pct=drop_pct
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {e}")
        
    finally:
        # Cleanup temp file
        if os.path.exists(temp_path):
            os.remove(temp_path)
