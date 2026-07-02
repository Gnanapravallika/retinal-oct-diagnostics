// AI/ML Mastery Portal - Frontend Application Logic

// 1. Data Structures & Initial State
const SYLLABUS_DATA = [
    {
        phase: 1,
        title: "Foundations",
        topics: [
            { id: "p1-python", name: "Python Core & OOP", desc: "Variables, control flow, functions, OOP classes, inheritance, and modular coding in Python." },
            { id: "p1-libs", name: "Scientific Libraries (NumPy & Pandas)", desc: "Vectorized array operations, matrix mathematics, data manipulation, cleaning, and analysis using DataFrames." },
            { id: "p1-linalg", name: "Linear Algebra Basics", desc: "Vectors, matrices, multiplication, determinants, eigenvalues, eigenvectors, and singular value decomposition (SVD)." },
            { id: "p1-calc", name: "Calculus & Gradient Descent", desc: "Derivatives, partial derivatives, gradients, the chain rule, and optimizing loss functions via Gradient Descent." },
            { id: "p1-stats", name: "Probability & Statistics", desc: "Probability distributions, Bayes' theorem, expectation, variance, hypothesis testing, and p-values." }
        ]
    },
    {
        phase: 2,
        title: "Classical Machine Learning",
        topics: [
            { id: "p2-regression", name: "Linear & Logistic Regression", desc: "Supervised regression and classification, cost functions, decision boundaries, and L1/L2 regularization." },
            { id: "p2-trees", name: "Decision Trees & Random Forests", desc: "Information gain, entropy, Gini impurity, ensembles, bagging, and boosting algorithms (XGBoost, LightGBM)." },
            { id: "p2-svm", name: "Support Vector Machines (SVM)", desc: "Hyperplanes, margins, support vectors, kernel trick, and soft margin classification." },
            { id: "p2-cluster", name: "Clustering (K-Means & DBSCAN)", desc: "Unsupervised learning, centroid-based vs. density-based clustering, and elbow method evaluation." },
            { id: "p2-pca", name: "Dimensionality Reduction (PCA)", desc: "Variance maximization, feature projection, eigenvalues, and t-SNE visualization." },
            { id: "p2-eval", name: "Model Evaluation & Tuning", desc: "Precision, recall, F1, ROC-AUC, cross-validation, bias-variance tradeoff, and hyperparameter search." }
        ]
    },
    {
        phase: 3,
        title: "Deep Learning",
        topics: [
            { id: "p3-nn", name: "Neural Network Foundations", desc: "Perceptrons, multi-layer architectures, forward propagation, and weight initialization." },
            { id: "p3-functions", name: "Activation & Loss Functions", desc: "Sigmoid, ReLU, Softmax activation; MSE, Binary Cross-Entropy, and Categorical Cross-Entropy loss functions." },
            { id: "p3-optim", name: "Backpropagation & Optimizers", desc: "Chain rule derivation of gradients, SGD, Momentum, RMSprop, and Adam optimization algorithms." },
            { id: "p3-cnn", name: "Convolutional Neural Networks (CNNs)", desc: "Convolutions, kernels, padding, pooling, stride, ResNet architecture, and transfer learning for computer vision." },
            { id: "p3-rnn", name: "Sequential Models (RNNs & LSTMs)", desc: "Recurrent cells, vanishing gradient problem, gates, and sequence-to-sequence modeling." },
            { id: "p3-trans", name: "Attention & Transformers", desc: "Self-attention mechanisms, multi-head attention, positional encoding, and encoder-decoder architecture." },
            { id: "p3-pytorch", name: "PyTorch Framework", desc: "Tensors, autograd, custom Dataset classes, DataLoader, and building training loops." }
        ]
    },
    {
        phase: 4,
        title: "Modern AI & LLMs",
        topics: [
            { id: "p4-api", name: "LLM API Integration", desc: "Connecting to OpenAI, Anthropic, or Gemini APIs; configuring parameters like temperature and top-p." },
            { id: "p4-prompt", name: "Prompt Engineering Principles", desc: "System prompts, few-shot prompting, chain-of-thought, and output structuring." },
            { id: "p4-rag", name: "Retrieval-Augmented Generation (RAG)", desc: "Connecting LLMs to external documents, document chunking strategies, and semantic search." },
            { id: "p4-vector", name: "Vector Databases", desc: "Creating embeddings, configuring databases like ChromaDB or Pinecone, and performing cosine similarity searches." },
            { id: "p4-peft", name: "Parameter-Efficient Fine-Tuning (LoRA)", desc: "Low-Rank Adaptation, QLoRA, weight matrices, and fine-tuning open-source LLMs." },
            { id: "p4-local", name: "Running Models Locally", desc: "Configuring Ollama, using Llama or Mistral models locally, and offline inference." }
        ]
    },
    {
        phase: 5,
        title: "MLOps & Deployment",
        topics: [
            { id: "p5-api", name: "Building APIs with FastAPI", desc: "Wrapping ML models in REST endpoints, input validation using Pydantic, and asynchronous processing." },
            { id: "p5-docker", name: "Containerization with Docker", desc: "Writing Dockerfiles, building images, managing multi-container setups, and standardizing environments." },
            { id: "p5-cloud", name: "Cloud Deployment & HF Spaces", desc: "Deploying web apps and models to AWS, GCP, or Hugging Face Spaces for public access." },
            { id: "p5-dvc", name: "Data & Model Versioning (DVC)", desc: "Tracking large datasets, model artifacts, and integrating versioning with Git." }
        ]
    }
];

