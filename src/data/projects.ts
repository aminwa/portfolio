export type Project = {
  slug: string;
  title: string;
  code?: string;
  featured: boolean;
  category: 'AI/ML' | 'Developer Tools' | 'Computer Vision' | 'Web' | 'Security' | 'Systems' | 'Formal Methods';
  summary: string;
  description: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  tech: string[];
  links?: { label: string; href: string }[];
  gradient: string;
  icon: string;
};

export const projects: Project[] = [
  {
    slug: 'shell-pilot',
    title: 'shell-pilot',
    code: 'AWL-001',
    featured: true,
    category: 'Developer Tools',
    gradient: 'linear-gradient(135deg,#020a02 0%,#071407 55%,#030803 100%)',
    icon: '>_',
    summary: 'Agentic terminal assistant published to PyPI: blocks 14 classes of destructive shell commands, corrects typos, and explains failures — all locally, all in real time.',
    description: 'A zsh/bash precheck/postcheck hook installed via PyPI. It intercepts every command before execution, runs 14 regex danger rules with zero network, corrects typos against your live $PATH, and on failure redacts secrets before asking Claude Haiku for a one-sentence fix. SQLite caches API responses for 7 days.',
    highlights: [
      '14 danger rules covering rm -rf, force-push, dd disk wipes, fork bombs, DROP TABLE, chmod 777 — zero latency, zero network',
      'Typo correction via difflib against every binary on $PATH — fully local, no cloud call, instant',
      'Secret redaction strips passwords, AWS keys, bearer tokens, hex secrets before any LLM call',
      'Shell analytics: top-command heatmap, failure summary, alias suggestions via stats subcommand',
      'SQLite cache (7-day TTL) prevents redundant Haiku calls for identical errors — 58 tests passing',
    ],
    metrics: [
      { label: 'Tests passing', value: '58' },
      { label: 'Danger rules', value: '14' },
      { label: 'Version', value: 'v0.1.0' },
    ],
    tech: ['Python', 'SQLite', 'Click', 'Rich', 'Claude Haiku API', 'TOML'],
    links: [
      { label: 'GitHub', href: 'https://github.com/aminwa/shell-pilot' },
    ],
  },
  {
    slug: 'screenshield',
    title: 'screenshield',
    code: 'AWL-002',
    featured: true,
    category: 'Developer Tools',
    gradient: 'linear-gradient(135deg,#02050f 0%,#040b1e 55%,#020510 100%)',
    icon: '⊗',
    summary: 'Real-time screen guardian: OCR at 2+ FPS, 12 secret types, Shannon-entropy filtering, meeting-aware escalation. Zero cloud. Zero frames written to disk.',
    description: 'Captures the screen with mss, preprocesses frames (grayscale → adaptive threshold → sharpen, tuned for dark terminal fonts), runs Tesseract OCR, and scans output for 12 secret categories. When Zoom/Teams/Meet is active, severity escalates to Critical and an OS notification fires immediately. Nothing leaves the device.',
    highlights: [
      'Tesseract OCR pipeline tuned for terminal fonts and dark themes (grayscale → adaptive threshold → sharpen)',
      '12 secret types: AWS/GCP/Azure keys, GitHub tokens, JWTs, private keys, DB connection strings, SSNs, Luhn-validated credit cards, bearer tokens, entropy-filtered env vars',
      'Shannon entropy floor (≥3.5 bits) cuts false positives on low-entropy strings',
      'Meeting escalation: psutil detects Zoom, Teams, Google Meet — severity jumps to Critical, OS notification fires',
      'SQLite detection history stores masked values only (first 4 chars + ****); frames never written to disk',
    ],
    metrics: [
      { label: 'Tests', value: '20' },
      { label: 'Secret types', value: '12' },
      { label: 'Cloud calls', value: '0' },
    ],
    tech: ['Python', 'Tesseract', 'OpenCV', 'mss', 'Typer', 'Rich', 'psutil'],
    links: [{ label: 'GitHub', href: 'https://github.com/aminwa/screenshield' }],
  },
  {
    slug: 'mirror-game',
    title: 'mirror-game',
    code: 'AWL-004',
    featured: true,
    category: 'AI/ML',
    gradient: 'linear-gradient(135deg,#050210 0%,#0a0425 55%,#050215 100%)',
    icon: '◈',
    summary: 'A real-time AI debate arena: argue against Claude Sonnet 4.6, live-scored across 3 rounds, with a Three.js WebGL stage and Supabase spectator mode.',
    description: 'A full-stack Next.js 15 app built with React 19 and React Three Fiber. Players choose a side (chaos vs. order), debate Claude Sonnet 4.6 across 3 rounds via a streaming API endpoint, and are scored live. A Supabase backend stores transcripts and streams updates to spectators watching the arena in real time.',
    highlights: [
      'Claude Sonnet 4.6 debate endpoint with streaming responses and graceful mock fallback',
      'State machine across 6 screens: home → setup → debate → result → spectator-setup → spectator-debate',
      'React Three Fiber WebGL scene morphs between 3 modes (home, debate, result) with winner reveal animation',
      'Supabase real-time backend: transcript storage, live spectator updates, vote tallying',
      'Framer Motion screen transitions; Tailwind CSS v4; TypeScript strict throughout',
    ],
    metrics: [
      { label: 'Rounds', value: '3' },
      { label: 'Screens', value: '6' },
      { label: 'Model', value: 'Sonnet 4.6' },
    ],
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'Three.js', 'Supabase', 'Anthropic API', 'Tailwind v4'],
    links: [],
  },
  {
    slug: 'airport-xray',
    title: 'Airport X-ray Prohibited-Item Detection',
    featured: true,
    category: 'Computer Vision',
    gradient: 'linear-gradient(135deg,#0f0502 0%,#1a0803 55%,#0a0402 100%)',
    icon: '⊙',
    summary: 'YOLOv8m detector for 5 knife classes in occluded X-ray baggage, mAP50 of 0.924, ablated against YOLOv8s and exported to ONNX + Docker.',
    description: 'Fine-tuned YOLOv8m on the OPIXray benchmark (8,885 images, 5 knife-type classes across 3 occlusion levels). Evaluated on 1,776 held-out test images. Recall-first metric choice for a safety-critical setting. Includes a controlled YOLOv8s vs YOLOv8m ablation, ONNX export (opset 20), resolution-agnostic inference API, and Docker container.',
    highlights: [
      'mAP50 of 0.924; recall ≥0.80 on 4 of 5 classes on the held-out 1,776-image test set',
      'Ablation: YOLOv8s → YOLOv8m gave +6.6 mAP50, concentrated on the rarest/most-occluded class (+15 AP50)',
      'Class imbalance handled with mosaic, copy-paste, and mixup augmentation',
      'ONNX export (opset 20); inference API with schema validation, failure handling, structured logging',
      'Recall-first evaluation for safety-critical context; GDPR-compliant image retention policy documented',
    ],
    metrics: [
      { label: 'mAP50', value: '0.924' },
      { label: 'Test images', value: '1,776' },
      { label: 'Classes', value: '5' },
    ],
    tech: ['Python', 'PyTorch', 'YOLOv8', 'ONNX', 'Docker', 'OpenCV'],
    links: [{ label: 'Demo / report', href: '[[FILL]]' }],
  },

  // ── More Work ────────────────────────────────────────────
  {
    slug: 'redact',
    title: 'redact',
    code: 'AWL-003',
    featured: false,
    category: 'Developer Tools',
    gradient: 'linear-gradient(135deg,#0f0800 0%,#1a1200 55%,#0a0800 100%)',
    icon: '⊘',
    summary: 'Dual-engine PII redaction CLI: spaCy NER + Claude run in parallel, spans merged, compare mode shows where each engine fails.',
    description: 'A pipe-friendly CLI (cat file.txt | redact) that redacts PII using two engines simultaneously. A compare command runs both and shows a side-by-side diff — useful for understanding failure modes. NER-only mode needs no API key.',
    highlights: [
      'Dual-engine: spaCy NER + regex, and Claude with character-level offsets',
      'Overlapping spans deduplicated; label or block redaction styles',
      'Side-by-side compare command shows gap between engines',
      'Pipe-friendly: cat file.txt | redact — no temp files',
    ],
    metrics: [{ label: 'Engines', value: '2' }],
    tech: ['Python', 'spaCy', 'Anthropic API', 'Typer'],
    links: [{ label: 'GitHub', href: 'https://github.com/aminwa/redact' }],
  },
  {
    slug: 'mocap',
    title: 'mocap-sandbox',
    featured: false,
    category: 'AI/ML',
    gradient: 'linear-gradient(135deg,#020508 0%,#030a12 55%,#020508 100%)',
    icon: '◎',
    summary: 'Real-time skeletal pose tracking from webcam using MediaPipe PoseLandmarker with OpenCV skeleton overlay.',
    description: 'MediaPipe PoseLandmarker (pose.task, 5.8 MB) running in VIDEO mode on live webcam input. Extracts 33 landmarks per frame, draws skeleton connections via OpenCV, runs at real-time FPS. Foundation for motion capture experiments.',
    highlights: [
      'MediaPipe PoseLandmarker (pose.task model, VIDEO mode, num_poses=1)',
      'Real-time OpenCV skeleton overlay with frame-indexed timestamp',
      'Graceful exit handling; runs on Python 3.13',
    ],
    tech: ['Python', 'MediaPipe', 'OpenCV', 'NumPy'],
    links: [],
  },
  {
    slug: 'elegantdine',
    title: 'ElegantDine',
    featured: false,
    category: 'Web',
    gradient: 'linear-gradient(135deg,#060210 0%,#0a0420 55%,#050210 100%)',
    icon: '◇',
    summary: 'Flask restaurant-management app — reservations, order status workflow, RBAC — deployed on Render with PostgreSQL.',
    description: 'Tables, reservations, menu management, and order status (pending → paid) with admin/staff roles. PostgreSQL in production, SQLite locally, deployed on Render with automatic fallback.',
    highlights: [
      'Role-based auth (Flask-Login)', 'Order status state machine', 'PostgreSQL/SQLite auto-fallback', 'Deployed on Render',
    ],
    tech: ['Python', 'Flask', 'SQLAlchemy', 'PostgreSQL'],
    links: [{ label: 'GitHub', href: 'https://github.com/aminwa/ElegantDine-RMS' }],
  },
  {
    slug: 'prs',
    title: 'Pandemic Resilience System',
    featured: false,
    category: 'Web',
    gradient: 'linear-gradient(135deg,#030a05 0%,#051205 55%,#030805 100%)',
    icon: '⊕',
    summary: 'Multi-role Flask platform with encryption at rest, FHIR vaccination records, and purchase-limit enforcement.',
    description: 'Three dashboards (government, merchant, public), RBAC, Werkzeug hashing, encryption at rest for sensitive identifiers, FHIR-JSON vaccination records, audit logging.',
    highlights: [
      'Encryption at rest for sensitive identifiers', 'Werkzeug password hashing + RBAC', 'FHIR-JSON vaccination records', 'Full audit logging',
    ],
    tech: ['Python', 'Flask', 'SQLAlchemy', 'Cryptography', 'Bootstrap'],
    links: [],
  },
  {
    slug: 'security-management',
    title: 'Security Management Reports',
    featured: false,
    category: 'Security',
    gradient: 'linear-gradient(135deg,#0a0505 0%,#150808 55%,#0a0505 100%)',
    icon: '⊛',
    summary: 'Consultant-style authentication review (6 password managers, FIDO2, PCI-DSS) and the 2025 M&S ransomware post-mortem mapped to ISO 27001.',
    description: 'Two reports: a PCI-DSS authentication review testing 6 password managers and 2 MFA-bypass attacks; and an OSINT-based reconstruction of the Scattered Spider M&S attack chain mapped to ISO 27001 / NIST with a costed remediation programme.',
    highlights: [
      'Evaluated 6 password managers + 2 MFA bypass techniques', 'Reconstructed Scattered Spider attack chain', 'Mapped failures to ISO 27001 / NIST', 'Costed remediation programme',
    ],
    tech: ['PCI-DSS', 'ISO 27001', 'NIST', 'FIDO2', 'UK GDPR'],
  },
  {
    slug: 'systems-programming',
    title: 'Systems Programming',
    featured: false,
    category: 'Systems',
    gradient: 'linear-gradient(135deg,#050508 0%,#0a0a12 55%,#050508 100%)',
    icon: '≡',
    summary: 'POSIX shared memory + semaphores in C, a Linux loadable kernel module, and LAPACK benchmarking across 4 environments with Docker.',
    description: 'Coursework spanning Bash tooling, a C client-server over POSIX IPC with clean teardown, a loadable Linux kernel module with custom kernel build, and LAPACK numerical benchmarking reproducible across native/Docker/Codespaces/macOS.',
    highlights: [
      'POSIX shared memory + named semaphores with clean teardown', 'Loadable Linux kernel module', 'LAPACK solver verified to machine epsilon', 'Reproducible across 4 environments',
    ],
    tech: ['C', 'Bash', 'POSIX IPC', 'Linux kernel', 'LAPACK', 'Docker'],
  },
  {
    slug: 'formal-verification',
    title: 'Formal Verification (CSP-M / FDR)',
    featured: false,
    category: 'Formal Methods',
    gradient: 'linear-gradient(135deg,#080210 0%,#100420 55%,#080210 100%)',
    icon: '∀',
    summary: "CSP-M models in FDR proving a banking security breach and Dekker's algorithm failing safety vs liveness under compiler optimisation.",
    description: "Trace-refinement counterexample proving a banking security breach that testing couldn't catch; and Dekker's mutual exclusion algorithm verified to fail on safety (Opt A) vs liveness (Opt B) under two legal compiler optimisations.",
    highlights: [
      'Trace refinement proving a breach testing could not catch', 'Mutual exclusion, deadlock, divergence checks', 'Safety failure (Opt A) vs liveness failure (Opt B)',
    ],
    tech: ['CSP-M', 'FDR4', 'Concurrency', 'Formal methods'],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects     = projects.filter((p) => !p.featured);
