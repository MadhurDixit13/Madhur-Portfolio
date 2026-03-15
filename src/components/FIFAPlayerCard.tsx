'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Trophy, Briefcase, Mail, Linkedin,
  Github, Phone, MapPin, ChevronDown, ChevronUp, ExternalLink, BookOpen, Zap
} from 'lucide-react';
import { PlayerData } from '@/types/player';
import TacticalBoard from './TacticalBoard';

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

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    setTilt({ x: (ny - 0.5) * -22, y: (nx - 0.5) * 22 });
    setGlare({ x: nx * 100, y: ny * 100 });
  }, []);

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
      className="relative select-none"
      style={{
        width: 'clamp(220px, 26vw, 300px)',
        aspectRatio: '2 / 2.9',
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.05s linear' : 'transform 0.6s cubic-bezier(.23,1,.32,1)',
        transformStyle: 'preserve-3d',
        borderRadius: '1.1rem',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      {/* ── Gold card background ── */}
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
      <div className="absolute inset-0 flex flex-col p-[6%]">
        {/* Top row: rating + position | badge */}
        <div className="flex justify-between items-start mb-[4%]">
          <div className="text-amber-900">
            <div className="font-black leading-none text-amber-100"
              style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(28px, 4vw, 44px)' }}>
              <AnimatedCounter value={data.stats.overall} />
            </div>
            <div className="font-bold tracking-wider text-amber-200/80"
              style={{ fontSize: 'clamp(8px, 1vw, 11px)' }}>ENG</div>
            <div style={{ fontSize: 'clamp(10px, 1.4vw, 16px)' }} className="mt-1">🇮🇳</div>
            <div style={{ fontSize: 'clamp(10px, 1.4vw, 16px)' }}>⚡</div>
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
                style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(10px, 1.5vw, 15px)' }}>
                {s.value}
              </div>
              <div className="text-amber-300/70 font-bold mt-0.5"
                style={{ fontSize: 'clamp(6px, 0.8vw, 8px)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Name */}
        <div className="text-center mt-[2%]">
          <div className="font-black tracking-[0.12em] text-amber-100"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(9px, 1.3vw, 13px)' }}>
            MADHUR DIXIT
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stat bar with count-up ───────────────────────────────────────────────────
function StatBar({ label, value }: { label: string; value: number }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAnimated(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-between gap-3">
      <span className="text-amber-200/80 text-xs font-semibold capitalize w-28 shrink-0"
        style={{ fontFamily: 'var(--font-rajdhani)' }}>
        {label.replace(/([A-Z])/g, ' $1').trim()}
      </span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${value}%` : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
      <span className="text-white font-black text-sm w-7 text-right"
        style={{ fontFamily: 'var(--font-anton)' }}>
        {animated ? <AnimatedCounter value={value} /> : 0}
      </span>
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
function SectionCard({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-xl border border-white/8 bg-white/[0.03] p-4 sm:p-5 hover:border-amber-400/30 hover:bg-white/[0.05] transition-all duration-200 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface FIFAPlayerCardProps { data: PlayerData }

export default function FIFAPlayerCard({ data }: FIFAPlayerCardProps) {
  const [activeTab, setActiveTab] = useState<TabId>('info');
  const [prevTab, setPrevTab] = useState<TabId>('info');
  const [showLegacy, setShowLegacy] = useState(false);
  const tabOrder = TABS.map(t => t.id);

  const switchTab = (id: TabId) => {
    setPrevTab(activeTab);
    setActiveTab(id);
  };

  const direction = tabOrder.indexOf(activeTab) > tabOrder.indexOf(prevTab) ? 1 : -1;

  const primaryExps = data.experiences.filter(e => !e.legacy);
  const legacyExps  = data.experiences.filter(e => e.legacy);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#020408' }}>

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

          {/* Stats below card */}
          <div className="w-full space-y-2.5" style={{ width: 'clamp(220px, 26vw, 300px)' }}>
            {Object.entries(data.stats)
              .filter(([k]) => k !== 'overall')
              .map(([k, v]) => <StatBar key={k} label={k} value={v} />)}
          </div>
        </div>

        {/* ── Right: Detail panel ── */}
        <div className="flex-1 min-w-0 flex flex-col">

          {/* Header band */}
          <div className="mb-5">
            <h1 className="text-white font-black tracking-wider"
              style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(22px, 3.5vw, 38px)' }}>
              {data.personalInfo.name}
            </h1>
            <p className="text-amber-300 font-semibold text-sm sm:text-base"
              style={{ fontFamily: 'var(--font-rajdhani)' }}>
              {data.personalInfo.position}
            </p>
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-amber-400/70"
              style={{ fontFamily: 'var(--font-rajdhani)' }}>
              <span className="flex items-center gap-1"><span>🇮🇳</span>{data.personalInfo.nationality}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{data.contact.location}</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{data.experiences.find(e => e.isCurrent)?.name}</span>
            </div>
          </div>

          {/* Tab nav */}
          <div className="flex gap-1 mb-5 p-1 rounded-xl overflow-x-auto no-scrollbar"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => switchTab(t.id)}
                className={`flex-shrink-0 relative py-2 px-2.5 sm:px-3.5 rounded-lg text-[10px] sm:text-xs font-black tracking-wider transition-all duration-150 ${
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
                      <p className="text-amber-100/75 text-sm leading-relaxed"
                        style={{ fontFamily: 'var(--font-rajdhani)' }}>
                        I am a deep-lying playmaker on a tech team. By day, I architect ML infrastructure pipelines
                        and optimise LLM inference engines — squeezing 4× more throughput out of H100s and slashing
                        cloud costs by 35%. Instead of through-balls, I deliver assists like cutting sensor retrieval
                        from 50s to 2s and building GPU telemetry platforms that handle 100M+ metric samples.
                        When I&apos;m not debugging CUDA occupancy, you&apos;ll find me analysing soccer tactics,
                        diving into history documentaries, or disappearing down YouTube rabbit holes about human behaviour.
                        I thrive on understanding the <em>&ldquo;why&rdquo;</em> — whether in a CI/CD pipeline or in people.
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
                            <span className="text-2xl shrink-0 mt-0.5">{exp.logo}</span>
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
                                  <li key={ai} className="text-amber-100/60 text-xs flex gap-1.5 leading-relaxed"
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
                                  <span className="text-xl shrink-0 mt-0.5">{exp.logo}</span>
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
                            <span className="text-3xl shrink-0">{edu.logo}</span>
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
                            <span className="text-xl">{cat.icon}</span>
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
                                className={`border-l-[3px]`}
                                style={{ borderLeftColor: borderColors[type] } as React.CSSProperties}>
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
                                <p className="text-amber-100/50 text-xs leading-relaxed mb-2 line-clamp-2"
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
                          <p className="text-amber-100/50 text-xs leading-relaxed"
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
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}>
                        <SectionCard className="border-l-[3px] border-l-sky-500/60 h-full flex flex-col">
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <h5 className="text-white font-black text-sm leading-snug"
                              style={{ fontFamily: 'var(--font-rajdhani)' }}>{blog.title}</h5>
                            <span className="shrink-0 bg-sky-500/20 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-sky-500/30">
                              {blog.platform}
                            </span>
                          </div>
                          <p className="text-amber-100/50 text-xs leading-relaxed mb-3 flex-1"
                            style={{ fontFamily: 'var(--font-rajdhani)' }}>{blog.description}</p>
                          <div className="flex items-center justify-between text-[10px] text-amber-400/40 mb-2">
                            <span>{blog.date}</span><span>{blog.readTime}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {blog.tags.map((tag, ti) => (
                              <span key={ti} className="bg-white/5 text-amber-200/50 px-2 py-0.5 rounded text-[10px] border border-white/8">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <a href={blog.url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-400/25 transition-colors"
                            style={{ fontFamily: 'var(--font-rajdhani)' }}>
                            <BookOpen className="w-3 h-3" /> Read on Medium
                          </a>
                        </SectionCard>
                      </motion.div>
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
