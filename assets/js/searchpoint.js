// searchpoint_v2.js - Bilingual (EN/ID) & Light/Dark Theme Engine for SearchPoint

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initI18n();
  initNavbar();
  initMobileMenu();
  initCloudCanvas();
  initHeroWaves();
  initHeroOrbits();
  initHowItWorks();
  initCarousels();
  initFaq();
  initArchMesh();
});

/* =========================================================================
   1. THEME SWITCHER (LIGHT / DARK)
   ========================================================================= */
let currentTheme = localStorage.getItem('sp_theme') || 'dark';

function initTheme() {
  applyTheme(currentTheme);
  const themeBtns = document.querySelectorAll('[data-action="toggle-theme"]');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('sp_theme', currentTheme);
      applyTheme(currentTheme);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeBtns = document.querySelectorAll('[data-action="toggle-theme"]');
  themeBtns.forEach(btn => {
    if (theme === 'dark') {
      // Show Sun icon (to switch to light)
      btn.innerHTML = `<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
      btn.setAttribute('aria-label', 'Switch to Light mode');
    } else {
      // Show Moon icon (to switch to dark)
      btn.innerHTML = `<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      btn.setAttribute('aria-label', 'Switch to Dark mode');
    }
  });

  // Re-trigger CloudCanvas tone if available
  if (window.updateCloudCanvasTheme) {
    window.updateCloudCanvasTheme(theme);
  }
}

/* =========================================================================
   2. BILINGUAL TRANSLATIONS (EN / ID - ISL)
   ========================================================================= */
let currentLang = localStorage.getItem('sp_lang') || 'en';

