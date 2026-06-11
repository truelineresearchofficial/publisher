// ──────────────────────────────────────────────────────────────────────────
// Trueline Publishers — single source of truth for site copy & data.
//
// TRUST-LED, INTEGRITY-SAFE LANGUAGE ONLY. This is a scholarly publisher's
// website: a trust instrument first, a marketing site second.
//   ✓ Lead with: peer review · editorial standards · indexing · ethics ·
//     transparency.
//   ✗ NEVER: "guaranteed publication", "fast acceptance for a fee",
//     "pay to publish", "100% acceptance".
//   • State APC/fees transparently with a clear waiver policy.
//   • The paid-services ↔ editorial-decision FIREWALL is stated on every
//     relevant page.
//   • Indexing is shown as an honest, labelled ROADMAP — never implied.
//   • ISSN / DOI status is shown honestly as "pending / applied for" until
//     allocated — overclaiming is the fastest way to be flagged as predatory.
// ──────────────────────────────────────────────────────────────────────────

export const BRAND = {
  name: 'Trueline Publishers',
  // Tagline option chosen from the blueprint:
  tagline: 'Integrity-first publishing for life sciences.',
  promise: 'Where biomedical research is published, indexed, and read.',
  hq: 'Vaikuntham · Salem, Tamil Nadu, India',
  group: 'Part of the Trueline Group',
  email: 'editorial@truelinepublishers.com',
  servicesEmail: 'services@truelinepublishers.com',
}

// The flagship journal. NOTE (carried from group strategy): the legacy "JAEID"
// acronym belongs to an unrelated FAO-indexed Italian journal and is being
// retired. This site uses the re-branded biomedical identity below, with its
// own ISSN/DOI applied for before submissions are scaled. Status is shown
// honestly throughout.
export const JOURNAL = {
  name: 'Trueline Journal of Biomedical & Life Sciences',
  short: 'TJBLS',
  workingTitle: true,
  scope:
    'A peer-reviewed, open-access journal for original research, reviews and methods across biomedical and life sciences — clinical, translational, molecular, and computational biology.',
  frequency: 'Quarterly · continuous online publication',
  access: 'Open access · CC BY 4.0',
  issn: 'ISSN: applied for',
  doi: 'DOIs via Crossref (membership in progress)',
  review: 'Double-blind peer review',
}

// Site-wide legitimacy signals (header strip + footer).
export const TRUST_BADGES = [
  { label: 'Peer-reviewed', note: 'Double-blind' },
  { label: 'COPE-aligned', note: 'Publication ethics' },
  { label: 'Crossref DOI', note: 'Membership in progress' },
  { label: 'Indexing roadmap', note: 'DOAJ · Scopus · UGC-CARE' },
  { label: 'Transparent APC', note: 'With waiver policy' },
  { label: 'Open access', note: 'CC BY 4.0' },
]

// ── Navigation ─────────────────────────────────────────────────────────────
export type NavLeaf = { label: string; to: string; note?: string }
export type NavColumn = { heading: string; audience?: string; items: NavLeaf[] }
export type NavItem = {
  label: string
  to: string
  columns?: NavColumn[]
  feature?: { title: string; body: string; to: string; cta: string }
}

