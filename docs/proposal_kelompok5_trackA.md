# Deep Learning — UAS Session 16: Group Project Proposal
**Group Project Proposal Template — Track A: Vision Classification with Transfer Learning**

---

### 1. Identification

| Field | Content |
| :--- | :--- |
| **Group number** | Kelompok 5 |
| **Members** | Tita Noviana, Titanio Yudista, Suci Fransisca Sisilia R., Fajar Dwiharjo |
| **Track** | A (Vision classification with transfer learning) |
| **Proposed title** | Evaluasi *From-Scratch CNN* dan *Fine-Tuned EfficientNet-B0* untuk *Fine-Grained Classification* Motif Batik Semarang pada Kondisi Deformasi Kain |

---

### 2. Problem Statement
*Maximum 120 words.*

* **Supported decision/prediction:** Mengklasifikasikan 10 motif batik Semarang untuk kurasi museum, pengarsipan warisan budaya, dan verifikasi katalog *e-commerce*.
* **End users and failure cost:** Kurator, peneliti tekstil, dan pengelola *platform* kriya. Prediksi keliru dapat mencemari arsip, salah memberi label produk, dan menurunkan kepercayaan pengguna.
* **Appropriateness of deep learning:** Citra menghadapi deformasi *non-rigid*, lipatan, perubahan skala dan pencahayaan, serta kemiripan *inter-class* pada *isen-isen*; pola ini sulit ditangkap fitur manual seperti SIFT/HOG.

---

### 3. Data

| Field | Content |
| :--- | :--- |
| **Dataset name** | Semarang Batik Dataset |
| **Source URL** | [https://www.kaggle.com/datasets/edywinarno/semarang-batik-dataset](https://www.kaggle.com/datasets/edywinarno/semarang-batik-dataset) (Winarno et al., ACM ICACS 2017) |
| **Licence or terms of use** | Lisensi penggunaan publik dan akademik sesuai ketentuan Kaggle (*Academic Research Use*) |
| **Size and number of classes** | $\sim 3.000$ citra RGB ($224 \times 224$) terbagi secara berimbang ke dalam 10 kelas motif Semarang |
| **Class balance** | Relatif seimbang ($\sim 300$ citra/kelas); diverifikasi melalui *exploratory data analysis* (EDA) sebelum pemisahan |
| **Known missing or corrupted data** | Pengecekan otomatis via skrip Python (`PIL`/`OpenCV`) untuk memfilter *corrupted headers* dan kanal warna |
| **Split procedure (train / val / test)** | *Stratified split* 70% *train* / 15% *validation* / 15% *test* menggunakan *fixed random seed* (`seed=42`) |
| **Leakage risks and how to check** | Risiko duplikasi (*near-duplicates*) akibat variasi sudut foto dieliminasi via *Perceptual Hashing* (`pHash`) pra-*split*; *data augmentation* hanya diterapkan *on-the-fly* pada *training set*. |

---

### 4. Baseline and Metric

| Field | Content |
| :--- | :--- |
| **Baseline method** | Arsitektur *Custom 4-Block CNN* (`Conv2D + BatchNorm + ReLU + MaxPool + AdaptAvgPool + Linear`) *from-scratch* |
| **Why this baseline is a fair comparison** | Partisi data, resolusi ($224 \times 224$), *optimizer* (`AdamW`), dan anggaran *epoch* identik untuk mengisolasi murni keunggulan representasi bobot *pretrained*. |
| **Primary metric** | *Macro F1-Score* (mengevaluasi performa secara adil dan terhindar dari potensi bias ketimpangan antar 10 kelas) |
| **Secondary metric** | *Top-1 Accuracy*, *Top-3 Accuracy*, serta durasi dan biaya komputasi (*training time/cost per run*) |
| **Success threshold** | Model *transfer learning* mencapai $\ge 85\%$ *Macro F1-Score* dan mengungguli *baseline from-scratch* minimal $+10\%$ *Macro F1* |
| **Cost of false positive vs false negative** | *False Positive* mengkontaminasi katalog/arsip dengan pola motif keliru; *False Negative* membuat motif asli gagal teridentifikasi sehingga memerlukan verifikasi manual ulang. |

---

### 5. Planned Comparison and Ablation

1. **Model families to compare:** *Custom 4-Block CNN (From-Scratch)* vs *Pretrained EfficientNet-B0 / ResNet-50 (Transfer Learning)*. Perbandingan ini mengevaluasi kapabilitas transfer representasi hierarkis ImageNet dalam mengenali tekstur *fine-grained* batik dibandingkan model tanpa induksi bobot apriori.
2. **Ablation:** Mengisolasi pengaruh *Geometric & Photometric Data Augmentation (On vs Off)*—mencakup *random rotation*, *affine transform* (simulasi lipatan kain), dan *color jitter*—sementara arsitektur, *learning rate*, *batch size*, dan *seed* ditahan konstan.
3. **Self-trained model implementation:** Mengembangkan *custom PyTorch training loop* untuk melatih CNN *from-scratch* dan melakukan *two-stage fine-tuning* pada EfficientNet-B0 (Tahap 1: *linear probing* kepala klasifikasi; Tahap 2: *fine-tuning top blocks* dengan `CosineAnnealingLR` dan `AdamW`).

---

### 6. Compute Plan

| Field | Content |
| :--- | :--- |
| **Hardware (CPU or free Colab T4)** | Google Colab Free Tier GPU Tesla T4 (16GB VRAM) |
| **Estimated training time per run** | $\sim 8$--$12$ menit per *run* (30 *epochs*, batch size 32, resolusi $224 \times 224$ pada $\sim 3.000$ citra) |
| **Number of runs required** | 12 *runs* (3 konfigurasi utama [*Scratch*, *TL Aug-ON*, *TL Aug-OFF*] $\times$ 3 *random seeds* + 3 *sanity check runs*) |
| **Storage for artefacts** | $\sim 600$ MB (bobot model terbaik `.pt`, kurva metrik TensorBoard/CSV, dan visualisasi *confusion matrix*) |

*RPS Policy Compliance:* Rencana ini sepenuhnya mematuhi batas komputasi RPS (Google Colab free tier). Jika kuota GPU terbatas, eksperimen *ablation* akan dipangkas dari 3 *seeds* menjadi 1 *fixed seed* (`seed=42`) tanpa mengurangi perbandingan model utama.

---

### 7. AI Use Plan

* **Assistant tools:** Google Gemini dan GitHub Copilot.
* **Permitted vs off-limits tasks:** Diizinkan untuk penulisan kode *boilerplate* (seperti `DataLoader`, fungsi plotting metrik) dan asistensi sintaks LaTeX. Dilarang keras (*strictly off-limits*) untuk mengarang nilai metrik evaluasi fiktif atau menyusun analisis kausal *error analysis* tanpa inspeksi visual langsung terhadap citra kegagalan *test set*.
* **Verification protocol:** Seluruh skrip dieksekusi secara deterministik melalui *single command* ber-*fixed seed*, dan setiap metrik divalidasi silang langsung terhadap file *raw evaluation log* yang dihasilkan mesin.
