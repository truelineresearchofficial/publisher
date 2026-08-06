// ─────────────────────────────────────────────────────────────────────────
// Topic-specific hero illustrations for Author Services and Institutional
// Highlight detail pages. All share the Trueline visual language of the
// existing Marks: a 200×200 viewBox, thin line-art, the brand spectrum
// gradient (#00A99D → #22C3C9 → #3E9BE8) and a single filled node accent.
// Rendered by <PageHero art={...}/> at identical dimensions.
// ─────────────────────────────────────────────────────────────────────────

type MarkProps = { className?: string }

/** Shared spectrum gradient — unique id per mark so multiple can coexist. */
function Grad({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#00A99D" />
      <stop offset="0.55" stopColor="#22C3C9" />
      <stop offset="1" stopColor="#3E9BE8" />
    </linearGradient>
  )
}

/** Academic publishing / editorial review — an open journal with a peer-review seal. */
export function PublishingMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-pub" /></defs>
      <path d="M100 64 C80 53 56 53 38 62 V150 C56 141 80 141 100 152" stroke="url(#hm-pub)" strokeWidth="2.4" opacity="0.85" />
      <path d="M100 64 C120 53 144 53 162 62 V150 C144 141 120 141 100 152" stroke="url(#hm-pub)" strokeWidth="2.4" opacity="0.6" />
      <line x1="100" y1="64" x2="100" y2="152" stroke="#00A99D" strokeWidth="2" opacity="0.4" />
      {[80, 92, 104, 116].map((y) => (
        <line key={`l${y}`} x1="50" y1={y} x2="86" y2={y - 3} stroke="#00A99D" strokeWidth="1.3" opacity="0.25" />
      ))}
      {[80, 92, 104, 116].map((y) => (
        <line key={`r${y}`} x1="114" y1={y - 3} x2="150" y2={y} stroke="#3E9BE8" strokeWidth="1.3" opacity="0.22" />
      ))}
      <circle cx="100" cy="46" r="20" stroke="url(#hm-pub)" strokeWidth="2.4" opacity="0.8" />
      <path d="M91 46 l6 6 12 -13" stroke="#22C3C9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Academic books / publishing — a stack of bound volumes. */
export function BooksMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-books" /></defs>
      <g stroke="url(#hm-books)" strokeWidth="2.4" strokeLinejoin="round">
        <rect x="48" y="58" width="104" height="24" rx="5" opacity="0.85" />
        <rect x="42" y="86" width="112" height="24" rx="5" opacity="0.6" />
        <rect x="52" y="114" width="96" height="24" rx="5" opacity="0.8" />
      </g>
      <g stroke="#00A99D" strokeWidth="1.6" opacity="0.4" strokeLinecap="round">
        <line x1="60" y1="64" x2="60" y2="76" />
        <line x1="54" y1="92" x2="54" y2="104" />
        <line x1="64" y1="120" x2="64" y2="132" />
      </g>
      <circle cx="128" cy="46" r="5" fill="#22C3C9" />
    </svg>
  )
}

/** Research planning / workflow — a magnifier over a small node network. */
export function ResearchMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-research" /></defs>
      <circle cx="88" cy="86" r="42" stroke="url(#hm-research)" strokeWidth="2.4" opacity="0.85" />
      <line x1="118" y1="116" x2="152" y2="150" stroke="url(#hm-research)" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      <g stroke="#00A99D" strokeWidth="1.4" opacity="0.4">
        <line x1="70" y1="98" x2="86" y2="70" />
        <line x1="86" y1="70" x2="106" y2="92" />
        <line x1="70" y1="98" x2="106" y2="92" />
      </g>
      {[[70, 98], [86, 70], [106, 92]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill={i === 1 ? '#22C3C9' : '#00A99D'} opacity="0.85" />
      ))}
    </svg>
  )
}

/** Manuscript / thesis editing — a document with a pen. */
export function EditingMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-edit" /></defs>
      <path d="M58 40 H116 L140 64 V160 H58 Z" stroke="url(#hm-edit)" strokeWidth="2.4" strokeLinejoin="round" opacity="0.8" />
      <path d="M116 40 V64 H140" stroke="url(#hm-edit)" strokeWidth="2.4" strokeLinejoin="round" opacity="0.55" />
      <g stroke="#00A99D" strokeWidth="1.6" opacity="0.3" strokeLinecap="round">
        <line x1="74" y1="86" x2="124" y2="86" />
        <line x1="74" y1="102" x2="124" y2="102" />
        <line x1="74" y1="118" x2="108" y2="118" />
      </g>
      <path d="M118 138 L146 110 L158 122 L130 150 L114 154 Z" stroke="url(#hm-edit)" strokeWidth="2.4" strokeLinejoin="round" opacity="0.85" />
      <circle cx="152" cy="72" r="5" fill="#22C3C9" />
    </svg>
  )
}