export const NAV: NavItem[] = [
  {
    label: 'About',
    to: '/about',
    columns: [
      {
        heading: 'The publishing house',
        items: [
          { label: 'Who we are', to: '/about#who', note: 'Mission & focus on life sciences' },
          { label: 'Leadership & editorial governance', to: '/about#governance', note: 'How decisions are made' },
          { label: 'The Trueline Group', to: '/about#group', note: 'Research · Publishers · StartNet' },
          { label: 'Contact editorial', to: '/contact', note: 'Talk to the editorial office' },
        ],
      },
      {
        heading: 'Standards & integrity',
        audience: 'The trust layer',
        items: [
          { label: 'Editorial standards & peer review', to: '/editorial-standards', note: 'Our most important page' },
          { label: 'Publication ethics & integrity', to: '/ethics', note: 'COPE-aligned, malpractice statement' },
          { label: 'Indexing & abstracting', to: '/indexing', note: 'Honest status + roadmap' },
        ],
      },
    ],
    feature: {
      title: 'The services–editorial firewall',
      body: 'Paid author services never influence editorial decisions. This single rule is what separates us from predatory publishing.',
      to: '/editorial-standards#firewall',
      cta: 'How peer review works',
    },
  },
  {
    label: 'Journals',
    to: '/journals',
    columns: [
      {
        heading: 'Journal portfolio',
        items: [
          { label: 'All journals', to: '/journals', note: 'Portfolio listing' },
          { label: JOURNAL.name, to: '/journals/the-journal', note: 'Flagship · biomedical & life sciences' },
        ],
      },
      {
        heading: 'For authors',
        audience: 'Submit & track',
        items: [
          { label: 'Aims & scope', to: '/journals/the-journal#scope' },
          { label: 'Editorial board', to: '/journals/the-journal#board' },
          { label: 'Author guidelines', to: '/journals/the-journal#guidelines' },
          { label: 'Submission & peer-review process', to: '/journals/the-journal#process' },
          { label: 'APC & waivers', to: '/journals/the-journal#apc' },
          { label: 'Submit a manuscript', to: '/submit' },
        ],
      },
    ],
    feature: {
      title: 'A credible editorial board',
      body: 'Real names, real affiliations, ORCIDs — the single strongest trust signal a journal can carry. Ours is being constituted now.',
      to: '/journals/the-journal#board',
      cta: 'Meet the board',
    },
  },
  {
    label: 'Books & Proceedings',
    to: '/books',
  },
  {
    label: 'Trueline Spectrum',
    to: '/spectrum',
  },
  {
    label: 'Author Services',
    to: '/author-services',
    columns: [
      {
        heading: 'Publication-readiness support',
        audience: 'Independent of editorial decisions',
        items: [
          { label: 'Overview', to: '/author-services#overview', note: 'Support — not "we publish you"' },
          { label: 'Language & copy editing', to: '/author-services#language' },
          { label: 'Formatting & submission support', to: '/author-services#formatting' },
          { label: 'Plagiarism & AI-integrity checks', to: '/author-services#integrity' },
          { label: 'Figures, tables & data visualisation', to: '/author-services#figures' },
        ],
      },
      {
        heading: 'Transparent & firewalled',
        items: [
          { label: 'Pricing & turnaround', to: '/author-services#pricing', note: 'Published, not on request' },
          { label: 'The editorial firewall', to: '/author-services#firewall', note: 'No effect on acceptance' },
          { label: 'Request a quote', to: '/contact#quote', note: 'Separate from submission' },
        ],
      },
    ],
    feature: {
      title: 'Support, not shortcuts',
      body: 'We help good science meet publication standards. Buying an editing service never changes a journal’s editorial decision.',
      to: '/author-services#firewall',
      cta: 'Read the firewall',
    },
  },
  {
    label: 'For Institutions',
    to: '/institutions',
    columns: [
      {
        heading: 'Libraries, colleges & Gulf clients',
        items: [
          { label: 'Overview', to: '/institutions#overview' },
          { label: 'For colleges & universities', to: '/institutions#colleges', note: 'Institutional publishing & training' },
          { label: 'For Gulf institutions', to: '/institutions#gulf', note: 'Research-publishing export · Vision 2030' },
          { label: 'Library & access', to: '/institutions#library', note: 'Subscriptions & open access' },
          { label: 'Editorial partnerships', to: '/institutions#partnerships', note: 'White-label / co-published journals' },
        ],
      },
    ],
    feature: {
      title: 'Open a partnership conversation',
      body: 'Institutional publishing, proceedings and editorial capability — built to indexing and integrity standards.',
      to: '/contact#institution',
      cta: 'Talk to us',
    },
  },
  {
    label: 'Resources',
    to: '/resources',
  },
]

export const UTILITY_LINKS: NavLeaf[] = [
  { label: 'For Authors', to: '/journals/the-journal#guidelines' },
  { label: 'For Reviewers', to: '/resources#reviewers' },
  { label: 'For Readers', to: '/spectrum' },
]

export const GROUP_LINKS: NavLeaf[] = [
  { label: 'Trueline Research', to: '/about#group', note: 'Generates the research output' },
  { label: 'Trueline Publishers', to: '/', note: 'Credentializes it — you are here' },
  { label: 'StartNet', to: '/about#group', note: 'Turns events into proceedings' },
  { label: 'Trueline Spectrum', to: '/spectrum', note: 'The science magazine' },
]

