// Brand wordmark + scholarly SVG motifs for Trueline Publishers. The logomark
// is the shared Trueline "true line": a clean signal that crests into a node —
// precision meeting discovery. The wordmark reads "Publishers" to mark the
// publishing arm of the group, while staying visually identical to the family.

export function Logomark({ className = 'h-9 w-9', dark = false }: { className?: string; dark?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="tlspec" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0E8C7F" />
          <stop offset="0.55" stopColor="#22C3C9" />
          <stop offset="1" stopColor="#3E9BE8" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill={dark ? '#FFFFFF' : '#0A1A26'} />
      <path
        d="M13 41 C24 41 24 23 32 23 C40 23 40 41 51 41"
        fill="none"
        stroke="url(#tlspec)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="23" r="4.6" fill="#22C3C9" />
      <circle cx="13" cy="41" r="2.6" fill={dark ? '#0A1A26' : '#FFFFFF'} opacity="0.85" />
      <circle cx="51" cy="41" r="2.6" fill={dark ? '#0A1A26' : '#FFFFFF'} opacity="0.85" />
    </svg>
  )
}

export function Wordmark({ className = '', tone = 'ink' }: { className?: string; tone?: 'ink' | 'white' }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Logomark className="h-9 w-9" dark={tone === 'white'} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.18rem] font-semibold tracking-tight ${
            tone === 'white' ? 'text-white' : 'text-ink'
          }`}
        >
          Trueline
        </span>
        <span
          className={`text-[0.62rem] font-semibold uppercase tracking-[0.30em] ${
            tone === 'white' ? 'text-white/55' : 'text-ink-faint'
          }`}
        >
          Publishers
        </span>
      </span>
    </span>
  )
}

/** Open-journal / pages motif — a stylised open volume with a signal line. */
export function JournalMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="jm" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0E8C7F" />
          <stop offset="0.55" stopColor="#22C3C9" />
          <stop offset="1" stopColor="#3E9BE8" />
        </linearGradient>
      </defs>
      <path d="M100 52 C78 40 52 40 32 50 V150 C52 140 78 140 100 152" stroke="url(#jm)" strokeWidth="2.4" opacity="0.85" />
      <path d="M100 52 C122 40 148 40 168 50 V150 C148 140 122 140 100 152" stroke="url(#jm)" strokeWidth="2.4" opacity="0.6" />
      <line x1="100" y1="52" x2="100" y2="152" stroke="#0E8C7F" strokeWidth="2" opacity="0.4" />
      {[68, 82, 96, 110].map((y) => (
        <line key={`l${y}`} x1="44" y1={y} x2="88" y2={y - 4} stroke="#0E8C7F" strokeWidth="1.3" opacity="0.25" />
      ))}
      {[68, 82, 96, 110].map((y) => (
        <line key={`r${y}`} x1="112" y1={y - 4} x2="156" y2={y} stroke="#3E9BE8" strokeWidth="1.3" opacity="0.22" />
      ))}
      <circle cx="100" cy="46" r="5" fill="#22C3C9" />
    </svg>
  )
}

/** A faint DNA double-helix line motif for hero / section accents. */
export function HelixLines({ className = '' }: { className?: string }) {
  const rungs = Array.from({ length: 13 })
  return (
    <svg viewBox="0 0 220 520" className={className} fill="none" aria-hidden="true">
      <path
        d="M40 0 C160 70 160 120 40 190 C160 260 160 310 40 380 C160 450 160 500 40 560"
        stroke="url(#tlspec)"
        strokeWidth="2"
        opacity="0.7"
      />
      <path
        d="M180 0 C60 70 60 120 180 190 C60 260 60 310 180 380 C60 450 60 500 180 560"
        stroke="url(#tlspec)"
        strokeWidth="2"
        opacity="0.45"
      />
      {rungs.map((_, i) => {
        const y = 18 + i * 40
        return <line key={i} x1="55" y1={y} x2="165" y2={y} stroke="#0E8C7F" strokeWidth="1.4" opacity="0.18" />
      })}
    </svg>
  )
}

/** Connected-node molecule used as decorative texture. */
export function Molecule({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <g stroke="#0E8C7F" strokeWidth="1.2" opacity="0.5">
        <line x1="40" y1="60" x2="100" y2="40" />
        <line x1="100" y1="40" x2="160" y2="70" />
        <line x1="100" y1="40" x2="100" y2="110" />
        <line x1="100" y1="110" x2="50" y2="150" />
        <line x1="100" y1="110" x2="160" y2="140" />
        <line x1="40" y1="60" x2="100" y2="110" />
      </g>
      {[
        [40, 60, 5],
        [100, 40, 7],
        [160, 70, 5],
        [100, 110, 8],
        [50, 150, 5],
        [160, 140, 6],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? '#22C3C9' : '#0E8C7F'} opacity="0.85" />
      ))}
    </svg>
  )
}
