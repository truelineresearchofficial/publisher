// ─────────────────────────────────────────────────────────────────────────
// Author Services catalogue — single source of truth for the landing page,
// the seven dedicated category pages, and the navbar dropdown.
// Each category maps to /author-services/<slug>; each item is a doc-style
// section selected in the page sidebar (deep-linkable via #<item.slug>).
// ─────────────────────────────────────────────────────────────────────────
import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  BookMarked,
  FileText,
  Layers,
  Lightbulb,
  Compass,
  Search,
  Target,
  Microscope,
  PenLine,
  FileCheck,
  ShieldCheck,
  ClipboardCheck,
  GraduationCap,
  Database,
  BarChart3,
  Code2,
  LineChart,
  Send,
  Users,
  RefreshCw,
  Globe,
  Presentation,
  Handshake,
  Building2,
  ScrollText,
} from 'lucide-react'

export type ServiceItem = {
  slug: string
  name: string // sidebar label (short)
  heading: string // large heading
  icon: LucideIcon
  intro: string
  body: string[]
  benefits: string[]
}

export type ServiceCategory = {
  slug: string
  route: string
  title: string
  icon: LucideIcon
  blurb: string
  industries: string[]
  items: ServiceItem[]
}

const IND_ACADEMIC = [
  'Biomedical & Life Sciences',
  'Engineering & Technology',
  'AI & Computer Science',
  'Pharmacy & Nursing',
  'Management & Social Sciences',
  'Agriculture, Education & Humanities',
]

const IND_REPORTS = [
  'Biomedical & Life Sciences',
  'Engineering & Technology',
  'AI & Computer Science',
  'Management & Economics',
  'Public Policy & Social Sciences',
  'Education & Institutions',
]

