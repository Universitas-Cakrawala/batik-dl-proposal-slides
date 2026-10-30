import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  Step,
  Steps,
  useIsActivePage,
  useSlidePageNumber,
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
} from '@open-slide/core';
import samplesPerClass from './assets/samples_per_class.png';
import groupMacroF1 from './assets/group_macro_f1.png';
import trainingCurves from './assets/training_curves.png';
import confusionMatrix from './assets/confusion_matrix_final.png';
import errorCase06 from './assets/error_case_06.png';
import errorCase02 from './assets/error_case_02.png';
import classDistribution from './assets/class_distribution.png';
import augmentationGrid from './assets/augmentation_grid.png';
import demoFallback from './assets/demo_fallback.png';
import closingVideo from '@assets/video_kucing_joget.mp4';

// Same visual language as the proposal deck (semarang-batik-proposal).
export const design: DesignSystem = {
  palette: { bg: '#FAF7F2', text: '#1C1917', accent: '#1E3A5F' },
  fonts: { display: 'Georgia, "Times New Roman", serif', body: 'Arial, Helvetica, sans-serif' },
  typeScale: { hero: 96, body: 30 },
  radius: 16,
};

const amber = '#B45309';
const green = '#059669';
const red = '#B91C1C';
const muted = '#6B645E';
const border = '#E7E5E4';
const indigo = 'var(--osd-accent)';
const SPACE_URL = 'https://huggingface.co/spaces/atsiduy/vision-classification-batik';

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const HOLD: Keyframe[] = [{ opacity: 1 }, { opacity: 1 }];
export const transition: SlideTransition = {
  duration: 260,
  exit: { duration: 260, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 260,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const panel: CSSProperties = {
  background: '#FFFFFF',
  border: `1px solid ${border}`,
  borderRadius: 'var(--osd-radius)',
  padding: 32,
  boxSizing: 'border-box',
};
const label: CSSProperties = { color: amber, fontSize: 22, letterSpacing: 3, fontWeight: 700, textTransform: 'uppercase' };

// ---------------------------------------------------------------- shared frame

function Footer() {
  const { current, total } = useSlidePageNumber();
  return (
    <footer
      style={{
        position: 'absolute', bottom: 44, left: 120, right: 120, borderTop: `1px solid ${border}`,
        paddingTop: 18, display: 'flex', justifyContent: 'space-between', color: muted, fontSize: 22, letterSpacing: 2,
      }}
    >
      <span>KELOMPOK 5 · DEEP LEARNING · TRACK A · HASIL PROJECT</span>
      <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </footer>
  );
}

function Frame({ section, title, subtitle, children }: { section: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div
      style={{
        width: '100%', height: '100%', boxSizing: 'border-box', position: 'relative', background: 'var(--osd-bg)',
        color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)', lineHeight: 1.2, padding: '96px 120px',
      }}
    >
      <div style={label}>{section}</div>
      <h1 style={{ fontFamily: 'var(--osd-font-display)', fontWeight: 500, fontSize: 62, lineHeight: 1.12, margin: '18px 0 14px', color: indigo }}>
        {title}
      </h1>
      {subtitle && <p style={{ color: muted, fontSize: 28, lineHeight: 1.4, margin: 0 }}>{subtitle}</p>}
      <div style={{ marginTop: 36 }}>{children}</div>
      <Footer />
    </div>
  );
}

function Badge({ children, color = indigo }: { children: ReactNode; color?: string }) {
  return (
    <span
      style={{
        display: 'inline-block', padding: '12px 18px', border: `1px solid ${border}`, background: '#FFFFFF', color,
        borderRadius: 8, fontSize: 24, fontWeight: 700,
      }}
    >
      {children}
    </span>
  );
}

function Figure({ src, alt, width, caption }: { src: string; alt: string; width: number; caption?: string }) {
  return (
    <figure style={{ margin: 0, width }}>
      <img src={src} alt={alt} style={{ width: '100%', display: 'block', borderRadius: 12, border: `1px solid ${border}`, background: '#FFFFFF' }} />
      {caption && <figcaption style={{ color: muted, fontSize: 22, lineHeight: 1.4, marginTop: 12 }}>{caption}</figcaption>}
    </figure>
  );
}

/** Width animates from 0 when the page is the one the audience sees; static elsewhere. */
function useGrow(target: number) {
  const active = useIsActivePage();
  const [value, setValue] = useState(active ? 0 : target);
  useEffect(() => {
    if (!active) { setValue(target); return; }
    setValue(0);
    const id = window.setTimeout(() => setValue(target), 120);
    return () => window.clearTimeout(id);
  }, [active, target]);
  return value;
}

// ---------------------------------------------------------------- 1. cover

function Member({ name, nim }: { name: string; nim: string }) {
  return (
    <div>
      <div style={{ fontSize: 30, fontWeight: 700 }}>{name}</div>
      <div style={{ fontSize: 24, color: muted, marginTop: 6, letterSpacing: 1 }}>NIM {nim}</div>
    </div>
  );
}

const Cover: Page = () => (
  <div
    style={{
      width: '100%', height: '100%', boxSizing: 'border-box', position: 'relative', background: 'var(--osd-bg)',
      color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)', display: 'grid', gridTemplateColumns: '1fr 520px',
    }}
  >
    <div style={{ padding: '110px 80px 110px 120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={label}>UAS Deep Learning · Track A · Kelompok 5</div>
      <h1 style={{ fontFamily: 'var(--osd-font-display)', fontWeight: 500, fontSize: 'var(--osd-size-hero)', lineHeight: 1.06, color: indigo, margin: '28px 0 22px' }}>
        Klasifikasi Motif Batik Semarang
      </h1>
      <p style={{ fontSize: 34, lineHeight: 1.4, color: muted, margin: 0, maxWidth: 1080 }}>
        From-Scratch CNN vs Transfer Learning (EfficientNet-B0): hasil, temuan, dan demo
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 64px', marginTop: 56, maxWidth: 1000 }}>
        <Member name="Tita Noviana (Ketua)" nim="24120500011" />
        <Member name="Suci Fransisca Sisilia R." nim="24120500008" />
        <Member name="Titanio Yudista" nim="24120500031" />
        <Member name="Fajar Dwiharjo" nim="24130500010" />
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 56, flexWrap: 'wrap' }}>
        <Badge>3.020 foto · 10 motif</Badge>
        <Badge>24 run · Tesla T4</Badge>
        <Badge color={green}>Reproducible: make reproduce</Badge>
      </div>
    </div>
    <img
      src={samplesPerClass}
      alt="Contoh foto dari 10 kelas motif batik Semarang"
      style={{ width: 520, height: 1080, objectFit: 'cover', objectPosition: '100% 0%', display: 'block' }}
    />
  </div>
);

