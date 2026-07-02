# 12-Week Dual-Track Mastery Roadmap
## Target Roles: Computer Vision Backend Engineer & MLOps Engineer

This roadmap is structured to take you from the absolute basics of backend programming to advanced, production-grade deep learning, MLOps, and signal processing. By the end of week 12, you will have a fully deployed, secure, and containerized medical image classification system that serves as the core portfolio asset for both job applications and Japanese Ph.D. scholarships.

---

### Phase 1: Backend & Systems Foundations (Weeks 1–2)
*Goal: Build confidence in writing clean, structured Python code and web services. No frontends.*

* **Week 1: Clean Python & Object-Oriented Programming (OOP)**
  * **Concepts to study**: Variables, data structures (lists, dictionaries), functions, OOP classes, inheritance, and modular script design.
  * **Hands-on Action**: Open and run `getting_started.py` in your workspace. Modify the filter parameters and run it again. Write a custom Python class that represents a "Medical Scan" object with metadata (dimensions, patient ID).
  * **Milestone**: Write a clean, modular Python script that automatically reads, parses, and logs image metadata from a directory of files.
* **Week 2: Backend APIs with FastAPI & Docker Basics**
  * **Concepts to study**: REST API principles, HTTP requests (GET, POST), FastAPI routing, input validation using Pydantic, and basic Docker containerization.
  * **Hands-on Action**: Build a FastAPI web server with an endpoint `/upload-image` that accepts a file upload, checks if it is a valid image, and returns a JSON response with the file details. Write a `Dockerfile` to package this API.
  * **Milestone**: Run and test your first Dockerized web API locally.

---

### Phase 2: Digital Signal & Image Processing (Weeks 3–4)
*Goal: Master how computers represent and manipulate images using mathematics.*

* **Week 3: Digital Images as Matrices & Linear Algebra (NumPy & OpenCV)**
  * **Concepts to study**: Linear Algebra basics (vectors, matrices, dot product, matrix multiplication, transposition), 2D matrices, pixel coordinate systems, color spaces (RGB, Grayscale), image cropping, padding, and spatial transformations.
  * **Hands-on Action**: Write a script using OpenCV to crop a specific region of an image, adjust its brightness, and apply contrast normalization.
  * **Milestone**: Build a preprocessing script that takes raw, irregular images and standardizes them (resizing, grayscale conversion, contrast adjustment).
* **Week 4: Spatial Filtering & Denoising**
  * **Concepts to study**: Convolution matrices, kernels, spatial filtering (blurring, sharpening), and noise reduction (Bilateral filters, Gaussian filters).
  * **Hands-on Action**: Write a script that simulates camera noise on an image and applies a Bilateral Filter to reduce noise while keeping structural edges sharp.
  * **Milestone**: Combine your Week 3 preprocessing script with your Week 4 denoising script to create a complete, automated image-cleaning pipeline.

---

### Phase 3: Deep Learning & PyTorch (Weeks 5–6)
*Goal: Build, train, and validate neural networks using PyTorch.*

* **Week 5: PyTorch Core & Custom Datasets**
  * **Concepts to study**: Tensors, autograd (gradient calculations), writing custom `torch.utils.data.Dataset` and `DataLoader` classes to handle medical image folders.
  * **Hands-on Action**: Write a PyTorch DataLoader that loads your standardized images, applies data augmentations (rotation, scaling), and prepares batches for training.
  * **Milestone**: Verify your data pipeline by printing and visualizing a batch of augmented tensors.
* **Week 6: Neural Network Architecture & Training Loops**
  * **Concepts to study**: Convolutions, pooling layers, activation functions (ReLU, Softmax), loss functions, optimizers (Adam), and writing a custom training/validation loop.
  * **Hands-on Action**: Build a simple Convolutional Neural Network (CNN) in PyTorch, write a training loop with early stopping, and train it on your classification task.
  * **Milestone**: Plot your training and validation loss curves showing model convergence.

---

### Phase 7: Advanced Architecture & Attention (Weeks 7–8)
*Goal: Integrate advanced attention modules and prevent model overfitting.*

* **Week 7: Implementing Attention Mechanisms**
  * **Concepts to study**: Feature gating, Channel Attention ("What"), Spatial Attention ("Where"), and residual block integration.
  * **Hands-on Action**: Write a custom PyTorch module that implements a dual-stream attention mechanism (similar to CBAM) and integrate it into the terminal layers of a ResNet-50 backbone.
  * **Milestone**: Train your attention-enhanced model and observe the performance gains compared to your Week 6 baseline model.
* **Week 8: Clinical Class Imbalance & Evaluation Metrics**
  * **Concepts to study**: Class imbalance, Weighted Batch Sampling, Inverse Class Frequency Loss, Precision, Recall, F1-Score, and ROC-AUC.
  * **Hands-on Action**: Implement a weighted sampler in your DataLoader and adjust your loss function using inverse frequency weights. Calculate macro averages for all evaluation metrics.
  * **Milestone**: Generate a complete class-wise evaluation report showing balanced recall across minority classes.

---

### Phase 4: Explainable AI & Rigorous Validation (Weeks 9–10)
*Goal: Prove the scientific reliability and transparency of your model.*

* **Week 9: Saliency Mapping (LayerCAM)**
  * **Concepts to study**: Explainable AI (XAI), feature attribution, and gradient-based localization.
  * **Hands-on Action**: Implement LayerCAM to extract and visualize the attention maps of your trained model, overlaying the heatmap on the original scan.
  * **Milestone**: Generate visualizations showing that the model focuses on actual pathological biomarkers rather than background noise.
* **Week 10: The Quantitative Deletion Test**
  * **Concepts to study**: Faithfulness validation, pixel perturbation, and Area Over Perturbation Curve (AOPC).
  * **Hands-on Action**: Write a script that iteratively masks the most salient pixels identified by LayerCAM, feeds the perturbed image back to the model, and measures the collapse in diagnostic confidence.
  * **Milestone**: Generate a graph showing a significant drop in model confidence upon masking salient regions, proving the model's reasoning is faithful to clinical biomarkers.

---

### Phase 5: Productionization & The MLOps Layer (Weeks 11–12)
*Goal: Package, serve, deploy, and launch your dual-track career campaign.*

* **Week 11: Serving & Containerization (FastAPI + Docker)**
  * **Concepts to study**: Integrating PyTorch models into FastAPI, handling multi-part file uploads, generating JSON outputs containing classification probabilities and coordinates, and writing optimized Dockerfiles.
  * **Hands-on Action**: Wrap your preprocessing, model inference, and faithfulness validation into a single FastAPI service. Package the entire system into a Docker container.
  * **Milestone**: Query your local Dockerized API using a Python script and receive a structured JSON response in milliseconds.
* **Week 12: Deployment & Dual-Track Campaign Launch**
  * **Concepts to study**: Cloud deployment, portfolio presentation, and targeted professional outreach.
  * **Hands-on Action**: 
    1. Deploy your Dockerized API to a cloud hosting platform (Render or Hugging Face Spaces).
    2. Write your two targeted resumes: one focusing on *Computer Vision & Signal Processing* (Algorithms/Math) and one focusing on *MLOps* (Infrastructure/Deployment).
    3. Publish your 3 LinkedIn "Build in Public" posts showing your signal processing noise reduction, attention heatmaps, and your deployed API.
    4. Start warm outreach: email 5 Japanese university professors daily with your research proposal and GitHub link, and message 5 startup founders daily on Wellfound/LinkedIn.
  * **Milestone**: Secure your first interview calls and professor meetings.
