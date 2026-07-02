# Technical Specifications: Attention-Guided Explainability Under Domain Shift

This document defines the technical, mathematical, and experimental specifications for investigating how scanner domain shift degrades classification quality and explainability faithfulness, and validating whether attention-guided representations and input-level normalization can mitigate these effects.

---

## 1. Scientific Hypotheses & Contribution

Rather than selling a new architecture, this research investigates a fundamental question in medical computer vision:
1.  **Hypothesis 1 (Performance Decay)**: Hardware domain shift (change in scanner manufacturer) degrades not only raw accuracy, but also model calibration (increased Expected Calibration Error) and representation alignment (increased feature space distance).
2.  **Hypothesis 2 (Explanation Degradation)**: Domain shift degrades visual explanation faithfulness. Saliency maps (LayerCAM) lose structural localization and exhibit attribution drift toward background scanner artifacts, leading to a flatter Area Over Perturbation Curve (AOPC).
3.  **Hypothesis 3 (Attention & Normalization Mitigation)**: Attention-guided features (AE-ResNet) and input normalization (CLAHE + Min-Max scaling) partially mitigate this decay, preserving representation alignment and stabilizing explanation faithfulness on unseen target domains.

---

## 2. Experimental Baselines

We evaluate and compare the proposed **AE-ResNet** against four competitive baseline architectures:
1.  **ResNet-50**: Residual CNN baseline (control).
2.  **DenseNet-121**: Dense connectivity baseline.
3.  **EfficientNet-B0**: Scale-optimized baseline.
4.  **Vision Transformer (ViT-B/16)**: Self-attention transformer baseline.

---

## 3. Evaluation Metrics & Mathematics

### 3.1 Classification & Calibration Metrics
*   **Classification Performance**: Accuracy, Precision, Recall, Macro $F_1$-score, and ROC-AUC.
*   **Expected Calibration Error (ECE)**: Measures the alignment between predicted confidence and actual accuracy. We partition predictions into $M$ equally spaced bins $B_m$ (typically $M=10$) and compute:
    $$\text{ECE} = \sum_{m=1}^{M} \frac{|B_m|}{N} \left| \text{acc}(B_m) - \text{conf}(B_m) \right|$$
    Where $\text{acc}(B_m)$ is the accuracy and $\text{conf}(B_m)$ is the average confidence of bin $B_m$.

### 3.2 Explainability Faithfulness Metrics
We evaluate visual explanation (LayerCAM) quality through three quantitative perturbation tests:

#### A. Deletion Test (AOPC)
Progressively masks the highest-attribution pixels in 10% steps, setting them to zero. Measures how fast model confidence drops:
$$\text{AOPC}_{\text{del}} = \frac{1}{k+1} \sum_{i=1}^{k} \left( f(x)_0 - f(x)_i \right)$$
A steep drop (high AOPC) proves the identified pixels were critical to the prediction. We benchmark this against a **Random Masking Baseline** to test statistical significance ($p < 0.01$).

#### B. Insertion Test
Starts with a blank (fully masked) image and progressively inserts the highest-attribution pixels in 10% steps. Measures how fast model confidence rises:
$$\text{AOPC}_{\text{ins}} = \frac{1}{k+1} \sum_{i=1}^{k} \left( f(x)_i - f(x)_0 \right)$$
A steep rise (high AOPC) proves the identified pixels are sufficient to drive the prediction.

#### C. Saliency Entropy (Attention Focus)
Measures the dispersion of visual attention. A high entropy indicates scattered focus (noise), while a low entropy indicates localized focus (pathology biomarkers):
$$H(L^c) = - \sum_{i,j} \tilde{L}^c_{ij} \log( \tilde{L}^c_{ij} )$$
Where $\tilde{L}^c$ is the LayerCAM heatmap normalized to sum to 1.

### 3.3 Representation & Feature-Space Analysis
We analyze domain distance in the latent feature space (output of the final pooling layer before the classifier) comparing training domain ($S$) and external domain ($T$):
*   **Domain Distance ($d_{\mathcal{H}}$)**: Computed using t-SNE or UMAP to project representations $z \in \mathbb{R}^{D}$ into a 2D space.
*   **Maximum Mean Discrepancy (MMD)**: Measures feature distribution alignment:
    $$\text{MMD}^2(S, T) = \left\| \frac{1}{n}\sum_{i=1}^{n} \phi(s_i) - \frac{1}{m}\sum_{j=1}^{m} \phi(t_j) \right\|^2_{\mathcal{H}}$$

---

## 4. Normalization & Generalization Pipeline (Extension)

To resolve domain shift without model retraining:
*   **CLAHE (Contrast-Limited Adaptive Histogram Equalization)**: Standardizes local contrast in $8 \times 8$ tiles with clip limit = 2.0.
*   **Min-Max Scaling**: Standardizes sensor gains.
*   **Auditing Strategy**: Compare $d_{\mathcal{H}}$, ECE, AOPC, and F1-scores between:
    1.  *Un-normalized External cohort (OCTID)*: Raw inputs → Model.
    2.  *Normalized External cohort (OCTID)*: CLAHE + Min-Max inputs → Model.
    We show that normalization aligns feature distributions, lowers ECE, and restores AOPC faithfulness.

---

## 5. Statistical Rigor

*   **Independent Runs**: All models trained over $n=5$ independent runs with random seeds.
*   **Reporting**: Results reported as Mean $\pm$ Standard Deviation (SD) along with 95% Confidence Intervals (CI).
*   **Significance Tests**: Two-sample t-tests and Wilcoxon signed-rank tests to evaluate differences ($p < 0.01$).
*   **Language Bounding**: Avoid absolute claims ("proves," "validated," "ready"). Use tentative, evidence-based claims ("suggests," "indicates," "supports").