// ---------------------------------------------------------------- 2. problem

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ ...panel, minHeight: 330 }}>
      <div style={{ fontSize: 30, fontWeight: 700, color: indigo, marginBottom: 18 }}>{title}</div>
      <div style={{ fontSize: 28, lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

const Problem: Page = () => (
  <Frame section="01 / Masalah" title="Membantu kurator mengenali 10 motif batik Semarang" subtitle="Model memberi saran top-3; kurator yang memeriksa dan memutuskan label akhirnya.">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
      <InfoCard title="Keputusan">
        Mengklasifikasikan foto kain ke salah satu dari 10 motif untuk kurasi dan pengarsipan.
      </InfoCard>
      <InfoCard title="Biaya kesalahan">
        False positive memasukkan label keliru ke arsip; false negative membuat motif terlewat. Keduanya sama mahal, jadi metriknya Macro F1.
      </InfoCard>
      <InfoCard title="Pertanyaan riset">
        Apakah transfer learning (ImageNet) lebih baik daripada CNN from-scratch? Target proposal: Macro F1 ≥ 85% dan +10 pp atas baseline.
      </InfoCard>
    </div>
  </Frame>
);

// ---------------------------------------------------------------- 3. data & leakage

function Stat({ value, text }: { value: string; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, color: indigo, minWidth: 190 }}>{value}</div>
      <div style={{ fontSize: 28, lineHeight: 1.4 }}>{text}</div>
    </div>
  );
}