const RESEARCH_PROJECTS = [
    {
        id: "proj-multimodal-rag",
        title: "Multimodal RAG for Complex Enterprise PDFs",
        gap: "Standard RAG ignores tables and charts, causing hallucinations in financial or operational data.",
        readings: [
            { id: "r1-rag-paper", name: "RAG Core Framework (Lewis et al.)", xp: 100 },
            { id: "r1-colpali", name: "ColPali Vision Document Retrieval", xp: 100 },
            { id: "r1-layout", name: "Layout-Aware Chunking Strategies", xp: 100 }
        ],
        milestones: [
            { id: "m1-parser", name: "Implement Layout-Aware Parser (Unstructured/PyMuPDF)", xp: 250 },
            { id: "m1-db", name: "Build Vector DB Pipeline with Page Citations", xp: 250 },
            { id: "m1-ui", name: "Create Q&A Web Interface (FastAPI + HTML/JS)", xp: 250 }
        ],
        linkedin: [
            { id: "l1-p1", name: "Post 1: The Problem Hook (RAG Blindness to Tables)" },
            { id: "l1-p2", name: "Post 2: The Architecture & Code Details" },
            { id: "l1-p3", name: "Post 3: Demo Screen Recording & Business Value" }
        ]
    },
    {
        id: "proj-local-slm",
        title: "High-Performance Local SLMs & Cost Optimization",
        gap: "Commercial APIs are expensive and risk data privacy; companies struggle to deploy open-source models.",
        readings: [
            { id: "r2-lora", name: "LoRA: Low-Rank Adaptation (Hu et al.)", xp: 100 },
            { id: "r2-qlora", name: "QLoRA: Quantized Fine-Tuning (Dettmers et al.)", xp: 100 },
            { id: "r2-quant", name: "Model Quantization Formats (GGUF/AWQ)", xp: 100 }
        ],
        milestones: [
            { id: "m2-tuning", name: "Configure QLoRA & Fine-tune Llama/Mistral locally", xp: 250 },
            { id: "m2-serving", name: "Deploy model via Ollama & build FastAPI wrapper", xp: 250 },
            { id: "m2-bench", name: "Build benchmarking script (latency & cost vs GPT-4)", xp: 250 }
        ],
        linkedin: [
            { id: "l2-p1", name: "Post 1: Cost & Data Privacy Struggle Gap" },
            { id: "l2-p2", name: "Post 2: Training Loss Curves & Code Snippets" },
            { id: "l2-p3", name: "Post 3: Performance Benchmarks & Saving Projections" }
        ]
    },
    {
        id: "proj-mlops-drift",
        title: "Self-Healing MLOps: Drift Detection & Automated Retraining",
        gap: "Models degrade silently in production due to data drift; companies lack monitoring pipelines.",
        readings: [
            { id: "r3-drift", name: "Covariate Shift & Structural Drift in ML", xp: 100 },
            { id: "r3-metrics", name: "Population Stability Index & Wasserstein Distance", xp: 100 }
        ],
        milestones: [
            { id: "m3-endpoint", name: "Deploy Core Model (FastAPI) & Simulate Requests", xp: 250 },
            { id: "m3-detect", name: "Integrate Evidently AI to automatically detect drift", xp: 250 },
            { id: "m3-pipeline", name: "Build Automated Retraining Pipeline (GitHub Actions)", xp: 250 }
        ],
        linkedin: [
            { id: "l3-p1", name: "Post 1: The Danger of Silent Model Failure" },
            { id: "l3-p2", name: "Post 2: Live Drift Metrics Dashboard screenshot" },
            { id: "l3-p3", name: "Post 3: Demo of Automated Retraining loop" }
        ]
    },
    {
        id: "proj-privacy-gateway",
        title: "Secure Enterprise AI Proxy & PII Gateway",
        gap: "Data privacy regulations ban employees from using public LLMs with sensitive corporate data.",
        readings: [
            { id: "r4-ner", name: "NER for PII Redaction (Microsoft Presidio)", xp: 100 },
            { id: "r4-privacy", name: "Differential Privacy & Prompt Tokenization", xp: 100 }
        ],
        milestones: [
            { id: "m4-server", name: "Build FastAPI Proxy Gateway Server", xp: 250 },
            { id: "m4-redact", name: "Build local NER-based PII Redaction Engine", xp: 250 },
            { id: "m4-reconstruct", name: "Build Secure Token Mapping & Response Reconstruction", xp: 250 }
        ],
        linkedin: [
            { id: "l4-p1", name: "Post 1: The Corporate Security Risk of public LLMs" },
            { id: "l4-p2", name: "Post 2: Code walkthrough of Local PII Redaction proxy" },
            { id: "l4-p3", name: "Post 3: End-to-end video demo of Secure Gateway in action" }
        ]
    }
];

