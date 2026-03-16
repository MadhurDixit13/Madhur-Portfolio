'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Trophy, Briefcase, Mail, Linkedin,
  Github, Phone, MapPin, ChevronDown, ChevronUp, ExternalLink, BookOpen, Zap
} from 'lucide-react';
import { PlayerData, Project, Experience, Blog } from '@/types/player';
import TacticalBoard from './TacticalBoard';
import { track } from '@vercel/analytics';

// ─── Animated counter ────────────────────────────────────────────────────────
function AnimatedCounter({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.round(duration * 60);
    const timer = setInterval(() => {
      frame++;
      setCount(Math.round((frame / totalFrames) * value));
      if (frame === totalFrames) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <>{count}</>;
}

// ─── Holographic FIFA Card (left panel) ──────────────────────────────────────
function HoloCard({ data }: { data: PlayerData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped) return;
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    setTilt({ x: (ny - 0.5) * -22, y: (nx - 0.5) * 22 });
    setGlare({ x: nx * 100, y: ny * 100 });
  }, [flipped]);

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  const statRows = [
    { label: 'TEC', value: data.stats.technical },
    { label: 'SOL', value: data.stats.problemSolving },
    { label: 'INV', value: data.stats.innovation },
    { label: 'COM', value: data.stats.communication },
    { label: 'LED', value: data.stats.leadership },
    { label: 'OVR', value: data.stats.overall },
  ];

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      onTouchEnd={(e) => { e.preventDefault(); setFlipped(f => !f); }}
      className="relative select-none"
      style={{
        width: 'clamp(220px, 26vw, 300px)',
        aspectRatio: '2 / 2.9',
        transform: `perspective(900px) rotateX(${flipped ? 0 : tilt.x}deg) rotateY(${flipped ? 180 : tilt.y}deg)`,
        transition: flipped
          ? 'transform 0.65s cubic-bezier(.23,1,.32,1)'
          : hovered ? 'transform 0.05s linear' : 'transform 0.6s cubic-bezier(.23,1,.32,1)',
        transformStyle: 'preserve-3d',
        borderRadius: '1.1rem',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      {/* ── Gold card background (front face) ── */}
      <div className="absolute inset-0 rounded-[1.1rem] overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
      <div className="absolute inset-0 rounded-[1.1rem] overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #f8c700 0%, #d4a017 30%, #b8860b 60%, #8b6914 100%)' }}>
        {/* Diagonal texture lines */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(55deg, transparent, transparent 3px, rgba(255,255,255,0.08) 3px, rgba(255,255,255,0.08) 5px)',
          }} />
        {/* Dark inner area */}
        <div className="absolute inset-[5%] rounded-[0.8rem]"
          style={{ background: 'linear-gradient(160deg, #1a1205 0%, #0d0a05 100%)' }} />
      </div>

      {/* ── Holographic sheen ── */}
      <div
        className="absolute inset-0 rounded-[1.1rem] pointer-events-none"
        style={{
          opacity: hovered ? 0.55 : 0.1,
          transition: 'opacity 0.2s',
          background: `radial-gradient(ellipse at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.45) 0%, rgba(255,180,60,0.25) 20%, rgba(80,180,255,0.2) 40%, rgba(180,80,255,0.15) 60%, transparent 80%)`,
          mixBlendMode: 'screen',
        }}
      />
      {/* Rainbow spectrum layer */}
      <div
        className="absolute inset-0 rounded-[1.1rem] pointer-events-none"
        style={{
          opacity: hovered ? 0.18 : 0,
          transition: 'opacity 0.2s',
          background: `linear-gradient(${115 + tilt.y * 2}deg, #ff6b6b33, #ffd93d33, #6bcb7733, #4d96ff33, #c77dff33)`,
          mixBlendMode: 'color',
        }}
      />

      {/* ── Content ── */}
      <div className="absolute inset-0 flex flex-col p-[9%]">
        {/* Top row: rating + position | badge */}
        <div className="flex justify-between items-start mb-[4%]">
          <div className="text-amber-900">
            <div className="font-black leading-none text-amber-100"
              style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(28px, 4vw, 44px)' }}>
              <AnimatedCounter value={data.stats.overall} />
            </div>
            <div className="font-bold tracking-wider text-amber-200/80"
              style={{ fontSize: 'clamp(10px, 1.2vw, 13px)' }}>ENG</div>
            <div style={{ fontSize: 'clamp(12px, 1.6vw, 18px)' }} className="mt-1">🇮🇳</div>
          </div>
          <div className="bg-black/50 rounded px-1.5 py-0.5 border border-amber-400/30">
            <div className="text-amber-300 font-black tracking-widest"
              style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(7px, 0.9vw, 10px)' }}>BUILDER</div>
          </div>
        </div>

        {/* Photo */}
        <div className="flex-1 relative rounded-[0.5rem] overflow-hidden mx-[-1%]" style={{ minHeight: 0 }}>
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${data.personalInfo.photo}')`, backgroundPosition: 'center 10%' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)' }} />
        </div>

        {/* Stats row */}
        <div className="flex justify-around mt-[3%] py-[2%]"
          style={{ borderTop: '1px solid rgba(251,191,36,0.25)', borderBottom: '1px solid rgba(251,191,36,0.25)' }}>
          {statRows.slice(0, 5).map(s => (
            <div key={s.label} className="text-center">
              <div className="font-black text-amber-100 leading-none"
                style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(11px, 1.6vw, 16px)' }}>
                {s.value}
              </div>
              <div className="text-amber-300/70 font-bold mt-0.5"
                style={{ fontSize: 'clamp(8px, 0.9vw, 10px)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Name */}
        <div className="text-center mt-[2%]">
          <div className="font-black tracking-[0.12em] text-amber-100"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(11px, 1.5vw, 15px)' }}>
            MADHUR DIXIT
          </div>
        </div>
      </div>
      </div>{/* end front face wrapper */}

      {/* ── Card back face (mobile flip) ── */}
      <div className="absolute inset-0 rounded-[1.1rem] overflow-hidden flex flex-col items-center justify-center gap-3 p-[8%]"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'linear-gradient(145deg, #f8c700 0%, #d4a017 30%, #b8860b 60%, #8b6914 100%)',
        }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'repeating-linear-gradient(55deg,transparent,transparent 3px,rgba(255,255,255,0.08) 3px,rgba(255,255,255,0.08) 5px)' }} />
        <div className="absolute inset-[5%] rounded-[0.8rem]"
          style={{ background: 'linear-gradient(160deg, #1a1205 0%, #0d0a05 100%)' }} />
        <div className="relative z-10 w-full space-y-3">
          <div className="text-center mb-2">
            <div className="font-black text-amber-300 tracking-widest text-xs" style={{ fontFamily: 'var(--font-anton)' }}>PLAYER STATS</div>
          </div>
          {statRows.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-amber-400/70 text-[9px] font-black w-8" style={{ fontFamily: 'var(--font-anton)' }}>{s.label}</span>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg,#f59e0b,#fbbf24)' }}
                  animate={flipped ? { width: `${s.value}%` } : { width: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }} />
              </div>
              <span className="text-amber-100 font-black text-xs w-6 text-right" style={{ fontFamily: 'var(--font-anton)' }}>{s.value}</span>
            </div>
          ))}
          <div className="text-center mt-3 text-amber-400/40 text-[8px]" style={{ fontFamily: 'var(--font-rajdhani)' }}>
            tap to flip back
          </div>
        </div>
      </div>

      {/* Tap hint (mobile only) */}
      <div className="absolute bottom-2 right-2 z-20 lg:hidden">
        <div className="bg-black/50 rounded-full px-2 py-0.5 text-[7px] text-amber-400/60 font-black border border-amber-400/20"
          style={{ fontFamily: 'var(--font-anton)' }}>TAP</div>
      </div>
    </div>
  );
}