const TRANSLATIONS = {
  en: {
    // Nav
    "nav.search": "Desktop Search",
    "nav.features": "Capabilities",
    "nav.arch": "Architecture",
    "nav.security": "Purview & Security",
    "nav.faq": "Client FAQ",
    "nav.download": "Get App",
    "nav.get_app": "Get App",
    "nav.sign_in": "Sign In",
    "nav.language": "Language",

    // Hero
    "hero.badge": "The Desktop Knowledge Layer for Enterprise & AI",
    "hero.title": "The Enterprise Knowledge Layer for Local Data and AI Agents.",
    "hero.sub": "Search local storage, OneDrive, Outlook, and SharePoint instantly from your desktop. Feed your favorite LLMs clean, permission-aware company knowledge without leaking sensitive files.",
    "hero.chip_opensearch": "Sub-50ms OpenSearch",
    "hero.chip_rust": "Rust Parsing Worker",
    "hero.chip_vault": "HashiCorp Vault Secrets",
    "hero.chip_entra": "Microsoft Entra ID RBAC",
    "hero.cta_download": "Get App",
    "hero.cta_explore": "Explore Desktop Demo ↓",

    // Demo Section Header
    "demo.sub": "The Desktop Knowledge Layer",

    // Connectors
    "connectors.tag": "Enterprise Connectors",
    "connectors.title": "Searches what you already have. Without migration.",
    "connectors.desc": "No secondary file uploads. SearchPoint connects through standard OAuth/OIDC with admin consent, keeping your native DLP and ACLs fully intact at the source.",
    "connectors.soon": "Soon",
    "connectors.all": "All sources",
    "connectors.ms365": "Microsoft 365",
    "connectors.identity": "Identity & RBAC",
    "connectors.secrets_filter": "Secrets",
    "connectors.device": "On-device",
    "connectors.messaging": "Messaging",
    "connectors.workspace": "Workspace",
    "connectors.panel_hint": "Click another node to inspect its trust boundary.",
    "connectors.identity_badge": "Identity plane",
    "connectors.identity_title": "Microsoft Entra ID",
    "connectors.identity_desc": "Who is asking? OAuth/OIDC claims, Microsoft 365 groups, and Purview labels decide which documents may surface — on every query.",
    "connectors.identity_p1": "SSO with OAuth 2.0 / OIDC",
    "connectors.identity_p2": "Group, ACL & Purview claims",
    "connectors.identity_p3": "Fail-closed filtering at query time",
    "connectors.identity_note": "Answers: who is allowed to see this result?",
    "connectors.secrets_badge": "Secrets plane",
    "connectors.secrets_title": "HashiCorp Vault",
    "connectors.secrets_desc": "How are credentials and keys protected? Dynamic secrets, transit encryption, and KMS auto-unseal keep connector tokens out of config files and rotate them automatically.",
    "connectors.secrets_p1": "Dynamic, short-lived credentials",
    "connectors.secrets_p2": "Transit encryption & audit trail",
    "connectors.secrets_p3": "KMS auto-unseal (AWS / Azure / GCP)",
    "connectors.secrets_note": "Answers: how is this secret protected and rotated?",

    // Capabilities
    "features.tag": "Core Differentiators",
    "features.title": "Built for enterprises that cannot afford document leaks.",
    "c1.tag": "Data Privacy",
    "c1.title": "Zero Document Retention",
    "c1.desc": "We do not store your files. SearchPoint indexes metadata, keywords, and text summaries in OpenSearch. Raw binaries are parsed in isolated, ephemeral sandboxes and immediately purged.",
    "c1.b1": "Direct-to-Source",
    "c1.b2": "100% Ephemeral",

    "c2.tag": "Access Control",
    "c2.title": "Query-Time Purview & RBAC",
    "c2.desc": "The #1 enterprise fear with AI search (oversharing) is architecturally prevented. Every query filters results per user. If someone can't open a file in OneDrive, they cannot see or query it.",
    "c2.b1": "Fail-Closed",
    "c2.b2": "Entra ID Native",

    "c3.tag": "Search Performance",
    "c3.title": "Sub-50ms Desktop Speed",
    "c3.desc": "Press Ctrl + Space from any active application. Features boolean operators (AND/OR/NOT), fuzzy matching, multilingual stemming (English + Indonesian), and field boosting.",
    "c3.b1": "OpenSearch Core",
    "c3.b2": "Instant Launch",

    "c4.tag": "On-Device AI",
    "c4.title": "Intelligent On-Device Rename",
    "c4.desc": "Eliminate chaotic downloads like `download(3).pdf`. A lightweight on-device neural model reads document structure and proposes standardized, clutter-free naming conventions.",
    "c4.b1": "On-Device Neural",
    "c4.b2": "Zero Privacy Leak",

    "c5.tag": "AI Grounding",
    "c5.title": "Grounded AI Context (RAG)",
    "c5.desc": "Feed ChatGPT, Claude, or local Ollama with verified corporate citations. LLMs receive only permitted departmental snippets, preventing hallucinations and executive data leaks.",
    "c5.b1": "Zero Hallucinations",
    "c5.b2": "Model Agnostic",

    "c6.tag": "Deployment",
    "c6.title": "Self-Hosted Private Stack",
    "c6.desc": "Deploy entirely within your enterprise tenant or private VPC. Secrets rotated in HashiCorp Vault with KMS auto-unseal. Client certificates verified at proxy edge with CRL checking.",
    "c6.b1": "Vault KMS Unseal",
    "c6.b2": "mTLS Hardened",

    // Architecture
    "arch.tag": "Architectural Blueprint",
    "arch.title": "Inside the Knowledge Layer.",
    "arch.desc": "How SearchPoint connects, parses, and retrieves company knowledge with fail-closed security at every hop.",
    "step1.title": "01. Delta Ingest",
    "step1.desc": "Microsoft Graph delta queries and local filesystem watchers discover document updates without copying binaries.",
    "step2.title": "02. Rust Sandbox",
    "step2.desc": "Dedicated high-performance Rust worker processes PDF, Office, and OCR in an ephemeral sandbox. Immediate memory purge.",
    "step3.title": "03. Purview Snapshot",
    "step3.desc": "Every record carries its native Entra ID source allow-list (users, groups, public) — the sole signal for query authorization.",
    "step4.title": "04. OpenSearch Engine",
    "step4.desc": "Sub-50ms vector and keyword retrieval with boolean operators, fuzzy matching, and multilingual English/Indonesian stemming.",
    "step5.title": "05. Grounded RAG",
    "step5.desc": "Permitted context citations feed your favorite LLM (Claude, ChatGPT, Ollama) with zero hallucinations and zero data leakage.",

    // Security
    "sec.tag": "Zero-Trust Framework",
    "sec.title": "Your files stay where they are. Permissions intact.",
    "sec.desc": "SearchPoint never becomes an accidental oversharing engine. If a user cannot open the file in OneDrive, they cannot even see it in search.",
    "s1.title": "Document Allow-List",
    "s1.desc": "Every indexed document carries its actual source permissions (users, groups, public) — the sole authorization signal for search visibility.",
    "s2.title": "Fail-Closed Authorization",
    "s2.desc": "If a document's permission snapshot is missing, corrupt, or incomplete, access is denied. The search engine never defaults to 'visible'.",
    "s3.title": "HashiCorp Vault Secrets",
    "s3.desc": "All credentials, tokens, and keys are stored and rotated in Vault with cloud-KMS auto-unseal (AWS/Azure/GCP) and transit secret workflows.",
    "s4.title": "mTLS & Certificate Revocation",
    "s4.desc": "Client certificates are verified and revocation-checked at the Caddy proxy layer — stolen or expired certificates cannot be replayed.",
    "s5.title": "Truth-Mirroring Deletes",
    "s5.desc": "When a file is deleted, moved, or locked down in OneDrive or SharePoint, it disappears from search instantly. No ghost copies.",
    "s6.title": "Complete Audit Logging",
    "s6.desc": "All search queries and document open events are logged and aggregatable per user. Internal metrics listen on private network interfaces only.",

    // Manifesto
    "man.tag": "The Architecture Manifesto",
    "man.title": "Enterprise search failed because it copied files into secondary silos. The future of knowledge belongs to the zero-retention, permission-true layer.",
    "man.desc": "No duplicated file liabilities. No accidental oversharing leaks. Every document stays in its source, protected by the exact same purview that governs your company.",

    // Download
    "dl.tag": "Install SearchPoint Desktop",
    "dl.title": "Get SearchPoint now.",
    "dl.desc": "A fast, native application built for daily productivity and secure AI workflows.",
    "dl.mac": "macOS",
    "dl.mac_sub": "Apple Silicon & Intel",
    "dl.win": "Windows",
    "dl.win_sub": "Windows 11 / 10 x64",
    "dl.linux": "Linux (.deb / .rpm)",
    "dl.coming": "Coming Soon",

    // FAQ
    "faq.tag": "Frequently Asked Questions",
    "faq.title": "Client FAQ & Product Architecture.",
    "faq.desc": "Answers to common enterprise security and deployment questions, grounded in shipped product behavior.",

    // Footer
    "footer.rights": "© 2026 Hyperjump"
  },

  id: {
    // Nav
    "nav.search": "Pencarian Desktop",
    "nav.features": "Keunggulan",
    "nav.arch": "Arsitektur",
    "nav.security": "Izin & Keamanan",
    "nav.faq": "FAQ Klien",
    "nav.download": "Dapatkan Aplikasi",
    "nav.get_app": "Dapatkan Aplikasi",
    "nav.sign_in": "Masuk",
    "nav.language": "Bahasa",

    // Hero
    "hero.badge": "Lapisan Pengetahuan Desktop untuk Korporasi & AI",
    "hero.title": "Lapisan Pengetahuan Korporasi untuk Data Lokal dan Agen AI.",
    "hero.sub": "Cari penyimpanan lokal, OneDrive, Outlook, dan SharePoint seketika dari desktop Anda. Beri makan LLM Anda konteks pengetahuan perusahaan yang bersih dan patuh izin tanpa kebocoran dokumen rahasia.",
    "hero.chip_opensearch": "Latensi <50ms OpenSearch",
    "hero.chip_rust": "Worker Parser Rust Cepat",
    "hero.chip_vault": "Kunci Rahasia HashiCorp Vault",
    "hero.chip_entra": "RBAC Microsoft Entra ID",
    "hero.cta_download": "Dapatkan Aplikasi",
    "hero.cta_explore": "Lihat Demo Desktop Interaktif ↓",

    // Demo Section Header
    "demo.sub": "Lapisan Pengetahuan Desktop",

    // Connectors
    "connectors.tag": "Konektor Enterprise",
    "connectors.title": "Mencari berkas yang sudah ada. Tanpa migrasi.",
    "connectors.desc": "Tanpa pengunggahan berkas sekunder. SearchPoint terhubung melalui standar OAuth/OIDC dengan persetujuan admin, menjaga DLP dan ACL lokal tetap utuh pada sumber aslinya.",
    "connectors.soon": "Segera",
    "connectors.all": "Semua sumber",
    "connectors.ms365": "Microsoft 365",
    "connectors.identity": "Identitas & RBAC",
    "connectors.secrets_filter": "Rahasia",
    "connectors.device": "Perangkat",
    "connectors.messaging": "Perpesanan",
    "connectors.workspace": "Ruang kerja",
    "connectors.panel_hint": "Klik node lain untuk memeriksa batas kepercayaannya.",
    "connectors.identity_badge": "Bidang identitas",
    "connectors.identity_title": "Microsoft Entra ID",
    "connectors.identity_desc": "Siapa yang bertanya? Klaim OAuth/OIDC, grup Microsoft 365, dan label Purview menentukan dokumen mana yang boleh muncul — pada setiap kueri.",
    "connectors.identity_p1": "SSO dengan OAuth 2.0 / OIDC",
    "connectors.identity_p2": "Klaim grup, ACL & Purview",
    "connectors.identity_p3": "Pemfilteran fail-closed saat kueri",
    "connectors.identity_note": "Menjawab: siapa yang boleh melihat hasil ini?",
    "connectors.secrets_badge": "Bidang rahasia",
    "connectors.secrets_title": "HashiCorp Vault",
    "connectors.secrets_desc": "Bagaimana kredensial dan kunci dilindungi? Rahasia dinamis, enkripsi transit, dan auto-unseal KMS menjaga token konektor tetap di luar berkas konfigurasi dan merotasinya otomatis.",
    "connectors.secrets_p1": "Kredensial dinamis berumur pendek",
    "connectors.secrets_p2": "Enkripsi transit & jejak audit",
    "connectors.secrets_p3": "Auto-unseal KMS (AWS / Azure / GCP)",
    "connectors.secrets_note": "Menjawab: bagaimana rahasia ini dilindungi dan dirotasi?",

    // Capabilities
    "features.tag": "Keunggulan Utama",
    "features.title": "Dibangun untuk enterprise yang tidak boleh mengalami kebocoran data.",
    "c1.tag": "Privasi Data",
    "c1.title": "Nol Penyimpanan Dokumen",
    "c1.desc": "Kami tidak menyimpan berkas Anda. SearchPoint hanya mengindeks metadata, kata kunci, dan ringkasan teks di OpenSearch. Konten biner diproses di sandbox terisolasi dan langsung dihapus permanen.",
    "c1.b1": "Akses Langsung Sumber",
    "c1.b2": "100% Sementara (Ephemeral)",

    "c2.tag": "Kontrol Akses",
    "c2.title": "Penegakan Izin Saat Kueri (RBAC)",
    "c2.desc": "Ketakutan #1 korporasi terhadap AI (oversharing) dicegah secara arsitektural. Setiap kueri disaring per pengguna. Jika seseorang tidak bisa membuka berkas di OneDrive, mereka tidak akan melihatnya di SearchPoint.",
    "c2.b1": "Prinsip Fail-Closed",
    "c2.b2": "Native Entra ID",

    "c3.tag": "Performa Pencarian",
    "c3.title": "Kecepatan Desktop Sub-50ms",
    "c3.desc": "Tekan Ctrl + Space dari aplikasi apa pun. Dilengkapi operator boolean (AND/OR/NOT), pencarian fuzzy, stemming multibahasa (Indonesia + Inggris), serta pembobotan field kueri.",
    "c3.b1": "Mesin OpenSearch",
    "c3.b2": "Peluncuran Seketika",

    "c4.tag": "AI On-Device",
    "c4.title": "Penamaan Dokumen AI On-Device",
    "c4.desc": "Hilangkan berkas unduhan berantakan seperti `download(3).pdf`. Model neural ringan on-device membaca struktur dokumen dan mengusulkan standarisasi nama arsip yang rapi secara otomatis.",
    "c4.b1": "Neural di Perangkat",
    "c4.b2": "Nol Kebocoran Privasi",

    "c5.tag": "Grounding AI",
    "c5.title": "Konteks AI Terverifikasi (RAG)",
    "c5.desc": "Beri makan ChatGPT, Claude, atau Ollama lokal dengan sitasi dokumen terverifikasi. LLM hanya menerima potongan informasi yang diizinkan per departemen, mencegah halusinasi dan kebocoran berkas direksi.",
    "c5.b1": "Nol Halusinasi",
    "c5.b2": "Agnostik Model",

    "c6.tag": "Deployment",
    "c6.title": "Stack Privat Self-Hosted",
    "c6.desc": "Dapat dijalankan penuh di tenant atau VPC privat Anda. Kunci rahasia dikelola di HashiCorp Vault dengan auto-unseal KMS cloud. Sertifikat klien diverifikasi dengan CRL pada layer proksi.",
    "c6.b1": "Vault KMS Unseal",
    "c6.b2": "Proteksi mTLS",

    // Architecture
    "arch.tag": "Cetak Biru Arsitektur",
    "arch.title": "Di Dalam Lapisan Pengetahuan.",
    "arch.desc": "Bagaimana SearchPoint menghubungkan, membedah, dan mengambil pengetahuan perusahaan dengan keamanan fail-closed di setiap tahapan.",
    "step1.title": "01. Ingesti Delta",
    "step1.desc": "Kueri delta Microsoft Graph dan pemantau filesystem lokal mendeteksi pembaruan berkas tanpa perlu menyalin biner.",
    "step2.title": "02. Sandbox Rust",
    "step2.desc": "Worker Rust berperforma tinggi memproses PDF, Office, dan OCR dalam sandbox sementara yang langsung dibersihkan dari RAM.",
    "step3.title": "03. Snapshot Izin M365",
    "step3.desc": "Setiap data membawa allow-list sumber Entra ID (pengguna, grup, publik) — satu-satunya sinyal otorisasi saat pencarian.",
    "step4.title": "04. Mesin OpenSearch",
    "step4.desc": "Pencarian vektor dan kata kunci sub-50ms dengan operator boolean, toleransi saltik fuzzy, dan stemming bahasa Indonesia & Inggris.",
    "step5.title": "05. RAG Terverifikasi",
    "step5.desc": "Konteks yang terverifikasi dialirkan ke LLM pilihan Anda (Claude, ChatGPT, Ollama) tanpa halusinasi dan tanpa risiko kebocoran berkas rahasia.",

    // Security
    "sec.tag": "Kerangka Zero-Trust",
    "sec.title": "Berkas Anda tetap di tempatnya. Izin akses tetap utuh.",
    "sec.desc": "SearchPoint tidak pernah menjadi celah kebocoran data. Jika karyawan tidak berhak membuka berkas di OneDrive, berkas tersebut tidak akan pernah muncul di pencarian.",
    "s1.title": "Daftar Izin Dokumen Asli",
    "s1.desc": "Setiap dokumen terindeks membawa izin sumber aslinya (user, group, publik) — sinyal tunggal penentu visibilitas hasil pencarian.",
    "s2.title": "Otorisasi Fail-Closed",
    "s2.desc": "Jika snapshot izin dokumen hilang, rusak, atau belum sinkron, akses langsung ditolak. Sistem tidak pernah mengasumsikan berkas berstatus 'terbuka'.",
    "s3.title": "Rahasia di HashiCorp Vault",
    "s3.desc": "Seluruh kredensial, token, dan kunci enkripsi disimpan serta dirotasi di Vault dengan KMS auto-unseal (AWS/Azure/GCP) dan transit workflow.",
    "s4.title": "mTLS & Pencabutan Sertifikat",
    "s4.desc": "Sertifikat klien diverifikasi dan dicek pencabutannya pada proxy Caddy terdepan — sertifikat usang atau dicuri tidak dapat dipakai kembali.",
    "s5.title": "Penghapusan Cermin Kebenaran",
    "s5.desc": "Saat berkas dihapus, dipindah, atau dikunci di OneDrive/SharePoint, berkas seketika hilang dari pencarian. Tidak ada salinan hantu.",
    "s6.title": "Pencatatan Audit Menyeluruh",
    "s6.desc": "Semua pencarian dan pembukaan berkas dicatat rapi per pengguna. Metrik internal hanya mendengarkan antarmuka jaringan privat.",

    // Manifesto
    "man.tag": "Manifesto Arsitektur",
    "man.title": "Pencarian korporasi lama gagal karena menyalin berkas ke silo sekunder. Masa depan pengetahuan enterprise adalah lapisan tanpa penyimpanan dengan kepatuhan izin mutlak.",
    "man.desc": "Tanpa risiko duplikasi data. Tanpa celah kebocoran hak akses. Setiap berkas tetap di sumber aslinya, dilindungi oleh izin yang sama dengan aturan perusahaan Anda.",

    // Download
    "dl.tag": "Pasang SearchPoint Desktop",
    "dl.title": "Dapatkan SearchPoint Sekarang.",
    "dl.desc": "Aplikasi native yang kencang, dirancang untuk produktivitas harian dan alur kerja AI yang aman.",
    "dl.mac": "macOS",
    "dl.mac_sub": "Apple Silicon & Intel",
    "dl.win": "Windows",
    "dl.win_sub": "Windows 11 / 10 x64",
    "dl.linux": "Linux (.deb / .rpm)",
    "dl.coming": "Segera Hadir",

    // FAQ
    "faq.tag": "Tanya Jawab Klien",
    "faq.title": "FAQ Klien & Arsitektur Produk.",
    "faq.desc": "Jawaban atas pertanyaan keamanan dan kesiapan implementasi korporasi, sesuai perilaku produk yang telah dirilis.",

    // Footer
    "footer.rights": "© 2026 Hyperjump"
  }
};

