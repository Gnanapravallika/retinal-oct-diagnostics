# Combined Master Roadmap & Study Playbook (Weeks 1–16)

This document combines your weekly timeline, learning resources, sandbox practice tasks, and flagship project tasks into a single execution manual. Follow this step-by-step.

---

## WEEK 1: Python OOP, Git & Preprocessing Basics
*   **Study Focus**: Python Object-Oriented Programming (OOP) classes, instance methods, and constructors (`__init__`). Git version control basics.
*   **Where to Learn**:
    *   *Python OOP*: Real Python's "Object-Oriented Programming (OOP) in Python 3" · Corey Schafer's "Python OOP" series on YouTube.
    *   *Git*: Interactive visual tutorial at [learngitbranching.js.org](https://learngitbranching.js.org) · freeCodeCamp's Git & GitHub course on YouTube.
*   **Sandbox Exercise (Half-Day)**: Make a throwaway Git repository. Create a branch, edit a file on both main and the branch, merge them, resolve the conflict by hand, and write down the steps in a `NOTES.md` file.
*   **Flagship Project Task**: Create the directory structure (`src/preprocessing/`, `src/model/`, `src/api/`). Write **[standardizer.py](file:///e:/aiml%20master/src/preprocessing/standardizer.py)** to load an image with OpenCV, extract dimensions, normalize pixel values to `[0.0, 1.0]`, resize to 224x224, and save the output.
*   **LinkedIn Trigger**: Publish **Post 1 (The Launch)**.

---

## WEEK 2: PyTorch Internals & Training Loop Walkthrough
*   **Study Focus**: PyTorch tensors, autograd (computational graph), backpropagation mechanics, loss calculations, and optimizer weight updates.
*   **Where to Learn**:
    *   *PyTorch*: Official PyTorch tutorials ("Tensors" & "A Gentle Introduction to `torch.autograd`" at pytorch.org/tutorials) · freeCodeCamp's PyTorch course on YouTube.
*   **Sandbox Exercise (1 Day)**: Write a single Python script that implements 2x2 matrix multiplication using nested loops (no libraries) and verifies it matches `np.matmul`. Then implement manual gradient descent on `y = x^2` for 10 steps, printing the loss reduction.
*   **Flagship Project Task**: Create `src/model/train_walkthrough.py`. Copy your model training loop and write line-by-line comments explaining the exact purpose of `optimizer.zero_grad()`, `loss.backward()`, and `optimizer.step()`. Set up your GitHub Profile README.
*   **LinkedIn Trigger**: Publish **Post 2 (Denoising/Filtering Insight)**.

---

## WEEK 3: Attention Gating & Linear Algebra
*   **Study Focus**: Channel Attention, Spatial Attention, Convolutional Block Attention Module (CBAM) architecture, and residual skip connections. Linear Algebra: vectors, matrices, dot products, and transposition.
*   **Where to Learn**:
    *   *Attention*: Read the original CBAM paper (*CBAM: Convolutional Block Attention Module* on arXiv) · StatQuest's YouTube videos on attention.
    *   *Linear Algebra*: 3Blue1Brown's "Essence of Linear Algebra" YouTube series · Khan Academy's Linear Algebra track.
*   **Sandbox Exercise (1 Day)**: Implement a minimal Channel Attention module in PyTorch that takes a random tensor (`torch.randn(1, 64, 32, 32)`) and returns a gated output of the same shape. Confirm dimension matching.
*   **Flagship Project Task**: Implement your custom Channel-Spatial Attention (CSA) module inside `src/model/model.py` and integrate it into your ResNet-50 backbone.

---

## WEEK 4: Image Convolutions & Bilateral Filtering
*   **Study Focus**: Convolutions, kernels, spatial filtering, and non-linear smoothing.
*   **Where to Learn**:
    *   *Image Filtering*: OpenCV-Python tutorials ("Image Filtering" at docs.opencv.org) · PyImageSearch blog for code-first computer vision tutorials.
*   **Sandbox Exercise (1 Day)**: Take 3 sample noisy images. Apply Gaussian blur, Median filter, and Bilateral filter to each. Save a side-by-side comparison image and write a one-paragraph analysis of which filter preserved structural boundaries best.
*   **Flagship Project Task**: Create `src/preprocessing/filters.py`. Implement your edge-preserving Bilateral Filter to preprocess raw scans before model input.

---

## WEEK 5: Class Imbalance & API Architecture
*   **Study Focus**: Skewed dataset handling, Weighted Batch Sampling, Inverse Class Frequency Cross-Entropy Loss. FastAPI fundamentals and Pydantic schemas.
*   **Where to Learn**:
    *   *Class Imbalance*: `imbalanced-learn` library documentation (imbalanced-learn.org) · PyTorch loss function docs.
    *   *FastAPI*: Official FastAPI documentation (fastapi.tiangolo.com).
*   **Sandbox Exercise (1 Day)**: Use `sklearn.datasets.make_classification` to generate a synthetic imbalanced dataset. Train a classifier with and without class weighting, and print the comparative per-class recall scores.
*   **Flagship Project Task**: Add Weighted Batch Sampling and Inverse Frequency Loss to your PyTorch training loop to handle rare clinical anomalies.

---

## WEEK 6: API Serving & Inference Pipelines
*   **Study Focus**: Async endpoints, handling file upload streams, and REST API design.
*   **Where to Learn**:
    *   *FastAPI*: FastAPI "Tutorial - User Guide" (specifically file uploads and path parameters).
*   **Sandbox Exercise (1 Day)**: Build a tiny standalone FastAPI app with one `/upload` endpoint that accepts an image and returns its width, height, and file size as JSON.
*   **Flagship Project Task**: Build a FastAPI endpoint `/predict` inside `src/api/main.py`. The endpoint must accept an image upload, apply your Bilateral filter, run your attention-gated model inference, and return the predicted anomaly classifications in JSON format.
*   **LinkedIn Trigger**: Publish **Post 3 (API Serving Milestone & Diagram)**.

---

## WEEK 7: Containerization & Device Generalization Baseline
*   **Study Focus**: Docker images vs. containers, layer caching, multi-stage builds, `.dockerignore`, and docker-compose.
*   **Where to Learn**:
    *   *Docker*: Official Docker "Get Started" guide · freeCodeCamp's Docker course on YouTube.
*   **Sandbox Exercise (1 Day)**: Containerize a simple "Hello World" FastAPI app. Write the Dockerfile, build the image, run it locally, and confirm it responds on `localhost:8000`.
*   **Flagship Project Task**: Write a multi-stage `Dockerfile` in `docker/` that packages your FastAPI inference server. Run a baseline evaluation of your AE-ResNet model on the external validation dataset (OCTID) without any contrast normalization, and record the accuracy drop caused by the scanner hardware domain shift.
*   **LinkedIn Trigger**: Publish **Post 4 (Explainability / Auditing Insight)**.

---

## WEEK 8: Explainable AI & Domain Adaptation
*   **Study Focus**: Saliency mapping, Class Activation Mapping (CAM), Grad-CAM limitations, and LayerCAM mechanics.
*   **Where to Learn**:
    *   *Explainable AI*: Read the original Grad-CAM and LayerCAM papers on arXiv · Captum interpretability library tutorials (captum.ai).
*   **Sandbox Exercise (1 Day)**: Use the Captum library on a pre-trained `torchvision.models.resnet18` and a sample image to generate and save a Grad-CAM heatmap.
*   **Flagship Project Task**: Write your LayerCAM implementation inside `src/xai/layercam.py`. Implement standard contrast normalization (Contrast-Limited Adaptive Histogram Equalization - CLAHE and Min-Max scaling) in `src/preprocessing/filters.py`. Re-run model inference on the normalized OCTID images to evaluate accuracy recovery.

---

## WEEK 9: Faithfulness Validation & Cross-Scanner Auditing
*   **Study Focus**: Pixel perturbation logic, deletion tests, and Area Over Perturbation Curves (AOPC).
*   **Where to Learn**:
    *   *Attribution evaluation*: Research papers on "Evaluating visual explanations/faithfulness in CNNs."
*   **Sandbox Exercise (1 Day)**: Write a function that takes an image and a saliency map, masks the top 10% highest-attribution pixels, and saves the perturbed image.
*   **Flagship Project Task**: Write `src/xai/evaluation.py`. Implement the Quantitative Deletion Test to measure the AOPC. Generate comparative LayerCAM heatmaps and AOPC curves comparing normalized inputs against un-normalized scanner inputs on the OCTID cohort.
*   **LinkedIn Trigger**: Publish **Post 5 (Behind-the-scenes writing update)**.

---

## WEEK 10: Academic LaTeX Compilation & Extension Draft
*   **Study Focus**: LaTeX document structures, BibTeX citations, IEEE formatting, and the arXiv preprint submission process.
*   **Where to Learn**:
    *   *LaTeX*: Overleaf's interactive guides (overleaf.com/learn) · arXiv submission instructions (arxiv.org/help/submit).
*   **Sandbox Exercise (1 Day)**: Create a blank document on Overleaf using the IEEE template, format a 3-column data table, compile it to a PDF, and download the source files.
*   **Flagship Project Task**: Compile your first research manuscript (Flagship: AE-ResNet & XAI) in LaTeX on Overleaf. Submit the paper to **arXiv** and update your resumes. Begin drafting your second manuscript (Extension: Cross-Device Generalization & Normalization) using the comparative figures and metrics generated in Weeks 7–9.
*   **LinkedIn Trigger**: Publish **Post 6 (arXiv Preprint Milestone)**.

---

## WEEK 11: Document Ingestion & Chunking Strategies
*   **Study Focus**: PDF text extraction, document parsing, tokenization, recursive character splitting, and chunk size/overlap trade-offs.
*   **Where to Learn**:
    *   *NLP Ingestion*: LangChain's text splitter guides (python.langchain.com) · PyPDF or PDFMiner documentation.
*   **Sandbox Exercise (1 Day)**: Write a script to extract text from a Wikipedia article and split it into chunks of 300 characters with a 30-character overlap. Print the first 3 chunks.
*   **Flagship Project Task**: Initialize Project 2 (DocuMind). Write the ingestion script to parse a corpus of Ophthalmology Clinical Guideline PDFs and split the text into optimized chunks.

---

## WEEK 12: Embeddings & Vector Databases
*   **Study Focus**: High-dimensional text embeddings, cosine similarity metric, vector database indexing, and ChromaDB.
*   **Where to Learn**:
    *   *Vector Search*: ChromaDB documentation (docs.trychroma.com) · Hugging Face `sentence-transformers` tutorials.
*   **Sandbox Exercise (1 Day)**: Generate embeddings for 5 sample sentences using a free local transformer model. Measure the cosine similarity between them and print the results.
*   **Flagship Project Task**: Set up a local ChromaDB collection. Generate embeddings for your clinical guideline chunks, insert them into the database, and build the retrieval query logic.
*   **LinkedIn Trigger**: Publish **Post 7 (New Project/Domain Introduction)**.

---

## WEEK 13: Grounded RAG & CI/CD Pipelines
*   **Study Focus**: Prompt engineering (grounding, system instructions), LLM API integration, and GitHub Actions CI/CD workflows.
*   **Where to Learn**:
    *   *RAG*: Gemini API documentation · GitHub Actions quickstart guides (docs.github.com/actions).
*   **Sandbox Exercise (1 Day)**: Push a calculator function and a pytest script to a new repository. Write a GitHub Actions YAML file that runs pytest automatically on every push. Confirm the build status.
*   **Flagship Project Task**: Connect your ChromaDB retrieval system to the Gemini API. Write a grounded prompt template that generates patient reports based on retrieved clinical context. Secure your RAG API with pytest unit tests and deploy the container online.
*   **LinkedIn Trigger**: Publish **Post 8 (RAG Live Demo & Link)**.

---

## WEEK 14: Data Querying & SQL Engineering
*   **Study Focus**: Relational databases, SQL query optimization, joins, group-by aggregations, and SQLite integration.
*   **Where to Learn**:
    *   *SQL*: SQLBolt (sqlbolt.com) · Mode SQL tutorials.
*   **Sandbox Exercise (1 Day)**: Load a transactions CSV file into SQLite using Python’s `sqlite3` module. Write 5 SQL queries to filter, group, count, and join transactional tables.
*   **Flagship Project Task**: Determine interview traction. If actively interviewing, skip to Week 16 mock prep. Otherwise, construct your MLOps tabular dataset schema.

---

## WEEK 15: Model Drift Detection & Monitoring
*   **Study Focus**: Production data degradation, data drift, population stability indexing, Wasserstein distance, and Evidently AI.
*   **Where to Learn**:
    *   *ML monitoring*: Evidently AI documentation (evidentlyai.com) · Prometheus client tutorials.
*   **Sandbox Exercise (Half-Day)**: Add a request counter metric to your FastAPI hello-world app, expose it at a `/metrics` route, and view the raw metrics payload in your browser.
*   **Flagship Project Task**: Set up your monitoring pipeline (Evidently AI + Prometheus + Grafana). Simulate incoming drifted data, calculate Wasserstein distance on feature arrays, and configure alerts.
*   **LinkedIn Trigger**: Publish **Post 9 (Honest reflection / learning post)**.

---

## WEEK 16: System Design & Interview Preparation
*   **Study Focus**: Load balancing, horizontal scaling, caching layers (Redis), distributed serving architectures, and technical trade-off defense.
*   **Where to Learn**:
    *   *System Design*: Primer guides on system design (e.g., ByteByteGo or developer blogs) · mock interview YouTube channels.
*   **Sandbox Exercise (1 Day)**: Complete mock interviews, practice explaining the request lifecycle of your APIs out loud, and memorize your 90-second pitches.
*   **Flagship Project Task**: Finalize all code, run clean clone verification checks, publish your repositories, and launch your job application and professor outreach campaign.
*   **LinkedIn Trigger**: Publish **Post 10 (Open Role Call / Job Request)**.