const INTERVIEW_FLASHCARDS = [
    {
        category: "Mathematics",
        question: "Explain Gradient Descent and the role of the Learning Rate.",
        answer: "Gradient Descent is an optimization algorithm used to minimize a model's loss function by iteratively moving in the direction of steepest descent (negative gradient). The learning rate is a hyperparameter that controls the step size taken at each iteration. If it is too small, convergence will be slow. If it is too large, the algorithm may overshoot the minimum and diverge."
    },
    {
        category: "Machine Learning",
        question: "What is the difference between L1 (Lasso) and L2 (Ridge) Regularization?",
        answer: "L1 regularization adds the absolute values of the coefficients as a penalty to the loss function, which tends to drive some coefficients to exactly zero, performing feature selection. L2 regularization adds the squared magnitude of the coefficients as a penalty, which shrinks coefficients towards zero but rarely makes them exactly zero, spreading the impact across all features."
    },
    {
        category: "Machine Learning",
        question: "Explain the Bias-Variance Tradeoff.",
        answer: "Bias is the error introduced by approximating a real-world problem with a simplified model (causes underfitting). Variance is the error from sensitivity to small fluctuations in the training set (causes overfitting). The tradeoff refers to the goal of minimizing both errors to achieve low generalization error, as decreasing bias typically increases variance, and vice versa."
    },
    {
        category: "Deep Learning",
        question: "Why is ReLU preferred over Sigmoid in deep neural networks?",
        answer: "ReLU (Rectified Linear Unit) solves the vanishing gradient problem in deep networks. The gradient of Sigmoid saturates (becomes close to zero) for high or low inputs, halting learning. ReLU has a constant gradient of 1 for all positive inputs, allowing gradients to flow back through many layers. Additionally, ReLU is computationally cheaper to calculate."
    },
    {
        category: "Deep Learning",
        question: "What is the Vanishing Gradient Problem, and how do we mitigate it?",
        answer: "As gradients are backpropagated through a deep network, repeated multiplications of small values can cause the gradients to decrease exponentially, preventing early layers from updating their weights. We mitigate it using: 1) ReLU activation functions, 2) Batch Normalization, 3) Residual connections (as in ResNet), and 4) Proper weight initialization methods (e.g., He or Xavier initialization)."
    },
    {
        category: "Natural Language Processing",
        question: "How does the Self-Attention mechanism work in Transformers?",
        answer: "Self-attention allows a model to associate each word in a sequence with every other word, calculating an attention score based on their relationship. For each input token, it generates three vectors: Query (Q), Key (K), and Value (V). The attention weights are computed by taking the dot product of the Query with all Keys, scaling the result, applying Softmax, and multiplying by the Values."
    },
    {
        category: "Modern AI & LLMs",
        question: "What is Retrieval-Augmented Generation (RAG) and why is it used?",
        answer: "RAG is a framework that retrieves relevant documents or information from an external knowledge base (using text embeddings and a vector database) and appends them to the user query as context before passing it to an LLM. This allows the LLM to generate accurate, up-to-date responses based on custom data without requiring expensive model fine-tuning, while significantly reducing hallucinations."
    },
    {
        category: "MLOps",
        question: "Why do we use Docker in Machine Learning engineering?",
        answer: "Docker containerizes the entire ML application (code, library dependencies, system packages, and GPU configurations). This ensures environment consistency across development, testing, and production, eliminating the 'it works on my machine' problem. It also simplifies scalability and deployment in cloud container orchestration systems like Kubernetes."
    }
];