// ── Positioning: the three message pillars (every page maps to one) ─────────
export const PILLARS = [
  {
    id: 'publish',
    n: '01',
    name: 'Publish with integrity',
    title: 'Peer-reviewed, COPE-aligned, indexed-track journals and books.',
    body: 'Double-blind review, a transparent decision process, and a documented ethics framework — the standards indexing bodies and institutions look for.',
    to: '/editorial-standards',
  },
  {
    id: 'read',
    n: '02',
    name: 'Be read and cited',
    title: 'Discoverability, indexing and science communication.',
    body: 'Clean Crossref DOIs, structured metadata and Google Scholar compliance — plus Trueline Spectrum, the magazine that broadens reach beyond academics.',
    to: '/indexing',
  },
  {
    id: 'support',
    n: '03',
    name: 'Be supported',
    title: 'Editorial, language and publication-readiness services.',
    body: 'Transparent, optional support that helps good science meet publication standards — firewalled from every editorial decision.',
    to: '/author-services',
  },
]

// ── Home: the four visitors the site must serve ─────────────────────────────
export const VISITORS = [
  {
    id: 'author',
    kicker: 'I’m an Author',
    checking: 'Is this legitimate, indexed, and worth submitting to?',
    title: 'Submit to a journal that values your reputation.',
    body: 'Transparent peer review, an honest indexing roadmap, and a documented ethics framework — then submit when you’re ready.',
    to: '/journals/the-journal',
    cta: 'Explore the journal',
  },
  {
    id: 'reader',
    kicker: 'I’m a Reader / Researcher',
    checking: 'Can I trust and cite this content?',
    title: 'Read, download and cite with confidence.',
    body: 'Open-access articles with DOIs, structured metadata and citation export — built to scholarly standards.',
    to: '/spectrum',
    cta: 'Read the latest',
  },
  {
    id: 'reviewer',
    kicker: 'I’m a Reviewer / Editor',
    checking: 'Is this a credible board to join?',
    title: 'Join a board built on real standards.',
    body: 'A documented review model, clear conflict-of-interest rules, and a board constituted on merit and affiliation.',
    to: '/resources#reviewers',
    cta: 'Join the reviewer pool',
  },
  {
    id: 'institution',
    kicker: 'I’m an Institution / Gulf client',
    checking: 'Can they run our publishing needs at standard?',
    title: 'Publish at indexing-ready standards.',
    body: 'Institutional publishing, proceedings and editorial partnerships — for colleges, libraries and Gulf institutions.',
    to: '/institutions',
    cta: 'Open a conversation',
  },
]

export const EDITORIAL_STRIP = [
  'Peer-reviewed',
  'COPE-aligned',
  'Indexed-track',
  'Transparent fees',
  'Open access',
  'Crossref DOIs',
]

// Latest published articles — illustrative of an active publisher. Marked as
// sample content for the launch site.
export const LATEST_ARTICLES = [
  {
    type: 'Original Research',
    title: 'Reproducible workflows for transcriptomic analysis in resource-limited laboratories',
    authors: 'Editorial sample',
    journal: JOURNAL.short,
    date: 'Vol. 1 · In production',
    doi: 'DOI on publication',
  },
  {
    type: 'Systematic Review',
    title: 'Reporting-standard adherence in South Asian biomedical research: a methodological survey',
    authors: 'Editorial sample',
    journal: JOURNAL.short,
    date: 'Vol. 1 · In production',
    doi: 'DOI on publication',
  },
  {
    type: 'Methods',
    title: 'A transparent framework for AI-use disclosure in life-sciences manuscripts',
    authors: 'Editorial sample',
    journal: JOURNAL.short,
    date: 'Vol. 1 · In production',
    doi: 'DOI on publication',
  },
]