/** Simulation & data analysis — bar chart with a trend line. */
export function DataMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-data" /></defs>
      <path d="M48 44 V150 H156" stroke="#00A99D" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      <g stroke="url(#hm-data)" strokeWidth="10" strokeLinecap="round" opacity="0.65">
        <line x1="70" y1="150" x2="70" y2="122" />
        <line x1="94" y1="150" x2="94" y2="102" />
        <line x1="118" y1="150" x2="118" y2="114" />
        <line x1="142" y1="150" x2="142" y2="86" />
      </g>
      <path d="M62 110 L92 86 L116 98 L148 64" stroke="#3E9BE8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <circle cx="148" cy="64" r="5" fill="#22C3C9" />
    </svg>
  )
}

/** Publication support — a paper submitted upward, accepted with a check. */
export function SubmissionMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-submit" /></defs>
      <rect x="50" y="72" width="72" height="90" rx="8" stroke="url(#hm-submit)" strokeWidth="2.4" opacity="0.7" />
      <g stroke="#00A99D" strokeWidth="1.6" opacity="0.3" strokeLinecap="round">
        <line x1="64" y1="94" x2="108" y2="94" />
        <line x1="64" y1="110" x2="108" y2="110" />
        <line x1="64" y1="126" x2="92" y2="126" />
      </g>
      <path d="M86 66 V40 M72 54 L86 38 L100 54" stroke="url(#hm-submit)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <circle cx="132" cy="120" r="24" stroke="url(#hm-submit)" strokeWidth="2.4" opacity="0.75" />
      <path d="M122 120 l7 8 13 -15" stroke="#22C3C9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Conference — a presentation screen, podium and audience. */
export function ConferenceMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-conf" /></defs>
      <rect x="46" y="42" width="108" height="66" rx="8" stroke="url(#hm-conf)" strokeWidth="2.4" opacity="0.8" />
      <path d="M60 94 L84 72 L102 84 L140 56" stroke="#3E9BE8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <line x1="100" y1="108" x2="100" y2="124" stroke="#00A99D" strokeWidth="2.4" opacity="0.5" />
      <line x1="80" y1="124" x2="120" y2="124" stroke="#00A99D" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
      {[64, 84, 104, 124, 144].map((x, i) => (
        <circle key={i} cx={x} cy={148} r="6" fill="#00A99D" opacity={i % 2 ? 0.45 : 0.7} />
      ))}
      <circle cx="140" cy="56" r="5" fill="#22C3C9" />
    </svg>
  )
}

/** Industry reports & whitepapers — a report with a pie chart and bars. */
export function ReportMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-report" /></defs>
      <rect x="50" y="42" width="100" height="116" rx="8" stroke="url(#hm-report)" strokeWidth="2.4" opacity="0.8" />
      <circle cx="80" cy="82" r="20" stroke="url(#hm-report)" strokeWidth="2.4" opacity="0.7" />
      <path d="M80 82 V62 A20 20 0 0 1 100 82 Z" fill="#22C3C9" opacity="0.55" />
      <g stroke="url(#hm-report)" strokeWidth="7" strokeLinecap="round" opacity="0.6">
        <line x1="114" y1="92" x2="114" y2="76" />
        <line x1="128" y1="92" x2="128" y2="66" />
      </g>
      <g stroke="#00A99D" strokeWidth="1.6" opacity="0.3" strokeLinecap="round">
        <line x1="66" y1="120" x2="134" y2="120" />
        <line x1="66" y1="134" x2="134" y2="134" />
        <line x1="66" y1="148" x2="110" y2="148" />
      </g>
    </svg>
  )
}

/** Academic journals / publications — a stacked journal cover. */
export function JournalsMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-journal" /></defs>
      <rect x="72" y="48" width="82" height="110" rx="8" stroke="url(#hm-journal)" strokeWidth="2.4" opacity="0.55" />
      <rect x="50" y="38" width="82" height="110" rx="8" stroke="url(#hm-journal)" strokeWidth="2.4" opacity="0.85" />
      <rect x="64" y="52" width="54" height="28" rx="4" stroke="#00A99D" strokeWidth="1.6" opacity="0.4" />
      <g stroke="#00A99D" strokeWidth="1.6" opacity="0.3" strokeLinecap="round">
        <line x1="64" y1="98" x2="118" y2="98" />
        <line x1="64" y1="112" x2="118" y2="112" />
        <line x1="64" y1="126" x2="100" y2="126" />
      </g>
      <circle cx="91" cy="66" r="6" fill="#22C3C9" opacity="0.7" />
    </svg>
  )
}

/** Student research guidance — a graduation cap. */
export function GuidanceMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-guide" /></defs>
      <path d="M100 56 L158 80 L100 104 L42 80 Z" stroke="url(#hm-guide)" strokeWidth="2.4" strokeLinejoin="round" opacity="0.85" />
      <path d="M70 92 V122 C70 134 130 134 130 122 V92" stroke="url(#hm-guide)" strokeWidth="2.4" strokeLinejoin="round" opacity="0.6" />
      <line x1="158" y1="80" x2="158" y2="114" stroke="#00A99D" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <circle cx="158" cy="118" r="5" fill="#22C3C9" />
    </svg>
  )
}