// 2. Local State Management
let state = {
    masteryXp: 0,
    resilienceXp: 0,
    completedTopics: [],
    completedResearch: [], // Research milestones (papers read)
    completedImplementations: [], // Implementation milestones (code & LinkedIn posts)
    projectLinks: {}, // Stores links (github, linkedin) for each research project
    jobs: [],
    ideas: [],
    activeIdeaId: null,
    streak: 0,
    lastActiveDate: null,
    activeCardIndex: 0
};

// 3. Main Initialization Function
document.addEventListener("DOMContentLoaded", () => {
    loadState();
    initializeSyllabus();
    initializeResearchProjects();
    initializeJobs();
    initializeFlashcards();
    initializeStartupSandbox();
    setupNavigation();
    updateDashboardStats();
    checkStreak();
    
    // Render initial Lucide icons
    lucide.createIcons();
});

// Load state from LocalStorage
function loadState() {
    const savedState = localStorage.getItem("aiml_mastery_state");
    if (savedState) {
        try {
            state = { ...state, ...JSON.parse(savedState) };
            
            // Backwards compatibility for older saved state versions
            if (!state.completedResearch) state.completedResearch = [];
            if (!state.completedImplementations) state.completedImplementations = [];
            if (!state.projectLinks) state.projectLinks = [];
        } catch (e) {
            console.error("Failed to parse local storage state, using defaults", e);
        }
    }
}

// Save state to LocalStorage
function saveState() {
    localStorage.setItem("aiml_mastery_state", JSON.stringify(state));
    updateDashboardStats();
}

// Calculate level and progress
function getLevelProgress(xp) {
    const xpPerLevel = 1000;
    const level = Math.floor(xp / xpPerLevel) + 1;
    const currentLevelXp = xp % xpPerLevel;
    const percentage = (currentLevelXp / xpPerLevel) * 100;
    return { level, currentLevelXp, xpPerLevel, percentage };
}

// Update Dashboard Stats UI
function updateDashboardStats() {
    // Mastery XP & Level
    const progress = getLevelProgress(state.masteryXp);
    document.getElementById("user-level").innerText = `Level ${progress.level}`;
    document.getElementById("xp-progress-fill").style.width = `${progress.percentage}%`;
    document.getElementById("xp-text").innerText = `${progress.currentLevelXp} / ${progress.xpPerLevel} XP (Total: ${state.masteryXp})`;

    // Resilience XP
    document.getElementById("resilience-xp").innerText = `${state.resilienceXp} XP`;
    let resTitle = "Level 1: Shield Initialized";
    if (state.resilienceXp >= 1000) resTitle = "Level 5: Titanium Defenses";
    else if (state.resilienceXp >= 500) resTitle = "Level 4: Reinforced Armor";
    else if (state.resilienceXp >= 300) resTitle = "Level 3: Deflector Field";
    else if (state.resilienceXp >= 100) resTitle = "Level 2: Iron Will";
    document.getElementById("resilience-level").innerText = resTitle;

    // Streak
    document.getElementById("streak-count").innerText = `${state.streak} ${state.streak === 1 ? 'Day' : 'Days'}`;
}

// Check and update streak
function checkStreak() {
    const today = new Date().toDateString();
    if (state.lastActiveDate) {
        const lastDate = new Date(state.lastActiveDate);
        const diffTime = Math.abs(new Date(today) - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            state.streak += 1;
        } else if (diffDays > 1) {
            state.streak = 1; // Reset streak if missed a day
        }
    } else {
        state.streak = 1; // Initial day
    }
    state.lastActiveDate = today;
    saveState();
}

// 4. Navigation & Tabs
function setupNavigation() {
    const navButtons = document.querySelectorAll(".nav-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-target");
            
            navButtons.forEach(b => b.classList.remove("active"));
            tabPanels.forEach(p => p.classList.remove("active"));
            
            btn.classList.add("active");
            document.getElementById(target).classList.add("active");
        });
    });
}