function SplitBox({ tone, title, children }: { tone: string; title: string; children: ReactNode }) {
  return (
    <div style={{ ...panel, borderLeft: `8px solid ${tone}`, marginBottom: 24 }}>
      <div style={{ fontSize: 28, fontWeight: 700, color: tone, marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 26, lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

const Data: Page = () => (
  <Frame section="02 / Data & leakage" title="Split acak membocorkan 98,9% gambar test" subtitle="Semarang Batik Dataset (Kaggle v2, CC BY-NC-SA 4.0), diaudit sebelum split.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
        <Stat value="2.993" text="gambar dipakai dari 3.020 file (27 exact duplicate dikeluarkan)" />
        <Stat value="±4" text="file per jepretan: setiap foto disimpan sebagai salinan hasil rotasi/flip" />
        <Figure src={classDistribution} alt="Distribusi kelas setelah audit" width={800} caption="295–308 gambar per kelas, hampir seimbang (rasio 1,04)." />
      </div>
      <div>
        <Steps>
        <Step>
          <SplitBox tone={red} title="Split acak (seperti proposal)">
            444 dari 449 gambar test punya salinan rotasi di train.
          </SplitBox>
        </Step>
        <Step>
          <SplitBox tone={green} title="Group split per foto sumber (dipakai)">
            668 grup → train 470, val 101, test 97 grup. Jarak pHash dihedral minimum test ke train 10; cosine maksimum 0,949.
          </SplitBox>
        </Step>
        </Steps>
      </div>
    </div>
  </Frame>
);

// ---------------------------------------------------------------- 4. colour shortcut

function BaselineRow({ feature, input, f1, highlight }: { feature: string; input: string; f1: string; highlight?: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px 160px', padding: '16px 0', borderBottom: `1px solid ${border}`, fontSize: 27, alignItems: 'center' }}>
      <span>{feature}</span>
      <span style={{ color: muted }}>{input}</span>
      <span style={{ textAlign: 'right', fontWeight: 700, color: highlight ?? 'var(--osd-text)' }}>{f1}</span>
    </div>
  );
}

const Shortcut: Page = () => (
  <Frame section="03 / Shortcut warna" title="Satu kelas = satu kain: warna saja sudah cukup" subtitle="Baseline non-deep (logistic regression) pada split yang sama.">
    <div style={{ display: 'grid', gridTemplateColumns: '330px 1fr', gap: 64 }}>
      <img src={samplesPerClass} alt="Contoh foto per kelas" style={{ width: 330, height: 600, objectFit: 'cover', objectPosition: 'top', borderRadius: 12, border: `1px solid ${border}` }} />
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px 160px', paddingBottom: 12, borderBottom: `2px solid ${indigo}`, fontSize: 22, color: muted, letterSpacing: 2 }}>
          <span>FITUR</span><span>INPUT</span><span style={{ textAlign: 'right' }}>TEST MACRO F1</span>
        </div>
        <BaselineRow feature="Histogram warna HSV" input="RGB" f1="100,00%" highlight={red} />
        <BaselineRow feature="Histogram intensitas" input="RGB" f1="99,09%" />
        <BaselineRow feature="LBP (tekstur)" input="RGB" f1="96,72%" />
        <BaselineRow feature="Histogram intensitas" input="grayscale-eq" f1="55,74%" />
        <BaselineRow feature="LBP (tekstur)" input="grayscale-eq" f1="96,26%" highlight={green} />
        <p style={{ fontSize: 28, lineHeight: 1.5, marginTop: 36 }}>
          Karena itu ditambah protokol <b>grayscale + histogram equalization</b> (G1g–G3g): warna dan kecerahan hilang, tekstur motif tetap ada.
        </p>
      </div>
    </div>
  </Frame>
);

// ---------------------------------------------------------------- 5. experiment design

function GroupCard({ code, model, detail, role, tone = indigo }: { code: string; model: string; detail: string; role: string; tone?: string }) {
  return (
    <div style={{ ...panel, padding: 26 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, color: tone }}>{code}</span>
        <span style={{ fontSize: 22, color: muted }}>{role}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, marginTop: 10 }}>{model}</div>
      <div style={{ fontSize: 24, color: muted, marginTop: 6 }}>{detail}</div>
    </div>
  );
}

const Design: Page = () => (
  <Frame section="04 / Desain eksperimen" title="8 konfigurasi × 3 seed = 24 run" subtitle="Hanya satu faktor yang berubah di setiap perbandingan.">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      <GroupCard code="G1" model="Custom CNN 4 blok" detail="0,39 M parameter · from scratch" role="baseline" />
      <GroupCard code="G2" model="EfficientNet-B0" detail="4,02 M parameter · from scratch" role="kontrol arsitektur" />
      <GroupCard code="G3" model="EfficientNet-B0" detail="ImageNet · fine-tune semua layer · aug ON" role="model utama" tone={green} />
      <GroupCard code="G4" model="EfficientNet-B0" detail="ImageNet · fine-tune semua layer · aug OFF" role="ablation" tone={amber} />
      <GroupCard code="G5" model="EfficientNet-B0 two-stage" detail="fine-tune 2 tahap: head → features[5:]" role="suplemen" />
      <GroupCard code="G1g–G3g" model="G1–G3 pada grayscale-eq" detail="tanpa shortcut warna" role="protokol kedua" tone={amber} />
    </div>
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
      <Badge>AdamW · lr 3e-4</Badge>
      <Badge>batch 32 · 30 epoch</Badge>
      <Badge>cosine per step</Badge>
      <Badge>checkpoint: val Macro F1</Badge>
      <Badge>test dievaluasi sekali</Badge>
      <Badge>seed 42 / 43 / 44</Badge>
    </div>
  </Frame>
);

// ---------------------------------------------------------------- 5b. augmentation

function AugItem({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ padding: '16px 0', borderBottom: `1px solid ${border}` }}>
      <div style={{ fontSize: 27, fontWeight: 700 }}>{name}</div>
      <div style={{ fontSize: 24, color: muted, marginTop: 4 }}>{value}</div>
    </div>
  );
}

