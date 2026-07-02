# Detailed Study & Practice Curriculum
## Target Role: AI Engineer (Specializing in Computer Vision & Medical Imaging)

This curriculum serves as your technical playbook. It defines the exact sub-topics, interview questions, and practical tasks required to master each domain of your 3-Project portfolio.

---

## Section 1: Python & Backend Systems Engineering

### 1.1 Object-Oriented Programming (OOP)
* **In-Depth Topics**:
  * Class definitions, instance variables, and the `__init__` constructor.
  * Encapsulation (private vs. public variables/methods) and inheritance.
  * Dunder (magic) methods: `__str__`, `__repr__`, `__len__`, and `__getitem__` (needed for custom PyTorch datasets).
  * Class composition and design patterns for modular code.
* **Interview Verification Questions**:
  * What is the difference between `__str__` and `__repr__`?
  * Why do we use class composition instead of multiple inheritance in Python?
* **Hands-on Practice Task**:
  * Write a Python class `ImageRecord` that accepts an image filepath, reads the dimensions using OpenCV, stores the metadata privately, and implements `__repr__` and `__len__` to return the total pixel count.

### 1.2 FastAPI Web Services
* **In-Depth Topics**:
  * REST API methods (GET, POST), HTTP headers, and status codes (200, 201, 400, 404, 500).
  * Async endpoints (`async def`) and the event loop.
  * Request validation using Pydantic schemas.
  * Handling multi-part file uploads (images) and error handling.
* **Interview Verification Questions**:
  * Why does FastAPI use asynchronous endpoints (`async def`) and when should you use standard synchronous endpoints?
  * How does Pydantic perform runtime data validation in FastAPI?
* **Hands-on Practice Task**:
  * Write a FastAPI server with a POST endpoint `/upload` that accepts an image, validates that the file extension is `.png` or `.jpg`, and returns a Pydantic-validated JSON response containing the file size and image resolution.

### 1.3 Testing with pytest
* **In-Depth Topics**:
  * Writing unit tests and assertion logic.
  * Using pytest fixtures for database or model setup.
  * Mocking external API calls and databases.
  * Writing integration tests for API endpoints using `FastAPI.testclient`.
* **Interview Verification Questions**:
  * What is a pytest fixture, and how does it help manage test state?
  * Why is mocking essential when testing APIs that query external models?
* **Hands-on Practice Task**:
  * Write a test file `test_api.py` that utilizes `TestClient` to send a sample image to your `/upload` endpoint and asserts that the response contains the correct schema and a 200 status code.

---

## Section 2: Digital Signal & Image Processing

### 2.1 Image Matrices & Transformations
* **In-Depth Topics**:
  * NumPy arrays, 2D matrix coordinate systems, and color space channels (RGB, BGR, Grayscale).
  * Pixel type conversions (`uint8` vs. `float32`) and normalizations (scaling pixel values to `[0.0, 1.0]` or standardizing with mean and standard deviation).
  * Spatial transformations: Bilinear vs. Nearest-Neighbor interpolation during resizing.
* **Interview Verification Questions**:
  * How are image channels ordered in OpenCV compared to PyTorch, and how do you transpose them?
  * Why do we normalize pixel values to `[0.0, 1.0]` before feeding them to a neural network?
* **Hands-on Practice Task**:
  * Write a script that loads an RGB image, transposes it from HWC (Height, Width, Channel) format to CHW format (PyTorch standard), normalizes the values, and saves the output.

### 2.2 Spatial Filtering & Denoising
* **In-Depth Topics**:
  * Convolution kernels and spatial domain filtering.
  * Linear smoothing filters (Gaussian blur) and non-linear smoothing (Median, Bilateral filtering).
  * Edge-preserving smoothing: how bilateral filters use both spatial closeness and radiometric (intensity) difference.
* **Interview Verification Questions**:
  * Explain the mathematical difference between a Gaussian blur and a Bilateral filter.
  * Why is a Bilateral filter preferred over Gaussian blur for medical scans (like OCT)?
* **Hands-on Practice Task**:
  * Write a script that applies a Bilateral filter to a noisy scan, measures the noise reduction, and verifies that the edges of the structural layers remain sharp.

---

## Section 3: Deep Learning & PyTorch

### 3.1 PyTorch Data Pipelines
* **In-Depth Topics**:
  * PyTorch tensors, operations, and device placement (`.to('cuda')`).
  * Custom `torch.utils.data.Dataset` implementations, overriding `__len__` and `__getitem__`.
  * Using `torch.utils.data.DataLoader` for batching, shuffling, and multi-threaded data loading.
  * Data augmentations using `torchvision.transforms` (rotations, flips, affine transforms).
* **Interview Verification Questions**:
  * What is the role of `__getitem__` in a PyTorch Dataset, and how does it interact with the DataLoader?
  * Why is data augmentation critical for medical imaging models, and how do you apply it without changing label semantics?
* **Hands-on Practice Task**:
  * Write a custom Dataset class that reads a folder of images, applies random horizontal flips and normalization, and loads them in batches of 16 using a DataLoader.

### 3.2 Attention Mechanisms (Channel & Spatial)
* **In-Depth Topics**:
  * The role of attention in deep networks (selective feature extraction).
  * Channel Attention (CBAM): Global Average and Max pooling, Multi-Layer Perceptrons, and feature channel gating.
  * Spatial Attention (CBAM): Pooling across channels, 7x7 convolution, and spatial feature mapping.
  * Residual skip connections and attention integration logic.