// ── The Trueline Group flywheel (Publishers at the credibility centre) ──────
export const GROUP = [
  {
    id: 'research',
    name: 'Trueline Research',
    role: 'Generates the output',
    body: 'Research enablement and CRO-lite services for life sciences — mentoring, biostatistics, bioinformatics, and a college Centre-of-Excellence network that produces real research.',
    output: 'The pipeline of credible manuscripts and data',
  },
  {
    id: 'publishers',
    name: 'Trueline Publishers',
    role: 'Credentializes it',
    body: 'Integrity-first biomedical scholarly publishing — the flagship journal, books and proceedings, Trueline Spectrum, and firewalled author services.',
    output: 'Credibility, indexing & recurring publishing revenue',
  },
  {
    id: 'startnet',
    name: 'StartNet',
    role: 'Turns events into proceedings',
    body: 'The life-sciences startup and innovation ecosystem — incubation, GCC and government partnerships, and Bio Summit events that become published proceedings.',
    output: 'Deal flow, partnerships & event-driven content',
  },
]

// ── Editorial standards & peer review (the most important page) ─────────────
export const REVIEW_STEPS = [
  {
    n: '01',
    title: 'Submission & editorial screening',
    body: 'The editorial office checks scope, completeness, reporting standards and ethics declarations. Out-of-scope or incomplete submissions are returned without review.',
  },
  {
    n: '02',
    title: 'Plagiarism & integrity check',
    body: 'Every manuscript passes similarity and research-integrity screening, including an AI-use disclosure review, before it reaches an editor.',
  },
  {
    n: '03',
    title: 'Assignment to a handling editor',
    body: 'A subject editor with no competing interest is assigned. Editors recuse themselves from any manuscript where a conflict exists.',
  },
  {
    n: '04',
    title: 'Double-blind peer review',
    body: 'At least two independent expert reviewers assess novelty, rigour, methods and reporting. Author and reviewer identities are mutually masked.',
  },
  {
    n: '05',
    title: 'Decision & revision',
    body: 'The handling editor reaches a decision — accept, revise, or reject — on the science alone. Revisions are re-reviewed against the original reports.',
  },
  {
    n: '06',
    title: 'Production, DOI & archiving',
    body: 'Accepted articles are copy-edited, assigned a Crossref DOI, published open access, and deposited for long-term digital preservation.',
  },
]

export const REVIEW_FACTS = [
  { label: 'Review model', value: 'Double-blind' },
  { label: 'Reviewers per manuscript', value: '≥ 2 independent' },
  { label: 'First-decision target', value: '6–8 weeks' },
  { label: 'Decision basis', value: 'Scientific merit only' },
]

// ── Publication ethics & integrity (COPE-aligned) ───────────────────────────
export const ETHICS_AREAS = [
  {
    title: 'Authorship & contribution',
    body: 'Authorship reflects substantial contribution. Ghost, gift and guest authorship are prohibited; contributions and corresponding authors are declared.',
  },
  {
    title: 'Conflicts of interest',
    body: 'Authors, reviewers and editors declare financial and non-financial competing interests. Editors with a conflict recuse from handling the manuscript.',
  },
  {
    title: 'Plagiarism & originality',
    body: 'All submissions are screened for similarity and duplicate publication. Manuscripts must be original and not under consideration elsewhere.',
  },
  {
    title: 'Data integrity & availability',
    body: 'Data and image manipulation are prohibited. Authors are expected to provide data-availability statements and share data where ethical and feasible.',
  },
  {
    title: 'AI-use disclosure',
    body: 'Use of generative AI in research or writing must be disclosed. AI tools cannot be listed as authors and cannot be held accountable for the work.',
  },
  {
    title: 'Corrections & retractions',
    body: 'We follow COPE-style processes for corrections, expressions of concern and retractions, with a transparent, documented complaints procedure.',
  },
]

// ── Indexing & abstracting (honest, labelled roadmap) ───────────────────────
export const INDEXING_STATUS = [
  { name: 'Crossref (DOI)', state: 'In progress', note: 'Membership application underway; DOIs assigned from launch.' },
  { name: 'Google Scholar', state: 'Built-in', note: 'Site built to inclusion guidelines with structured metadata.' },
  { name: 'DOAJ', state: 'Planned', note: 'Application to follow the required continuous-publication window.' },
  { name: 'UGC-CARE', state: 'Planned', note: 'Eligibility roadmap for the Indian academic context.' },
  { name: 'Scopus', state: 'Roadmap', note: 'Targeted after an indexing track record is established.' },
  { name: 'LOCKSS / CLOCKSS', state: 'Planned', note: 'Digital-preservation arrangement for long-term archiving.' },
]