const Augmentation: Page = () => (
  <Frame section="05 / Augmentation" title="Augmentation saat training (G3) vs tanpa (G4)" subtitle="Kolom pertama = input evaluasi; kolom berikutnya = contoh augmentasi acak pada data train.">
    <div style={{ display: 'grid', gridTemplateColumns: '1060px 1fr', gap: 56, alignItems: 'start' }}>
      <img
        src={augmentationGrid}
        alt="Contoh augmentasi per kelas"
        style={{ width: 1060, height: 560, objectFit: 'cover', objectPosition: 'top', borderRadius: 12, border: `1px solid ${border}`, background: '#FFFFFF' }}
      />
      <div>
        <AugItem name="RandomResizedCrop 224" value="scale 0,8–1,0 · ratio 0,75–1,33" />
        <AugItem name="Horizontal flip" value="p = 0,5" />
        <AugItem name="RandomAffine" value="rotasi ±15° · translate 5% · scale 0,9–1,1 · shear 5°" />
        <AugItem name="ColorJitter" value="brightness, contrast, saturation 0,2 · hue 0,02" />
        <p style={{ fontSize: 25, lineHeight: 1.45, marginTop: 24 }}>G4 memakai konfigurasi yang sama tanpa augmentation (ablation).</p>
      </div>
    </div>
  </Frame>
);

// ---------------------------------------------------------------- 6. RGB results

function BigNumber({ value, caption, tone = indigo }: { value: string; caption: string; tone?: string }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 92, lineHeight: 1, color: tone }}>{value}</div>
      <div style={{ fontSize: 27, lineHeight: 1.45, marginTop: 12 }}>{caption}</div>
    </div>
  );
}

const ResultsRgb: Page = () => (
  <Frame section="06 / Hasil RGB" title="Protokol RGB: semua model 100% (ceiling)" subtitle="Test Macro F1, mean dari seed 42/43/44; titik = tiap seed, garis putus-putus = target 85%.">
    <div style={{ display: 'grid', gridTemplateColumns: '900px 1fr', gap: 56, alignItems: 'start' }}>
      <div>
        <Figure src={groupMacroF1} alt="Test Macro F1 per group" width={900} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 28 }}>
          <BigNumber value="100%" caption="G1–G5 (RGB) di ketiga seed" />
          <BigNumber value="+0,00 pp" caption="G3 vs G1: +10 pp tidak tercapai" tone={red} />
        </div>
      </div>
      <Figure src={confusionMatrix} alt="Confusion matrix test model final" width={560} caption="Model final G3 seed 42: seluruh 450 gambar test benar." />
    </div>
  </Frame>
);