function initI18n() {
  applyLang(currentLang);
  const langBtns = document.querySelectorAll('[data-action="set-lang"]');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = btn.getAttribute('data-lang');
      if (selected && selected !== currentLang) {
        currentLang = selected;
        localStorage.setItem('sp_lang', currentLang);
        applyLang(currentLang);
      }
    });
  });
}

function applyLang(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update language toggle buttons active state
  const langBtns = document.querySelectorAll('[data-action="set-lang"]');
  langBtns.forEach(btn => {
    const isCurrent = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('bg-white/20', isCurrent);
    btn.classList.toggle('text-white', isCurrent);
    btn.classList.toggle('font-bold', isCurrent);
    btn.classList.toggle('opacity-100', isCurrent);
    btn.classList.toggle('opacity-50', !isCurrent);
  });

  // Re-render desktop demo scenario with active language
  if (window.updateDemoLanguage) {
    window.updateDemoLanguage(lang);
  }

  // Re-render FAQ with active language
  if (window.renderFaqList) {
    window.renderFaqList(lang);
  }
}

/* =========================================================================
   3. NAVBAR SCROLL EFFECT
   ========================================================================= */
function initNavbar() {
  const header = document.querySelector('header');
  if (!header) return;
  const container = header.querySelector('.sp-container') || header.querySelector('div.relative.mx-auto');
  const bg = container ? container.querySelector('[aria-hidden="true"]') : null;
  const nav = container ? container.querySelector('nav') : null;

  function update() {
    const scrolled = window.scrollY > 20;
    if (bg) {
      bg.style.opacity = scrolled ? '1' : '0';
    }
    if (nav) {
      if (scrolled) {
        nav.classList.remove('h-[68px]');
        nav.classList.add('h-[56px]');
      } else {
        nav.classList.remove('h-[56px]');
        nav.classList.add('h-[68px]');
      }
    }
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* =========================================================================
   3b. MOBILE MENU
   ========================================================================= */
function initMobileMenu() {
  const toggle = document.querySelector('[data-action="toggle-menu"]');
  const panel = document.querySelector('[data-mobile-menu]');
  if (!toggle || !panel) return;

  const iconOpen = toggle.querySelector('[data-menu-icon-open]');
  const iconClose = toggle.querySelector('[data-menu-icon-close]');
  const desktopQuery = window.matchMedia('(min-width: 1280px)');

  function setOpen(open) {
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (iconOpen) iconOpen.classList.toggle('hidden', open);
    if (iconClose) iconClose.classList.toggle('hidden', !open);
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!panel.classList.contains('is-open'));
  });

  panel.addEventListener('click', (e) => {
    if (e.target.closest('a, button')) {
      if (e.target.closest('a')) setOpen(false);
    }
  });

  document.addEventListener('click', (e) => {
    if (!panel.classList.contains('is-open')) return;
    if (!panel.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  const onDesktop = (e) => {
    if (e.matches) setOpen(false);
  };
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener('change', onDesktop);
  } else if (desktopQuery.addListener) {
    desktopQuery.addListener(onDesktop);
  }
}

/* =========================================================================
   4. WEBGL2 CLOUD SHADER (HERO & MANIFESTO)
   ========================================================================= */
const VERTEX_SHADER = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uSky;
uniform vec3 uRim;
uniform vec3 uCore;
uniform float uOpacity;
uniform float uEven;
uniform float uScale;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float s = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    s += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return s;
}

void main() {
  vec2 px = gl_FragCoord.xy;
  float h = px.y / uRes.y;
  float unit = max(uRes.x, uRes.y);
  vec2 uv = px / unit * uScale;

  float t = uTime;
  vec2 rise = vec2(0.0, -t * 0.06);

  float ridge = fbm(vec2(px.x / unit * 2.0 + t * 0.01, 3.7));
  float lift = mix(-0.08, 0.28, smoothstep(0.35, 0.7, ridge));

  vec2 warp = vec2(fbm(uv + rise + vec2(0.0, t * 0.02)),
                   fbm(uv + rise + vec2(5.2, 1.3) - t * 0.015));
  float d = fbm(uv * 1.3 + rise + warp * 1.4);

  float band = mix(clamp(1.0 - h * 1.1 + lift, 0.0, 1.0), 0.5, uEven);
  float dens = smoothstep(0.35, 0.8, d * (0.55 + band));
  float fade = mix(1.0 - smoothstep(0.45 + lift, 0.9 + lift, h), 1.0, uEven);

  vec3 cloud = mix(uRim, uCore, smoothstep(0.5, 1.0, dens));
  fragColor = vec4(mix(uSky, cloud, dens * fade * uOpacity), 1.0);
}
`;

function createShader(gl, type, source) {
  const s = gl.createShader(type);
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

const TONES = {
  night: { sky: [0.04, 0.04, 0.05], rim: [0.35, 0.20, 0.20], core: [0.18, 0.12, 0.12], opacity: 0.38, even: 0.0, scale: 3.2 },
  ivory: { sky: [0.957, 0.945, 0.918], rim: [1.0, 1.0, 1.0], core: [0.84, 0.82, 0.78], opacity: 0.75, even: 1.0, scale: 5.5 },
  light_hero: { sky: [0.96, 0.97, 0.98], rim: [0.92, 0.88, 0.88], core: [0.85, 0.78, 0.78], opacity: 0.45, even: 0.0, scale: 3.2 }
};

let activeCanvases = [];

function initCloudCanvas() {
  const canvases = document.querySelectorAll('canvas[data-cloud-canvas]');
  activeCanvases = [];
  canvases.forEach(canvas => {
    const tone = canvas.dataset.cloudCanvas || 'night';
    setupSingleCloudCanvas(canvas, tone);
  });

  window.updateCloudCanvasTheme = (theme) => {
    activeCanvases.forEach(item => {
      if (item.canvas.dataset.cloudCanvas === 'night') {
        const newToneKey = theme === 'dark' ? 'night' : 'light_hero';
        item.setTone(newToneKey);
      }
    });
  };
}

function setupSingleCloudCanvas(canvas, toneKey) {
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false });
  if (!gl) return;

  const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vs || !fs) return;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, 'uRes');
  const uTime = gl.getUniformLocation(prog, 'uTime');

  function applyTone(key) {
    const tone = TONES[key] || TONES.night;
    gl.uniform3fv(gl.getUniformLocation(prog, 'uSky'), tone.sky);
    gl.uniform3fv(gl.getUniformLocation(prog, 'uRim'), tone.rim);
    gl.uniform3fv(gl.getUniformLocation(prog, 'uCore'), tone.core);
    gl.uniform1f(gl.getUniformLocation(prog, 'uOpacity'), tone.opacity);
    gl.uniform1f(gl.getUniformLocation(prog, 'uEven'), tone.even);
    gl.uniform1f(gl.getUniformLocation(prog, 'uScale'), tone.scale);
  }

  // If in light mode at start and this is the hero canvas, use light_hero
  if (toneKey === 'night' && currentTheme === 'light') {
    applyTone('light_hero');
  } else {
    applyTone(toneKey);
  }

  let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let rafId = 0;
  let isIntersecting = true;
  let simTime = 12;
  let lastTime = performance.now();

  function render() {
    gl.uniform1f(uTime, simTime);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function resize() {
    const w = Math.max(1, Math.round(0.4 * canvas.clientWidth));
    const h = Math.max(1, Math.round(0.4 * canvas.clientHeight));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    }
    render();
  }

  function tick(now) {
    const delta = Math.min(now - lastTime, 100) / 1000;
    simTime += delta;
    lastTime = now;
    render();
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    cancelAnimationFrame(rafId);
    if (!reducedMotion && isIntersecting && !document.hidden) {
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    }
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const io = new IntersectionObserver(([entry]) => {
    isIntersecting = entry.isIntersecting;
    start();
  });
  io.observe(canvas);

  document.addEventListener('visibilitychange', start);

  resize();
  render();
  start();

  activeCanvases.push({ canvas, setTone: applyTone });
}

/* =========================================================================
   5. HERO UNDULATING SINE WAVES
   ========================================================================= */
function initHeroWaves() {
  const waveContainer = document.querySelector('.hero-waves-svg');
  if (!waveContainer) return;
  const paths = waveContainer.querySelectorAll('.nx-wave-strand');
  if (!paths.length) return;

  const strands = [
    { amp: 179, freq: 2.9, phase: 0, speed: 0.29, opacity: 0.85 },
    { amp: 152, freq: 3.3, phase: 1.1, speed: -0.34, opacity: 0.7 },
    { amp: 165, freq: 2.6, phase: 2.3, speed: 0.22, opacity: 0.6 },
    { amp: 130, freq: 3.6, phase: 3.4, speed: -0.26, opacity: 0.55 },
    { amp: 185, freq: 2.3, phase: 4.6, speed: 0.38, opacity: 0.45 },
    { amp: 117, freq: 4.0, phase: 5.5, speed: -0.19, opacity: 0.4 }
  ];

  const harmonics = [
    { weight: 0.55, freqMul: 1, speedMul: 1 },
    { weight: 0.3, freqMul: 2.31, speedMul: -1.7 },
    { weight: 0.15, freqMul: 4.13, speedMul: 2.6 }
  ];

  function computeStrand(strand, t) {
    let d = "";
    for (let n = 0; n <= 240; n++) {
      let x = 150 + 3.6791666666666667 * n;
      let dist = 1033 - x;
      let s_d = Math.pow(Math.min(dist / 478, 1), 0.9);
      let a_d = Math.min(dist / 120, 1);
      let val = 0;
      for (let i = 0; i < harmonics.length; i++) {
        let h = harmonics[i];
        val += h.weight * Math.sin((strand.freq * h.freqMul * dist) / 100 + strand.phase * (i + 1) + strand.speed * h.speedMul * t);
      }
      let y = 195.5 + strand.amp * (a_d * a_d * (3 - 2 * a_d) * s_d) * val;
      d += `${0 === n ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return d;
  }

  const startTime = performance.now();
  function loop(now) {
    const elapsed = (now - startTime) / 1000;
    for (let i = 0; i < strands.length; i++) {
      if (paths[i]) {
        paths[i].setAttribute('d', computeStrand(strands[i], elapsed));
      }
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

/* =========================================================================
   6. HERO ORBITS & TRAVELING DOTS
   ========================================================================= */
function initHeroOrbits() {
  const orbitSvg = document.querySelector('.nx-orbit-svg');
  if (!orbitSvg) return;

  const rails = [
    { id: "nx-rail-1", d: "M129.945 53.58 A461.34 53.08 0 0 1 1052.63 53.58", seed: 278.9, dur: 17, fill: "#dc2626" },
    { id: "nx-rail-2", d: "M129.945 53.58 A461.34 31.17 0 0 1 1052.63 53.58", seed: 350.463, dur: 21, fill: "#ffffff" },
    { id: "nx-rail-3", d: "M129.945 53.58 A461.34 31.17 0 0 0 1052.63 53.58", seed: 233.963, dur: 19, fill: "#ef4444" },
    { id: "nx-rail-4", d: "M129.945 53.58 A461.34 53.08 0 0 0 1052.63 53.58", seed: 444.205, dur: 24, fill: "#ffffff" },
    { id: "nx-rail-5", d: "M0 53.08 L593.172 53.08", seed: 506.92, dur: 13, fill: "#f87171" }
  ];

  const pathEls = orbitSvg.querySelectorAll('path[data-rail]');
  const dotEls = orbitSvg.querySelectorAll('.nx-orbit-dot');
  if (!pathEls.length || !dotEls.length) return;

  const lengths = Array.from(pathEls).map(p => p.getTotalLength());
  const initialFractions = Array.from(pathEls).map((p, r) => {
    const len = lengths[r];
    if (!p || !len) return 0;
    let low = 0, high = len;
    for (let e = 0; e < 24; e++) {
      let mid = (low + high) / 2;
      p.getPointAtLength(mid).x < rails[r].seed ? (low = mid) : (high = mid);
    }
    return low / len;
  });

  function setPos(idx, frac) {
    const path = pathEls[idx];
    const dot = dotEls[idx];
    if (!path || !dot || !lengths[idx]) return;
    const pt = path.getPointAtLength(((frac % 1) + 1) % 1 * lengths[idx]);
    dot.setAttribute('cx', pt.x.toFixed(2));
    dot.setAttribute('cy', pt.y.toFixed(2));
  }

  rails.forEach((_, idx) => setPos(idx, initialFractions[idx]));

  const t0 = performance.now();
  function animateDots(now) {
    const elapsed = (now - t0) / 1000;
    rails.forEach((r, idx) => {
      setPos(idx, initialFractions[idx] + elapsed / r.dur);
    });
    requestAnimationFrame(animateDots);
  }
  requestAnimationFrame(animateDots);
}

/* =========================================================================
   7. BILINGUAL DESKTOP SHOWCASE (EN / ID)
   ========================================================================= */
const DEMO_DATA = {
  en: [
    {
      tabTitle: "Spotlight Search",
      tabShort: "Instant Search",
      query: "source:on_device kind:document type:pdf",
      subtitle: "Extensions: pdf · Source: On-Device · Latency: 18ms",
      badge: "4 Results Indexed Locally",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      results: [
        {
          icon: "pdf",
          title: "AcmeCorp - Report - Annual Report 2024.pdf",
          meta: "~/Downloads · 12 MB · Mon, 03 Aug",
          highlight: true,
          badge: "Exact Match",
          preview: {
            title: "AcmeCorp - Report - Annual Report 2024.pdf",
            path: "~/Downloads/AcmeCorp - Report - Annual Report 2024.pdf",
            rule: "Standard: Category / Type First",
            tags: ["internal-ops", "audit-2024", "executive"],
            info: [
              { k: "Size", v: "12 MB" },
              { k: "Pages", v: "55" },
              { k: "Engine", v: "Rust Worker · OpenSearch" },
              { k: "Security", v: "Verified On-Device" }
            ]
          }
        },
        {
          icon: "pdf",
          title: "Financial Statement 2024_Audited_Draft.pdf",
          meta: "~/Downloads · 4.7 MB · Fri, 31 Jul",
          highlight: false,
          badge: "Reconciled"
        },
        {
          icon: "pdf",
          title: "Strategic Product Roadmap 2025.pdf",
          meta: "~/Downloads · 63 MB · Fri, 31 Jul",
          highlight: false,
          badge: "Cached"
        },
        {
          icon: "pdf",
          title: "Quarterly Presentation - Tech Deck.pdf",
          meta: "~/Downloads · 2.5 MB · Fri, 03 Jul",
          highlight: false,
          badge: "Indexed"
        }
      ]
    },
    {
      tabTitle: "Purview Guard",
      tabShort: "Document RBAC",
      query: "Q3 Executive Payroll & Bonus Distribution",
      subtitle: "Enforcing Microsoft Entra ID & SharePoint Document-Level Purview",
      badge: "Fail-Closed RBAC Active",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      results: [
        {
          icon: "shield",
          title: "Security Filter: 14 Confidential Payroll Records Excluded",
          meta: "Policy: If user cannot open in OneDrive, file does not exist in SearchPoint.",
          highlight: true,
          badge: "Fail-Closed",
          preview: {
            title: "Document Purview Enforcement",
            path: "Microsoft 365 Tenant / SharePoint Admin Core",
            rule: "Zero Accidental Oversharing Guarantee",
            tags: ["zero-leak", "acl-true", "entra-id"],
            info: [
              { k: "Caller", v: "sales.lead@enterprise.com" },
              { k: "Purview", v: "Departmental Access Only" },
              { k: "Status", v: "Restricted Files Omitted" },
              { k: "Audit", v: "Logged to HashiCorp Vault" }
            ]
          }
        },
        {
          icon: "sheet",
          title: "Departmental Q3 Sales Commission Summary.xlsx",
          meta: "SharePoint Commercial Site · 1.4 MB · Permitted",
          highlight: false,
          badge: "Authorized"
        },
        {
          icon: "doc",
          title: "Performance Review Guidelines 2024.docx",
          meta: "OneDrive Public Team Drive · 850 KB · Permitted",
          highlight: false,
          badge: "Authorized"
        }
      ]
    },
    {
      tabTitle: "Intelligent Rename",
      tabShort: "Smart AI Rename",
      query: "status:unorganized folder:~/Downloads",
      subtitle: "On-device AI reads document contents and normalizes filenames",
      badge: "3 Renames Suggested",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      results: [
        {
          icon: "sparkle",
          title: "download(3).pdf ➔ Report - Indorelawan - 2020 - Laporan Tahunan.pdf",
          meta: "Detected: Official Annual Report · Tagged: Finance / Non-Profit",
          highlight: true,
          badge: "Content Parsed",
          preview: {
            title: "Intelligent Document Categorization",
            path: "~/Downloads/download(3).pdf",
            rule: "Rule: Category / Organization / Year / Document Title",
            tags: ["auto-rename", "clean-archive", "zero-clutter"],
            info: [
              { k: "Original", v: "download(3).pdf" },
              { k: "Suggested", v: "Report - Indorelawan - 2020.pdf" },
              { k: "Model", v: "On-Device Lightweight Neural" },
              { k: "Latency", v: "34ms (100% Private)" }
            ]
          }
        },
        {
          icon: "sparkle",
          title: "cloudframework_tencentCloud_v3.pdf ➔ Architecture - Tencent Cloud 2026.pdf",
          meta: "Detected: Cloud Architecture Evaluation Deck",
          highlight: false,
          badge: "Normalized"
        },
        {
          icon: "sparkle",
          title: "Receipt-2336-2279.pdf ➔ Finance - Receipt - Hardware Purchase May 2026.pdf",
          meta: "Detected: Vendor Tax Invoice & Proof of Payment",
          highlight: false,
          badge: "Tax Tagged"
        }
      ]
    },
    {
      tabTitle: "Knowledge Layer for LLMs",
      tabShort: "Grounded AI",
      query: "“What did we decide on the 2026 vendor contract payment terms?”",
      subtitle: "Feeding ChatGPT, Claude, and Ollama verified citations without leaks",
      badge: "100% Verified Citation",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      results: [
        {
          icon: "ai",
          title: "Clause Found: Section 4.2 specifies Net-30 payment terms.",
          meta: "Source: SharePoint / Legal / Vendor_Contract_Signed_2026.pdf · Page 14",
          highlight: true,
          badge: "Grounded Citations",
          preview: {
            title: "Verified Enterprise AI Retrieval",
            path: "SharePoint / Corporate Legal / Master Services Agreement",
            rule: "Zero Hallucination Retrieval Augmented Generation",
            tags: ["ollama", "claude-rag", "m365-grounding"],
            info: [
              { k: "Match", v: "Section 4.2 (Net-30 Terms)" },
              { k: "Confidence", v: "99.8% (Exact Reference)" },
              { k: "Retention", v: "Zero File Storage" },
              { k: "Purview", v: "Legal & Procurement Allowed" }
            ]
          }
        },
        {
          icon: "doc",
          title: "Vendor SLA Addendum - Hardware Delivery Schedule.pdf",
          meta: "SharePoint / Operations · Clause 2.1 (3-day delivery window)",
          highlight: false,
          badge: "Cross-Referenced"
        }
      ]
    }
  ],

  id: [
    {
      tabTitle: "Pencarian Spotlight",
      tabShort: "Pencarian Instan",
      query: "sumber:perangkat jenis:dokumen tipe:pdf",
      subtitle: "Ekstensi: pdf · Sumber: Perangkat Lokal · Latensi: 18ms",
      badge: "4 Hasil Terindeks Lokal",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      results: [
        {
          icon: "pdf",
          title: "AcmeCorp - Laporan - Laporan Tahunan 2024.pdf",
          meta: "~/Unduhan · 12 MB · Sen, 03 Agu",
          highlight: true,
          badge: "Cocok Tepat",
          preview: {
            title: "AcmeCorp - Laporan - Laporan Tahunan 2024.pdf",
            path: "~/Unduhan/AcmeCorp - Laporan - Laporan Tahunan 2024.pdf",
            rule: "Aturan: Kategori / Tipe Dokumen",
            tags: ["internal-ops", "audit-2024", "eksekutif"],
            info: [
              { k: "Ukuran", v: "12 MB" },
              { k: "Halaman", v: "55" },
              { k: "Mesin", v: "Worker Rust · OpenSearch" },
              { k: "Keamanan", v: "Terverifikasi Lokal" }
            ]
          }
        },
        {
          icon: "pdf",
          title: "Laporan Keuangan 2024_Diaudit_Draf.pdf",
          meta: "~/Unduhan · 4.7 MB · Jum, 31 Jul",
          highlight: false,
          badge: "Terekonsiliasi"
        },
        {
          icon: "pdf",
          title: "Peta Jalan Produk Strategis 2025.pdf",
          meta: "~/Unduhan · 63 MB · Jum, 31 Jul",
          highlight: false,
          badge: "Tercache"
        },
        {
          icon: "pdf",
          title: "Presentasi Kuartalan - Dek Teknologi.pdf",
          meta: "~/Unduhan · 2.5 MB · Jum, 03 Jul",
          highlight: false,
          badge: "Terindeks"
        }
      ]
    },
    {
      tabTitle: "Proteksi Izin (RBAC)",
      tabShort: "RBAC Dokumen",
      query: "Gaji Eksekutif Q3 & Distribusi Bonus",
      subtitle: "Menegakkan Izin Dokumen Microsoft Entra ID & SharePoint M365",
      badge: "RBAC Fail-Closed Aktif",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      results: [
        {
          icon: "shield",
          title: "Filter Keamanan: 14 Berkas Gaji Rahasia Dikecualikan",
          meta: "Kebijakan: Jika user tak berhak buka di OneDrive, berkas tak ada di SearchPoint.",
          highlight: true,
          badge: "Fail-Closed",
          preview: {
            title: "Penegakan Izin Dokumen M365",
            path: "Tenant Microsoft 365 / Inti Admin SharePoint",
            rule: "Jaminan Tanpa Kebocoran Informasi (No Oversharing)",
            tags: ["tanpa-bocor", "acl-asli", "entra-id"],
            info: [
              { k: "Pengguna", v: "tim.sales@enterprise.com" },
              { k: "Hak Akses", v: "Akses Departemen Saja" },
              { k: "Status", v: "Berkas Rahasia Dikecualikan" },
              { k: "Audit", v: "Tercatat di HashiCorp Vault" }
            ]
          }
        },
        {
          icon: "sheet",
          title: "Rekap Komisi Penjualan Departemen Q3.xlsx",
          meta: "Situs Komersial SharePoint · 1.4 MB · Diizinkan",
          highlight: false,
          badge: "Diotorisasi"
        },
        {
          icon: "doc",
          title: "Panduan Evaluasi Kinerja Karyawan 2024.docx",
          meta: "OneDrive Tim Publik · 850 KB · Diizinkan",
          highlight: false,
          badge: "Diotorisasi"
        }
      ]
    },
    {
      tabTitle: "Rename AI Pintar",
      tabShort: "Rename Otomatis",
      query: "status:belum_rapi folder:~/Unduhan",
      subtitle: "AI di perangkat membaca isi dokumen dan menstandarkan nama berkas",
      badge: "3 Saran Rename",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      results: [
        {
          icon: "sparkle",
          title: "download(3).pdf ➔ Laporan - Indorelawan - 2020 - Laporan Tahunan.pdf",
          meta: "Terdeteksi: Laporan Tahunan Resmi · Tag: Keuangan / Organisasi",
          highlight: true,
          badge: "Konten Dibaca",
          preview: {
            title: "Kategorisasi Dokumen Otomatis",
            path: "~/Unduhan/download(3).pdf",
            rule: "Aturan: Kategori / Entitas / Tahun / Judul",
            tags: ["rename-otomatis", "arsip-rapi", "tanpa-sampah"],
            info: [
              { k: "Asli", v: "download(3).pdf" },
              { k: "Saran", v: "Laporan - Indorelawan - 2020.pdf" },
              { k: "Model", v: "Neural Ringan On-Device" },
              { k: "Latensi", v: "34ms (100% Privat)" }
            ]
          }
        },
        {
          icon: "sparkle",
          title: "cloudframework_tencentCloud_v3.pdf ➔ Arsitektur - Tencent Cloud 2026.pdf",
          meta: "Terdeteksi: Dokumen Evaluasi Arsitektur Cloud",
          highlight: false,
          badge: "Ternormalisasi"
        },
        {
          icon: "sparkle",
          title: "Kwitansi-2336-2279.pdf ➔ Keuangan - Kwitansi - Pengadaan Server Mei 2026.pdf",
          meta: "Terdeteksi: Faktur Pajak Vendor & Bukti Bayar",
          highlight: false,
          badge: "Tag Pajak"
        }
      ]
    },
    {
      tabTitle: "Lapisan AI (RAG)",
      tabShort: "Grounding AI",
      query: "“Apa kesepakatan tempo pembayaran kontrak vendor 2026?”",
      subtitle: "Menyuapkan sitasi terverifikasi ke ChatGPT, Claude, dan Ollama tanpa kebocoran",
      badge: "100% Sitasi Terverifikasi",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      results: [
        {
          icon: "ai",
          title: "Klausa Ditemukan: Pasal 4.2 menetapkan tempo pembayaran Net-30.",
          meta: "Sumber: SharePoint / Legal / Kontrak_Vendor_Ditandatangani_2026.pdf · Hal 14",
          highlight: true,
          badge: "Sitasi Terverifikasi",
          preview: {
            title: "Pengambilan AI Korporasi Teruji",
            path: "SharePoint / Legal Perusahaan / Perjanjian Layanan Utama",
            rule: "RAG Tanpa Halusinasi Berbasis Data Riil",
            tags: ["ollama", "claude-rag", "m365-grounding"],
            info: [
              { k: "Klausa", v: "Pasal 4.2 (Syarat Net-30)" },
              { k: "Akurasi", v: "99.8% (Referensi Tepat)" },
              { k: "Penyimpanan", v: "Nol Berkas Tersimpan" },
              { k: "Akses", v: "Diizinkan untuk Legal & Pengadaan" }
            ]
          }
        },
        {
          icon: "doc",
          title: "Addendum SLA Vendor - Jadwal Pengiriman Hardware.pdf",
          meta: "SharePoint / Operasional · Pasal 2.1 (Window kirim 3 hari)",
          highlight: false,
          badge: "Referensi Silang"
        }
      ]
    }
  ]
};

function initDesktopShowcaseDemo() {
  const container = document.getElementById('desktop-search');
  if (!container) return;

  const queryInput = container.querySelector('[data-demo-query]');
  const badgeEl = container.querySelector('[data-demo-badge]');
  const subtitleEl = container.querySelector('[data-demo-subtitle]');
  const listEl = container.querySelector('[data-demo-results]');
  const previewCardEl = container.querySelector('[data-demo-preview]');
  const tabs = container.querySelectorAll('[data-demo-tab]');

  let currentIdx = 0;
  let isHovered = false;
  let timerId = null;

  function renderScenario(idx, lang) {
    const list = DEMO_DATA[lang] || DEMO_DATA.en;
    const data = list[idx] || list[0];
    if (!data) return;

    if (queryInput) queryInput.value = data.query;
    if (subtitleEl) subtitleEl.textContent = data.subtitle;
    if (badgeEl) {
      badgeEl.textContent = data.badge;
      badgeEl.className = `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${data.badgeColor}`;
    }

    // Render Results List
    if (listEl) {
      listEl.innerHTML = '';
      data.results.forEach((item) => {
        const itemDiv = document.createElement('div');
        const isHighlight = item.highlight;
        itemDiv.className = `group p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
          isHighlight
            ? 'bg-white/[0.08] dark:bg-white/[0.06] border-[#dc2626]/40 shadow-md border-l-4 border-l-[#dc2626]'
            : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
        }`;

        let iconSvg = '';
        if (item.icon === 'pdf') {
          iconSvg = `<div class="p-2 rounded-lg border shrink-0 text-red-500 bg-red-500/10 border-red-500/20"><svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg></div>`;
        } else if (item.icon === 'shield') {
          iconSvg = `<div class="p-2 rounded-lg border shrink-0 text-emerald-500 bg-emerald-500/10 border-emerald-500/20"><svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg></div>`;
        } else if (item.icon === 'sparkle') {
          iconSvg = `<div class="p-2 rounded-lg border shrink-0 text-amber-500 bg-amber-500/10 border-amber-500/20"><svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg></div>`;
        } else if (item.icon === 'ai') {
          iconSvg = `<div class="p-2 rounded-lg border shrink-0 text-purple-500 bg-purple-500/10 border-purple-500/20"><svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/></svg></div>`;
        } else {
          iconSvg = `<div class="p-2 rounded-lg border shrink-0 text-blue-500 bg-blue-500/10 border-blue-500/20"><svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/></svg></div>`;
        }

        itemDiv.innerHTML = `
          ${iconSvg}
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-1">
              <h4 class="text-xs font-semibold theme-text-primary truncate group-hover:text-[#dc2626] transition-colors">${item.title}</h4>
              <span class="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10 dark:bg-white/10 theme-text-muted shrink-0 font-medium">${item.badge}</span>
            </div>
            <p class="text-[10px] theme-text-muted font-mono truncate mt-0.5">${item.meta}</p>
          </div>`;
        listEl.appendChild(itemDiv);
      });
    }

    // Render Preview Pane
    if (previewCardEl && data.results[0].preview) {
      const p = data.results[0].preview;
      const infoHtml = p.info.map(row => `
        <div class="flex justify-between py-1 border-b border-white/5 dark:border-white/5 text-[11px]">
          <span class="theme-text-muted">${row.k}</span>
          <span class="theme-text-primary font-medium font-mono">${row.v}</span>
        </div>`).join('');

      const tagsHtml = p.tags.map(t => `<span class="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono theme-text-muted">${t}</span>`).join('');

      previewCardEl.innerHTML = `
        <div class="space-y-3 p-4 flex flex-col justify-between h-full">
          <div>
            <div class="pb-3 border-b border-white/10 space-y-1.5">
              <span class="text-[10px] uppercase font-bold tracking-wider text-[#dc2626]">${lang === 'id' ? 'Kartu Dokumen Terpilih' : 'Document Card'}</span>
              <h3 class="text-xs sm:text-sm font-bold theme-text-primary truncate">${p.title}</h3>
              <p class="text-[10px] theme-text-muted font-mono truncate">${p.path}</p>
            </div>
            <div class="mt-3 p-2.5 rounded-xl border border-white/10 bg-white/[0.03] space-y-2">
              <p class="text-[10px] font-semibold text-emerald-500 flex items-center gap-1.5">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>${p.rule}
              </p>
              <div class="flex flex-wrap gap-1">${tagsHtml}</div>
            </div>
            <div class="mt-3 space-y-0.5">${infoHtml}</div>
          </div>
          <div class="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] theme-text-muted">
            <span>${lang === 'id' ? 'Tekan' : 'Press'} <kbd class="font-mono font-semibold theme-text-primary">↵ Enter</kbd> ${lang === 'id' ? 'buka berkas' : 'to inspect'}</span>
            <span class="text-[#dc2626] font-medium">${lang === 'id' ? 'Sumber Terpetakan' : 'Native Source Mapped'}</span>
          </div>
        </div>`;
    }

    // Update Tabs
    tabs.forEach((tab, i) => {
      const isSelected = i === idx;
      tab.setAttribute('aria-checked', isSelected ? 'true' : 'false');
      tab.classList.toggle('opacity-100', isSelected);
      tab.classList.toggle('bg-white/15', isSelected);
      tab.classList.toggle('theme-text-primary', isSelected);
      tab.classList.toggle('opacity-60', !isSelected);

      // Update Tab text if in list
      const labelSpan = tab.querySelector('span');
      if (labelSpan && list[i]) {
        labelSpan.textContent = list[i].tabTitle;
      } else if (list[i]) {
        tab.textContent = list[i].tabTitle;
      }
    });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      currentIdx = i;
      renderScenario(currentIdx, currentLang);
    });
  });

  container.addEventListener('mouseenter', () => { isHovered = true; });
  container.addEventListener('mouseleave', () => { isHovered = false; });

  function autoCycle() {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      if (!isHovered) {
        currentIdx = (currentIdx + 1) % DEMO_DATA[currentLang].length;
        renderScenario(currentIdx, currentLang);
      }
      autoCycle();
    }, 8500);
  }

  window.updateDemoLanguage = (lang) => {
    renderScenario(currentIdx, lang);
  };

  renderScenario(0, currentLang);
  autoCycle();
}