// ── Journal mini-site: editorial board (structure — being constituted) ──────
// We do NOT fabricate named individuals. The board is shown as a governance
// structure with disciplines and a visible "being constituted" note, plus an
// invitation to join — honest and aligned with the recruit-the-board strategy.
export const BOARD_NOTE =
  'Our founding editorial board is being constituted. Senior biomedical and life-sciences researchers are invited to join — every member is listed with their real name, affiliation and ORCID.'

export const BOARD_STRUCTURE = [
  { role: 'Editor-in-Chief', count: '1', body: 'Sets editorial policy and is accountable for the integrity of the published record.' },
  { role: 'Associate Editors', count: '4–6', body: 'Handle manuscripts within their discipline and oversee the review for each submission.' },
  { role: 'Editorial Board', count: '15–25', body: 'Subject experts who review, advise on scope, and uphold reporting standards.' },
  { role: 'International Advisory Board', count: 'Forming', body: 'Senior advisors across India, the Gulf and beyond who guide long-term direction.' },
]

export const BOARD_DISCIPLINES = [
  'Clinical & Translational Medicine',
  'Molecular & Cell Biology',
  'Genomics & Bioinformatics',
  'Pharmacology & Drug Discovery',
  'Public Health & Epidemiology',
  'Biostatistics & Research Methods',
  'Microbiology & Immunology',
  'Biomedical Engineering',
]

// ── Journal mini-site: author guidelines summary ────────────────────────────
export const GUIDELINES = [
  { title: 'Article types', body: 'Original research, systematic reviews, methods, short communications, and case reports within scope.' },
  { title: 'Formatting & templates', body: 'Structured abstract, IMRaD body, Vancouver references. Manuscript and reporting-checklist templates provided.' },
  { title: 'ORCID required', body: 'All authors provide an ORCID iD at submission to support attribution and discoverability.' },
  { title: 'Reporting standards', body: 'CONSORT, PRISMA, STROBE, ARRIVE and equivalent checklists are required where applicable.' },
  { title: 'Declarations', body: 'Ethics approval, consent, funding, conflicts of interest, data availability and AI-use disclosure are mandatory.' },
  { title: 'Data & code', body: 'Data-availability statements required; deposition in recognised repositories encouraged with citation.' },
]

// ── Journal mini-site: APC & waivers (transparent) ──────────────────────────
export const APC = {
  headline: 'Transparent Article Processing Charge, with a clear waiver policy.',
  body:
    'An APC is charged only after acceptance, to cover open-access production, DOI registration, copy-editing and long-term archiving. It is never a charge for acceptance, and it never influences the editorial decision.',
  points: [
    { k: 'Charged when', v: 'Only after peer-reviewed acceptance — never at submission.' },
    { k: 'What it covers', v: 'Open-access hosting, Crossref DOI, copy-editing, archiving.' },
    { k: 'Waivers', v: 'Full and partial waivers for authors from lower-income settings, on request.' },
    { k: 'No bundling', v: 'Author services are priced and purchased separately — buying them never affects acceptance.' },
  ],
}

// ── Books & Proceedings ─────────────────────────────────────────────────────
export const BOOKS = [
  { title: 'Edited volumes & monographs', body: 'Peer-reviewed scholarly books in biomedical and life-sciences fields, with ISBNs and chapter-level DOIs.' },
  { title: 'Conference proceedings', body: 'Proceedings from StartNet Bio Summit events — every event becomes a citable, indexed publication.', tag: 'StartNet tie-in' },
  { title: 'Catalogue', body: 'A growing catalogue of published titles with metadata, DOIs and distribution.' },
  { title: 'ISBN & distribution', body: 'ISBN allocation, metadata feeds and distribution to libraries and academic channels.' },
]

// ── Trueline Spectrum (the magazine — warmer, reader-facing) ─────────────────
export const SPECTRUM_FEATURES = [
  { tag: 'Researcher profile', title: 'From a Salem campus to a sequencing pipeline: a researcher’s path', read: '7 min read' },
  { tag: 'Science explainer', title: 'What “peer review” actually protects — and what it doesn’t', read: '6 min read' },
  { tag: 'CoE story', title: 'How a college bioinformatics lab produced its first indexed paper', read: '9 min read' },
  { tag: 'GCC & industry', title: 'Why Gulf institutions are investing in research-publishing capability', read: '8 min read' },
]