// ---------------------------------------------------------------- 7. grayscale results

function Bar({ name, value, display, tone }: { name: string; value: number; display: string; tone: string }) {
  const width = useGrow(value);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 220px', alignItems: 'center', gap: 20, marginBottom: 26 }}>
      <span style={{ fontSize: 28, fontWeight: 700 }}>{name}</span>
      <div style={{ height: 46, background: '#EFEBE5', borderRadius: 8, position: 'relative' }}>
        <div style={{ width: `${width}%`, height: '100%', background: tone, borderRadius: 8, transition: 'width 900ms cubic-bezier(0, 0, 0.2, 1)' }} />
        <div style={{ position: 'absolute', top: -8, bottom: -8, left: '96.26%', borderLeft: `3px dashed ${amber}` }} />
      </div>
      <span style={{ fontSize: 28, fontWeight: 700, color: tone }}>{display}</span>
    </div>
  );
}

function Delta({ value, title, ci }: { value: string; title: string; ci: string }) {
  return (
    <div style={{ ...panel, padding: 24, marginBottom: 18 }}>
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, lineHeight: 1.1, color: value.startsWith('−') ? red : green }}>{value}</div>
      <div style={{ fontSize: 26, fontWeight: 700, marginTop: 6 }}>{title}</div>
      <div style={{ fontSize: 22, color: muted, marginTop: 6 }}>{ci}</div>
    </div>
  );
}

const ResultsGray: Page = () => (
  <Frame section="07 / Hasil grayscale" title="Tanpa warna, transfer learning unggul" subtitle="Test Macro F1 (mean ± std, 3 seed). Garis putus-putus = baseline LBP non-deep (96,26%).">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 640px', gap: 64 }}>
      <div style={{ paddingTop: 20 }}>
        <Bar name="G3g · ImageNet" value={100} display="100,00 ± 0,00" tone={green} />
        <Bar name="G1g · CNN kecil" value={84.41} display="84,41 ± 1,45" tone={indigo} />
        <Bar name="G2g · EffNet scratch" value={75.66} display="75,66 ± 2,38" tone={amber} />
        <p style={{ fontSize: 26, lineHeight: 1.5, color: muted, marginTop: 30 }}>
          Kedua model from-scratch berada di bawah baseline LBP; G3g di atasnya.
        </p>
      </div>
      <div>
        <Steps>
        <Step><Delta value="+15,59 pp" title="G3g vs G1g (transfer vs scratch)" ci="± 1,45 · 95% bootstrap CI > 0 di ketiga seed" /></Step>
        <Step><Delta value="+24,34 pp" title="G3g vs G2g (efek pretraining)" ci="± 2,38 · arsitektur sama, beda inisialisasi" /></Step>
        <Step><Delta value="−8,75 pp" title="G2g vs G1g (efek arsitektur)" ci="± 2,78 · EfficientNet tanpa pretraining justru kalah" /></Step>
        </Steps>
      </div>
    </div>
  </Frame>
);

// ---------------------------------------------------------------- 8. training dynamics

const Training: Page = () => (
  <Frame section="08 / Dinamika training" title="Bobot ImageNet konvergen sejak epoch 1">
    <Figure src={trainingCurves} alt="Kurva loss dan validation Macro F1 semua run" width={1560} />
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 26 }}>
      <Badge color={green}>G3 & G3g: val F1 ≥ 0,99 di epoch 1</Badge>
      <Badge>G1: epoch 2–4 · G2: epoch 6–7</Badge>
      <Badge color={red}>G2g epoch 30: train ±98% vs val 65–72%</Badge>
    </div>
  </Frame>
);

// ---------------------------------------------------------------- 9. robustness