export const AUTHOR_SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: 'book-publication',
    route: '/author-services/book-publication',
    title: 'Book Publication',
    icon: BookOpen,
    blurb: 'ISBN, academic books, chapters and proceedings — published to professional standards.',
    industries: IND_ACADEMIC,
    items: [
      {
        slug: 'isbn',
        name: 'ISBN Registration',
        heading: 'ISBN Registration & Publishing Support',
        icon: BookMarked,
        intro: 'Secure a globally recognised ISBN and prepare your title for professional distribution.',
        body: [
          'Every book we help bring to print is issued a valid ISBN and, where relevant, barcoding and cataloguing metadata, so your work is uniquely identifiable across libraries, retailers and academic databases worldwide. We manage the registration end to end — from imprint records and edition control to the bibliographic details that determine how discoverable your title becomes.',
          'Our team supports authors and institutions across biomedical sciences, engineering, management and the humanities, aligning each release with international publishing conventions. You retain full authorship and rights; we simply make sure the administrative backbone — identifiers, metadata and distribution readiness — is handled correctly the first time.',
        ],
        benefits: ['Valid ISBN and barcoding', 'Accurate bibliographic metadata', 'Distribution-ready records'],
      },
      {
        slug: 'book-publishing',
        name: 'Book Publishing',
        heading: 'Academic Book Publication',
        icon: BookOpen,
        intro: 'Turn a completed manuscript into a peer-reviewed, professionally produced academic book.',
        body: [
          'We guide monographs, reference works and textbooks from final draft to finished volume, coordinating structural editing, peer evaluation, typesetting, cover design and print-ready production. Whether the subject is artificial intelligence, pharmacy, agriculture or the social sciences, we hold the manuscript to the presentation and referencing standards expected of scholarly publishing.',
          'Authors work with a dedicated coordinator who keeps the schedule transparent and the editorial and commercial functions firmly separated — our production support never influences the independent review of scholarly merit. The result is a credible, citable book that reflects the seriousness of the research behind it.',
        ],
        benefits: ['Structural and peer evaluation', 'Professional typesetting and design', 'Print- and citation-ready output'],
      },
      {
        slug: 'book-chapters',
        name: 'Book Chapters',
        heading: 'Book Chapter Publication',
        icon: FileText,
        intro: 'Contribute a well-crafted chapter to edited volumes and reference collections.',
        body: [
          'Edited books and handbooks let researchers share focused expertise without carrying a full monograph. We help authors shape individual chapters — refining scope, structure, argument and referencing — so each contribution sits comfortably within the wider volume and meets the editors’ brief.',
          'This route suits early-career researchers and established academics alike, across disciplines from nursing to computer science. We assist with formatting to the volume’s template, consistency of terminology, and clear positioning of your contribution’s original angle, helping your chapter add genuine value to a multidisciplinary collection.',
        ],
        benefits: ['Focused scope and structure', 'Template and reference consistency', 'Clear original contribution'],
      },
      {
        slug: 'conference-proceedings',
        name: 'Conference Proceedings',
        heading: 'Conference Proceedings Publication',
        icon: Layers,
        intro: 'Compile and publish accepted conference papers into a citable, discoverable record.',
        body: [
          'After a conference concludes, its scholarly value lives on through well-produced proceedings. We assemble accepted papers into a coherent, professionally formatted volume with ISBN or ISSN identifiers where applicable, and the metadata needed for discoverability across academic databases.',
          'Working with organising committees, we manage compilation, editorial quality checks and production timelines so delegates’ work reaches the wider community promptly. Our support spans engineering symposia, biomedical congresses and management conclaves, giving each event a durable, referenceable publication.',
        ],
        benefits: ['Coherent, formatted compilation', 'Identifiers and discoverable metadata', 'Timely, reference-quality release'],
      },
    ],
  },
  {
    slug: 'research-development',
    route: '/author-services/research-development',
    title: 'Research Development Support',
    icon: Lightbulb,
    blurb: 'From topic to proposal — shape rigorous, original and fundable research.',
    industries: IND_ACADEMIC,
    items: [
      {
        slug: 'topic-selection',
        name: 'Topic Selection',
        heading: 'Topic Selection & Research Direction',
        icon: Compass,
        intro: 'Define a focused, feasible and original research direction from the outset.',
        body: [
          'Choosing the right problem shapes everything that follows. We help researchers translate broad interests into a specific, researchable topic — assessing scope, feasibility, data availability and scholarly relevance before significant time is committed.',
          'Through structured discussion and a preliminary scan of the field, we help you position your work where it can make a genuine contribution, whether in life sciences, education or multidisciplinary research. The aim is a direction ambitious enough to matter and grounded enough to complete.',
        ],
        benefits: ['Feasibility and scope assessment', 'Relevance to the field', 'A clear, researchable focus'],
      },
      {
        slug: 'literature-review',
        name: 'Literature Review',
        heading: 'Literature Survey & Review Support',
        icon: Search,
        intro: 'Map the existing scholarship rigorously and systematically.',
        body: [
          'A strong literature review demonstrates command of the field and justifies your study. We support systematic searching, source appraisal and thematic synthesis, helping you organise prior work into a clear narrative rather than an annotated list.',
          'Our specialists help identify seminal and current sources across databases, structure the review around themes or chronology, and maintain accurate citation throughout. This gives your manuscript or thesis a defensible foundation and sharpens the case for your own contribution.',
        ],
        benefits: ['Systematic, reproducible searching', 'Thematic synthesis, not lists', 'Accurate, complete citation'],
      },
      {
        slug: 'problem-statement',
        name: 'Problem Statement',
        heading: 'Problem Statement Development',
        icon: Target,
        intro: 'Articulate a precise, compelling statement of the problem you address.',
        body: [
          'A well-formed problem statement converts a general interest into a defined scholarly question. We help you express what is unresolved, why it matters, and how your study will approach it — with the clarity reviewers and examiners expect.',
          'By tightening the link between context, gap and objective, we help ensure your research question is specific, measurable and aligned with your methodology. That clarity strengthens proposals, manuscripts and dissertations alike, across technical and social-science domains.',
        ],
        benefits: ['Specific, measurable questions', 'Clear context-to-objective link', 'Reviewer-ready clarity'],
      },
      {
        slug: 'research-gap',
        name: 'Research Gap',
        heading: 'Research Gap Identification',
        icon: Lightbulb,
        intro: 'Pinpoint where the literature is silent, contested or incomplete.',
        body: [
          'Genuine contribution begins with a genuine gap. We analyse the current body of work to surface unanswered questions, methodological limitations and under-explored contexts that your study is well placed to address.',
          'Rather than restating what exists, we help you frame the gap as an opportunity — connecting it directly to your objectives so the novelty of your work is explicit and defensible. This is especially valuable in fast-moving fields such as artificial intelligence and biomedical research.',
        ],
        benefits: ['Evidence-based gap analysis', 'Explicit novelty framing', 'Defensible positioning'],
      },
      {
        slug: 'novel-solutions',
        name: 'Novel Solutions',
        heading: 'Novel Solution Development',
        icon: Microscope,
        intro: 'Shape an original approach, framework or method that advances the field.',
        body: [
          'Originality is the heart of research. We work alongside you to develop and articulate a novel solution — a new model, method, framework or application — and to position its contribution clearly against existing approaches.',
          'Our support focuses on conceptual soundness and clear justification: why the approach is new, how it improves on prior work, and what evidence supports it. We help engineers, scientists and management researchers present innovation in a rigorous, credible way.',
        ],
        benefits: ['Sound conceptual design', 'Clear improvement over prior work', 'Credible, evidenced novelty'],
      },
      {
        slug: 'proposal-editing',
        name: 'Proposal Editing',
        heading: 'Synopsis & Research Proposal Editing',
        icon: PenLine,
        intro: 'Refine the proposal that convinces committees and funders.',
        body: [
          'A synopsis or proposal must communicate significance, feasibility and rigour in limited space. We edit and strengthen structure, objectives, methodology and expected outcomes so your document reads as a coherent, persuasive plan.',
          'We align each section with academic conventions and, where relevant, funding or institutional guidelines, tightening language and logic without altering your intellectual ownership. The outcome is a proposal that presents your research with authority and clarity.',
        ],
        benefits: ['Coherent, persuasive structure', 'Guideline-aligned formatting', 'Sharper language and logic'],
      },
    ],
  },
  {
    slug: 'manuscript-editing',
    route: '/author-services/manuscript-editing',
    title: 'Manuscript & Thesis Editing',
    icon: PenLine,
    blurb: 'Editing, proofreading and integrity support for manuscripts and theses.',
    industries: IND_ACADEMIC,
    items: [
      {
        slug: 'manuscript-writing',
        name: 'Manuscript Writing',
        heading: 'Manuscript Preparation',
        icon: PenLine,
        intro: 'Assemble a complete, well-structured manuscript ready for review.',
        body: [
          'We help authors organise research findings into a properly structured manuscript — title, abstract, introduction, methods, results and discussion — that follows the conventions of scholarly writing and the target outlet’s expectations.',
          'From logical flow and section balance to figures, tables and reference formatting, we ensure the manuscript presents your work clearly and completely. This groundwork reduces desk rejections and lets reviewers engage with your science rather than its presentation.',
        ],
        benefits: ['Standard IMRaD structure', 'Balanced flow and formatting', 'Fewer avoidable desk rejections'],
      },
      {
        slug: 'scientific-editing',
        name: 'Scientific Editing',
        heading: 'Scientific Content Editing',
        icon: FileCheck,
        intro: 'Sharpen argument, accuracy and technical clarity.',
        body: [
          'Scientific editing goes beyond grammar to the substance of how research is communicated. We review the coherence of your argument, the accuracy of technical description, and the alignment between claims, data and conclusions.',
          'Our editors, familiar with domains from pharmacy to computer science, flag ambiguity, unsupported statements and inconsistencies, and suggest precise revisions. The result is a manuscript whose reasoning is transparent and whose findings are presented with appropriate rigour.',
        ],
        benefits: ['Coherent, accurate argument', 'Claims aligned with data', 'Transparent scientific reasoning'],
      },
      {
        slug: 'plagiarism-check',
        name: 'Plagiarism Check',
        heading: 'Plagiarism Reduction Support',
        icon: ShieldCheck,
        intro: 'Strengthen originality and correct attribution — ethically.',
        body: [
          'We help authors interpret similarity reports and address genuine overlap through proper paraphrasing, accurate quotation and complete citation. Our focus is scholarly integrity: representing others’ work fairly while making your own voice distinct.',
          'This is not about evading detection but about writing responsibly. We guide correct referencing practice and clear attribution so your manuscript meets the originality standards of reputable journals and institutions, protecting your academic reputation.',
        ],
        benefits: ['Similarity-report interpretation', 'Correct attribution and quoting', 'Ethical, responsible originality'],
      },
      {
        slug: 'proofreading',
        name: 'Proofreading',
        heading: 'Proofreading & Language Editing',
        icon: ClipboardCheck,
        intro: 'Polish grammar, style and readability to publication standard.',
        body: [
          'Language should never obscure good research. We correct grammar, spelling, punctuation and syntax while improving flow, tone and consistency, with particular care for authors writing in English as an additional language.',
          'Editing is done conservatively, preserving your meaning and authorial voice while ensuring the text reads fluently and professionally. Clean, precise language helps reviewers focus on your contribution and reflects well on the work as a whole.',
        ],
        benefits: ['Grammar, spelling and syntax', 'Improved flow and consistency', 'Voice-preserving edits'],
      },
      {
        slug: 'thesis-editing',
        name: 'Thesis Editing',
        heading: 'Thesis & Dissertation Editing',
        icon: GraduationCap,
        intro: 'Bring long-form research to a consistent, examiner-ready standard.',
        body: [
          'A thesis demands sustained consistency across many chapters. We edit for structure, argument continuity, formatting, referencing and adherence to university guidelines, helping candidates present years of work coherently.',
          'We check cross-references, terminology, and table and figure numbering, from front matter to appendices. Our support helps research scholars in every discipline submit a document that is clear, correct and confident under examination.',
        ],
        benefits: ['Chapter-to-chapter consistency', 'Guideline-compliant formatting', 'Examiner-ready polish'],
      },
    ],
  },
  {
    slug: 'simulation-data-analysis',
    route: '/author-services/simulation-data-analysis',
    title: 'Simulation & Data Analysis',
    icon: BarChart3,
    blurb: 'Data preparation, analysis, implementation and interpretation.',
    industries: IND_ACADEMIC,
    items: [
      {
        slug: 'data-collection',
        name: 'Data Collection',
        heading: 'Dataset Collection & Preparation',
        icon: Database,
        intro: 'Build clean, well-documented datasets fit for analysis.',
        body: [
          'Reliable results depend on reliable data. We support the sourcing, organisation and cleaning of datasets — handling missing values, inconsistencies and formatting so your data is analysis-ready and reproducible.',
          'Whether the data comes from clinical records, sensors, surveys or public repositories, we help document its provenance and structure. Careful preparation protects the validity of everything that follows, from statistical testing to model training.',
        ],
        benefits: ['Cleaning and de-duplication', 'Documented provenance', 'Reproducible, analysis-ready data'],
      },
      {
        slug: 'data-analysis',
        name: 'Data Analysis',
        heading: 'Data Processing & Analysis',
        icon: BarChart3,
        intro: 'Apply appropriate statistical and computational methods rigorously.',
        body: [
          'We help researchers select and apply the right analytical techniques — descriptive statistics, hypothesis testing, regression, or machine-learning methods — matched to the research question and data type.',
          'Using established tools and transparent procedures, we support analysis that is methodologically sound and defensible. Our team assists across biomedical, engineering and social-science studies, ensuring the approach fits each discipline’s expectations.',
        ],
        benefits: ['Method matched to the question', 'Transparent, defensible procedures', 'Discipline-appropriate rigour'],
      },
      {
        slug: 'software-support',
        name: 'Software Support',
        heading: 'Software Implementation Support',
        icon: Code2,
        intro: 'Turn methods and models into working, documented implementations.',
        body: [
          'Many studies require simulation, modelling or algorithmic implementation. We support the development of scripts, models and prototypes in widely used environments, helping translate your methodology into functioning code.',
          'We emphasise clarity and reproducibility — readable structure, sensible documentation and results that can be regenerated. This support is particularly valuable for research in artificial intelligence, computer science and engineering.',
        ],
        benefits: ['Methodology into working code', 'Readable, documented structure', 'Reproducible results'],
      },
      {
        slug: 'result-analysis',
        name: 'Result Analysis',
        heading: 'Result Analysis & Interpretation',
        icon: LineChart,
        intro: 'Interpret findings accurately and present them convincingly.',
        body: [
          'Numbers become knowledge through careful interpretation. We help you read your results correctly, relate them to your hypotheses, and present them through clear tables, figures and narrative.',
          'We support honest discussion of significance, limitations and implications, connecting outcomes back to the wider literature. The aim is an evidence-based account that reviewers and examiners find both rigorous and readable.',
        ],
        benefits: ['Accurate interpretation', 'Clear tables and figures', 'Honest limitations and implications'],
      },
    ],
  },
  {
    slug: 'publication-support',
    route: '/author-services/publication-support',
    title: 'Publication Support',
    icon: Send,
    blurb: 'Guidance from pre-submission review through revision and resubmission.',
    industries: IND_ACADEMIC,
    items: [
      {
        slug: 'technical-review',
        name: 'Technical Review',
        heading: 'Technical Review',
        icon: ClipboardCheck,
        intro: 'Get an expert pre-submission critique of your manuscript.',
        body: [
          'Before you submit, an independent technical review can reveal weaknesses reviewers would otherwise raise. We assess methodology, argument, structure and technical accuracy, and provide candid, constructive feedback.',
          'This internal appraisal helps you strengthen the manuscript proactively across any discipline, improving its readiness. It is guidance to raise quality — never a promise of acceptance, which rests solely with the journal’s independent editors.',
        ],
        benefits: ['Independent expert critique', 'Methodology and structure checks', 'Proactive quality improvement'],
      },
      {
        slug: 'journal-selection',
        name: 'Journal Selection',
        heading: 'Journal Selection Guidance',
        icon: Compass,
        intro: 'Identify well-matched, reputable journals for your work.',
        body: [
          'Choosing the right journal affects reach, fit and review experience. We help you shortlist outlets whose scope, audience and standards align with your study, considering indexing, focus and typical timelines.',
          'We highlight credible, appropriate venues and flag predatory ones to avoid, so you make an informed decision. The final choice and submission remain entirely yours; our role is transparent, evidence-based guidance.',
        ],
        benefits: ['Scope and audience fit', 'Predatory-venue awareness', 'Informed, independent choice'],
      },
      {
        slug: 'submission-support',
        name: 'Submission Support',
        heading: 'Journal Formatting & Submission Support',
        icon: Send,
        intro: 'Meet each journal’s exact formatting and submission requirements.',
        body: [
          'Every journal has its own template, reference style and submission checklist. We format your manuscript precisely to the target’s guidelines — layout, headings, citations, figures and supplementary files.',
          'We also help navigate online submission systems, cover letters and metadata entry, reducing the risk of technical rejection. Careful compliance lets the editorial office move your paper into review without avoidable delays.',
        ],
        benefits: ['Exact template compliance', 'Cover letter and metadata help', 'Fewer technical rejections'],
      },
      {
        slug: 'reviewer-response',
        name: 'Reviewer Response',
        heading: 'Reviewer Comment Analysis & Response Support',
        icon: Users,
        intro: 'Respond to peer review clearly, thoroughly and professionally.',
        body: [
          'Reviewer reports can be demanding. We help you interpret each comment, plan appropriate revisions, and draft a structured, point-by-point response that addresses concerns respectfully and completely.',
          'By organising your reply and evidencing the changes made, we help you present a persuasive, professional rebuttal. Strong responses keep the conversation with editors constructive and give your revised manuscript its best hearing.',
        ],
        benefits: ['Point-by-point responses', 'Evidenced, respectful rebuttal', 'Constructive editor dialogue'],
      },
      {
        slug: 'journal-revision',
        name: 'Journal Revision',
        heading: 'Journal Revision Support',
        icon: RefreshCw,
        intro: 'Implement revisions carefully while preserving your argument.',
        body: [
          'Major or minor revisions require disciplined editing. We help you incorporate reviewer and editor requests into the manuscript accurately, maintaining consistency, flow and the integrity of your original findings.',
          'We track each requested change against your response letter so nothing is overlooked, and ensure the revised text remains coherent. This methodical approach helps your resubmission read as a genuine, thorough improvement.',
        ],
        benefits: ['Accurate change tracking', 'Coherent revised text', 'Thorough, complete responses'],
      },
      {
        slug: 'manuscript-revision',
        name: 'Manuscript Revision',
        heading: 'Revised / Rejected Manuscript Editing',
        icon: FileCheck,
        intro: 'Rebuild a rejected paper into a stronger submission.',
        body: [
          'A rejection is often a redirection. We help you understand the feedback, diagnose the underlying weaknesses, and substantially revise structure, analysis or framing before approaching a better-matched journal.',
          'With fresh editing and repositioning, a previously declined manuscript can re-enter review as a markedly improved paper. We support authors across disciplines in giving worthwhile research a credible second chance.',
        ],
        benefits: ['Root-cause diagnosis', 'Structural repositioning', 'A credible second chance'],
      },
    ],
  },
  {
    slug: 'conference-organization',
    route: '/author-services/conference-organization',
    title: 'International Conference Organization',
    icon: Globe,
    blurb: 'End-to-end academic conference planning, partnerships and proceedings.',
    industries: IND_ACADEMIC,
    items: [
      {
        slug: 'conference-planning',
        name: 'Conference Planning',
        heading: 'Conference Planning & Management',
        icon: Presentation,
        intro: 'Organise academic conferences end to end, professionally.',
        body: [
          'We support institutions and societies in planning conferences from concept to closing session — scheduling, committee coordination, submission workflows, registration and on-the-day logistics.',
          'Our involvement keeps timelines realistic and standards high, so organisers can focus on the quality of the scholarly programme. We adapt to events of every scale, from focused workshops to large multidisciplinary congresses.',
        ],
        benefits: ['End-to-end coordination', 'Submission and registration workflows', 'Realistic, well-run timelines'],
      },
      {
        slug: 'academic-partnerships',
        name: 'Academic Partnerships',
        heading: 'Global Academic Partnership Support',
        icon: Handshake,
        intro: 'Build international collaborations that strengthen your event.',
        body: [
          'Global partners add reach, credibility and diverse expertise. We help connect organisers with universities, societies and academic networks to co-host, co-sponsor or contribute to conferences.',
          'By facilitating memoranda, joint committees and shared programming, we help events gain international standing. These partnerships enrich the delegate experience and extend the scholarly impact of your conference.',
        ],
        benefits: ['University and society links', 'Joint committees and MoUs', 'Greater international standing'],
      },
      {
        slug: 'paper-review',
        name: 'Paper Review',
        heading: 'Call for Papers & Review Coordination',
        icon: ClipboardCheck,
        intro: 'Attract quality submissions and manage fair peer review.',
        body: [
          'A well-crafted call for papers sets the tone for a conference. We help draft and disseminate the CFP, define tracks and timelines, and reach relevant research communities across disciplines.',
          'We then coordinate the review process — assigning submissions, managing reviewer panels and tracking decisions — so evaluation stays fair, timely and transparent. Sound review underpins the academic quality of the final programme.',
        ],
        benefits: ['Clear CFP and tracks', 'Managed reviewer panels', 'Fair, transparent decisions'],
      },
      {
        slug: 'speaker-management',
        name: 'Speaker Management',
        heading: 'Speaker & Expert Coordination',
        icon: Users,
        intro: 'Secure and support keynote speakers and expert panels.',
        body: [
          'Distinguished speakers elevate any conference. We assist in identifying, inviting and coordinating keynote presenters, session chairs and panellists whose expertise fits your themes.',
          'From scheduling and briefing to travel and technical logistics, we manage the details that let experts contribute smoothly. Thoughtful coordination ensures a programme that engages delegates and enhances the event’s reputation.',
        ],
        benefits: ['Keynote identification and invites', 'Briefing and logistics', 'A cohesive speaker programme'],
      },
      {
        slug: 'proceedings-publishing',
        name: 'Proceedings Publishing',
        heading: 'Conference Proceedings Publication Support',
        icon: Layers,
        intro: 'Publish your conference’s accepted papers as a lasting record.',
        body: [
          'The proceedings are a conference’s scholarly legacy. We help compile, edit and format accepted papers into a professionally produced volume with appropriate identifiers and discoverable metadata.',
          'Working closely with the organising and review committees, we manage production quality and timelines so the collected research reaches the community promptly and credibly, extending the value of the event well beyond its closing day.',
        ],
        benefits: ['Edited, formatted compilation', 'Identifiers and metadata', 'Prompt, credible release'],
      },
    ],
  },
  {
    slug: 'industry-reports',
    route: '/author-services/industry-reports',
    title: 'Industry Reports & Whitepapers',
    icon: FileText,
    blurb: 'Evidence-based industry reports, whitepapers and policy briefs.',
    industries: IND_REPORTS,
    items: [
      {
        slug: 'industry-reports',
        name: 'Industry Reports',
        heading: 'Industry Reports',
        icon: BarChart3,
        intro: 'Evidence-based reports that translate research into industry insight.',
        body: [
          'We help research teams, institutions and academic-industry consortia produce rigorous industry reports that turn data and scholarship into clear, decision-ready insight. Each report is structured around a defined question, supported by verifiable sources, and written to a professional standard suitable for stakeholders and funders.',
          'From scoping and data synthesis to visualisation and editorial polish, we manage the report as a scholarly deliverable — transparent in method, honest about its limitations, and aligned with the evidence. The result communicates complex findings credibly to technical and non-technical audiences alike.',
        ],
        benefits: ['Clear, decision-ready structure', 'Verifiable, well-cited evidence', 'Professional visualisation and layout'],
      },
      {
        slug: 'technology-whitepapers',
        name: 'Technology Whitepapers',
        heading: 'Technology Whitepapers',
        icon: FileText,
        intro: 'Authoritative whitepapers that explain technology with academic rigour.',
        body: [
          'A strong whitepaper positions a technology, method or framework with clarity and authority. We support authors in developing whitepapers that combine technical depth with readable exposition — defining the problem, presenting the approach, and evidencing its value against alternatives.',
          'We help structure the argument, verify technical accuracy, and present results and diagrams cleanly, so the document informs rather than merely promotes. This suits research groups in artificial intelligence, engineering and applied sciences communicating innovation to peers, partners and industry.',
        ],
        benefits: ['Technical depth, clear exposition', 'Balanced, evidence-led argument', 'Peer- and industry-ready'],
      },
      {
        slug: 'market-reports',
        name: 'Market Reports',
        heading: 'Market Reports',
        icon: LineChart,
        intro: 'Structured market analysis grounded in transparent methodology.',
        body: [
          'We assist in producing market reports that examine sectors, trends and opportunities through a disciplined, source-based lens. Rather than unsupported projection, we emphasise transparent methodology, defensible assumptions and clearly attributed data.',
          'Our support covers data gathering, analytical framing, and the writing and visualisation of findings, so the report reads as a credible reference for researchers, institutions and industry partners. Every claim is traceable to its evidence.',
        ],
        benefits: ['Transparent methodology', 'Traceable data and assumptions', 'Reference-quality writing'],
      },
      {
        slug: 'institutional-reports',
        name: 'Institutional Reports',
        heading: 'Institutional Reports',
        icon: Building2,
        intro: 'Annual, research and impact reports for universities and organisations.',
        body: [
          'Institutions need reports that represent their work accurately and professionally — annual reviews, research output summaries, impact and accreditation reports. We help plan, edit and produce these documents to a consistent, credible standard.',
          'Working with the institution’s teams, we structure content, harmonise contributions from multiple authors, and ensure clean formatting and accurate data throughout. The outcome supports accountability, funding and reputation with a polished, coherent record.',
        ],
        benefits: ['Consistent multi-author formatting', 'Accurate data and clean layout', 'Supports accreditation and funding'],
      },
      {
        slug: 'policy-reports',
        name: 'Policy Reports',
        heading: 'Policy Reports',
        icon: ScrollText,
        intro: 'Rigorous policy briefs that connect research to practice.',
        body: [
          'Policy reports translate research evidence into actionable guidance for decision-makers. We help researchers and institutions produce briefs that state the issue, summarise the evidence, and set out clear, proportionate recommendations.',
          'We focus on clarity, balance and integrity — representing the evidence fairly, acknowledging uncertainty, and avoiding overstatement. This supports credible engagement with government, funders and professional bodies across health, education, technology and social policy.',
        ],
        benefits: ['Evidence-to-action clarity', 'Balanced, honest framing', 'Credible with funders and government'],
      },
    ],
  },
]

export const AUTHOR_SERVICE_BY_SLUG: Record<string, ServiceCategory> = Object.fromEntries(
  AUTHOR_SERVICE_CATEGORIES.map((c) => [c.slug, c]),
)
