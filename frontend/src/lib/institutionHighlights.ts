// ─────────────────────────────────────────────────────────────────────────
// Institutional Highlights — dedicated detail pages.
// Single source of truth for the nine highlight pages linked from the
// "Institutional Highlights" section of /institutions. Each entry maps to
// /institutions/<slug> and is rendered by <InstitutionHighlightPage/> using
// the same UI primitives and branding as the Author Services detail pages.
// `id` matches the corresponding entry in INSTITUTION_HIGHLIGHTS (content.ts)
// so the cards can link straight through.
// ─────────────────────────────────────────────────────────────────────────
import type { LucideIcon } from 'lucide-react'
import {
  Presentation,
  BookOpen,
  GraduationCap,
  Users,
  Award,
  Lightbulb,
  Building2,
  TrendingUp,
  Handshake,
  CalendarDays,
  ClipboardCheck,
  FileText,
  Layers,
  Globe,
  ShieldCheck,
  Search,
  Compass,
  BadgeCheck,
  BarChart3,
  Microscope,
  Rocket,
  Scale,
  PenLine,
  LineChart,
  UserCheck,
  Briefcase,
  Network,
} from 'lucide-react'

export type Feature = { icon: LucideIcon; title: string; body: string }
export type ProcessStep = { title: string; body: string }

export type InstitutionHighlight = {
  id: string // matches INSTITUTION_HIGHLIGHTS id in content.ts
  slug: string
  route: string
  icon: LucideIcon
  audience: string
  title: string
  intro: string
  overview: string[]
  keyFeatures: Feature[]
  services: string[]
  benefits: string[]
  process: ProcessStep[]
  whyChoose: string[]
}

const WHY_COMMON = [
  'Integrity-first partner — editorial and commercial functions are kept firmly separate.',
  'Multidisciplinary team across sciences, engineering, management and the humanities.',
  'Transparent timelines, honest scope and clear communication throughout.',
  'Trusted by colleges, universities and academic institutions building research capability.',
]