function RobustRow({ cond, g1, g3, g4, g1g, g3g, head }: { cond: string; g1: string; g3: string; g4: string; g1g: string; g3g: string; head?: boolean }) {
  const cell = (v: string, tone?: string): CSSProperties => ({
    textAlign: 'right', fontWeight: head ? 400 : 700, color: head ? muted : tone ?? 'var(--osd-text)',
  });
  return (
    <div
      style={{
        display: 'grid', gridTemplateColumns: '300px repeat(5, 1fr)', padding: head ? '0 0 12px' : '18px 0', fontSize: head ? 22 : 28,
        letterSpacing: head ? 2 : 0, borderBottom: head ? `2px solid ${indigo}` : `1px solid ${border}`,
      }}
    >
      <span style={{ color: head ? muted : 'var(--osd-text)' }}>{cond}</span>
      <span style={cell(g1)}>{g1}</span>
      <span style={cell(g3, head ? undefined : green)}>{g3}</span>
      <span style={cell(g4, head ? undefined : amber)}>{g4}</span>
      <span style={cell(g1g)}>{g1g}</span>
      <span style={cell(g3g)}>{g3g}</span>
    </div>
  );
}

const Robustness: Page = () => (
  <Frame section="09 / Robustness" title="Augmentation baru terlihat saat gambar diganggu" subtitle="Macro F1 (%) test set dengan corruption saat evaluasi; satu run final per group.">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 520px', gap: 56 }}>
      <div>
        <RobustRow head cond="KONDISI" g1="G1" g3="G3" g4="G4 (aug OFF)" g1g="G1g" g3g="G3g" />
        <RobustRow cond="Clean" g1="100,00" g3="100,00" g4="100,00" g1g="85,49" g3g="100,00" />
        <RobustRow cond="Occlusion s3" g1="100,00" g3="100,00" g4="56,34" g1g="18,71" g3g="94,86" />
        <RobustRow cond="Blur s3" g1="61,07" g3="98,63" g4="72,50" g1g="8,93" g3g="35,15" />
        <RobustRow cond="Contrast s3" g1="99,19" g3="100,00" g4="90,82" g1g="78,99" g3g="100,00" />
        <RobustRow cond="Probe grayscale" g1="7,32" g3="67,42" g4="34,66" g1g="85,49" g3g="100,00" />
      </div>
      <div>
        <Steps>
        <Step>
          <div style={{ ...panel, marginBottom: 24 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: amber }}>G3 vs G4</div>
            <div style={{ fontSize: 26, lineHeight: 1.5, marginTop: 8 }}>Sama-sama 100% di test bersih, tapi pada occlusion s3: 100,00% vs 56,34%.</div>
          </div>
        </Step>
        <Step>
          <div style={panel}>
            <div style={{ fontSize: 28, fontWeight: 700, color: red }}>Ketergantungan warna</div>
            <div style={{ fontSize: 26, lineHeight: 1.5, marginTop: 8 }}>Probe grayscale menurunkan G1 ke 7,32%; G3 masih 67,42%.</div>
          </div>
        </Step>
        </Steps>
      </div>
    </div>
  </Frame>
);

// ---------------------------------------------------------------- 10. error analysis

function Mechanism({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div style={{ display: 'flex', gap: 18, marginBottom: 22 }}>
      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 40, color: amber, minWidth: 34 }}>{n}</span>
      <div>
        <div style={{ fontSize: 27, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 23, color: muted, lineHeight: 1.4, marginTop: 4 }}>{text}</div>
      </div>
    </div>
  );
}

const Errors: Page = () => (
  <Frame section="10 / Error analysis" title="G1g gagal karena motif terpotong, bukan pencahayaan" subtitle="Model G1g seed 42: 64 error dari 450; terbanyak Asem Warak → Kembang Sepatu (23).">
    <div style={{ display: 'grid', gridTemplateColumns: '1000px 1fr', gap: 52, alignItems: 'start' }}>
      <Figure
        src={errorCase06}
        alt="Kasus 6: foto utuh, center crop, Grad-CAM, top-3, nearest neighbour"
        width={1000}
        caption="Kasus 6 (Blekok → Kembang Sepatu): center crop hanya berisi kain polos; dengan full frame prediksi kembali ke Blekok."
      />
      <div>
        <Steps>
        <Step><Mechanism n="1" title="Crop memotong motif" text="6 dari 10 kasus benar dengan full frame / 5-crop" /></Step>
        <Step><Mechanism n="2" title="Tekstur latar mendominasi" text="tanpa warna, isen-isen dan lipatan menyesatkan" /></Step>
        <Step><Mechanism n="3" title="Sensitif orientasi" text="kasus 8 & 9: salinan rotasi 180°, dua tebakan salah berbeda" /></Step>
        <Step><Mechanism n="4" title="Bukan pencahayaan" text="normalisasi brightness memperbaiki 0 dari 10 kasus" /></Step>
        </Steps>
      </div>
    </div>
  </Frame>
);