/* =========================================================================
   8. HOW IT WORKS (SVG GLYPH SCROLL DRAW)
   ========================================================================= */
function initHowItWorks() {
  const section = document.getElementById('architecture');
  if (!section) return;

  const glyphs = section.querySelectorAll('.nx-glyph');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        glyphs.forEach((g, idx) => {
          setTimeout(() => {
            g.setAttribute('data-drawn', 'true');
          }, idx * 120);
        });
      }
    });
  }, { threshold: 0.15 });

  io.observe(section);
}

/* =========================================================================
   9. CAROUSELS (FEATURES)
   ========================================================================= */
function initCarousels() {
  const featuresSec = document.getElementById('features');
  if (featuresSec) {
    setupCarousel(featuresSec);
  }

  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    const prevBtn = sec.querySelector('button[aria-label*="Previous"]');
    const nextBtn = sec.querySelector('button[aria-label*="Next"]');
    if (prevBtn && nextBtn && sec !== featuresSec) {
      setupCarousel(sec);
    }
  });
}

function setupCarousel(container) {
  const scrollTrack = container.querySelector('.overflow-x-auto');
  const prevBtns = container.querySelectorAll('button[aria-label*="Previous"]');
  const nextBtns = container.querySelectorAll('button[aria-label*="Next"]');

  if (!scrollTrack) return;

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = scrollTrack.querySelector('[data-card], article');
      const step = (card ? card.offsetWidth : 360) + 20;
      scrollTrack.scrollBy({ left: -step, behavior: 'smooth' });
    });
  });

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = scrollTrack.querySelector('[data-card], article');
      const step = (card ? card.offsetWidth : 360) + 20;
      scrollTrack.scrollBy({ left: step, behavior: 'smooth' });
    });
  });
}