// ── Author Services (revenue, carefully framed & firewalled) ────────────────
export const AUTHOR_SERVICES = [
  {
    id: 'language',
    name: 'Language & copy editing',
    body: 'Substantive and copy editing for clarity, grammar and academic tone — so reviewers judge your science, not your phrasing.',
  },
  {
    id: 'formatting',
    name: 'Formatting & submission support',
    body: 'Journal-specific formatting, reference styling and submission-system preparation against the target journal’s guidelines.',
  },
  {
    id: 'integrity',
    name: 'Plagiarism & AI-integrity checks',
    body: 'Pre-submission similarity reports and AI-use review, so you can resolve issues before an editor ever sees the manuscript.',
  },
  {
    id: 'figures',
    name: 'Figures, tables & data visualisation',
    body: 'Publication-quality figures and tables that meet reporting and accessibility standards.',
  },
]

export const SERVICES_PRICING = [
  { tier: 'Copy editing', detail: 'Per 1,000 words', turnaround: '3–5 business days' },
  { tier: 'Substantive editing', detail: 'Per 1,000 words', turnaround: '5–7 business days' },
  { tier: 'Formatting & submission', detail: 'Per manuscript', turnaround: '2–4 business days' },
  { tier: 'Figures & data viz', detail: 'Per figure', turnaround: '3–6 business days' },
]

export const FIREWALL_POINTS = [
  'Author services are operated by a separate team from the editorial office.',
  'Purchasing any service has no effect on whether a manuscript is sent for review or accepted.',
  'Editorial decisions are made by editors and reviewers on scientific merit alone.',
  'You can publish with us without buying any service — and many authors do.',
  'Pricing is published openly, never negotiated against an acceptance.',
]

// ── For Institutions ────────────────────────────────────────────────────────
export const INSTITUTION_TRACKS = [
  {
    id: 'colleges',
    name: 'For colleges & universities',
    body: 'Institutional publishing, conference proceedings and research-methods training — links to the Trueline Research Centre-of-Excellence network.',
    points: ['Institutional & departmental publishing', 'Proceedings for campus events', 'Research-methods & publishing training'],
  },
  {
    id: 'gulf',
    name: 'For Gulf institutions',
    body: 'A research-publishing export partner framed for Vision 2030 and Gulf higher-education strategy — English-language, integrity-first, indexing-ready.',
    points: ['Research-publishing capability', 'Editorial & language support', 'Joint capability building'],
  },
  {
    id: 'library',
    name: 'Library & access',
    body: 'Open-access by default, with clear licensing, subscription options for selected content, and discovery-system-friendly metadata.',
    points: ['Open access · CC BY 4.0', 'Clean MARC / metadata feeds', 'Discovery & link-resolver support'],
  },
  {
    id: 'partnerships',
    name: 'Editorial partnerships',
    body: 'White-label and co-published journals for institutions that want their own title built and run to indexing and integrity standards.',
    points: ['White-label journals', 'Co-published titles', 'Editorial-operations support'],
  },
]

// ── Resources / Ethics (the policy library) ─────────────────────────────────
export const POLICIES = [
  { id: 'authors', title: 'Author resources & templates', body: 'Manuscript templates, reporting checklists, cover-letter and declaration forms.' },
  { id: 'reviewers', title: 'Reviewer guidelines & join the pool', body: 'How we review, what we expect of reviewers, and a form to join the reviewer and editorial pool.' },
  { id: 'ethics', title: 'Publication ethics & malpractice statement', body: 'Our full COPE-aligned ethics framework and malpractice statement.', to: '/ethics' },
  { id: 'access', title: 'Open access, copyright & licensing', body: 'CC BY 4.0 by default; authors retain copyright. Licensing and reuse terms in full.' },
  { id: 'archiving', title: 'Archiving & preservation policy', body: 'Digital-preservation arrangement (LOCKSS/CLOCKSS or equivalent) for long-term access.' },
  { id: 'corrections', title: 'Corrections, retractions & complaints', body: 'How we handle errors, expressions of concern, retractions and reader complaints.' },
  { id: 'ai', title: 'AI-use & data-integrity disclosure', body: 'Disclosure requirements for generative AI and standards for data and image integrity.' },
  { id: 'faq', title: 'FAQ & help', body: 'Answers for authors, reviewers, readers and institutions — and how to reach support.' },
]

