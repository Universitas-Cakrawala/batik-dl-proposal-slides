import { useEffect, useId, useState, type CSSProperties, type ReactNode } from 'react';
import { useIsActivePage, useSlidePageNumber, type DesignSystem, type Page, type SlideMeta } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#FAF7F2', text: '#1C1917', accent: '#1E3A5F' },
  fonts: { display: 'Georgia, "Times New Roman", serif', body: 'Arial, Helvetica, sans-serif' },
  typeScale: { hero: 104, body: 32 },
  radius: 16,
};

const amber = '#B45309';
const green = '#059669';
const muted = '#6B645E';
const border = '#E7E5E4';
const indigo = 'var(--osd-accent)';
const row: CSSProperties = { display: 'flex', alignItems: 'center', gap: 24 };
const columns: CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 };
const panel: CSSProperties = { background: '#FFFFFF', border: `1px solid ${border}`, borderRadius: 'var(--osd-radius)', padding: 36 };

function Footer() {
  const { current, total } = useSlidePageNumber();
  return <footer style={{ position: 'absolute', bottom: 48, left: 120, right: 120, borderTop: `1px solid ${border}`, paddingTop: 20, display: 'flex', justifyContent: 'space-between', color: muted, fontSize: 22, letterSpacing: 2 }}>
    <span>KELOMPOK 5 · DEEP LEARNING · TRACK A</span>
    <span>{String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
  </footer>;
}

function Frame({ section, title, subtitle, children }: { section: string; title: string; subtitle?: string; children: ReactNode }) {
  return <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', position: 'relative', background: 'var(--osd-bg)', color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)', lineHeight: 1.2, padding: '100px 120px' }}>
    <div style={{ color: amber, fontSize: 23, letterSpacing: 3, fontWeight: 700, textTransform: 'uppercase' }}>{section}</div>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontWeight: 500, fontSize: 64, lineHeight: 1.12, margin: '20px 0 18px', color: indigo }}>{title}</h1>
    {subtitle && <p style={{ color: muted, fontSize: 28, lineHeight: 1.4, margin: 0 }}>{subtitle}</p>}
    <div style={{ marginTop: 32 }}>{children}</div>
    <Footer />
  </div>;
}

function Badge({ children, color = indigo }: { children: ReactNode; color?: string }) {
  return <span style={{ display: 'inline-block', padding: '12px 18px', border: `1px solid ${border}`, background: '#FFFFFF', color, borderRadius: 6, fontSize: 23, fontWeight: 600 }}>{children}</span>;
}

/** Ornamental tamarind-leaf study, not a photograph or an authenticated motif. */
function BatikFabric({ folded = false, macro = false }: { folded?: boolean; macro?: boolean }) {
  const id = useId().replace(/:/g, '');
  return <svg viewBox="0 0 560 620" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ilustrasi prosedural kain batik dengan ornamen daun asam">
    <defs>
      <pattern id={`${id}-weave`} width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0 1H7M1 0V7" stroke="#FAF7F2" strokeWidth="0.5" opacity="0.16" /></pattern>
      <pattern id={`${id}-batik`} width={macro ? 300 : 150} height={macro ? 360 : 180} patternUnits="userSpaceOnUse" patternTransform="rotate(-16)">
        <g transform={macro ? 'scale(2)' : undefined} fill="none" stroke="#DBB884" strokeWidth="1.7">
          <path d="M75 166C30 130 115 85 75 14M75 165C118 120 28 85 75 14" />
          <path d="M73 39C40 8 20 30 64 59C36 30 15 58 64 79C28 58 15 88 64 99C29 87 26 115 68 119M78 37C109 9 131 33 84 59C116 36 136 64 85 81C124 64 132 95 85 101C120 91 124 119 82 122" fill="#DBB884" fillOpacity="0.55" />
          <path d="M0 0L75 90L150 0M0 180L75 90L150 180" opacity="0.28" />
          <circle cx="15" cy="90" r="5" /><circle cx="135" cy="90" r="5" /><circle cx="75" cy="174" r="3" />
          <path d="M15 75V65M15 105V115M0 90H-5M30 90H40M125 15L130 20M130 10L125 25" opacity="0.6" />
        </g>
      </pattern>
      <linearGradient id={`${id}-fold`}><stop stopColor="#000000" stopOpacity="0.05" /><stop offset="0.26" stopColor="#FFFFFF" stopOpacity="0.18" /><stop offset="0.43" stopColor="#000000" stopOpacity={folded ? 0.65 : 0.12} /><stop offset="0.53" stopColor="#FFFFFF" stopOpacity={folded ? 0.3 : 0.08} /><stop offset="0.76" stopColor="#000000" stopOpacity={folded ? 0.5 : 0.1} /><stop offset="1" stopColor="#FFFFFF" stopOpacity="0.1" /></linearGradient>
    </defs>
    <rect width="560" height="620" fill="#1E3A5F" />
    <rect width="560" height="620" fill={`url(#${id}-batik)`} />
    <rect width="560" height="620" fill={`url(#${id}-weave)`} />
    <rect width="560" height="620" fill={`url(#${id}-fold)`} />
  </svg>;
}