export const INSTITUTION_HIGHLIGHTS_DETAIL: InstitutionHighlight[] = [
  {
    id: 'conferences',
    slug: 'international-conferences',
    route: '/institutions/international-conferences',
    icon: Presentation,
    audience: 'For institutions · Events & proceedings',
    title: 'International Conferences',
    intro:
      'End-to-end planning and academic support for national and international conferences that promote collaboration, knowledge exchange and a lasting, citable scholarly record.',
    overview: [
      'We help institutions conceive, plan and run academic conferences from the first concept note to the published proceedings. Working alongside your organising committee, we manage the moving parts — scientific committees, submission workflows, review coordination and event logistics — so your teams can focus on the quality of the scholarly programme.',
      'Every engagement is built to the same standards we hold our own journal to: fair peer review, clean metadata and an honest indexing roadmap. From focused departmental workshops to large multidisciplinary congresses, we help your event reach the right research communities and leave a durable, referenceable publication behind.',
    ],
    keyFeatures: [
      { icon: CalendarDays, title: 'Full event planning', body: 'Scheduling, committee coordination and on-the-day logistics managed to realistic, well-run timelines.' },
      { icon: ClipboardCheck, title: 'Fair review coordination', body: 'Call for papers, track definition, reviewer panels and transparent decision tracking.' },
      { icon: Layers, title: 'Proceedings production', body: 'Accepted papers compiled and formatted into a professional, citable volume.' },
      { icon: Globe, title: 'Global visibility', body: 'Event website, ISBN/DOI support and indexing guidance to extend scholarly reach.' },
    ],
    services: [
      'National & International Conferences',
      'Conference Planning',
      'Scientific Committee Support',
      'Paper Submission System',
      'Conference Proceedings',
      'ISBN / DOI Support',
      'Scopus & WoS Proceedings Guidance',
      'Event Website Development',
    ],
    benefits: [
      'A professionally organised event, run to academic standards.',
      'Fair, transparent peer review that protects credibility.',
      'A durable, citable proceedings volume with clean metadata.',
      'Wider reach through a dedicated event website and clear identifiers.',
    ],
    process: [
      { title: 'Consultation & scoping', body: 'We understand your theme, scale and objectives, then agree a realistic plan and timeline.' },
      { title: 'Committee & CFP setup', body: 'We support the scientific committee, draft the call for papers and define tracks.' },
      { title: 'Submission & review', body: 'A submission system collects papers; reviewer panels evaluate them fairly and on schedule.' },
      { title: 'Event delivery', body: 'We coordinate logistics, the event website and speaker programme through to the closing session.' },
      { title: 'Proceedings & indexing', body: 'Accepted papers are compiled with ISBN/DOI support and honest indexing guidance.' },
    ],
    whyChoose: WHY_COMMON,
  },
  {
    id: 'publications',
    slug: 'research-publications',
    route: '/institutions/research-publications',
    icon: BookOpen,
    audience: 'For institutions · Publishing support',
    title: 'Research Publications',
    intro:
      'Professional support for peer-reviewed publication across reputable, indexed venues — with editorial services, ethics guidance and honest journal-selection advice at every step.',
    overview: [
      'We help institutions and their researchers move sound work into reputable, well-matched journals. Our support spans pre-submission review, journal-selection guidance, formatting, DOI registration and structured responses to reviewers — all delivered as professional assistance, never a promise of acceptance, which rests solely with a journal’s independent editors.',
      'From biomedical sciences to engineering, management and the humanities, we help authors present their research clearly and ethically. We guide teams toward credible Scopus- and Web of Science-indexed venues, flag predatory outlets to avoid, and hold every manuscript to the presentation, referencing and integrity standards expected of serious scholarship.',
    ],
    keyFeatures: [
      { icon: Search, title: 'Journal selection', body: 'Evidence-based shortlisting of reputable, well-matched venues — and predatory-venue awareness.' },
      { icon: ShieldCheck, title: 'Publication ethics', body: 'Guidance on originality, correct attribution and responsible authorship.' },
      { icon: FileText, title: 'Editorial services', body: 'Scientific and language editing that sharpens argument, accuracy and clarity.' },
      { icon: BadgeCheck, title: 'DOI registration', body: 'Persistent identifiers and clean metadata for lasting discoverability.' },
    ],
    services: [
      'Scopus Publications',
      'Web of Science Publications',
      'Peer Review Support',
      'Journal Selection',
      'Publication Ethics',
      'DOI Registration',
      'Editorial Services',
      'Research Visibility',
    ],
    benefits: [
      'A better-matched, more credible target journal.',
      'Manuscripts strengthened before submission to reduce avoidable rejections.',
      'Ethical, correctly attributed and integrity-compliant work.',
      'Improved discoverability through DOIs and clean metadata.',
    ],
    process: [
      { title: 'Manuscript review', body: 'An independent pre-submission critique of methodology, structure and clarity.' },
      { title: 'Journal shortlisting', body: 'We identify reputable, indexed venues aligned with your scope and audience.' },
      { title: 'Formatting & submission', body: 'We format to the target’s guidelines and support the submission process.' },
      { title: 'Reviewer response', body: 'We help draft structured, point-by-point responses to peer-review comments.' },
      { title: 'Registration & visibility', body: 'DOI registration and metadata work to maximise the paper’s reach.' },
    ],
    whyChoose: WHY_COMMON,
  },
  {
    id: 'guidance',
    slug: 'student-research-guidance',
    route: '/institutions/student-research-guidance',
    icon: GraduationCap,
    audience: 'For institutions · Student mentoring',
    title: 'Student Research Guidance',
    intro:
      'Structured mentoring for undergraduate, postgraduate and research scholars — from project development and methodology to thesis support and publication assistance.',
    overview: [
      'We support students at every stage of the research journey, helping them turn broad interests into focused, feasible projects and carry them through to a well-written, examiner-ready outcome. Our mentors guide topic selection, research methodology, academic writing and the editing of theses and dissertations.',
      'Working with departments and supervisors, we help build genuine research capability rather than shortcuts — reinforcing good methodology, honest referencing and clear scholarly writing. Where students are ready, we provide ethical publication assistance that respects integrity standards and the independence of journal review.',
    ],
    keyFeatures: [
      { icon: Compass, title: 'Project development', body: 'Focused, feasible topics scoped for UG, PG and PhD-level work.' },
      { icon: Microscope, title: 'Research methodology', body: 'Sound design, methods and analysis matched to the research question.' },
      { icon: PenLine, title: 'Academic writing', body: 'Clear, well-structured writing and careful thesis and dissertation editing.' },
      { icon: BookOpen, title: 'Publication assistance', body: 'Ethical guidance for students ready to publish their work.' },
    ],
    services: [
      'UG Projects',
      'PG Projects',
      'PhD Guidance',
      'Thesis Support',
      'Dissertation Editing',
      'Research Methodology',
      'Academic Writing',
      'Publication Assistance',
    ],
    benefits: [
      'Stronger, more original student projects and theses.',
      'Confident command of research methodology and academic writing.',
      'Examiner-ready dissertations, consistent across chapters.',
      'A responsible, integrity-first path toward publication.',
    ],
    process: [
      { title: 'Topic & scoping', body: 'We help define a focused, researchable topic suited to the student’s level.' },
      { title: 'Methodology design', body: 'We guide an appropriate, defensible research design and methods.' },
      { title: 'Writing & drafting', body: 'Structured support for chapters, argument and academic writing.' },
      { title: 'Editing & review', body: 'Thesis and dissertation editing for consistency, clarity and compliance.' },
      { title: 'Publication support', body: 'Where appropriate, ethical assistance in preparing work for publication.' },
    ],
    whyChoose: WHY_COMMON,
  },
  {
    id: 'faculty',
    slug: 'faculty-development',
    route: '/institutions/faculty-development',
    icon: Users,
    audience: 'For institutions · Capacity building',
    title: 'Faculty Development',
    intro:
      'Faculty Development Programs, AI workshops and research training that build lasting scholarly and professional capability across your institution.',
    overview: [
      'We design and deliver faculty development that strengthens the people at the heart of research and teaching. Our programmes span FDPs, hands-on AI and research-tools workshops, academic writing, grant and proposal writing, and patent awareness — practical, discipline-aware training that faculty can apply immediately.',
      'Each programme is tailored to your institution’s goals and delivered by an experienced multidisciplinary team. The emphasis is on durable skill enhancement: better writing, stronger proposals, sharper research practice and a broader awareness of publishing and IP — capabilities that compound across departments over time.',
    ],
    keyFeatures: [
      { icon: Users, title: 'FDP programmes', body: 'Structured, outcome-focused faculty development tailored to your institution.' },
      { icon: Lightbulb, title: 'AI & research workshops', body: 'Hands-on training in AI tools, research methods and modern practice.' },
      { icon: PenLine, title: 'Academic & grant writing', body: 'Practical writing training, including competitive grant and proposal writing.' },
      { icon: ShieldCheck, title: 'Patent awareness', body: 'Foundational IP and patent literacy for research-active faculty.' },
    ],
    services: [
      'FDP Programs',
      'AI Workshops',
      'Research Training',
      'Academic Writing',
      'Grant Proposal Writing',
      'Patent Awareness',
      'Faculty Skill Enhancement',
      'Publication Workshops',
    ],
    benefits: [
      'Faculty equipped with current, practical research skills.',
      'Stronger grant proposals and higher-quality writing.',
      'Greater awareness of publishing standards and IP.',
      'Capability that compounds across departments over time.',
    ],
    process: [
      { title: 'Needs assessment', body: 'We identify skill gaps and objectives with your leadership and departments.' },
      { title: 'Programme design', body: 'We tailor sessions, agendas and outcomes to your faculty’s needs.' },
      { title: 'Delivery', body: 'Experienced trainers run interactive, hands-on FDPs and workshops.' },
      { title: 'Practice & application', body: 'Faculty apply new skills to real writing, proposals and research tasks.' },
      { title: 'Follow-up', body: 'We review outcomes and recommend next steps for sustained development.' },
    ],
    whyChoose: WHY_COMMON,
  },
  {
    id: 'accreditation',
    slug: 'accreditation-ranking',
    route: '/institutions/accreditation-ranking',
    icon: Award,
    audience: 'For institutions · Quality & rankings',
    title: 'Accreditation & Ranking',
    intro:
      'Documentation and quality-assurance support for NAAC, NBA, NIRF and QS — helping institutions present their work accurately, credibly and with well-organised evidence.',
    overview: [
      'We help institutions navigate accreditation and ranking frameworks by getting the fundamentals right: accurate data, well-structured documentation and evidence that stands up to scrutiny. Our support spans NAAC and NBA preparation, NIRF documentation, QS ranking guidance, IQAC support and academic audit.',
      'The focus is on honest, high-quality representation of the institution’s work — never inflated claims. We help harmonise data from multiple departments, structure institutional records and shape a sound research policy, so your submissions are coherent, defensible and reflect the real strengths of your institution.',
    ],
    keyFeatures: [
      { icon: BadgeCheck, title: 'NAAC & NBA support', body: 'Preparation, documentation and evidence organisation for accreditation.' },
      { icon: FileText, title: 'NIRF documentation', body: 'Accurate, well-structured data preparation for ranking submissions.' },
      { icon: Award, title: 'QS ranking guidance', body: 'Guidance on international ranking criteria and evidence presentation.' },
      { icon: ClipboardCheck, title: 'IQAC & academic audit', body: 'Support for internal quality assurance and academic audit processes.' },
    ],
    services: [
      'NAAC Support',
      'NBA Support',
      'NIRF Documentation',
      'QS Ranking Guidance',
      'Institutional Data Management',
      'IQAC Support',
      'Academic Audit',
      'Research Policy',
    ],
    benefits: [
      'Accurate, well-organised documentation and evidence.',
      'Coherent data harmonised across departments.',
      'Defensible submissions aligned with framework criteria.',
      'A sound, sustainable research and quality policy.',
    ],
    process: [
      { title: 'Gap analysis', body: 'We review current documentation against the relevant framework criteria.' },
      { title: 'Data management', body: 'We help gather and harmonise accurate institutional data.' },
      { title: 'Documentation', body: 'We structure records, reports and evidence to a consistent standard.' },
      { title: 'Review & audit', body: 'Internal review and academic audit before submission.' },
      { title: 'Policy & follow-up', body: 'We help shape research and quality policy for sustained improvement.' },
    ],
    whyChoose: WHY_COMMON,
  },
  {
    id: 'innovation',
    slug: 'innovation-ipr',
    route: '/institutions/innovation-ipr',
    icon: Lightbulb,
    audience: 'For institutions · Innovation & IP',
    title: 'Innovation & IPR',
    intro:
      'Support for patents, copyrights, trademarks and technology transfer — building an innovation ecosystem that protects and translates institutional research.',
    overview: [
      'We help institutions protect and commercialise the ideas their research produces. Our support covers patent filing, copyright and trademark, technology transfer and startup and incubation support, alongside broad IPR awareness that helps faculty and students recognise and safeguard their innovations.',
      'Beyond individual filings, we help build a functioning innovation ecosystem — connecting research, protection and translation so good ideas move from the lab toward real-world impact. We work with your innovation and incubation teams to establish practical processes and a culture of responsible, well-managed intellectual property.',
    ],
    keyFeatures: [
      { icon: ShieldCheck, title: 'Patent filing', body: 'Guidance and support through the patent process, from drafting to filing.' },
      { icon: Scale, title: 'Copyright & trademark', body: 'Protection for creative works, brands and institutional identity.' },
      { icon: Rocket, title: 'Technology transfer', body: 'Support for moving research toward application and commercialisation.' },
      { icon: Lightbulb, title: 'Innovation ecosystem', body: 'Incubation and startup support that nurtures new ventures.' },
    ],
    services: [
      'Patent Filing',
      'Copyright',
      'Trademark',
      'Technology Transfer',
      'Startup Support',
      'Innovation Ecosystem',
      'Incubation Support',
      'IPR Awareness',
    ],
    benefits: [
      'Institutional innovations protected and properly owned.',
      'A clear path from research to real-world application.',
      'Practical support for startups and incubation.',
      'Greater IPR literacy across faculty and students.',
    ],
    process: [
      { title: 'IP assessment', body: 'We evaluate innovations and identify the right form of protection.' },
      { title: 'Protection & filing', body: 'We support patent, copyright or trademark drafting and filing.' },
      { title: 'Awareness building', body: 'We run IPR awareness sessions for faculty and students.' },
      { title: 'Technology transfer', body: 'We help translate protected research toward application.' },
      { title: 'Ecosystem support', body: 'We support incubation, startups and a lasting innovation culture.' },
    ],
    whyChoose: WHY_COMMON,
  },
  {
    id: 'excellence',
    slug: 'centre-of-excellence',
    route: '/institutions/centre-of-excellence',
    icon: Building2,
    audience: 'For institutions · Strategic capability',
    title: 'Centre of Excellence',
    intro:
      'Planning and establishing multidisciplinary Centres of Excellence — research centres and innovation labs aligned with industry, emerging technologies and academic strength.',
    overview: [
      'We help institutions design and stand up Centres of Excellence that concentrate talent, infrastructure and industry links around areas of genuine strength. Our support spans COE planning, research-centre and innovation-lab design, industry collaboration and strategic planning aligned with emerging technologies.',
      'A well-built COE becomes an engine for research output, skill development and academic excellence. We work with your leadership to define focus areas, structure governance and partnerships, and set a realistic roadmap — so the centre delivers measurable value rather than remaining an aspiration on paper.',
    ],
    keyFeatures: [
      { icon: Building2, title: 'COE planning', body: 'Strategic design of Centres of Excellence around institutional strengths.' },
      { icon: Microscope, title: 'Research & innovation labs', body: 'Well-structured research centres and labs for focused, high-impact work.' },
      { icon: Handshake, title: 'Industry collaboration', body: 'Partnerships that connect the centre with real-world problems and funding.' },
      { icon: Compass, title: 'Strategic planning', body: 'Clear focus areas, governance and a realistic delivery roadmap.' },
    ],
    services: [
      'COE Planning',
      'Research Centers',
      'Industry Collaboration',
      'Innovation Labs',
      'Emerging Technologies',
      'Skill Development',
      'Academic Excellence',
      'Strategic Planning',
    ],
    benefits: [
      'A focused centre built around genuine institutional strengths.',
      'Stronger industry links, funding and real-world relevance.',
      'A hub for skill development and academic excellence.',
      'A clear, measurable delivery roadmap — not just an aspiration.',
    ],
    process: [
      { title: 'Vision & focus', body: 'We define the centre’s focus areas and strategic objectives with your leadership.' },
      { title: 'Design & governance', body: 'We structure the centre, its labs, governance and partnerships.' },
      { title: 'Industry alignment', body: 'We connect the COE with relevant industry and research collaborators.' },
      { title: 'Capability building', body: 'We support skill development and the research programme.' },
      { title: 'Roadmap & review', body: 'We set milestones and review progress toward measurable outcomes.' },
    ],
    whyChoose: WHY_COMMON,
  },
  {
    id: 'impact',
    slug: 'research-impact',
    route: '/institutions/research-impact',
    icon: TrendingUp,
    audience: 'For institutions · Visibility & impact',
    title: 'Research Impact',
    intro:
      'Improving research visibility and impact through ethical publishing, indexing guidance, citation improvement, author profiles and global collaboration.',
    overview: [
      'We help institutions and researchers increase the reach and impact of their work — ethically and sustainably. Our support spans research visibility, honest indexing guidance, research analytics, and well-maintained scholarly profiles on ORCID and Google Scholar.',
      'Impact is built on credibility, not shortcuts. We focus on genuine visibility: sound indexing practice, accurate author profiles, and international collaboration that broadens audience and citation over time. Every recommendation respects publication ethics and the independence of the databases and journals involved.',
    ],
    keyFeatures: [
      { icon: LineChart, title: 'Citation improvement', body: 'Ethical strategies to improve visibility and citation of your research.' },
      { icon: Search, title: 'Indexing support', body: 'Honest guidance on indexing databases and discoverability.' },
      { icon: UserCheck, title: 'Author profiles', body: 'Well-maintained ORCID and Google Scholar profiles for researchers.' },
      { icon: BarChart3, title: 'Research analytics', body: 'Insight into reach, citation and impact to inform strategy.' },
    ],
    services: [
      'Citation Improvement',
      'Research Visibility',
      'Indexing Support',
      'Research Analytics',
      'Author Profiles',
      'ORCID',
      'Google Scholar',
      'Global Collaboration',
    ],
    benefits: [
      'Greater, ethically achieved research visibility.',
      'Accurate, well-maintained researcher profiles.',
      'Clear analytics to guide impact strategy.',
      'Broader audience through international collaboration.',
    ],
    process: [
      { title: 'Visibility audit', body: 'We assess current visibility, profiles and indexing status.' },
      { title: 'Profile setup', body: 'We establish and refine ORCID and Google Scholar profiles.' },
      { title: 'Indexing guidance', body: 'We advise on discoverability and reputable indexing databases.' },
      { title: 'Analytics review', body: 'We track reach and citation to inform next steps.' },
      { title: 'Collaboration', body: 'We support global collaboration to broaden audience and impact.' },
    ],
    whyChoose: WHY_COMMON,
  },
  {
    id: 'industry',
    slug: 'industry-collaboration',
    route: '/institutions/industry-collaboration',
    icon: Handshake,
    audience: 'For institutions · Academia–industry',
    title: 'Industry Collaboration',
    intro:
      'Building durable partnerships between academia and industry — through consultancy, joint research, internships, MoUs, corporate training and technology transfer.',
    overview: [
      'We help institutions connect with industry in ways that create real value for both sides. Our support spans consultancy and industry partnerships, joint research, internships, MoUs, corporate training and innovation projects — all structured to be practical, well-governed and mutually beneficial.',
      'Strong academia–industry links turn research into impact and give students and faculty real-world exposure. We help identify the right partners, formalise agreements and set up collaborative projects and technology transfer, so the relationship delivers lasting outcomes rather than one-off events.',
    ],
    keyFeatures: [
      { icon: Briefcase, title: 'Consultancy & partnerships', body: 'Industry partnerships and consultancy that create shared value.' },
      { icon: Network, title: 'Joint research', body: 'Collaborative research projects and innovation initiatives.' },
      { icon: GraduationCap, title: 'Internships & training', body: 'Internships and corporate training that connect students with industry.' },
      { icon: FileText, title: 'MoUs & agreements', body: 'Well-structured MoUs and agreements that formalise collaboration.' },
    ],
    services: [
      'Consultancy',
      'Industry Partnerships',
      'Internships',
      'Joint Research',
      'MoUs',
      'Corporate Training',
      'Technology Transfer',
      'Innovation Projects',
    ],
    benefits: [
      'Practical, well-governed academia–industry partnerships.',
      'Real-world exposure for students and faculty.',
      'Research translated into applied impact.',
      'Lasting relationships, formalised through clear agreements.',
    ],
    process: [
      { title: 'Partner identification', body: 'We help identify industry partners aligned with your strengths.' },
      { title: 'Agreements & MoUs', body: 'We support structuring MoUs and collaboration agreements.' },
      { title: 'Project setup', body: 'We help launch joint research, internships and training.' },
      { title: 'Technology transfer', body: 'We support moving research toward industry application.' },
      { title: 'Review & growth', body: 'We review outcomes and help grow the partnership over time.' },
    ],
    whyChoose: WHY_COMMON,
  },
]

export const INSTITUTION_HIGHLIGHT_BY_ID: Record<string, InstitutionHighlight> = Object.fromEntries(
  INSTITUTION_HIGHLIGHTS_DETAIL.map((h) => [h.id, h]),
)