/* =========================================================================
   10. BILINGUAL FAQ ACCORDION (EN / ID)
   ========================================================================= */
const FAQ_DATA = {
  en: [
    {
      q: "Do you store copies or binary contents of our company files?",
      a: "No. SearchPoint is an indexing and retrieval engine, NOT a document repository. We never store copies or binaries of your files. During indexing, content is parsed temporarily in an isolated, short-lived Rust sandbox and immediately purged from memory. SearchPoint only retains metadata, keywords, and text summaries in your private OpenSearch instance."
    },
    {
      q: "How does SearchPoint enforce permissions and prevent accidental oversharing?",
      a: "This is our core architectural differentiator: document-level purview enforced per query, mirroring your real Microsoft 365, SharePoint, and filesystem permissions. If an employee cannot open a document in OneDrive or Windows, they will not see it in SearchPoint or AI context. Authorization is strictly fail-closed — if a snapshot is missing, access is denied."
    },
    {
      q: "What happens when a document is deleted, moved, or locked down at the source?",
      a: "Truth-mirroring deletes are instantaneous. Through Microsoft Graph delta queries and real-time reconciliation backstops, whenever a file is deleted, moved, or restricted at the source, it disappears immediately from SearchPoint. No ghost copies haunt search results or AI pipelines."
    },
    {
      q: "Do we need to migrate our files or re-upload them to your cloud?",
      a: "Zero migration and zero re-upload. SearchPoint connects directly to your existing Microsoft Entra ID (Azure AD), OneDrive, SharePoint sites, and local desktop directories. Your data stays exactly where it lives today."
    },
    {
      q: "Can SearchPoint be deployed fully on-premise or in our private tenant?",
      a: "Yes. The entire stack runs self-hosted on your own VMs and private network. No document content ever leaves your tenant into a third-party SaaS. All credentials and encryption keys are stored and rotated in HashiCorp Vault with KMS auto-unseal (AWS/Azure/GCP) and mTLS certificate revocation checking."
    },
    {
      q: "How does the on-device AI Intelligent Rename feature work?",
      a: "SearchPoint uses a lightweight on-device neural model that inspects the structure and first few pages of chaotic downloads (e.g. `download(3).pdf` or raw scanner files). It automatically suggests clean, standardized naming conventions (such as `Category - Entity - Year - Title.pdf`) without sending file content over the internet."
    },
    {
      q: "Which search operators and languages are supported?",
      a: "SearchPoint supports boolean logic operators (AND, OR, NOT), exact phrase matching, field boosting (`source:on_device`, `type:pdf`), fuzzy tolerance for typos, and full multilingual stemming for English and Bahasa Indonesia."
    },
    {
      q: "How does SearchPoint ground LLMs (like ChatGPT, Claude, or Ollama)?",
      a: "SearchPoint provides a structured, context-rich retrieval pipeline (RAG). When you query your AI, SearchPoint fetches only verified, permission-permitted document snippets with verbatim source citations. This eliminates hallucinations while ensuring confidential executive documents are never leaked into employee AI prompts."
    }
  ],

  id: [
    {
      q: "Apakah SearchPoint menyimpan salinan atau isi biner dokumen kami?",
      a: "Tidak. SearchPoint adalah mesin pengindeksan dan pencarian, BUKAN repositori dokumen. Kami tidak pernah menyimpan salinan atau berkas biner dokumen Anda. Selama pengindeksan, konten diparsing sementara dalam sandbox Rust yang terisolasi dan langsung dihapus dari memori. SearchPoint hanya menyimpan metadata, kata kunci, dan ringkasan teks di klaster OpenSearch privat Anda."
    },
    {
      q: "Bagaimana SearchPoint menegakkan izin dan mencegah kebocoran data (oversharing)?",
      a: "Ini adalah pembeda arsitektural utama kami: penegakan izin tingkat dokumen per kueri secara real-time, mencerminkan izin asli Microsoft 365, SharePoint, dan filesystem lokal Anda. Jika seorang karyawan tidak berhak membuka dokumen di OneDrive atau Windows, berkas tersebut tidak akan muncul di SearchPoint atau konteks AI. Otorisasi bersifat fail-closed — jika snapshot izin belum lengkap, akses langsung ditolak."
    },
    {
      q: "Apa yang terjadi saat dokumen dihapus, dipindah, atau dikunci di sumber aslinya?",
      a: "Penghapusan cermin kebenaran bersifat seketika. Melalui kueri delta Microsoft Graph dan sistem rekonsiliasi berkala, begitu berkas dihapus atau dibatasi di sumbernya, berkas tersebut seketika hilang dari indeks SearchPoint. Tidak ada salinan hantu yang tertinggal pada hasil pencarian maupun pipeline AI."
    },
    {
      q: "Apakah kami perlu memindahkan atau mengunggah ulang berkas ke cloud SearchPoint?",
      a: "Nol migrasi dan tanpa unggah ulang. SearchPoint terhubung langsung ke Microsoft Entra ID (Azure AD), OneDrive, situs SharePoint, serta direktori desktop lokal Anda yang sudah berjalan. Berkas dan data Anda tetap berada tepat di tempat penyimpanannya saat ini."
    },
    {
      q: "Bisakah SearchPoint diinstal sepenuhnya secara on-premise di jaringan privat kami?",
      a: "Bisa. Seluruh stack SearchPoint dapat dijalankan mandiri (self-hosted) di atas VM dan jaringan privat Anda sendiri. Tidak ada konten dokumen yang pernah keluar dari tenant Anda ke SaaS pihak ketiga. Seluruh rahasia dan kunci dikelola di HashiCorp Vault dengan auto-unseal KMS cloud dan verifikasi mTLS dengan CRL checking."
    },
    {
      q: "Bagaimana cara kerja fitur Rename Pintar AI On-Device?",
      a: "SearchPoint menggunakan model neural ringan yang berjalan sepenuhnya di perangkat lokal Anda untuk memeriksa struktur isi berkas unduhan acak (misal: `download(3).pdf` atau berkas scanner). Model ini mengusulkan standarisasi penamaan berkas yang rapi (seperti `Kategori - Lembaga - Tahun - Judul.pdf`) tanpa mengirimkan berkas Anda ke internet."
    },
    {
      q: "Operator pencarian dan bahasa apa saja yang didukung?",
      a: "SearchPoint mendukung operator logika boolean (AND, OR, NOT), pencarian frasa tepat dengan tanda kutip, filter atribut field (`source:on_device`, `type:pdf`), toleransi salah ketik (fuzzy), dan stemming multibahasa penuh untuk Bahasa Indonesia dan Bahasa Inggris."
    },
    {
      q: "Bagaimana SearchPoint menyuplai konteks bagi model AI (Claude, ChatGPT, Ollama)?",
      a: "SearchPoint menyediakan pipeline retrieval (RAG) berizin ketat. Ketika karyawan bertanya pada AI, SearchPoint hanya mengambil potongan dokumen yang memang diizinkan untuk dibaca oleh karyawan tersebut, lengkap dengan sitasi sumber asli. Hal ini mengeliminasi halusinasi sekaligus menjamin berkas rahasia eksekutif tidak bocor ke prompt AI karyawan biasa."
    }
  ]
};