const Cover: Page = () => <div style={{ width: '100%', height: '100%', position: 'relative', boxSizing: 'border-box', padding: '100px 120px', background: 'var(--osd-bg)', color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' }}>
  <div style={{ width: 1070 }}>
    <div style={{ fontSize: 24, letterSpacing: 4, color: amber, fontWeight: 700 }}>RESEARCH PROPOSAL / UAS DEEP LEARNING</div>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 'var(--osd-size-hero)', fontWeight: 500, color: indigo, lineHeight: 1.04, margin: '32px 0 26px' }}>Fine-Grained<br />Semarang Batik<br />Motif Classification</h1>
    <div style={{ width: 90, height: 5, background: amber, margin: '32px 0' }} />
    <p style={{ fontSize: 32, lineHeight: 1.4, margin: 0 }}>Evaluasi From-Scratch CNN dan Fine-Tuned EfficientNet-B0<br />pada Kondisi Deformasi Kain</p>
    <p style={{ fontSize: 28, color: muted, marginTop: 24 }}>Final Assessment (UAS) Deep Learning — Track A | Kelompok 5</p>
    <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', maxWidth: 1000 }}>
      <Badge>Track A: Vision Classification</Badge>
      <Badge>Dataset: ~3.000 Citra · 10 Kelas</Badge>
      <Badge color={amber}>Reproducible PyTorch Pipeline</Badge>
    </div>
    <p style={{ fontSize: 23, lineHeight: 1.6, color: muted, margin: '20px 0 0' }}>Tita Noviana · Titanio Yudista<br />Suci Fransisca Sisilia R. · Fajar Dwiharjo</p>
  </div>
  <div style={{ position: 'absolute', right: 120, top: 110, width: 500, height: 740 }}><BatikFabric folded /><div style={{ padding: '18px 0', fontSize: 22, color: muted }}>STUDI ORNAMEN · ILUSTRASI PROSEDURAL</div></div>
  <Footer />
</div>;

function ProblemCard({ number, title, children, note }: { number: string; title: string; children: ReactNode; note: string }) {
  return <article style={{ ...panel, height: 550, boxSizing: 'border-box', display: 'grid', gridTemplateRows: '72px 86px 1fr 48px', borderTop: `4px solid ${indigo}` }}>
    <div style={{ fontFamily: 'var(--osd-font-display)', color: amber, fontSize: 60 }}>{number}</div>
    <h2 style={{ fontSize: 34, lineHeight: 1.2, color: indigo, margin: 0, alignSelf: 'center' }}>{title}</h2>
    <div style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.5 }}>{children}</div>
    <div style={{ borderTop: `1px solid ${border}`, paddingTop: 18, fontSize: 24, lineHeight: 1.2, color: muted }}>{note}</div>
  </article>;
}