/** Faculty development — a training board with a chart and a presenter. */
export function FacultyMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-faculty" /></defs>
      <rect x="60" y="40" width="102" height="72" rx="8" stroke="url(#hm-faculty)" strokeWidth="2.4" opacity="0.8" />
      <path d="M74 96 L96 74 L114 86 L150 56" stroke="#3E9BE8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <line x1="111" y1="112" x2="111" y2="128" stroke="#00A99D" strokeWidth="2.4" opacity="0.4" />
      <circle cx="52" cy="130" r="12" stroke="url(#hm-faculty)" strokeWidth="2.4" opacity="0.8" />
      <path d="M34 162 C34 143 70 143 70 162" stroke="url(#hm-faculty)" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
      <circle cx="150" cy="56" r="5" fill="#22C3C9" />
    </svg>
  )
}

/** Accreditation & ranking — an award medal beside ranking bars. */
export function AwardMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-award" /></defs>
      <circle cx="84" cy="80" r="34" stroke="url(#hm-award)" strokeWidth="2.4" opacity="0.85" />
      <path d="M84 64 l5.6 11.4 12.6 1.8 -9.1 8.9 2.1 12.5 -11.2 -5.9 -11.2 5.9 2.1 -12.5 -9.1 -8.9 12.6 -1.8 Z" fill="#22C3C9" opacity="0.6" />
      <path d="M68 110 L58 150 L84 136 L110 150 L100 110" stroke="url(#hm-award)" strokeWidth="2.4" strokeLinejoin="round" opacity="0.55" />
      <g stroke="url(#hm-award)" strokeWidth="8" strokeLinecap="round" opacity="0.6">
        <line x1="134" y1="150" x2="134" y2="128" />
        <line x1="152" y1="150" x2="152" y2="108" />
      </g>
    </svg>
  )
}

/** Innovation & IPR — a lightbulb with circuit leads. */
export function InnovationMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-innov" /></defs>
      <path d="M100 44 C74 44 58 64 58 86 C58 103 71 112 78 126 H122 C129 112 142 103 142 86 C142 64 126 44 100 44 Z" stroke="url(#hm-innov)" strokeWidth="2.4" strokeLinejoin="round" opacity="0.85" />
      <path d="M84 138 H116 M88 150 H112" stroke="url(#hm-innov)" strokeWidth="2.4" strokeLinecap="round" opacity="0.55" />
      <path d="M100 76 V110 M100 92 L113 82 M100 100 L87 90" stroke="#3E9BE8" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <g stroke="#00A99D" strokeWidth="1.6" opacity="0.35" strokeLinecap="round">
        <line x1="58" y1="86" x2="38" y2="86" />
        <line x1="142" y1="86" x2="162" y2="86" />
      </g>
      <circle cx="38" cy="86" r="4" fill="#00A99D" opacity="0.7" />
      <circle cx="162" cy="86" r="4" fill="#00A99D" opacity="0.7" />
      <circle cx="100" cy="60" r="5" fill="#22C3C9" />
    </svg>
  )
}

/** Centre of Excellence — a columned research institution. */
export function CentreMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-centre" /></defs>
      <path d="M44 78 L100 48 L156 78" stroke="url(#hm-centre)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" opacity="0.85" />
      <line x1="52" y1="150" x2="148" y2="150" stroke="url(#hm-centre)" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
      <g stroke="url(#hm-centre)" strokeWidth="2.4" opacity="0.7">
        <line x1="62" y1="90" x2="62" y2="150" />
        <line x1="84" y1="90" x2="84" y2="150" />
        <line x1="116" y1="90" x2="116" y2="150" />
        <line x1="138" y1="90" x2="138" y2="150" />
      </g>
      <line x1="52" y1="90" x2="148" y2="90" stroke="#00A99D" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <circle cx="100" cy="66" r="5" fill="#22C3C9" />
    </svg>
  )
}

/** Research impact — an upward growth trend with citation nodes. */
export function ImpactMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-impact" /></defs>
      <path d="M46 44 V152 H154" stroke="#00A99D" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      <path d="M60 130 L88 100 L110 116 L146 74" stroke="url(#hm-impact)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <path d="M128 72 H150 V94" stroke="url(#hm-impact)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      {[[60, 130], [88, 100], [110, 116]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill="#00A99D" opacity="0.7" />
      ))}
      <circle cx="146" cy="74" r="6" fill="#22C3C9" />
    </svg>
  )
}

/** Industry collaboration — linked partner nodes meeting at a hub. */
export function CollaborationMark({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs><Grad id="hm-collab" /></defs>
      <path d="M40 70 C70 70 82 90 100 100" stroke="url(#hm-collab)" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
      <path d="M160 70 C130 70 118 90 100 100" stroke="url(#hm-collab)" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
      <path d="M40 130 C70 130 82 110 100 100" stroke="url(#hm-collab)" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
      <path d="M160 130 C130 130 118 110 100 100" stroke="url(#hm-collab)" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
      {[[40, 70], [160, 70], [40, 130], [160, 130]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill={i < 2 ? '#00A99D' : '#3E9BE8'} opacity="0.7" />
      ))}
      <circle cx="100" cy="100" r="8" fill="#22C3C9" />
    </svg>
  )
}