let faqRevealObserver = null;

function initFaq() {
  window.renderFaqList = (lang) => {
    const faqSec = document.getElementById('faq');
    if (!faqSec) return;
    const listContainer = faqSec.querySelector('ul');
    if (!listContainer) return;

    if (faqRevealObserver) {
      faqRevealObserver.disconnect();
      faqRevealObserver = null;
    }

    const list = FAQ_DATA[lang] || FAQ_DATA.en;
    listContainer.innerHTML = '';

    list.forEach((item, idx) => {
      const li = document.createElement('li');
      const number = String(idx + 1).padStart(2, '0');
      li.className = 'faq-item';
      li.style.setProperty('--reveal-delay', `${Math.min(idx * 55, 440)}ms`);
      li.innerHTML = `
        <button type="button" aria-expanded="false" aria-controls="sp-faq-panel-${idx}" class="faq-question">
          <span class="faq-number">${number}</span>
          <span class="faq-question-text">${item.q}</span>
          <span class="faq-icon" aria-hidden="true">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
              <path d="M6 1.5v9M1.5 6h9"></path>
            </svg>
          </span>
        </button>
        <div id="sp-faq-panel-${idx}" role="region" class="faq-answer">
          <div class="faq-answer-inner"><p>${item.a}</p></div>
        </div>`;

      const btn = li.querySelector('button');
      const panel = li.querySelector(`#sp-faq-panel-${idx}`);
      const svg = li.querySelector('.faq-icon');

      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          btn.setAttribute('aria-expanded', 'false');
          li.classList.remove('is-open');
          panel.style.maxHeight = '0px';
          svg.style.transform = 'rotate(0deg)';
        } else {
          btn.setAttribute('aria-expanded', 'true');
          li.classList.add('is-open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          svg.style.transform = 'rotate(45deg)';
        }
      });

      listContainer.appendChild(li);
    });

    const items = Array.from(listContainer.querySelectorAll('.faq-item'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    faqRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        faqRevealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    items.forEach((el) => faqRevealObserver.observe(el));
  };

  window.renderFaqList(currentLang);
}