const Problem: Page = () => <Frame section="01 / Problem & relevance" title="Motif serupa. Konsekuensi berbeda." subtitle="Fine-Grained Classification untuk menjaga ketepatan identitas budaya.">
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
    <ProblemCard number="01" title="Keputusan yang didukung" note="OUTPUT / 10 KELAS MOTIF">Identifikasi dan screening 10 motif Semarang Batik untuk kurasi arsip museum tekstil serta verifikasi katalog kriya.</ProblemCard>
    <ProblemCard number="02" title="Pengguna & dampak error" note="RISIKO / MISLABELING">Kurator, peneliti tekstil, dan platform kriya. Prediksi keliru mencemari arsip, memicu mislabeling, dan menurunkan kepercayaan.</ProblemCard>
    <ProblemCard number="03" title="Mengapa Deep Learning?" note="TANTANGAN / FINE-GRAINED">Deformasi non-rigid, fabric folds, skala, pencahayaan, dan isen-isen menantang SIFT/HOG. CNN mempelajari fitur hierarkis.</ProblemCard>
  </div>
  <p style={{ fontSize: 30, color: indigo, marginTop: 36 }}>Pertanyaan riset: apakah pretrained features lebih tangguh terhadap variasi kain?</p>
</Frame>;

function ConfidenceBar({ label, value, progress, color = indigo }: { label: string; value: number; progress: number; color?: string }) {
  const shown = value * progress;
  return <div style={{ marginTop: 12 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 23, marginBottom: 7 }}><span>{label}</span><strong style={{ color, fontVariantNumeric: 'tabular-nums' }}>{shown.toFixed(1)}%</strong></div>
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Number(shown.toFixed(1))} style={{ height: 8, background: '#EDEAE5', borderRadius: 6 }}><div style={{ width: `${shown}%`, height: '100%', background: color, borderRadius: 6 }} /></div>
  </div>;
}