// ─── Radar Chart (replaces stat bars) ────────────────────────────────────────
const RADAR_LABELS = ['TEC', 'SOL', 'INV', 'COM', 'LED'] as const;
type RadarKey = 'technical' | 'problemSolving' | 'innovation' | 'communication' | 'leadership';
const RADAR_KEYS: RadarKey[] = ['technical', 'problemSolving', 'innovation', 'communication', 'leadership'];

function RadarChart({ stats }: { stats: Record<RadarKey, number> & { overall: number } }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  const CX = 72, CY = 72, R = 52, N = 5;

  const vertex = (i: number, scale: number) => {
    const a = (i * 2 * Math.PI / N) - Math.PI / 2;
    return { x: CX + R * scale * Math.cos(a), y: CY + R * scale * Math.sin(a) };
  };

  const gridPoly = (scale: number) =>
    Array.from({ length: N }, (_, i) => { const v = vertex(i, scale); return `${v.x},${v.y}`; }).join(' ');

  const values = RADAR_KEYS.map(k => stats[k] / 100);
  const dataPoints = values.map((v, i) => vertex(i, inView ? v : 0));
  const dataPoly = dataPoints.map(p => `${p.x},${p.y}`).join(' ');
  const labelPts = Array.from({ length: N }, (_, i) => {
    const a = (i * 2 * Math.PI / N) - Math.PI / 2;
    return { x: CX + (R + 16) * Math.cos(a), y: CY + (R + 16) * Math.sin(a), label: RADAR_LABELS[i], val: RADAR_KEYS[i] };
  });

  return (
    <div className="flex flex-col items-center gap-2" style={{ width: 'clamp(220px, 26vw, 300px)' }}>
      <svg ref={ref} viewBox="0 0 144 144" className="w-full max-w-[160px]">
        {/* Grid rings */}
        {[0.25, 0.5, 0.75, 1].map(s => (
          <polygon key={s} points={gridPoly(s)} fill="none"
            stroke="rgba(251,191,36,0.12)" strokeWidth={s === 1 ? 0.8 : 0.5} />
        ))}
        {/* Axis lines */}
        {Array.from({ length: N }, (_, i) => {
          const v = vertex(i, 1);
          return <line key={i} x1={CX} y1={CY} x2={v.x} y2={v.y} stroke="rgba(251,191,36,0.1)" strokeWidth={0.5} />;
        })}
        {/* Data polygon */}
        <motion.polygon
          points={dataPoly}
          fill="rgba(251,191,36,0.15)"
          stroke="#fbbf24"
          strokeWidth={1.5}
          strokeLinejoin="round"
          animate={{ points: dataPoly }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        {/* Data dots */}
        {dataPoints.map((p, i) => (
          <motion.circle key={i} cx={p.x} cy={p.y} r={2.5} fill="#fbbf24"
            initial={{ r: 0 }} animate={inView ? { r: 2.5 } : {}}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.07 }} />
        ))}
        {/* Labels */}
        {labelPts.map((l, i) => (
          <text key={i} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="middle"
            fill="rgba(251,191,36,0.65)" fontSize={7.5} fontWeight="700"
            style={{ fontFamily: 'var(--font-anton)' }}>{l.label}</text>
        ))}
        {/* Overall in centre */}
        <text x={CX} y={CY - 5} textAnchor="middle" dominantBaseline="middle"
          fill="rgba(251,191,36,0.9)" fontSize={14} fontWeight="700"
          style={{ fontFamily: 'var(--font-anton)' }}>{stats.overall}</text>
        <text x={CX} y={CY + 9} textAnchor="middle" dominantBaseline="middle"
          fill="rgba(251,191,36,0.4)" fontSize={6}
          style={{ fontFamily: 'var(--font-anton)' }}>OVR</text>
      </svg>
      {/* Stat values row */}
      <div className="flex justify-between w-full px-1">
        {RADAR_KEYS.map((k, i) => (
          <div key={k} className="text-center">
            <div className="font-black text-amber-100 text-xs leading-none" style={{ fontFamily: 'var(--font-anton)' }}>
              {inView ? <AnimatedCounter value={stats[k]} duration={1} /> : 0}
            </div>
            <div className="text-amber-400/50 text-[8px] mt-0.5" style={{ fontFamily: 'var(--font-anton)' }}>
              {RADAR_LABELS[i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab types ────────────────────────────────────────────────────────────────
type TabId = 'info' | 'experience' | 'education' | 'skills' | 'projects' | 'research' | 'blogs' | 'playbook';

const TABS: { id: TabId; label: string; short: string }[] = [
  { id: 'info',       label: 'INFO',       short: 'INFO' },
  { id: 'experience', label: 'EXPERIENCE', short: 'EXP'  },
  { id: 'education',  label: 'EDUCATION',  short: 'EDU'  },
  { id: 'skills',     label: 'SKILLS',     short: 'SKL'  },
  { id: 'projects',   label: 'PROJECTS',   short: 'PRJ'  },
  { id: 'research',   label: 'RESEARCH',   short: 'RES'  },
  { id: 'blogs',      label: 'BLOGS',      short: 'BLG'  },
  { id: 'playbook',   label: 'PLAYBOOK',   short: 'PLAY' },
];

// ─── Section card wrapper ─────────────────────────────────────────────────────
function SectionCard({ children, className = '', style, delay = 0, onClick }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; delay?: number; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, ease: 'easeOut', delay }}
      onClick={onClick}
      className={`rounded-xl border border-white/8 bg-white/[0.03] p-4 sm:p-5 hover:border-amber-400/30 hover:bg-white/[0.05] transition-colors duration-200 ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Project Modal ────────────────────────────────────────────────────────────
const PROJECT_METRICS: Record<string, string[]> = {
  'Game Engine':           ['100+ concurrent clients', 'ZeroMQ client-server', '2 games, <8% code diff'],
  'CarePulse Analytics':   ['10,000+ patient records', '150+ high-risk flagged', 'Bronze → Gold medallion'],
  'Reddit SentimentFlow':  ['End-to-end Airflow DAG', 'Docker containerised', 'Automated moderation'],
  'MiniSpark':             ['Pure Python + multiprocessing', 'Lazy transformations + DAG', 'Educational re-implementation'],
  'Soccer Match Outcome Prediction': ['Ensemble ML methods', 'Historical feature engineering', 'Scikit-learn + Keras'],
  'Game AI':               ['A* + Dijkstra pathfinding', 'Decision + behaviour trees', 'Python SFML'],
  'Kafka Stock Market Analysis': ['Real-time CSV → Kafka stream', 'AWS S3 + Athena analytics', 'End-to-end pipeline'],
  'Portfolio Website':     ['Next.js + Three.js + Framer', 'FIFA FUT card aesthetic', 'Deployed on Vercel'],
  'Sales Data Analysis':   ['Power BI interactive dashboard', 'KPI tracking + slicers', 'Excel + DAX measures'],
};

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const metrics = PROJECT_METRICS[project.name] ?? [];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div key="backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(160deg,#1a1205 0%,#0d0a05 100%)', border: '1px solid rgba(251,191,36,0.3)' }}
          onClick={e => e.stopPropagation()}>
          {/* Gold top bar */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b)' }} />
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-amber-400/60 text-[10px] font-black tracking-widest mb-1"
                  style={{ fontFamily: 'var(--font-anton)' }}>{project.type.toUpperCase()} · {project.year}</div>
                <h3 className="text-white font-black text-xl tracking-wide"
                  style={{ fontFamily: 'var(--font-anton)' }}>{project.name}</h3>
              </div>
              <button onClick={onClose} className="text-amber-400/60 hover:text-amber-300 transition-colors text-lg leading-none">✕</button>
            </div>

            <p className="text-amber-100/80 text-sm leading-relaxed font-semibold mb-4"
              style={{ fontFamily: 'var(--font-rajdhani)' }}>{project.description}</p>

            {metrics.length > 0 && (
              <div className="mb-4">
                <div className="text-amber-400/70 text-[10px] font-black tracking-widest mb-2"
                  style={{ fontFamily: 'var(--font-anton)' }}>KEY METRICS</div>
                <div className="space-y-1.5">
                  {metrics.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span className="text-amber-100/70 text-xs font-semibold"
                        style={{ fontFamily: 'var(--font-rajdhani)' }}>{m}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-5">
              <div className="text-amber-400/70 text-[10px] font-black tracking-widest mb-2"
                style={{ fontFamily: 'var(--font-anton)' }}>TECH STACK</div>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t, i) => (
                  <span key={i} className="bg-amber-400/10 text-amber-200/80 px-2.5 py-1 rounded-full text-xs border border-amber-400/20 font-semibold"
                    style={{ fontFamily: 'var(--font-rajdhani)' }}>{t}</span>
                ))}
              </div>
            </div>

            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 text-xs font-black px-4 py-2 rounded-xl border border-amber-400/25 transition-colors"
                style={{ fontFamily: 'var(--font-anton)' }}>
                <ExternalLink className="w-3 h-3" /> VIEW ON GITHUB
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Career Timeline ──────────────────────────────────────────────────────────
function CareerTimeline({ experiences }: { experiences: Experience[] }) {
  const primary = experiences.filter(e => !e.legacy);
  return (
    <div className="mt-4">
      <div className="text-[10px] font-black tracking-widest text-amber-400/60 mb-3"
        style={{ fontFamily: 'var(--font-anton)' }}>CAREER TIMELINE</div>
      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="flex gap-0 min-w-max relative">
          {/* Connector line */}
          <div className="absolute top-[28px] left-8 right-8 h-px bg-amber-400/20" />
          {primary.map((exp, i) => (
            <div key={i} className="flex flex-col items-center relative" style={{ minWidth: 100, maxWidth: 120 }}>
              {/* Node */}
              <div className="relative z-10 w-14 h-14 rounded-xl border-2 flex items-center justify-center mb-2 overflow-hidden"
                style={{ borderColor: exp.isCurrent ? '#fbbf24' : 'rgba(255,255,255,0.12)', background: exp.isCurrent ? 'rgba(251,191,36,0.1)' : 'rgba(255,255,255,0.03)' }}>
                {exp.logoImage
                  ? <img src={exp.logoImage} alt={exp.name} className="w-10 h-10 rounded-lg object-cover" />
                  : <span className="text-2xl">{exp.logo}</span>}
                {exp.isCurrent && <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-400 rounded-bl-lg" />}
              </div>
              {/* Label */}
              <div className="text-center px-1">
                <div className="text-[9px] font-black text-white/70 leading-tight truncate w-full"
                  style={{ fontFamily: 'var(--font-anton)', maxWidth: 96 }}>{exp.name}</div>
                <div className="text-[8px] text-amber-400/50 mt-0.5 leading-tight">{exp.duration.split(' - ')[0]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Sign Me CTA ─────────────────────────────────────────────────────────────
function SignMeCard({ email, linkedin }: { email: string; linkedin: string }) {
  const [signed, setSigned] = useState(false);

  const handleSign = () => {
    setSigned(true);
    track('sign_me_click');
    const subject = encodeURIComponent("We Want to Sign You — Let's Begin Talks ⚽");
    const body = encodeURIComponent(
      `Hi Madhur,\n\nWe came across your portfolio and we're impressed by your work. We'd love to discuss an opportunity with you.\n\nLooking forward to connecting!\n`
    );
    const a = document.createElement('a');
    a.href = `mailto:${email}?subject=${subject}&body=${body}`;
    a.click();
  };

  return (
    <SectionCard className="border border-amber-400/30 bg-amber-400/5">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1">
          <h4 className="text-sm font-black tracking-widest text-amber-300 mb-1 flex items-center gap-2"
            style={{ fontFamily: 'var(--font-anton)' }}>
            ✍ SIGN ME
          </h4>
          <p className="text-amber-100/70 text-xs font-semibold" style={{ fontFamily: 'var(--font-rajdhani)' }}>
            Open to new roles — drop me a message or connect on LinkedIn.
          </p>
          <AnimatePresence>
            {signed && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-2 font-black text-amber-400 tracking-widest overflow-hidden"
                style={{ fontFamily: 'var(--font-anton)', fontSize: 13, fontStyle: 'italic' }}>
                {['M','a','d','h','u','r',' ','D','i','x','i','t'].map((ch, i) => (
                  <motion.span key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, ease: 'easeOut' }}>{ch}</motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          {signed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-emerald-400 text-xs mt-1 font-semibold" style={{ fontFamily: 'var(--font-rajdhani)' }}>
              Opening your email client...
            </motion.div>
          )}
        </div>
        <div className="flex gap-2 shrink-0">
          <motion.button onClick={handleSign} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="font-black text-black px-4 py-2 rounded-xl text-xs tracking-widest border border-amber-300/70"
            style={{ fontFamily: 'var(--font-anton)', background: 'linear-gradient(135deg,#fbbf24,#f59e0b)' }}>
            {signed ? 'DRAFTED ✓' : 'SIGN ME'}
          </motion.button>
          <a href={`https://${linkedin}`} target="_blank" rel="noopener noreferrer"
            className="font-black text-amber-300 px-3 py-2 rounded-xl text-xs tracking-widest border border-amber-400/30 hover:bg-amber-400/10 transition-colors flex items-center gap-1"
            style={{ fontFamily: 'var(--font-anton)' }}>
            <Linkedin className="w-3 h-3" /> IN
          </a>
        </div>
      </div>
    </SectionCard>
  );
}

// ─── Blog card with OGP image ─────────────────────────────────────────────────
function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  const [thumb, setThumb] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/ogp?url=${encodeURIComponent(blog.url)}`)
      .then(r => r.json())
      .then(d => { if (d.image) setThumb(d.image); })
      .catch(() => {/* no preview on static hosts */});
  }, [blog.url]);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
      <SectionCard className="border-l-[3px] border-l-sky-500/60 h-full flex flex-col p-0 overflow-hidden">
        {/* OGP thumbnail */}
        {thumb && (
          <div className="w-full h-32 overflow-hidden shrink-0">
            <img src={thumb} alt={blog.title} className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />
          </div>
        )}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h5 className="text-white font-black text-sm leading-snug"
              style={{ fontFamily: 'var(--font-rajdhani)' }}>{blog.title}</h5>
            <span className="shrink-0 bg-sky-500/20 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-sky-500/30">
              {blog.platform}
            </span>
          </div>
          <p className="text-amber-100/70 text-xs leading-relaxed mb-3 flex-1 font-semibold"
            style={{ fontFamily: 'var(--font-rajdhani)' }}>{blog.description}</p>
          <div className="flex items-center justify-between text-[10px] text-amber-400/40 mb-2">
            <span>{blog.date}</span><span>{blog.readTime}</span>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {blog.tags.map((tag, ti) => (
              <span key={ti} className="bg-white/5 text-amber-200/50 px-2 py-0.5 rounded text-[10px] border border-white/8">{tag}</span>
            ))}
          </div>
          <a href={blog.url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-400/25 transition-colors"
            style={{ fontFamily: 'var(--font-rajdhani)' }}>
            <BookOpen className="w-3 h-3" /> Read on Medium
          </a>
        </div>
      </SectionCard>
    </motion.div>
  );
}

// ─── Reactions bar ────────────────────────────────────────────────────────────
const REACTIONS = [
  { emoji: '⚡', label: 'QUICK', key: 'quick' },
  { emoji: '🔥', label: 'HOT', key: 'fire' },
  { emoji: '⚽', label: 'TACTIC', key: 'soccer' },
  { emoji: '💼', label: 'HIRE', key: 'hire' },
  { emoji: '🎯', label: 'TARGET', key: 'target' },
] as const;
type ReactionKey = typeof REACTIONS[number]['key'];

function ReactionsBar() {
  const [reacted, setReacted] = useState<ReactionKey | null>(null);
  const [burst, setBurst] = useState<ReactionKey | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('portfolio_reaction');
      if (stored) setReacted(stored as ReactionKey);
    } catch { /* SSR */ }
  }, []);

  const react = (key: ReactionKey) => {
    if (reacted) return;
    setReacted(key);
    setBurst(key);
    setTimeout(() => setBurst(null), 600);
    try { localStorage.setItem('portfolio_reaction', key); } catch { /* */ }
    track('reaction', { type: key });
  };

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-1.5">
      <div className="text-[8px] text-amber-400/30 font-black tracking-widest pr-1"
        style={{ fontFamily: 'var(--font-anton)' }}>
        {reacted ? 'REACTED' : 'REACT'}
      </div>
      <div className="flex gap-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl px-2.5 py-2 shadow-lg shadow-black/40">
        {REACTIONS.map(r => (
          <motion.button key={r.key} onClick={() => react(r.key)}
            whileHover={!reacted ? { scale: 1.28, y: -3 } : {}}
            whileTap={!reacted ? { scale: 0.88 } : {}}
            disabled={!!reacted}
            title={r.label}
            className={`flex flex-col items-center gap-0.5 transition-opacity ${reacted && reacted !== r.key ? 'opacity-20' : 'opacity-80 hover:opacity-100'}`}>
            <motion.span
              animate={burst === r.key ? { scale: [1, 1.5, 1.2, 1], rotate: [0, -15, 15, 0] } : {}}
              transition={{ duration: 0.45 }}
              className="text-base leading-none select-none">{r.emoji}</motion.span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface FIFAPlayerCardProps { data: PlayerData }

export default function FIFAPlayerCard({ data }: FIFAPlayerCardProps) {
  const getInitialTab = (): TabId => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '') as TabId;
      if (TABS.some(t => t.id === hash)) return hash;
    }
    return 'info';
  };

  const [activeTab, setActiveTab] = useState<TabId>(getInitialTab);
  const [prevTab, setPrevTab] = useState<TabId>('info');
  const [showLegacy, setShowLegacy] = useState(false);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [shareToast, setShareToast] = useState(false);
  const tabOrder = TABS.map(t => t.id);

  const switchTab = (id: TabId) => {
    setPrevTab(activeTab);
    setActiveTab(id);
    if (typeof window !== 'undefined') window.location.hash = id;
    track('tab_switch', { tab: id });
  };

  // Sync hash → tab on popstate (browser back/forward)
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace('#', '') as TabId;
      if (TABS.some(t => t.id === hash)) { setPrevTab(activeTab); setActiveTab(hash); }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard navigation: ← → to switch tabs
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (modalProject) return;
      const cur = tabOrder.indexOf(activeTab);
      if (e.key === 'ArrowRight' && cur < tabOrder.length - 1) switchTab(tabOrder[cur + 1] as TabId);
      else if (e.key === 'ArrowLeft' && cur > 0) switchTab(tabOrder[cur - 1] as TabId);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeTab, modalProject]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleShare = async () => {
    const url = window.location.origin + window.location.pathname;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Madhur Dixit — Portfolio', url });
      } else {
        await navigator.clipboard.writeText(url);
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2200);
      }
    } catch { /* cancelled */ }
  };

  const direction = tabOrder.indexOf(activeTab) > tabOrder.indexOf(prevTab) ? 1 : -1;

  const primaryExps = data.experiences.filter(e => !e.legacy);
  const legacyExps  = data.experiences.filter(e => e.legacy);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#020408' }}>
      {/* Project modal */}
      {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}
      <ReactionsBar />

      {/* ── Stadium background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Crowd silhouette gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{ background: 'linear-gradient(to top, rgba(10,8,2,0.9) 0%, transparent 100%)' }} />
        {/* Volumetric light beams from top */}
        <div className="absolute top-0 left-[20%] w-[1px] h-[70%] opacity-20"
          style={{ background: 'linear-gradient(to bottom, #fbbf24, transparent)', transform: 'rotate(5deg)', filter: 'blur(1px)' }} />
        <div className="absolute top-0 left-[48%] w-[2px] h-[80%] opacity-30"
          style={{ background: 'linear-gradient(to bottom, #fbbf24, transparent)', transform: 'rotate(-2deg)', filter: 'blur(2px)' }} />
        <div className="absolute top-0 right-[20%] w-[1px] h-[70%] opacity-20"
          style={{ background: 'linear-gradient(to bottom, #fbbf24, transparent)', transform: 'rotate(-5deg)', filter: 'blur(1px)' }} />
        <div className="absolute top-0 left-[35%] w-[1px] h-[60%] opacity-10"
          style={{ background: 'linear-gradient(to bottom, #fff, transparent)', filter: 'blur(3px)' }} />
        <div className="absolute top-0 right-[35%] w-[1px] h-[60%] opacity-10"
          style={{ background: 'linear-gradient(to bottom, #fff, transparent)', filter: 'blur(3px)' }} />
        {/* Ambient glow pools */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-6"
          style={{ background: 'radial-gradient(ellipse, rgba(251,191,36,0.07) 0%, transparent 70%)' }} />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(ellipse, rgba(251,191,36,0.1) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Layout ── */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-start justify-center min-h-screen p-4 sm:p-6 lg:p-10 max-w-[1400px] mx-auto">

        {/* ── Left: FIFA Card + quick stats ── */}
        <div className="flex flex-col items-center gap-5 lg:sticky lg:top-10 flex-shrink-0">
          <HoloCard data={data} />

          {/* Radar chart below card */}
          <RadarChart stats={data.stats} />
        </div>

        {/* ── Right: Detail panel ── */}
        <div className="flex-1 min-w-0 flex flex-col">

          {/* Header band */}
          <div className="mb-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-white font-black tracking-wider"
                  style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(22px, 3.5vw, 38px)' }}>
                  {data.personalInfo.name}
                </h1>
                <p className="text-amber-300 font-semibold text-sm sm:text-base"
                  style={{ fontFamily: 'var(--font-rajdhani)' }}>
                  {data.personalInfo.position}
                </p>
              </div>
              {/* Share button */}
              <div className="relative shrink-0 mt-1">
                <motion.button onClick={handleShare} whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 text-amber-400/70 hover:text-amber-300 text-[11px] font-black tracking-widest px-3 py-1.5 rounded-lg border border-amber-400/20 hover:border-amber-400/40 transition-colors"
                  style={{ fontFamily: 'var(--font-anton)' }}>
                  <ExternalLink className="w-3 h-3" /> SHARE
                </motion.button>
                <AnimatePresence>
                  {shareToast && (
                    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="absolute right-0 top-9 bg-emerald-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap"
                      style={{ fontFamily: 'var(--font-rajdhani)' }}>
                      Link copied!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-amber-400/70"
              style={{ fontFamily: 'var(--font-rajdhani)' }}>
              <span className="flex items-center gap-1"><span>🇮🇳</span>Nationality: {data.personalInfo.nationality}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{data.contact.location}</span>
              {(() => { const cur = data.experiences.find(e => e.isCurrent); return cur ? (
                <span className="flex items-center gap-1.5">
                  {cur.logoImage
                    ? <img src={cur.logoImage} alt={cur.name} className="w-4 h-4 rounded object-cover border border-white/10" />
                    : <Zap className="w-3 h-3" />}
                  {cur.name}
                </span>
              ) : null; })()}
            </div>
          </div>

          {/* Tab nav */}
          <div className="flex gap-1 mb-5 p-1 rounded-xl overflow-x-auto no-scrollbar"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => switchTab(t.id)}
                className={`flex-shrink-0 relative py-2 px-2.5 sm:px-3.5 rounded-lg text-[11px] sm:text-xs font-black tracking-wider transition-all duration-150 ${
                  activeTab === t.id
                    ? 'text-black shadow-md'
                    : 'text-amber-300/60 hover:text-amber-200 hover:bg-white/5'
                }`}
                style={{ fontFamily: 'var(--font-anton)', ...(activeTab === t.id ? { background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' } : {}) }}
              >
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.short}</span>
                {t.id === 'playbook' && activeTab !== t.id && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Keyboard hint — desktop only */}
          <div className="hidden sm:flex justify-end mb-2">
            <span className="text-amber-400/25 text-[10px] flex items-center gap-1" style={{ fontFamily: 'var(--font-rajdhani)' }}>
              <kbd className="bg-white/5 border border-white/10 rounded px-1 py-0.5 text-[9px]">←</kbd>
              <kbd className="bg-white/5 border border-white/10 rounded px-1 py-0.5 text-[9px]">→</kbd>
              navigate tabs
            </span>
          </div>

          {/* Tab content */}
          <div className="flex-1 min-h-[400px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >

                {/* ── INFO ── */}
                {activeTab === 'info' && (
                  <div className="space-y-4">
                    <SectionCard>
                      <h4 className="text-xs font-black tracking-widest text-amber-400 mb-3 flex items-center gap-2"
                        style={{ fontFamily: 'var(--font-anton)' }}>
                        <Briefcase className="w-4 h-4" /> ABOUT THE PLAYER
                      </h4>
                      <p className="text-amber-100/90 text-sm leading-relaxed font-semibold"
                        style={{ fontFamily: 'var(--font-rajdhani)' }}>
                        I am a deep-lying playmaker on a tech team. By day, I architect ML infrastructure pipelines
                        and optimise LLM inference engines, squeezing 4x more throughput out of H100s and slashing
                        cloud costs by 35%. Instead of through-balls, I deliver assists like cutting sensor retrieval
                        from 50s to 2s and building GPU telemetry platforms that handle 100M+ metric samples.
                        When I&apos;m not debugging CUDA occupancy, you&apos;ll find me analysing soccer tactics,
                        diving into history documentaries, or disappearing down YouTube rabbit holes about human behaviour.
                        I thrive on understanding the <em>&ldquo;why&rdquo;</em>, whether in a CI/CD pipeline or in people.
                      </p>
                    </SectionCard>

                    <SectionCard>
                      <h4 className="text-xs font-black tracking-widest text-amber-400 mb-3 flex items-center gap-2"
                        style={{ fontFamily: 'var(--font-anton)' }}>
                        <Mail className="w-4 h-4" /> CONTACT
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { icon: <Mail className="w-4 h-4" />, href: `mailto:${data.contact.email}`, text: data.contact.email },
                          { icon: <Phone className="w-4 h-4" />, href: `tel:${data.contact.phone}`, text: data.contact.phone },
                          { icon: <MapPin className="w-4 h-4" />, href: null, text: data.contact.location },
                          { icon: <Linkedin className="w-4 h-4" />, href: `https://${data.contact.linkedin}`, text: data.contact.linkedin },
                          { icon: <Github className="w-4 h-4" />, href: `https://${data.contact.github}`, text: data.contact.github },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-amber-200/70 text-sm"
                            style={{ fontFamily: 'var(--font-rajdhani)' }}>
                            <span className="text-amber-400 shrink-0">{item.icon}</span>
                            {item.href
                              ? <a href={item.href} target="_blank" rel="noopener noreferrer"
                                  className="hover:text-amber-200 transition-colors hover:underline truncate">{item.text}</a>
                              : <span>{item.text}</span>}
                          </div>
                        ))}
                      </div>
                    </SectionCard>

                    {/* Sign Me CTA */}
                    <SignMeCard email={data.contact.email} linkedin={data.contact.linkedin} />
                  </div>
                )}

                {/* ── EXPERIENCE ── */}
                {activeTab === 'experience' && (
                  <div className="space-y-3">
                    {primaryExps.map((exp, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}>
                        <SectionCard className={`border-l-[3px] ${exp.isCurrent ? 'border-l-amber-400' : 'border-l-white/10'}`}>
                          <div className="flex items-start gap-3">
                            {exp.logoImage
                              ? <img src={exp.logoImage} alt={exp.name} className="w-9 h-9 rounded-lg object-cover shrink-0 mt-0.5 border border-white/10" />
                              : <span className="text-2xl shrink-0 mt-0.5">{exp.logo}</span>
                            }
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                <h5 className="text-white font-black text-sm"
                                  style={{ fontFamily: 'var(--font-rajdhani)' }}>
                                  {exp.url
                                    ? <a href={exp.url} target="_blank" rel="noopener noreferrer"
                                        className="hover:text-amber-300 transition-colors hover:underline">{exp.name}</a>
                                    : exp.name}
                                </h5>
                                {exp.isCurrent && (
                                  <span className="bg-amber-400 text-black px-2 py-0.5 rounded-full text-[10px] font-black"
                                    style={{ fontFamily: 'var(--font-anton)' }}>LIVE</span>
                                )}
                              </div>
                              <p className="text-amber-300 text-xs font-semibold"
                                style={{ fontFamily: 'var(--font-rajdhani)' }}>{exp.position}</p>
                              <p className="text-amber-400/50 text-xs mb-2">{exp.duration}</p>
                              <ul className="space-y-1">
                                {exp.achievements.map((a, ai) => (
                                  <li key={ai} className="text-amber-100/80 text-xs flex gap-1.5 leading-relaxed font-semibold"
                                    style={{ fontFamily: 'var(--font-rajdhani)' }}>
                                    <Trophy className="w-3 h-3 text-amber-400/60 shrink-0 mt-0.5" />{a}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </SectionCard>
                      </motion.div>
                    ))}

                    {/* Legacy toggle */}
                    {legacyExps.length > 0 && (
                      <div>
                        <button
                          onClick={() => setShowLegacy(v => !v)}
                          className="flex items-center gap-2 text-amber-400/50 text-xs font-semibold hover:text-amber-300 transition-colors mt-1"
                          style={{ fontFamily: 'var(--font-rajdhani)' }}>
                          {showLegacy ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          {showLegacy ? 'Hide' : 'Show'} early career ({legacyExps.length} roles)
                        </button>
                        <AnimatePresence>
                          {showLegacy && legacyExps.map((exp, i) => (
                            <motion.div key={i}
                              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 0.6, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
                              <SectionCard className="mt-2 border-l-[3px] border-l-white/5 opacity-60">
                                <div className="flex items-start gap-3">
                                  {exp.logoImage
                                    ? <img src={exp.logoImage} alt={exp.name} className="w-7 h-7 rounded object-cover shrink-0 mt-0.5 border border-white/10" />
                                    : <span className="text-xl shrink-0 mt-0.5">{exp.logo}</span>
                                  }
                                  <div>
                                    <h5 className="text-white/70 font-bold text-sm">{exp.name}</h5>
                                    <p className="text-amber-300/50 text-xs">{exp.position}</p>
                                    <p className="text-amber-400/40 text-xs">{exp.duration}</p>
                                  </div>
                                </div>
                              </SectionCard>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Career Timeline */}
                    <CareerTimeline experiences={data.experiences} />
                  </div>
                )}

                {/* ── EDUCATION ── */}
                {activeTab === 'education' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.education.map((edu, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}>
                        <SectionCard className="h-full">
                          <div className="flex items-start gap-3">
                            {edu.logoImage
                              ? <img src={edu.logoImage} alt={edu.institution} className="w-12 h-12 rounded-lg object-contain shrink-0 mt-0.5 border border-white/10 bg-white/5 p-1" />
                              : (
                                <div className="w-12 h-12 rounded-lg shrink-0 mt-0.5 flex items-center justify-center border border-amber-400/30"
                                  style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 100%)' }}>
                                  <span className="text-amber-300 font-black text-center leading-none"
                                    style={{ fontFamily: 'var(--font-anton)', fontSize: edu.initials && edu.initials.length > 2 ? 8 : 12 }}>
                                    {edu.initials || edu.institution.slice(0, 2).toUpperCase()}
                                  </span>
                                </div>
                              )
                            }
                            <div>
                              <h5 className="text-white font-black text-base leading-tight mb-1"
                                style={{ fontFamily: 'var(--font-rajdhani)' }}>{edu.institution}</h5>
                              <p className="text-amber-200/70 text-sm">{edu.degree}</p>
                              <p className="text-amber-400/50 text-xs mt-1">{edu.duration}</p>
                              <p className="text-amber-400/50 text-xs">{edu.location}</p>
                              <span className="inline-block mt-3 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-black border border-amber-400/30"
                                style={{ fontFamily: 'var(--font-anton)' }}>
                                GPA {edu.gpa}
                              </span>
                            </div>
                          </div>
                        </SectionCard>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* ── SKILLS ── */}
                {activeTab === 'skills' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.skills.map((cat, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}>
                        <SectionCard>
                          <div className="flex items-center gap-2 mb-3">
                            <h5 className="text-white font-black text-sm tracking-wide"
                              style={{ fontFamily: 'var(--font-rajdhani)' }}>{cat.category}</h5>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.skills.map((s, si) => (
                              <span key={si}
                                className="bg-amber-400/10 text-amber-200/80 px-2.5 py-1 rounded-full text-xs border border-amber-400/20 hover:bg-amber-400/20 hover:text-amber-200 transition-colors"
                                style={{ fontFamily: 'var(--font-rajdhani)' }}>{s}</span>
                            ))}
                          </div>
                        </SectionCard>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* ── PROJECTS ── */}
                {activeTab === 'projects' && (
                  <div className="space-y-5">
                    {(['Personal Project', 'Coursework', 'Group Project', 'Portfolio Project'] as const).map((type, ti) => {
                      const typed = data.projects.filter(p => p.type === type);
                      if (!typed.length) return null;
                      const borderColors: Record<string, string> = {
                        'Personal Project': '#34d399', 'Coursework': '#60a5fa',
                        'Group Project': '#fb923c', 'Portfolio Project': '#c084fc',
                      };
                      return (
                        <motion.div key={type}
                          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: ti * 0.08 }}>
                          <h4 className="text-xs font-black tracking-widest mb-2 flex items-center gap-2"
                            style={{ fontFamily: 'var(--font-anton)', color: borderColors[type] }}>
                            <span className="w-2 h-2 rounded-full inline-block" style={{ background: borderColors[type] }} />
                            {type.toUpperCase()}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {typed.map((proj, pi) => (
                              <SectionCard key={pi}
                                className="border-l-[3px] cursor-pointer"
                                style={{ borderLeftColor: borderColors[type] } as React.CSSProperties}
                                onClick={() => setModalProject(proj)}>
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <h5 className="text-white font-black text-sm leading-tight"
                                    style={{ fontFamily: 'var(--font-rajdhani)' }}>
                                    {proj.url
                                      ? <a href={proj.url} target="_blank" rel="noopener noreferrer"
                                          className="hover:text-amber-300 transition-colors flex items-center gap-1">
                                          {proj.name}<ExternalLink className="w-3 h-3 opacity-50" />
                                        </a>
                                      : proj.name}
                                  </h5>
                                  <span className="text-amber-400/40 text-xs shrink-0">{proj.year}</span>
                                </div>
                                <p className="text-amber-100/70 text-xs leading-relaxed mb-2 line-clamp-2 font-semibold"
                                  style={{ fontFamily: 'var(--font-rajdhani)' }}>{proj.description}</p>
                                <div className="flex flex-wrap gap-1">
                                  {proj.technologies.map((t, idx) => (
                                    <span key={idx}
                                      className="bg-white/5 text-amber-200/60 px-2 py-0.5 rounded text-[10px] border border-white/8"
                                      style={{ fontFamily: 'var(--font-rajdhani)' }}>{t}</span>
                                  ))}
                                </div>
                              </SectionCard>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* ── RESEARCH ── */}
                {activeTab === 'research' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {data.research.map((r, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}>
                        <SectionCard className="border-l-[3px] border-l-purple-500/60 h-full">
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <h5 className="text-white font-black text-sm leading-snug"
                              style={{ fontFamily: 'var(--font-rajdhani)' }}>{r.title}</h5>
                            <span className="shrink-0 bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-500/30">
                              {r.focus}
                            </span>
                          </div>
                          <p className="text-amber-200/60 text-xs mb-1">{r.institution}</p>
                          {r.conferenceId && (
                            <p className="text-amber-400/40 text-xs font-mono mb-2">{r.conferenceId}</p>
                          )}
                          <p className="text-amber-100/70 text-xs leading-relaxed font-semibold"
                            style={{ fontFamily: 'var(--font-rajdhani)' }}>{r.description}</p>
                        </SectionCard>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* ── BLOGS ── */}
                {activeTab === 'blogs' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {data.blogs.map((blog, i) => (
                      <BlogCard key={i} blog={blog} index={i} />
                    ))}
                  </div>
                )}

                {/* ── PLAYBOOK ── */}
                {activeTab === 'playbook' && <TacticalBoard />}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