/* =========================================================================
   ARCHITECTURE WIREFRAME ORBIT (canvas)
   A slow, continuously rotating wireframe spindle — same grid language as
   the reference torus, with a different silhouette.
   ========================================================================= */
function initArchMesh() {
  const canvas = document.getElementById('arch-mesh-canvas');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const wrap = canvas.closest('.arch-mesh');
  if (!ctx || !wrap) return;

  const TAU = Math.PI * 2;
  const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let W = 0;
  let H = 0;
  let dpr = 1;
  let rafId = 0;
  let running = false;
  let startedAt = 0;

  const elapsed = () => (startedAt ? (performance.now() - startedAt) / 1000 : 0);

  function draw(t) {
    if (!W || !H) return;

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const lineRgb = isLight ? '15, 23, 42' : '255, 255, 255';
    const brandRgb = isLight ? '185, 28, 28' : '248, 113, 113';
    const backAlpha = isLight ? 0.085 : 0.1;
    const frontAlpha = isLight ? 0.26 : 0.3;

    const cx = W * 0.5;
    const cy = H * 0.5;
    const scale = Math.min(W, H) * 0.34;
    const rotY = 0.6 + t * 0.2;
    const tilt = 0.4;
    const twist = 0.95 + 0.5 * Math.sin(t * 0.35);
    const ripple = 0.055 * Math.sin(t * 1.2);
    const persp = 4.6;

    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(tilt);
    const sinX = Math.sin(tilt);

    const project = (x, y, z) => {
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const k = persp / (persp - z2);
      return [cx + x1 * k * scale, cy + y1 * k * scale, z2];
    };

    const point = (u, v) => {
      const tu = u + twist * v;
      const spread = 1.42 * v;
      const breath = 1 + ripple * Math.sin(v * 4.4 - t * 1.4);
      const radius = 0.64 * Math.sqrt(1 + spread * spread) * breath;
      return [radius * Math.cos(tu), v * 1.04, radius * Math.sin(tu)];
    };

    const back = new Path2D();
    const front = new Path2D();
    const scan = new Path2D();

    const scanPhase = (t * 0.14) % 1;
    const scanV = -1 + 2 * (scanPhase < 0.5 ? scanPhase * 2 : (1 - scanPhase) * 2);

    const segment = (a, b, isScan) => {
      const path = (a[2] + b[2]) * 0.5 >= 0 ? front : back;
      path.moveTo(a[0], a[1]);
      path.lineTo(b[0], b[1]);
      if (isScan) {
        scan.moveTo(a[0], a[1]);
        scan.lineTo(b[0], b[1]);
      }
    };

    const rings = 32;
    const ringSegments = 96;
    for (let i = 0; i <= rings; i++) {
      const v = -1 + (2 * i) / rings;
      const isScan = Math.abs(v - scanV) < 0.05;
      let prev = null;
      for (let j = 0; j <= ringSegments; j++) {
        const u = (j / ringSegments) * TAU;
        const p = point(u, v);
        const proj = project(p[0], p[1], p[2]);
        if (prev) segment(prev, proj, isScan);
        prev = proj;
      }
    }

    const meridians = 54;
    const meridianSegments = 22;
    for (let j = 0; j < meridians; j++) {
      const u = (j / meridians) * TAU;
      let prev = null;
      for (let i = 0; i <= meridianSegments; i++) {
        const v = -1 + (2 * i) / meridianSegments;
        const p = point(u, v);
        const proj = project(p[0], p[1], p[2]);
        if (prev) segment(prev, proj, false);
        prev = proj;
      }
    }

    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'round';

    ctx.strokeStyle = `rgba(${lineRgb}, ${backAlpha})`;
    ctx.lineWidth = 0.7;
    ctx.stroke(back);

    ctx.strokeStyle = `rgba(${lineRgb}, ${frontAlpha})`;
    ctx.lineWidth = 0.85;
    ctx.stroke(front);

    ctx.strokeStyle = `rgba(${brandRgb}, 0.55)`;
    ctx.lineWidth = 1.15;
    ctx.stroke(scan);
  }

  function resize() {
    const rect = wrap.getBoundingClientRect();
    W = Math.max(1, rect.width);
    H = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!running) draw(reduceQuery.matches ? 1.4 : elapsed());
  }

  function frame(now) {
    if (!running) return;
    draw((now - startedAt) / 1000);
    rafId = window.requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduceQuery.matches) return;
    running = true;
    if (!startedAt) startedAt = performance.now();
    rafId = window.requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = 0;
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? start() : stop()));
    }, { threshold: 0.01 }).observe(wrap.closest('section') || wrap);
  } else {
    start();
  }

  if ('ResizeObserver' in window) {
    new ResizeObserver(resize).observe(wrap);
  } else {
    window.addEventListener('resize', resize);
  }

  if (reduceQuery.addEventListener) {
    reduceQuery.addEventListener('change', () => {
      if (reduceQuery.matches) {
        stop();
        draw(1.4);
      } else {
        start();
      }
    });
  }

  new MutationObserver(() => {
    if (!running) draw(reduceQuery.matches ? 1.4 : elapsed());
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  resize();
  if (reduceQuery.matches) draw(1.4);
}