// 5. Syllabus Tracker Feature
function initializeSyllabus() {
    const container = document.getElementById("syllabus-container");
    container.innerHTML = "";

    SYLLABUS_DATA.forEach(phase => {
        const completedCount = phase.topics.filter(t => state.completedTopics.includes(t.id)).length;
        const totalCount = phase.topics.length;
        const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

        const card = document.createElement("div");
        card.className = "phase-card";
        card.id = `phase-${phase.phase}`;

        card.innerHTML = `
            <div class="phase-header" onclick="togglePhase(${phase.phase})">
                <div class="phase-title-group">
                    <span class="phase-num">Phase ${phase.phase}</span>
                    <h3>${phase.title}</h3>
                </div>
                <div class="phase-meta">
                    <span id="phase-progress-text-${phase.phase}">${completedCount}/${totalCount} Topics (${percent}%)</span>
                    <i data-lucide="chevron-down" class="chevron-icon"></i>
                </div>
            </div>
            <div class="phase-content">
                <div class="topic-list" id="topic-list-${phase.phase}">
                    <!-- Topics will be inserted here -->
                </div>
            </div>
        `;

        container.appendChild(card);

        const listContainer = document.getElementById(`topic-list-${phase.phase}`);
        phase.topics.forEach(topic => {
            const isChecked = state.completedTopics.includes(topic.id);
            const item = document.createElement("div");
            item.className = "topic-item";
            item.innerHTML = `
                <label class="checkbox-container">
                    <input type="checkbox" id="chk-${topic.id}" ${isChecked ? 'checked' : ''} onchange="toggleTopic('${topic.id}', ${phase.phase})">
                    <span class="checkmark"></span>
                </label>
                <div class="topic-details">
                    <h4>${topic.name}</h4>
                    <p>${topic.desc}</p>
                </div>
            `;
            listContainer.appendChild(item);
        });
    });
}

window.togglePhase = function(phaseNum) {
    const card = document.getElementById(`phase-${phaseNum}`);
    card.classList.toggle("expanded");
};

window.toggleTopic = function(topicId, phasePhase) {
    const checkbox = document.getElementById(`chk-${topicId}`);
    const isChecked = checkbox.checked;

    if (isChecked) {
        if (!state.completedTopics.includes(topicId)) {
            state.completedTopics.push(topicId);
            state.masteryXp += 50; // Award 50 XP per topic
        }
    } else {
        const index = state.completedTopics.indexOf(topicId);
        if (index > -1) {
            state.completedTopics.splice(index, 1);
            state.masteryXp = Math.max(0, state.masteryXp - 50);
        }
    }

    saveState();
    
    // Update syllabus header progress
    const phase = SYLLABUS_DATA.find(p => p.phase === phasePhase);
    const completedCount = phase.topics.filter(t => state.completedTopics.includes(t.id)).length;
    const totalCount = phase.topics.length;
    const percent = Math.round((completedCount / totalCount) * 100);
    document.getElementById(`phase-progress-text-${phasePhase}`).innerText = `${completedCount}/${totalCount} Topics (${percent}%)`;
};

