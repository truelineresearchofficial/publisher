import { useState } from 'react'
import { motion } from 'framer-motion'
import { GROUP } from '../lib/content'

// The Trueline Group flywheel, seen from the Publishers' seat: Research
// generates the output, Publishers credentializes it, StartNet turns events
// into proceedings — all compounding a shared core of credibility, indexing
// and reputation. Publishers (node 1) is highlighted by default.

const NODES = [
  { ...GROUP[0], angle: -90, color: '#3E9BE8' },
  { ...GROUP[1], angle: 30, color: '#0E8C7F' },
  { ...GROUP[2], angle: 150, color: '#22C3C9' },
]

const R = 132
const C = 200

function pos(angle: number) {
  const rad = (angle * Math.PI) / 180
  return { x: C + R * Math.cos(rad), y: C + R * Math.sin(rad) }
}

export default function Flywheel() {
  const [active, setActive] = useState(1) // Publishers

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      {/* Diagram */}
      <div className="relative mx-auto w-full max-w-[420px]">
        <svg viewBox="0 0 400 400" className="w-full">
          <defs>
            <linearGradient id="fwring" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#0E8C7F" />
              <stop offset="0.5" stopColor="#22C3C9" />
              <stop offset="1" stopColor="#3E9BE8" />
            </linearGradient>
          </defs>

          {/* orbit ring */}
          <motion.circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="url(#fwring)"
            strokeWidth="1.5"
            strokeDasharray="3 7"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '200px 200px' }}
          />

          {/* connecting curved arrows between nodes */}
          {NODES.map((n, i) => {
            const a = pos(n.angle)
            const b = pos(NODES[(i + 1) % 3].angle)
            return (
              <path
                key={i}
                d={`M${a.x} ${a.y} Q ${C} ${C} ${b.x} ${b.y}`}
                fill="none"
                stroke={n.color}
                strokeWidth="1.6"
                opacity="0.35"
              />
            )
          })}

          {/* core */}
          <circle cx={C} cy={C} r="48" fill="#0A1A26" />
          <text x={C} y={C - 6} textAnchor="middle" className="fill-white" style={{ fontSize: 11.5, fontWeight: 600 }}>
            CREDIBILITY
          </text>
          <text x={C} y={C + 11} textAnchor="middle" className="fill-white/60" style={{ fontSize: 9.5 }}>
            INDEXING · TRUST
          </text>

          {/* nodes */}
          {NODES.map((n, i) => {
            const p = pos(n.angle)
            const on = active === i
            return (
              <g
                key={n.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="cursor-pointer"
              >
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={on ? 42 : 38}
                  fill="#fff"
                  stroke={n.color}
                  strokeWidth={on ? 3 : 1.5}
                  animate={{ r: on ? 42 : 38 }}
                />
                <circle cx={p.x} cy={p.y} r="6" fill={n.color} transform={`translate(0 -16)`} />
                <text
                  x={p.x}
                  y={p.y + 4}
                  textAnchor="middle"
                  className="fill-ink"
                  style={{ fontSize: 10.5, fontWeight: 600 }}
                >
                  {n.name.replace('Trueline ', '')}
                </text>
                <text x={p.x} y={p.y + 18} textAnchor="middle" className="fill-ink-faint" style={{ fontSize: 8 }}>
                  {n.role.split(' ')[0]}
                </text>
              </g>
            )
          })}
        </svg>

        {/* feed-in / scale-out labels */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold text-ink-soft shadow-card">
          Research output ↓
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold text-ink-soft shadow-card">
          ↑ Events → proceedings
        </div>
      </div>

      {/* Detail panel */}
      <div className="space-y-3">
        {NODES.map((n, i) => {
          const on = active === i
          return (
            <button
              key={n.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`block w-full rounded-2xl border p-5 text-left transition-all ${
                on ? 'border-brand-300 bg-white shadow-card' : 'border-line bg-canvas hover:border-line-2'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid h-9 w-9 place-items-center rounded-full text-sm font-bold text-white"
                  style={{ background: n.color }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{n.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: n.color }}>
                    {n.role}
                  </p>
                </div>
              </div>
              <motion.div
                initial={false}
                animate={{ height: on ? 'auto' : 0, opacity: on ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="pt-3 text-[15px] leading-relaxed text-ink-soft">{n.body}</p>
                <p className="mt-2 text-sm font-medium text-ink">→ {n.output}</p>
              </motion.div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