// ---------------------------------------------------------------- 10b. error case 2

const ErrorsLatar: Page = () => (
  <Frame section="11 / Error analysis" title="Tanpa warna, tekstur latar menyesatkan model" subtitle="Kasus 2: Gambang Semarangan → Asem Arang (confidence 0,83); tidak ada intervensi yang memperbaikinya.">
    <div style={{ display: 'grid', gridTemplateColumns: '1100px 1fr', gap: 52, alignItems: 'start' }}>
      <Figure src={errorCase02} alt="Kasus 2: Grad-CAM pada isen-isen latar" width={1100} />
      <div>
        <Mechanism n="•" title="Grad-CAM di latar" text="dingin di motif utama, menyala pada isen-isen latar kanan-atas dan tepi" />
        <Mechanism n="•" title="Mirip Asem Arang" text="3 gambar train terdekat kelas prediksi: cosine 0,95–0,96" />
        <Mechanism n="•" title="Informasinya ada" text="G3g (ImageNet) mengklasifikasikan seluruh test grayscale dengan benar" />
      </div>
    </div>
  </Frame>
);

// ---------------------------------------------------------------- 11. live demo

function DemoNote({ tone, title, text }: { tone: string; title: string; text: string }) {
  return (
    <div style={{ borderLeft: `6px solid ${tone}`, paddingLeft: 20, marginBottom: 26 }}>
      <div style={{ fontSize: 27, fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 23, color: muted, lineHeight: 1.4, marginTop: 4 }}>{text}</div>
    </div>
  );
}

const Demo: Page = () => (
  <Frame section="12 / Demo" title="Demo: Hugging Face Space">
    <div style={{ display: 'grid', gridTemplateColumns: '1140px 1fr', gap: 48, alignItems: 'start' }}>
      <div style={{ width: 1140, height: 640, borderRadius: 16, border: `2px solid ${indigo}`, overflow: 'hidden', background: '#FFFFFF', position: 'relative', translate: '0px 13.2px' }}>
        <img src={demoFallback} alt="Tangkapan demo: foto test Tugu Muda diprediksi Tugu Muda 100%" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
        <div style={{ position: 'absolute', left: 16, bottom: 16, background: 'rgba(28,25,23,0.78)', color: '#FFFFFF', fontSize: 20, padding: '8px 14px', borderRadius: 8 }}>
          Tangkapan demo: foto test Tugu Muda → Tugu Muda 100%
        </div>
      </div>
      <div>
        <div style={{ ...label, marginBottom: 14 }}>Model</div>
        <div style={{ fontSize: 27, lineHeight: 1.45, marginBottom: 32 }}>EfficientNet-B0 ImageNet (G3 seed 42), Release v1.0</div>
        <DemoNote tone={green} title="Foto asli test set" text="10 dari 10 benar, confidence ≈ 1,00" />
        <DemoNote tone={amber} title="Foto yang sama, grayscale" text="7 dari 10 benar" />
        <DemoNote tone={red} title="Gambar non-batik" text="tetap diberi label (grafik → Asem Sinom 0,81): closed-set" />
        <a href={SPACE_URL} target="_blank" rel="noreferrer" style={{ display: 'block', fontSize: 22, color: indigo, textDecoration: 'underline', lineHeight: 1.4, marginTop: 30 }}>
          {SPACE_URL.replace('https://', '')}
        </a>
      </div>
    </div>
  </Frame>
);

// ---------------------------------------------------------------- 12. reproducibility & limits

function Point({ children }: { children: ReactNode }) {
  return <li style={{ fontSize: 27, lineHeight: 1.45, marginBottom: 18 }}>{children}</li>;
}