// ── Conversion funnels (kept visually & functionally separate) ──────────────
export const FUNNELS = [
  { audience: 'Author', entry: 'Journal pages', cta: 'Submit Manuscript', next: 'Submission → peer review', kind: 'editorial' },
  { audience: 'Author (services)', entry: 'Author Services', cta: 'Request a Quote', next: 'Quote → editing (firewalled)', kind: 'services' },
  { audience: 'Reviewer / editor', entry: 'Resources', cta: 'Join the Reviewer Pool', next: 'Vetting → board onboarding', kind: 'editorial' },
  { audience: 'Reader', entry: 'Spectrum / articles', cta: 'Subscribe', next: 'Newsletter → citations', kind: 'reader' },
  { audience: 'Institution / Gulf', entry: 'For Institutions', cta: 'Talk to Us', next: 'Partnership conversation', kind: 'institution' },
]

// ── Footer ──────────────────────────────────────────────────────────────────
export const FOOTER_COLS = [
  {
    heading: 'Publish',
    links: [
      { label: 'Journals', to: '/journals' },
      { label: 'Submit a manuscript', to: '/submit' },
      { label: 'Books & Proceedings', to: '/books' },
      { label: 'Author Services', to: '/author-services' },
    ],
  },
  {
    heading: 'Trueline Group',
    links: [
      { label: 'Trueline Research', to: '/about#group' },
      { label: 'Trueline Publishers', to: '/' },
      { label: 'StartNet', to: '/about#group' },
      { label: 'Trueline Spectrum', to: '/spectrum' },
    ],
  },
  {
    heading: 'Standards',
    links: [
      { label: 'Editorial standards', to: '/editorial-standards' },
      { label: 'Publication ethics', to: '/ethics' },
      { label: 'Indexing & abstracting', to: '/indexing' },
      { label: 'Open access & archiving', to: '/resources#archiving' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'Author resources', to: '/resources#authors' },
      { label: 'Reviewer guidelines', to: '/resources#reviewers' },
      { label: 'FAQ', to: '/resources#faq' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

// ── Contact forms (Submit Manuscript & Request a Quote kept separate) ───────
// `keys` map each visible field (by position) to the backend payload key.
// They MUST stay aligned with the Pydantic schema in backend/app/schemas.
// `kind` doubles as the contact `variant` posted to the API.
export const CONTACT_FORMS = [
  {
    id: 'submit',
    audience: 'Authors',
    kind: 'editorial',
    title: 'Submit a manuscript',
    body: 'Start a submission to the journal. This routes to the editorial office and the peer-review workflow — it is not a paid service.',
    cta: 'Start submission',
    fields: ['Corresponding author', 'Email', 'Affiliation & ORCID', 'Manuscript title', 'Article type', 'Abstract'],
    keys: ['corresponding_author', 'email', 'affiliation_orcid', 'manuscript_title', 'article_type', 'abstract'],
  },
  {
    id: 'quote',
    audience: 'Authors (services)',
    kind: 'services',
    title: 'Request a quote',
    body: 'Ask the author-services team for a transparent quote. This is independent of any journal’s editorial decision.',
    cta: 'Request a quote',
    fields: ['Full name', 'Email', 'Service needed', 'Manuscript length', 'Target journal'],
    keys: ['full_name', 'email', 'service_needed', 'manuscript_length', 'target_journal'],
  },
  {
    id: 'institution',
    audience: 'Institutions & Gulf',
    kind: 'institution',
    title: 'Talk to us',
    body: 'Open a conversation about institutional publishing, proceedings or an editorial partnership.',
    cta: 'Start a conversation',
    fields: ['Your name & role', 'Institution', 'Country', 'Email', 'What you’re looking to build'],
    keys: ['name_role', 'institution', 'country', 'email', 'message'],
  },
]

export const OFFICES = [
  { city: 'Salem (HQ)', detail: 'Vaikuntham, Salem — Tamil Nadu, India' },
  { city: 'Editorial office', detail: 'editorial@truelinepublishers.com' },
  { city: 'Gulf desk', detail: 'GCC institutional partnerships' },
]