// 5B. Research Projects & LinkedIn Campaigns
function initializeResearchProjects() {
    const container = document.getElementById("research-projects-container");
    container.innerHTML = "";

    RESEARCH_PROJECTS.forEach(proj => {
        const card = document.createElement("div");
        card.className = "card research-proj-card";
        card.style.marginBottom = "2rem";

        const savedLinks = state.projectLinks[proj.id] || { github: "", linkedin: "" };

        // HTML Layout for each Research Project Card
        card.innerHTML = `
            <div class="proj-header" style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:1rem;">
                <span class="job-status-badge badge-interviewing" style="align-self: flex-start;">Corporate Struggle Gap Resolved</span>
                <h3 style="font-size:1.4rem; color:var(--color-text-primary); font-family:var(--font-display);">${proj.title}</h3>
                <p style="color:var(--color-text-secondary); font-size:0.95rem; font-style:italic;">"${proj.gap}"</p>
            </div>
            
            <div class="proj-body-grid" style="display:grid; grid-template-columns: 1fr 1.25fr; gap:2rem;">
                <!-- Left: Milestones (Research & Code) -->
                <div class="proj-milestones-area">
                    <h4 style="font-size:1rem; color:var(--color-primary); margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem;">
                        <i data-lucide="book-open" style="width:16px; height:16px;"></i> 1. Research Phase (+100 XP each)
                    </h4>
                    <div class="milestone-list" style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1.5rem;">
                        ${proj.readings.map(r => {
                            const isChecked = state.completedResearch.includes(r.id);
                            return `
                                <label class="checkbox-container" style="font-size: 0.9rem; margin-bottom:0;">
                                    <input type="checkbox" id="chk-${r.id}" ${isChecked ? 'checked' : ''} onchange="toggleResearchMilestone('${r.id}', 'research')">
                                    <span class="checkmark" style="top:0px;"></span>
                                    <span style="font-size:0.9rem; font-weight:500;">${r.name}</span>
                                </label>
                            `;
                        }).join('')}
                    </div>

                    <h4 style="font-size:1rem; color:var(--color-success); margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem;">
                        <i data-lucide="code" style="width:16px; height:16px;"></i> 2. Technical Implementation (+250 XP each)
                    </h4>
                    <div class="milestone-list" style="display:flex; flex-direction:column; gap:0.5rem;">
                        ${proj.milestones.map(m => {
                            const isChecked = state.completedImplementations.includes(m.id);
                            return `
                                <label class="checkbox-container" style="font-size: 0.9rem; margin-bottom:0;">
                                    <input type="checkbox" id="chk-${m.id}" ${isChecked ? 'checked' : ''} onchange="toggleResearchMilestone('${m.id}', 'implementation')">
                                    <span class="checkmark" style="top:0px;"></span>
                                    <span style="font-size:0.9rem; font-weight:500;">${m.name}</span>
                                </label>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Right: LinkedIn Marketing Campaign -->
                <div class="proj-linkedin-area" style="background-color:rgba(0,0,0,0.15); border-radius:var(--radius-md); padding:1.25rem; border:1px solid var(--border-color); display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                        <h4 style="font-size:1rem; color:var(--color-startup); margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem;">
                            <i data-lucide="share-2" style="width:16px; height:16px;"></i> LinkedIn Campaign (Build in Public)
                        </h4>
                        <p style="font-size:0.8rem; color:var(--color-text-secondary); margin-bottom:1rem;">Post updates while you learn. This is how you attract recruiters organically!</p>
                        
                        <div class="linkedin-posts" style="display:flex; flex-direction:column; gap:0.75rem; margin-bottom:1.5rem;">
                            ${proj.linkedin.map(l => {
                                const isChecked = state.completedImplementations.includes(l.id);
                                return `
                                    <label class="checkbox-container" style="font-size: 0.85rem; margin-bottom:0;">
                                        <input type="checkbox" id="chk-${l.id}" ${isChecked ? 'checked' : ''} onchange="toggleResearchMilestone('${l.id}', 'implementation')">
                                        <span class="checkmark" style="top:0px;"></span>
                                        <span style="font-size:0.85rem; font-weight:500; color:var(--color-text-primary);">${l.name}</span>
                                    </label>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Portfolio Links Inputs -->
                    <div class="portfolio-links" style="border-top:1px solid var(--border-color); padding-top:1rem; display:flex; flex-direction:column; gap:0.75rem;">
                        <div class="form-group" style="margin-bottom:0;">
                            <label style="font-size:0.75rem; margin-bottom:0.25rem;">GitHub Repository URL</label>
                            <input type="url" id="link-github-${proj.id}" placeholder="https://github.com/..." value="${savedLinks.github}" onchange="saveProjectLink('${proj.id}', 'github')" style="padding:0.4rem 0.75rem; font-size:0.85rem;">
                        </div>
                        <div class="form-group" style="margin-bottom:0;">
                            <label style="font-size:0.75rem; margin-bottom:0.25rem;">LinkedIn Post / Article URL</label>
                            <input type="url" id="link-linkedin-${proj.id}" placeholder="https://linkedin.com/posts/..." value="${savedLinks.linkedin}" onchange="saveProjectLink('${proj.id}', 'linkedin')" style="padding:0.4rem 0.75rem; font-size:0.85rem;">
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    lucide.createIcons();
}

window.toggleResearchMilestone = function(id, phaseType) {
    const checkbox = document.getElementById(`chk-${id}`);
    const isChecked = checkbox.checked;

    if (phaseType === 'research') {
        if (isChecked) {
            if (!state.completedResearch.includes(id)) {
                state.completedResearch.push(id);
                state.masteryXp += 100; // 100 XP per paper read
            }
        } else {
            const index = state.completedResearch.indexOf(id);
            if (index > -1) {
                state.completedResearch.splice(index, 1);
                state.masteryXp = Math.max(0, state.masteryXp - 100);
            }
        }
    } else if (phaseType === 'implementation') {
        if (isChecked) {
            if (!state.completedImplementations.includes(id)) {
                state.completedImplementations.push(id);
                state.masteryXp += 250; // 250 XP per coding/sharing milestone
            }
        } else {
            const index = state.completedImplementations.indexOf(id);
            if (index > -1) {
                state.completedImplementations.splice(index, 1);
                state.masteryXp = Math.max(0, state.masteryXp - 250);
            }
        }
    }

    saveState();
};

window.saveProjectLink = function(projectId, linkType) {
    const input = document.getElementById(`link-${linkType}-${projectId}`);
    const val = input.value.trim();

    if (!state.projectLinks[projectId]) {
        state.projectLinks[projectId] = { github: "", linkedin: "" };
    }

    state.projectLinks[projectId][linkType] = val;
    saveState();
};

// 6. Job Tracker & XP Gamification
function initializeJobs() {
    const jobForm = document.getElementById("job-form");
    jobForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const company = document.getElementById("job-company").value.trim();
        const role = document.getElementById("job-role").value.trim();
        const location = document.getElementById("job-location").value;
        const status = document.getElementById("job-status").value;
        const notes = document.getElementById("job-notes").value.trim();
        
        const newJob = {
            id: 'job_' + Date.now(),
            company,
            role,
            location,
            status,
            notes,
            date: new Date().toLocaleDateString()
        };

        state.jobs.push(newJob);
        
        // Gamified resilience check
        if (status === "Rejected") {
            state.resilienceXp += 100;
        }

        saveState();
        renderJobList();
        
        jobForm.reset();
    });

    // Filter Button Handlers
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderJobList(btn.getAttribute("data-filter"));
        });
    });

    renderJobList();
}

function renderJobList(filter = "all") {
    const container = document.getElementById("job-list-container");
    container.innerHTML = "";

    const filteredJobs = state.jobs.filter(job => {
        if (filter === "all") return true;
        return job.status === filter;
    });

    if (filteredJobs.length === 0) {
        container.innerHTML = `<div class="empty-list-message" style="color:var(--color-text-secondary); text-align:center; padding: 2rem;">No applications found in this category.</div>`;
        return;
    }

    // Sort: Newest first
    filteredJobs.slice().reverse().forEach(job => {
        const item = document.createElement("div");
        item.className = "job-item";
        
        let badgeClass = "badge-applied";
        if (job.status === "Interviewing") badgeClass = "badge-interviewing";
        else if (job.status === "Rejected") badgeClass = "badge-rejected";
        else if (job.status === "Offer") badgeClass = "badge-offer";

        item.innerHTML = `
            <div class="job-info">
                <h4>${job.company}</h4>
                <p><strong>${job.role}</strong> &bull; ${job.location} &bull; ${job.date}</p>
                ${job.notes ? `<p class="notes">"${job.notes}"</p>` : ''}
            </div>
            <div class="job-actions">
                <span class="job-status-badge ${badgeClass}">${job.status}</span>
                <button class="delete-job-btn" onclick="deleteJob('${job.id}')" title="Delete record">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>
        `;
        container.appendChild(item);
    });

    lucide.createIcons();
}

window.deleteJob = function(jobId) {
    const jobIndex = state.jobs.findIndex(j => j.id === jobId);
    if (jobIndex > -1) {
        const job = state.jobs[jobIndex];
        // Deduct resilience XP if a rejected job is deleted to keep integrity
        if (job.status === "Rejected") {
            state.resilienceXp = Math.max(0, state.resilienceXp - 100);
        }
        state.jobs.splice(jobIndex, 1);
        saveState();
        renderJobList();
    }
};

// 7. Interview Flashcards Feature
function initializeFlashcards() {
    const card = document.getElementById("active-flashcard");
    const prevBtn = document.getElementById("prev-card-btn");
    const nextBtn = document.getElementById("next-card-btn");

    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });

    prevBtn.addEventListener("click", () => {
        card.classList.remove("flipped");
        setTimeout(() => {
            state.activeCardIndex = (state.activeCardIndex - 1 + INTERVIEW_FLASHCARDS.length) % INTERVIEW_FLASHCARDS.length;
            renderActiveFlashcard();
        }, 150);
    });

    nextBtn.addEventListener("click", () => {
        card.classList.remove("flipped");
        setTimeout(() => {
            state.activeCardIndex = (state.activeCardIndex + 1) % INTERVIEW_FLASHCARDS.length;
            renderActiveFlashcard();
        }, 150);
    });

    // Confidence rating buttons
    const rateButtons = document.querySelectorAll(".rate-btn");
    rateButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Stop card from flipping back
            const rating = parseInt(btn.getAttribute("data-rate"));
            state.masteryXp += rating * 5; // Award minor mastery XP for review
            saveState();
            
            // Visual feedback
            btn.style.backgroundColor = "var(--color-success)";
            btn.style.color = "#ffffff";
            setTimeout(() => {
                btn.style.backgroundColor = "";
                btn.style.color = "";
                nextBtn.click();
            }, 500);
        });
    });

    renderActiveFlashcard();
}

function renderActiveFlashcard() {
    const flashcard = INTERVIEW_FLASHCARDS[state.activeCardIndex];
    document.getElementById("card-category").innerText = flashcard.category;
    document.getElementById("card-question").innerText = flashcard.question;
    document.getElementById("card-answer").innerText = flashcard.answer;
    document.getElementById("card-index-indicator").innerText = `${state.activeCardIndex + 1} / ${INTERVIEW_FLASHCARDS.length}`;
}

// 8. Startup Sandbox Feature
function initializeStartupSandbox() {
    const newIdeaBtn = document.getElementById("new-idea-btn");
    const saveIdeaBtn = document.getElementById("save-idea-btn");
    
    newIdeaBtn.addEventListener("click", () => {
        const title = prompt("Enter a name for your AI/ML Startup Idea:");
        if (!title || !title.trim()) return;

        const newIdea = {
            id: 'idea_' + Date.now(),
            title: title.trim(),
            problem: "",
            solution: "",
            audience: "",
            mvp: ""
        };

        state.ideas.push(newIdea);
        state.activeIdeaId = newIdea.id;
        
        saveState();
        renderIdeasList();
        loadActiveIdeaCanvas();
    });

    saveIdeaBtn.addEventListener("click", () => {
        if (!state.activeIdeaId) return;

        const idea = state.ideas.find(i => i.id === state.activeIdeaId);
        if (idea) {
            idea.problem = document.getElementById("idea-problem").value;
            idea.solution = document.getElementById("idea-solution").value;
            idea.audience = document.getElementById("idea-audience").value;
            idea.mvp = document.getElementById("idea-mvp").value;
            
            state.masteryXp += 25; // Award small XP for planning
            saveState();
            
            saveIdeaBtn.innerHTML = `<i data-lucide="check"></i> Saved!`;
            lucide.createIcons();
            setTimeout(() => {
                saveIdeaBtn.innerHTML = `<i data-lucide="save"></i> Save Canvas`;
                lucide.createIcons();
            }, 1000);
        }
    });

    renderIdeasList();
}

function renderIdeasList() {
    const container = document.getElementById("ideas-list-container");
    container.innerHTML = "";

    if (state.ideas.length === 0) {
        container.innerHTML = `<div style="color:var(--color-text-muted); text-align:center; padding: 1rem 0;">No ideas logged yet. Create your first!</div>`;
        document.getElementById("active-idea-canvas").style.display = "none";
        return;
    }

    state.ideas.forEach(idea => {
        const item = document.createElement("div");
        item.className = `idea-item ${idea.id === state.activeIdeaId ? 'active' : ''}`;
        
        item.innerHTML = `
            <span class="idea-title">${idea.title}</span>
            <button class="delete-idea-btn" onclick="deleteIdea(event, '${idea.id}')" title="Delete idea">
                <i data-lucide="trash-2" style="width:16px; height:16px;"></i>
            </button>
        `;
        
        item.addEventListener("click", () => {
            state.activeIdeaId = idea.id;
            document.querySelectorAll(".idea-item").forEach(el => el.classList.remove("active"));
            item.classList.add("active");
            loadActiveIdeaCanvas();
        });

        container.appendChild(item);
    });

    lucide.createIcons();
}

function loadActiveIdeaCanvas() {
    const canvas = document.getElementById("active-idea-canvas");
    if (!state.activeIdeaId) {
        canvas.style.display = "none";
        return;
    }

    const idea = state.ideas.find(i => i.id === state.activeIdeaId);
    if (!idea) {
        canvas.style.display = "none";
        return;
    }

    canvas.style.display = "block";
    document.getElementById("canvas-title").innerText = `Canvas: ${idea.title}`;
    document.getElementById("idea-problem").value = idea.problem || "";
    document.getElementById("idea-solution").value = idea.solution || "";
    document.getElementById("idea-audience").value = idea.audience || "";
    document.getElementById("idea-mvp").value = idea.mvp || "";
}

window.deleteIdea = function(event, ideaId) {
    event.stopPropagation();
    const ideaIndex = state.ideas.findIndex(i => i.id === ideaId);
    if (ideaIndex > -1) {
        state.ideas.splice(ideaIndex, 1);
        if (state.activeIdeaId === ideaId) {
            state.activeIdeaId = state.ideas.length > 0 ? state.ideas[0].id : null;
        }
        saveState();
        renderIdeasList();
        loadActiveIdeaCanvas();
    }
};