const Repro: Page = () => (
  <Frame section="13 / Reproducibility & keterbatasan" title="Hasil bisa diulang; cakupannya terbatas">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
      <div style={panel}>
        <div style={{ ...label, color: green, marginBottom: 18 }}>Reproducible</div>
        <div style={{ fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontSize: 22, background: '#F3F0EA', borderRadius: 10, padding: '16px 18px', lineHeight: 1.5, marginBottom: 22 }}>
          make setup && make data &&<br />make checkpoints && make reproduce<br />
          <span style={{ color: green }}>→ HEADLINE … = 100.00 ± 0.00 %</span>
        </div>
        <ul style={{ margin: 0, paddingLeft: 30, listStyle: 'disc' }}>
          <Point>Checkpoint di GitHub Release v1.0, diverifikasi SHA-256</Point>
          <Point>Training 5,76 jam di Colab T4 (torch 2.11); re-aggregate di torch 2.5.1 identik byte per byte</Point>
        </ul>
      </div>
      <div style={panel}>
        <div style={{ ...label, color: red, marginBottom: 18 }}>Keterbatasan</div>
        <ul style={{ margin: 0, paddingLeft: 30, listStyle: 'disc' }}>
          <Point>Satu kain per kelas: belum diuji pada kain lain dengan motif sama</Point>
          <Point>Robustness hanya satu run per group (tanpa CI)</Point>
          <Point>Closed-set: gambar non-batik tetap diberi label</Point>
          <Point>Windows native belum didukung (import resource)</Point>
          <Point>ResNet-50 (rencana proposal) tidak dijalankan; diganti EfficientNet-B0 scratch (G2) sebagai kontrol arsitektur</Point>
        </ul>
        <div style={{ ...label, color: indigo, marginTop: 26, marginBottom: 12 }}>Rekomendasi (10× data/compute)</div>
        <ul style={{ margin: 0, paddingLeft: 30, listStyle: 'disc' }}>
          <Point>Beberapa kain per motif, lalu evaluasi leave-one-cloth-out</Point>
        </ul>
      </div>
    </div>
  </Frame>
);

// ---------------------------------------------------------------- 13. conclusions

function Takeaway({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 24, marginBottom: 40 }}>
      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 72, lineHeight: 1, color: amber }}>{n}</span>
      <div>
        <div style={{ fontSize: 34, fontWeight: 700, color: indigo }}>{title}</div>
        <div style={{ fontSize: 28, lineHeight: 1.45, color: muted, marginTop: 8 }}>{text}</div>
      </div>
    </div>
  );
}

const Conclusion: Page = () => (
  <Frame section="14 / Kesimpulan" title="Tiga hal yang kami pelajari">
    <div>
      <Steps>
      <Step><Takeaway n="1" title="Audit data mengubah desain eksperimen" text="Split acak membocorkan 98,9% test; group split per foto sumber menutupnya." /></Step>
      <Step><Takeaway n="2" title="RGB mencapai ceiling" text="Semua model 100%, sama dengan histogram warna; target +10 pp tidak tercapai dan kami laporkan apa adanya." /></Step>
      <Step><Takeaway n="3" title="Tanpa warna, bobot ImageNet yang menentukan" text="G3g vs G1g +15,59 pp; keuntungannya dari pretraining (+24,34 pp), bukan arsitektur (−8,75 pp)." /></Step>
      </Steps>
    </div>
  </Frame>
);

// ---------------------------------------------------------------- 14. closing video

const Closing: Page = () => {
  const active = useIsActivePage();
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) {
      v.currentTime = 0;
      v.play().catch(() => { /* autoplay blocked: the controls stay available */ });
    } else {
      v.pause();
    }
  }, [active]);
  return (
    <div
      style={{
        width: '100%', height: '100%', boxSizing: 'border-box', background: 'var(--osd-bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <video
        ref={ref}
        src={closingVideo}
        controls
        loop
        playsInline
        style={{ width: 1728, height: 972, borderRadius: 16, background: '#000000' }}
      />
    </div>
  );
};

export const meta: SlideMeta = {
  title: 'Hasil Project: Klasifikasi Motif Batik Semarang',
  createdAt: '2026-10-29T14:27:17.836Z',
};

export default [
  Cover,
  Problem,
  Data,
  Shortcut,
  Design,
  Augmentation,
  ResultsRgb,
  ResultsGray,
  Training,
  Robustness,
  Errors,
  ErrorsLatar,
  Demo,
  Repro,
  Conclusion,
  Closing,
] satisfies Page[];
