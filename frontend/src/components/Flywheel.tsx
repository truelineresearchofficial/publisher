import { useState } from 'react'
import { motion } from 'framer-motion'
import { GROUP } from '../lib/content'

// The Trueline Group ecosystem, seen from the Publishers' seat: Research
// generates the output, Publishers credentializes it, the Journal publishes it,
// Spectrum amplifies it, and StartNet drives innovation — all compounding a
// shared Trueline Group core. Publishers (node 1) is highlighted by default.

const NODES = [
  { ...GROUP[0], angle: -90, color: '#3E9BE8' },
  { ...GROUP[1], angle: -18, color: '#00A99D' },
  { ...GROUP[2], angle: 54, color: '#22C3C9' },
  { ...GROUP[3], angle: 126, color: '#2FB0A0' },
  { ...GROUP[4], angle: 198, color: '#5AA9E6' },
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
              <stop offset="0" stopColor="#00A99D" />
              <stop offset="0.5" stopColor="#22C3C9" />
              <stop offset="1" stopColor="#3E9BE8" />
            </linearGradient>
            <linearGradient id="fwcore" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F4FFFE" />
              <stop offset="0.5" stopColor="#E6F8F7" />
              <stop offset="1" stopColor="#D7F3F1" />
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
            const b = pos(NODES[(i + 1) % NODES.length].angle)
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
          <circle cx={C} cy={C} r="48" fill="url(#fwcore)" />
          <text x={C} y={C - 6} textAnchor="middle" fill="#0F172A" style={{ fontSize: 11, fontWeight: 600 }}>
            TRUELINE
          </text>
          <text x={C} y={C + 9} textAnchor="middle" fill="#0F172A" style={{ fontSize: 11, fontWeight: 600 }}>
            GROUP
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
                <foreignObject x={p.x - 34} y={p.y - 12} width={68} height={44}>
                  <div className="flex h-full w-full flex-col items-center justify-center text-center leading-tight">
                    <span
                      className="whitespace-normal break-words font-semibold text-ink"
                      style={{ fontSize: 10, maxWidth: 64 }}
                    >
                      {n.name}
                    </span>
                  </div>
                </foreignObject>
              </g>
            )
          })}
        </svg>


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