export function BatikScreeningSimulator() {
  const active = useIsActivePage();
  const [replay, setReplay] = useState(0);
  const [sample, setSample] = useState<0 | 1 | 2>(1);
  const [elapsed, setElapsed] = useState(0);
  const gridId = useId().replace(/:/g, '');
  useEffect(() => {
    if (!active) return;
    setElapsed(0);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setElapsed(6500); return; }
    let request = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const time = Math.min(now - start, 6500);
      setElapsed(time);
      if (time < 6500) request = requestAnimationFrame(tick);
    };
    request = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(request);
  }, [active, replay, sample]);
  const progress = Math.min(1, Math.max(0, (elapsed - 2900) / 3200));
  const eased = 1 - (1 - progress) ** 3;
  const complete = elapsed >= 6100;
  const status = elapsed < 1600 ? 'Scanning Fabric Texture...' : complete ? 'Classification Complete' : 'Extracting Hierarchical Features...';
  const changeSample = (next: 0 | 1 | 2) => { setElapsed(0); setSample(next); setReplay(value => value + 1); };
  const button = (selected: boolean): CSSProperties => ({ border: `1px solid ${selected ? '#1E3A5F' : border}`, background: selected ? '#1E3A5F' : '#FFFFFF', color: selected ? '#FFFFFF' : '#1C1917', borderRadius: 6, padding: '13px 18px', fontSize: 23, cursor: 'pointer', fontFamily: 'inherit' });
  return <div>
    <div style={{ ...row, gap: 12, marginBottom: 24 }}>
      <button aria-pressed={sample === 0} style={button(sample === 0)} onClick={() => changeSample(0)}>Sample 1: Normal Lighting</button>
      <button aria-pressed={sample === 1} style={button(sample === 1)} onClick={() => changeSample(1)}>Sample 2: Folded Fabric</button>
      <button aria-pressed={sample === 2} style={button(sample === 2)} onClick={() => changeSample(2)}>Sample 3: Macro Scale</button>
      <button style={{ ...button(false), marginLeft: 'auto', color: amber }} onClick={() => { setElapsed(0); setReplay(value => value + 1); }}>↻ Re-run Scan</button>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '560px 64px 1fr', gap: 24 }}>
      <div>
        <div style={{ width: 560, height: 440, position: 'relative' }}>
          <BatikFabric folded={sample === 1} macro={sample === 2} />
          <svg viewBox="0 0 560 440" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
            <defs><pattern id={gridId} width="80" height="62.857" patternUnits="userSpaceOnUse"><rect width="80" height="62.857" fill="none" stroke="#FCD69A" strokeWidth="1" /><rect x="2" y="2" width="76" height="58.857" fill="#FCD69A" opacity="0.12" /></pattern></defs>
            <rect width="560" height={complete ? 440 : Math.min(440, elapsed / 2900 * 440)} fill={`url(#${gridId})`} />
            {!complete && <g style={{ filter: 'drop-shadow(0 0 9px #FCD69A)' }}><line x1="0" x2="560" y1={25 + (0.5 - Math.cos(elapsed / 580) / 2) * 390} y2={25 + (0.5 - Math.cos(elapsed / 580) / 2) * 390} stroke="#FCD69A" strokeWidth="4" /></g>}
          </svg>
          <span style={{ position: 'absolute', bottom: 16, left: 16, color: '#FFFFFF', background: '#1E3A5FE8', padding: '8px 12px', fontSize: 21 }}>SVG ilustratif · 7 × 7 Feature Map</span>
        </div>
        <div aria-live="polite" style={{ color: complete ? green : amber, fontSize: 24, marginTop: 16, fontWeight: 700 }}>{status}</div>
      </div>
      <div style={{ alignSelf: 'center', fontSize: 48, color: amber }}>→</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ ...panel, padding: '18px 24px', borderTop: `4px solid ${green}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: green, fontWeight: 700 }}><span>PROPOSED / TRANSFER LEARNING</span><span>{complete ? 'Verified Match*' : 'Processing...'}</span></div>
          <div style={{ fontSize: 22, color: muted, marginTop: 8 }}>Fine-Tuned EfficientNet-B0</div>
          <ConfidenceBar label="Motif Asem Arang (Semarang Batik)" value={94.8} progress={eased} color={green} />
          <ConfidenceBar label="Motif Tugu Muda" value={3.4} progress={eased} />
          <ConfidenceBar label="Motif Blekok Srondol*" value={1.8} progress={eased} />
        </div>
        <div style={{ ...panel, padding: '18px 24px', borderTop: `4px solid ${amber}` }}>
          <div style={{ fontSize: 22, color: amber, fontWeight: 700 }}>BASELINE / CUSTOM 4-BLOCK CNN</div>
          <ConfidenceBar label="Motif Tugu Muda · Misclassified*" value={51.2} progress={eased} color={amber} />
          <ConfidenceBar label="Motif Asem Arang" value={34.5} progress={eased} />
          <div style={{ fontSize: 22, color: muted, marginTop: 14 }}>Low Confidence* · Kelas lain: {(14.3 * eased).toFixed(1)}%</div>
        </div>
      </div>
    </div>
    <p style={{ color: muted, fontSize: 20, lineHeight: 1.4, margin: '18px 0 0' }}>*Simulasi UI, bukan inference atau hasil eksperimen. Nilai tetap untuk semua sample; Softmax ≠ akurasi.<br />“Verified Match” hanya label demo; nama Blekok Srondol perlu dicocokkan dengan class manifest.</p>
  </div>;
}

const Simulator: Page = () => <Frame section="02 / Live visual concept" title="Dari tekstur kain ke prediksi motif." subtitle="Input Citra → CNN Feature Scanning → Softmax Confidence Score"><BatikScreeningSimulator /></Frame>;

function SpecRow({ label, children }: { label: string; children: ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr', gap: 20, padding: '14px 0', borderBottom: `1px solid ${border}`, fontSize: 29, lineHeight: 1.4 }}><div style={{ color: muted }}>{label}</div><div>{children}</div></div>;
}
function FlowStep({ tag, title, children }: { tag: string; title: string; children: ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '58px 1fr', gap: 20, alignItems: 'start', marginBottom: 24 }}><div style={{ width: 52, height: 52, borderRadius: 26, background: '#F3E7D7', color: amber, fontSize: 24, display: 'grid', placeItems: 'center' }}>{tag}</div><div><div style={{ fontSize: 30, fontWeight: 700, color: indigo }}>{title}</div><div style={{ fontSize: 27, color: muted, lineHeight: 1.45, marginTop: 7 }}>{children}</div></div></div>;
}

const Dataset: Page = () => <Frame section="03 / Data protocol" title="Pisahkan data. Putus jalur Data Leakage." subtitle="Statistik awal mengikuti proposal; jumlah akhir dikunci setelah EDA dan deduplication.">
  <div style={columns}>
    <div style={{ ...panel, padding: '18px 32px' }}>
      <SpecRow label="Dataset">Semarang Batik Dataset</SpecRow>
      <SpecRow label="Profil awal">~3.000 citra RGB · 10 kelas</SpecRow>
      <SpecRow label="Resolusi">224 × 224 px</SpecRow>
      <SpecRow label="Class balance">~300 citra/kelas · verifikasi via EDA</SpecRow>
      <SpecRow label="Stratified Split">70% Train / 15% Val / 15% Test</SpecRow>
      <SpecRow label="Split seed"><code>42</code> · manifest disimpan tetap</SpecRow>
      <div style={{ fontSize: 23, lineHeight: 1.5, color: muted, marginTop: 20 }}>Sumber: <a href="https://www.kaggle.com/datasets/edywinarno/semarang-batik-dataset" target="_blank" rel="noreferrer" style={{ color: indigo }}>Kaggle / Edy Winarno</a><br />Academic Research Use (menurut proposal);<br />verifikasi terms Kaggle sebelum penggunaan.</div>
    </div>
    <div style={{ ...panel, background: '#F1F3F5' }}>
      <FlowStep tag="1" title="Validate → pHash">PIL/OpenCV: filter corrupted headers dan invalid color channels; periksa exact/near-duplicates sebelum split.</FlowStep>
      <FlowStep tag="2" title="Stratified Split · seed=42">Train / Val / Test = 70 / 15 / 15. Rencana penguatan: kelompok terkait tetap satu partisi.</FlowStep>
      <FlowStep tag="3" title="Train-only Augmentation">Augmentation on-the-fly hanya pada Train. Val/Test deterministik.</FlowStep>
      <div style={{ fontSize: 25, color: indigo, borderTop: `1px solid ${border}`, paddingTop: 18 }}>pHash adalah screening; inspeksi visual tetap diperlukan.</div>
    </div>
  </div>
  <p style={{ fontSize: 22, color: muted, lineHeight: 1.45, marginTop: 24 }}>Rujukan yang tercantum dalam proposal: Winarno et al., ACM ICACS 2017.<br />Status bibliografi: belum terverifikasi; sumber dataset tetap Kaggle di atas.</p>
</Frame>;

function Risk({ label, title, children, color }: { label: string; title: string; children: ReactNode; color: string }) {
  return <div style={{ ...panel, borderLeft: `5px solid ${color}`, padding: '20px 30px' }}><div style={{ color, fontSize: 23, fontWeight: 700 }}>{label}</div><div style={{ fontSize: 32, fontWeight: 700, margin: '10px 0' }}>{title}</div><div style={{ fontSize: 28, lineHeight: 1.4, color: muted }}>{children}</div></div>;
}
const Evaluation: Page = () => <Frame section="04 / Baseline & evaluation" title="Target keberhasilan harus dapat diuji." subtitle="Macro F1-Score menjadi acuan utama; angka di bawah adalah target, bukan hasil.">
  <div style={{ ...panel, padding: '8px 32px' }}>
    <SpecRow label="Baseline">Custom 4-Block CNN · Trained From-Scratch</SpecRow>
    <SpecRow label="Fair comparison">Split, input, AdamW, batch size, dan epoch budget setara</SpecRow>
    <SpecRow label="Primary metric">Macro F1-Score · evaluasi 10 kelas secara seimbang</SpecRow>
    <SpecRow label="Secondary">Top-1 & Top-3 Accuracy · Training Time / Cost</SpecRow>
  </div>
  <div style={{ ...row, background: '#1E3A5F', color: '#FFFFFF', padding: '22px 32px', marginTop: 22, borderRadius: 12, justifyContent: 'space-between' }}><span style={{ fontSize: 26 }}>TARGET / TEST SET</span><strong style={{ fontSize: 42 }}>Macro F1 ≥ 85%</strong><span style={{ fontSize: 30 }}>dan unggul ≥ +10% Macro F1 vs baseline</span></div>
  <div style={{ ...columns, marginTop: 22 }}>
    <Risk label="FALSE POSITIVE / ONE-VS-REST" title="Archive contamination" color={amber}>Motif lain diterima sebagai kelas target; identitas budaya salah tercatat.</Risk>
    <Risk label="FALSE NEGATIVE / ONE-VS-REST" title="Kurasi manual ulang" color="#1E3A5F">Motif target gagal dikenali; beban verifikasi kurator meningkat.</Risk>
  </div>
</Frame>;

function ArchitectureBox({ tag, title, children, proposed = false }: { tag: string; title: string; children: ReactNode; proposed?: boolean }) {
  return <div style={{ ...panel, padding: 28, height: 380, boxSizing: 'border-box', borderTop: `4px solid ${proposed ? green : amber}` }}><div style={{ fontSize: 23, color: proposed ? green : amber, fontWeight: 700 }}>{tag}</div><h2 style={{ fontSize: 36, margin: '16px 0 20px', color: indigo }}>{title}</h2><div style={{ fontSize: 30, lineHeight: 1.5 }}>{children}</div></div>;
}
const Architecture: Page = () => <Frame section="05 / Experimental design" title="Dua model. Satu protokol evaluasi." subtitle="Model comparison: From-Scratch CNN vs Pretrained EfficientNet-B0 / ResNet-50.">
  <div style={columns}>
    <ArchitectureBox tag="BASELINE / RANDOM INITIALIZATION" title="Custom 4-Block CNN">Input 224² → [Conv2D + BatchNorm<br />+ ReLU + MaxPool] × 4<br />AdaptiveAvgPool → Linear (10 kelas)<br /><span style={{ color: muted }}>Seluruh bobot dipelajari From-Scratch.</span></ArchitectureBox>
    <ArchitectureBox tag="PROPOSED / IMAGENET PRETRAINED" title="EfficientNet-B0 / ResNet-50" proposed>Frozen Backbone → Linear Probe<br />→ Top-Block Unfreezing<br />AdamW + CosineAnnealingLR<br /><span style={{ color: muted }}>Two-stage fine-tuning: EfficientNet-B0.</span></ArchitectureBox>
  </div>
  <div style={{ ...panel, background: '#F3E7D7', marginTop: 30, padding: '28px 36px', borderColor: '#DDC3A1' }}>
    <div style={{ fontSize: 24, color: amber, fontWeight: 700 }}>MANDATORY ABLATION STUDY / AUGMENTATION ON vs OFF</div>
    <p style={{ fontSize: 32, lineHeight: 1.45, margin: '16px 0' }}>Uji rotation, affine transform, dan color jitter pada EfficientNet-B0.</p>
    <div style={{ fontSize: 28, color: muted, lineHeight: 1.45 }}>Tetap: arsitektur, split, optimizer, learning rate, batch size, epoch budget, paired seed.<br />Affine transform menguji variasi geometris; tidak sepenuhnya meniru deformasi lipatan.</div>
  </div>
</Frame>;

const Compute: Page = () => <Frame section="06 / Compute & reproducibility" title="Eksperimen kecil, jejak bukti lengkap." subtitle="Anggaran awal mengikuti proposal; validasi estimasi melalui sanity checks.">
  <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 40 }}>
    <div style={{ ...panel, padding: '8px 30px' }}>
      <SpecRow label="Hardware">Free Colab · Tesla T4 · 16 GB VRAM</SpecRow>
      <SpecRow label="Per run">~8–12 menit · 30 epochs · batch 32</SpecRow>
      <SpecRow label="Main runs">3 configs × 3 seeds = 9 runs</SpecRow>
      <SpecRow label="Total budget">9 main + 3 sanity = 12 runs</SpecRow>
      <SpecRow label="Artefacts">~600 MB · .pt, CSV, curves, matrix</SpecRow>
      <div style={{ color: muted, fontSize: 23, lineHeight: 1.5, padding: '18px 0' }}>Rencana configs: Scratch / TL Aug-ON / TL Aug-OFF<br />3 training seeds (nilai ditetapkan saat implementasi).</div>
    </div>
    <div>
      <div style={{ background: '#1E3A5F', color: '#FFFFFF', borderRadius: 12, padding: 32 }}>
        <div style={{ color: '#DDBA8B', fontSize: 23, letterSpacing: 2 }}>SINGLE-COMMAND / TARGET INTERFACE</div>
        <pre style={{ fontFamily: 'monospace', fontSize: 29, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: '26px 0' }}><span style={{ color: '#DDBA8B' }}>$ </span>bash run_reproduce.sh --seed 42</pre>
        <div style={{ fontSize: 27, lineHeight: 1.5 }}>Manifest → Train → Best checkpoint<br />→ Test evaluation → Raw logs</div>
        <p style={{ fontSize: 22, color: '#CED9E6', marginBottom: 0 }}>Rencana interface pipeline; script belum termasuk repo slide ini.</p>
      </div>
      <div style={{ ...panel, marginTop: 24, borderLeft: `5px solid ${amber}` }}><strong style={{ fontSize: 29, color: amber }}>Fallback / Cut Plan</strong><p style={{ fontSize: 29, lineHeight: 1.5, margin: '14px 0 0' }}>Jika kuota habis: ablation menjadi 1 seed (42). Pertahankan perbandingan model utama; laporkan pengurangan runs.</p></div>
    </div>
  </div>
</Frame>;

function GovernanceColumn({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return <div style={{ ...panel, height: 470, boxSizing: 'border-box' }}><div style={{ color: amber, fontSize: 23, letterSpacing: 2 }}>{label}</div><h2 style={{ fontSize: 36, color: indigo, margin: '24px 0 28px' }}>{title}</h2><div style={{ fontSize: 30, lineHeight: 1.5 }}>{children}</div></div>;
}
const Governance: Page = () => <Frame section="07 / AI use & verification" title="AI membantu kode. Bukti menentukan klaim." subtitle="Governance sejak proposal sampai final evaluation.">
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
    <GovernanceColumn label="TOOLS USED" title="Gemini & Copilot"><p style={{ margin: '0 0 24px' }}>Debugging DataLoader, boilerplate plotting, dan perapian LaTeX.</p><p style={{ margin: 0, color: muted }}>Catat kontribusi AI; tim meninjau dan memahami kode.</p></GovernanceColumn>
    <GovernanceColumn label="PERMITTED / OFF-LIMITS" title="Batas yang tegas"><p style={{ margin: '0 0 24px' }}>Tanpa angka metrik fiktif.</p><p style={{ margin: 0 }}>Causal Error Analysis wajib bertumpu pada inspeksi visual citra kegagalan dan pengujian hipotesis.</p></GovernanceColumn>
    <GovernanceColumn label="VERIFICATION PROTOCOL" title="Raw logs sebagai bukti"><p style={{ margin: '0 0 24px' }}>Fixed seeds, deterministic evaluation, dan test split terkunci.</p><p style={{ margin: 0 }}>Pilih model via Val; evaluasi Test di akhir. Cocokkan klaim dengan raw evaluation logs.</p></GovernanceColumn>
  </div>
  <div style={{ ...row, marginTop: 40, justifyContent: 'space-between', borderTop: `2px solid ${indigo}`, paddingTop: 28 }}><span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 43, color: indigo }}>Dari warisan budaya menuju evaluasi yang dapat dipercaya.</span><Badge color={amber}>Diskusi & Masukan</Badge></div>
</Frame>;

export const notes: string[] = [
  'Judul sesuai proposal: Evaluasi From-Scratch CNN dan Fine-Tuned EfficientNet-B0 untuk Fine-Grained Classification Motif Batik Semarang pada Kondisi Deformasi Kain. Ini adalah proposal: belum ada metrik eksperimen. Visual kain pada deck merupakan ilustrasi prosedural, bukan foto dataset yang terautentikasi.',
  'Satu kesalahan multiclass dapat menjadi False Positive untuk kelas prediksi dan False Negative untuk kelas asli. Tantangannya adalah kemiripan isen-isen serta perubahan tampilan kain. Keunggulan CNN terhadap fitur klasik merupakan motivasi yang perlu diuji, bukan kesimpulan eksperimen.',
  'Klik Re-run Scan. Garis bergerak dan grid 7 kali 7 hanya menjelaskan alur feature extraction; ini bukan aktivasi CNN nyata. Semua angka Softmax adalah skenario ilustratif dari brief, bukan hasil model. Pada baseline, sisa kelas berjumlah 14,3 persen. Tab hanya mengganti kondisi visual, bukan melakukan inference. Label Verified Match tidak menyatakan validasi ilmiah; confidence bukan accuracy dan belum terkalibrasi. Nama Blekok Srondol perlu diperiksa terhadap manifest dataset.',
  'Proposal menyebut sekitar 3.000 citra RGB beresolusi 224 kali 224, 10 kelas, relatif seimbang sekitar 300 citra per kelas. Verifikasi distribusi via EDA. Academic Research Use adalah keterangan dalam proposal; terms aktual tetap diperiksa sebelum penggunaan. PIL/OpenCV memfilter corrupted headers dan invalid color channels. Periksa exact dan near-duplicates via pHash sebelum Stratified Split 70/15/15 dengan seed 42; augmentation on-the-fly hanya untuk Train. Group-aware splitting dan audit lintas partisi adalah rencana penguatan teknis, bukan rincian eksplisit PDF. Rujukan Winarno et al., ACM ICACS 2017 dicantumkan sesuai proposal tetapi belum terverifikasi; jangan menyatakannya sebagai bibliografi tervalidasi.',
  'Sesuai proposal, target pada test set adalah Macro F1 minimal 85 persen dan unggul minimal +10 persen Macro F1 terhadap baseline. Proposal belum membedakan peningkatan relatif dan percentage points; definisi operasional perlu dikunci sebelum eksperimen, sehingga deck tidak menetapkan interpretasi sepihak. Kesetaraan protokol membantu perbandingan, tetapi perbedaan arsitektur dan kapasitas berarti hasil tidak dapat diatribusikan murni pada pretrained weights. Isolasi pretraining secara kausal membutuhkan pembanding arsitektur sama dengan random initialization.',
  'Baseline memakai empat convolutional blocks, bukan sekadar empat layer total. Proposal mencantumkan pretrained EfficientNet-B0 / ResNet-50 untuk model comparison; rincian two-stage fine-tuning ditulis untuk EfficientNet-B0. Jangan menambahkan status opsional untuk ResNet-50. Proposal belum memetakan kedua backbone ke tiga konfigurasi dalam compute plan; pemetaan final perlu ditetapkan sebelum eksperimen tanpa mengklaim ada runs tambahan. Linear probe membekukan backbone dan melatih classifier. Setelah itu unfreeze top blocks. Pada ablation, pasangkan training seeds serta pertahankan pengaturan lain. Affine transform bukan simulasi fisik penuh fabric folds.',
  'Sesuai proposal: tiga konfigurasi kali tiga training seeds sama dengan sembilan eksperimen utama, ditambah tiga sanity checks menjadi dua belas. Anggaran 8 sampai 12 menit dan 600 MB adalah estimasi yang perlu diprofilkan. Seed 42 digunakan untuk split. Proposal menentukan tiga training seeds tetapi tidak menyebut seluruh nilainya; nilai final dan pelaporan mean serta standard deviation merupakan rincian implementasi yang direncanakan. Perintah reproduksi adalah interface yang direncanakan untuk repo eksperimen, bukan script yang sudah tersedia di repo slide. Cut plan mempertahankan model comparison utama dan mengurangi repetition ablation sesuai proposal.',
  'Gemini dan Copilot adalah tools yang direncanakan untuk proyek eksperimen. Jangan mengarang angka atau mengklaim sebab error hanya dari prediksi. Tinjau citra kegagalan secara langsung, gunakan ablation untuk menguji penjelasan, dan cocokkan seluruh metrik dengan raw logs. Test split hanya dipakai untuk evaluasi final setelah pemilihan model pada validation set. Catat versi environment dan keterbatasan determinisme pada hardware berbeda.',
];

export const meta: SlideMeta = {
  title: 'Semarang Batik — Proposal UAS Kelompok 5',
  createdAt: '2026-10-19T04:35:46.440Z',
};

export default [Cover, Problem, Simulator, Dataset, Evaluation, Architecture, Compute, Governance] satisfies Page[];