* **Interview Verification Questions**:
  * What is the difference between what Channel Attention learns ("what") vs. what Spatial Attention learns ("where")?
  * How do residual skip connections prevent vanishing gradients in deep attention-enhanced networks?
* **Hands-on Practice Task**:
  * Implement a custom PyTorch module `ChannelSpatialAttention` that takes a tensor, applies sequential channel and spatial attention, and returns the gated output.

### 3.3 Explainable AI (LayerCAM) & Quantitative Faithfulness
* **In-Depth Topics**:
  * Saliency mapping, Grad-CAM, and LayerCAM feature attribution logic.
  * Pixel perturbation algorithms and Area Over Perturbation Curves (AOPC).
  * Mathematical evaluation of faithfulness (proving that highlighted features drive model confidence).
* **Interview Verification Questions**:
  * What are the limitations of Grad-CAM, and how does LayerCAM improve visual explanations in deep layers?
  * Explain how a Quantitative Deletion Test measures the faithfulness of a model's reasoning.
* **Hands-on Practice Task**:
  * Write a script that loads a trained model, extracts its LayerCAM heatmap, masks the top 10% highest-activation pixels in the input image, and prints the resulting change in classification confidence.

---

## Section 4: Generative AI & RAG (NLP)

### 4.1 Document Ingestion & Chunking
* **In-Depth Topics**:
  * Text extraction from PDFs and structured documents.
  * Text splitting strategies: character-based vs. token-based vs. recursive character splitting.
  * Chunk size optimization and chunk overlap configurations.
* **Interview Verification Questions**:
  * How do you determine the optimal chunk size and overlap for a document corpus?
  * Why is recursive character splitting superior to simple character-based splitting?
* **Hands-on Practice Task**:
  * Write a script that extracts text from a PDF document, splits it into chunks of 400 tokens with a 40-token overlap, and saves the chunks with metadata.

### 4.2 Vector Databases & Retrieval
* **In-Depth Topics**:
  * Text embeddings (generating dense vectors).
  * Cosine similarity and semantic search.
  * Vector databases (ChromaDB, Pinecone): indexing, storing, and querying embeddings.
* **Interview Verification Questions**:
  * What is cosine similarity, and how is it used in semantic search?
  * How does a vector database retrieve similar documents under sub-millisecond latencies (indexing)?
* **Hands-on Practice Task**:
  * Ingest your text chunks into ChromaDB, generate embeddings using a local model, and perform a semantic search query, returning the top 3 most relevant context chunks.

### 4.3 LLM Integration & Prompt Engineering
* **In-Depth Topics**:
  * Calling API-based LLMs (Gemini, OpenAI) and configuring parameters (temperature, top-p).
  * Prompt engineering: system prompts, few-shot prompting, and grounding prompts.
  * RAG integration: combining query + retrieved context + prompt structure into an LLM call.
* **Interview Verification Questions**:
  * What is prompt grounding, and how does it prevent LLM hallucinations?
  * What is the role of the "temperature" parameter in LLM text generation?
* **Hands-on Practice Task**:
  * Write a Python function that takes a user query and retrieved context, formats a grounded prompt, queries the Gemini API, and returns a clean, structured text report.

---

## Section 5: MLOps, Containerization & Infrastructure

### 5.1 Containerization with Docker
* **In-Depth Topics**:
  * Docker images vs. containers, layer caching, and the Docker daemon.
  * Writing `Dockerfiles`, multi-stage builds, and `.dockerignore`.
  * Optimizing container footprints (using slim/alpine base images).
  * Docker-compose for multi-container deployments.
* **Interview Verification Questions**:
  * Explain how a multi-stage Docker build reduces the size of your production image.
  * Why is it bad practice to run a containerized application as the root user, and how do you fix it?
* **Hands-on Practice Task**:
  * Write a multi-stage `Dockerfile` that packages your FastAPI application. Verify the image builds successfully and run it locally.

### 5.2 CI/CD with GitHub Actions
* **In-Depth Topics**:
  * GitHub Actions workflow syntax, runners, jobs, and steps.
  * Automating testing: running pytest and linters (flake8) on push/pull requests.
  * Automating builds: building and pushing Docker images to a registry (GHCR/Docker Hub).
* **Interview Verification Questions**:
  * What is a CI/CD pipeline, and why is it important in a collaborative software environment?
  * How do you secure API keys or secrets in a GitHub Actions workflow?
* **Hands-on Practice Task**:
  * Create a workflow file `.github/workflows/ci.yml` that triggers on every push, installs dependencies, runs flake8 linting, and runs pytest.

### 5.3 Observability & Monitoring
* **In-Depth Topics**:
  * Metrics collection: Prometheus client integration in FastAPI.
  * Custom metrics: request counters, error rate gauges, and latency histograms.
  * Exposing metrics at a `/metrics` endpoint.
  * Grafana dashboards: querying Prometheus data and visualizing performance.
  * Data drift detection using Wasserstein distance (Evidently AI).
* **Interview Verification Questions**:
  * What is the difference between metrics (Prometheus) and logs?
  * How do you detect that your model is decaying in production due to data drift?
* **Hands-on Practice Task**:
  * Integrate Prometheus client metrics into your FastAPI application, exposing a `/metrics` route that tracks request latency and count.
