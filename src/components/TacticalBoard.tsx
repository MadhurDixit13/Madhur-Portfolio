'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type ConceptId = 'kafka' | 'spark' | 'docker';

interface Concept {
  id: ConceptId;
  name: string;
  tagline: string;
  type: string;
  difficulty: number;
  impact: number;
  reuse: number;
  rating: number;
  badge: string;
  matchLog: { label: string; url: string }[];
  summary: string;
}

const CONCEPTS: Concept[] = [
  {
    id: 'kafka',
    name: 'APACHE KAFKA',
    tagline: 'The Pressing Game',
    type: 'MESSAGE BROKER',
    difficulty: 82,
    impact: 95,
    reuse: 91,
    rating: 93,
    badge: '📨',
    summary: 'Just like a high-press forces turnovers, Kafka keeps data moving forward in real time. Producers push events into topics; consumers pull and process them at their own pace — decoupling every player on the pitch.',
    matchLog: [
      { label: 'CarePulse Analytics', url: 'https://github.com/MadhurDixit13/CarePulse' },
      { label: 'Kafka Stock Market Analysis', url: 'https://github.com/MadhurDixit13/Kafka_Stock_Market_Data_Analysis' },
    ],
  },
  {
    id: 'spark',
    name: 'APACHE SPARK',
    tagline: 'The Counter-Attack',
    type: 'DATA ENGINE',
    difficulty: 88,
    impact: 97,
    reuse: 89,
    rating: 95,
    badge: '⚡',
    summary: 'Spark runs the counter-attack — it takes raw data and accelerates it through a DAG of parallel transformations across a distributed cluster. Lazy evaluation means it waits for the perfect moment to strike.',
    matchLog: [
      { label: 'CarePulse Analytics', url: 'https://github.com/MadhurDixit13/CarePulse' },
      { label: 'MiniSpark (rebuild from scratch)', url: 'https://github.com/MadhurDixit13/MiniSpark' },
    ],
  },
  {
    id: 'docker',
    name: 'DOCKER',
    tagline: 'Squad Rotation',
    type: 'CONTAINER RUNTIME',
    difficulty: 75,
    impact: 93,
    reuse: 96,
    rating: 91,
    badge: '🐳',
    summary: 'Docker is squad rotation — each container is a player with a fixed role, swappable without touching the rest of the team. Build once, run anywhere. Used in LLM deployment pipelines at Runara.ai for reproducible A/B testing.',
    matchLog: [
      { label: 'Runara.ai — LLM deployment pipelines', url: '' },
      { label: 'Reddit SentimentFlow', url: 'https://github.com/MadhurDixit13/SentimentFlow' },
    ],
  },
];

// ─── Kafka animation ──────────────────────────────────────────────────────────
function KafkaDiagram() {
  const [messages, setMessages] = useState<{ id: number; progress: number; consumer: number }[]>([]);
  const [msgCount, setMsgCount] = useState(0);
  const [queue, setQueue] = useState<number[]>([0, 1, 2]);
  const nextId = useRef(3);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sendMessage = useCallback(() => {
    const id = nextId.current++;
    setMessages(prev => [...prev, { id, progress: 0, consumer: Math.floor(Math.random() * 2) }]);
    setMsgCount(c => c + 1);
    setQueue(prev => [...prev.slice(-4), id].slice(-5));
  }, []);

  useEffect(() => {
    // Animate message progress
    const frameRef = setInterval(() => {
      setMessages(prev =>
        prev
          .map(m => ({ ...m, progress: m.progress + 2.5 }))
          .filter(m => m.progress <= 105)
      );
    }, 30);
    return () => clearInterval(frameRef);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(sendMessage, 2200);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [sendMessage]);

  const topicItems = queue.slice(-3);

  return (
    <div className="space-y-4">
      {/* Diagram */}
      <div className="relative h-28 rounded-xl overflow-hidden border border-white/8 bg-black/30">
        {/* Labels */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-center">
          <div className="w-12 h-12 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-xs font-black text-amber-300 mb-0.5"
            style={{ fontFamily: 'var(--font-anton)' }}>PROD</div>
          <div className="text-[9px] text-amber-400/50">producer</div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-center">
          <div className="w-20 h-12 rounded-lg bg-white/5 border border-white/15 flex flex-col items-center justify-center gap-0.5 overflow-hidden">
            <div className="text-[8px] text-amber-400/60 font-bold">TOPIC</div>
            <div className="flex gap-0.5">
              {topicItems.map((id, i) => (
                <motion.div key={id}
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="w-3.5 h-3.5 rounded bg-amber-400/30 border border-amber-400/40 text-[7px] text-amber-300 flex items-center justify-center"
                >{i}</motion.div>
              ))}
            </div>
          </div>
          <div className="text-[9px] text-amber-400/50 mt-0.5">partition 0</div>
        </div>
        <div className="absolute right-3 top-0 bottom-0 flex flex-col justify-around py-2">
          {[0, 1].map(ci => (
            <div key={ci} className="text-center">
              <div className="w-12 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-[9px] font-black text-sky-300"
                style={{ fontFamily: 'var(--font-anton)' }}>C-{ci + 1}</div>
              <div className="text-[8px] text-sky-400/50">consumer</div>
            </div>
          ))}
        </div>

        {/* Animated dots */}
        {messages.map(m => (
          <motion.div
            key={m.id}
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]"
            style={{
              left: m.progress <= 50
                ? `${8 + (m.progress / 50) * 35}%`   // producer → topic
                : `${43 + ((m.progress - 50) / 50) * 43}%`, // topic → consumer
              top: m.progress > 50
                ? m.consumer === 0 ? '25%' : '70%'
                : '50%',
              transition: 'top 0.2s ease',
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={sendMessage}
          className="flex items-center gap-1.5 bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 text-xs font-black px-3 py-1.5 rounded-lg border border-amber-400/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> SEND MESSAGE
        </button>
        <span className="text-amber-400/50 text-xs">{msgCount} messages sent</span>
      </div>
    </div>
  );
}

// ─── Spark animation ──────────────────────────────────────────────────────────
const STAGES = ['RAW DATA', 'MAP', 'FILTER', 'REDUCE', 'OUTPUT'] as const;

function SparkDiagram() {
  const [active, setActive] = useState<number>(-1);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [particles, setParticles] = useState<{ id: number; stage: number }[]>([]);
  const nextPId = useRef(0);

  const runPipeline = () => {
    if (running) return;
    setRunning(true);
    setDone(false);
    setParticles([]);
    STAGES.forEach((_, i) => {
      setTimeout(() => {
        setActive(i);
        const count = Math.max(4 - i, 1);
        setParticles(prev => [
          ...prev.filter(p => p.stage < i),
          ...Array.from({ length: count }, () => ({ id: nextPId.current++, stage: i })),
        ]);
      }, i * 750);
    });
    setTimeout(() => {
      setRunning(false);
      setDone(true);
      setActive(-1);
    }, STAGES.length * 750 + 500);
  };

  const stageColors = ['#6b7280', '#fbbf24', '#f59e0b', '#d97706', '#34d399'];
  const stageIcons = ['📦', '🔄', '🔍', '🔢', '✅'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 overflow-x-auto py-2">
        {STAGES.map((stage, i) => (
          <div key={i} className="flex items-center gap-1 shrink-0">
            <div className={`relative flex flex-col items-center gap-1 transition-all duration-300`}>
              <motion.div
                animate={active === i ? { scale: [1, 1.12, 1], boxShadow: [`0 0 0px transparent`, `0 0 16px ${stageColors[i]}`, `0 0 0px transparent`] } : {}}
                transition={{ duration: 0.4, repeat: active === i ? Infinity : 0 }}
                className="w-12 h-12 rounded-lg flex items-center justify-center text-lg border transition-all duration-300"
                style={{
                  background: active === i ? `${stageColors[i]}25` : 'rgba(255,255,255,0.04)',
                  borderColor: active === i ? `${stageColors[i]}60` : 'rgba(255,255,255,0.08)',
                }}>
                {stageIcons[i]}
              </motion.div>
              <div className={`text-[8px] font-black tracking-wider transition-colors duration-300`}
                style={{ fontFamily: 'var(--font-anton)', color: active === i ? stageColors[i] : 'rgba(255,255,255,0.3)' }}>
                {stage}
              </div>
              {/* Particles below stage */}
              <div className="flex gap-0.5 h-3">
                <AnimatePresence>
                  {particles.filter(p => p.stage === i).map(p => (
                    <motion.div key={p.id}
                      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: stageColors[i] }} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
            {i < STAGES.length - 1 && (
              <motion.div
                animate={active > i ? { opacity: 1 } : { opacity: 0.15 }}
                className="text-amber-400 text-xs -mt-4">→</motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={runPipeline}
          disabled={running}
          className="flex items-center gap-1.5 bg-amber-400/15 hover:bg-amber-400/25 disabled:opacity-40 text-amber-300 text-xs font-black px-3 py-1.5 rounded-lg border border-amber-400/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" />
          {running ? 'RUNNING...' : 'RUN PIPELINE'}
        </button>
        {done && <span className="text-emerald-400 text-xs font-bold">✓ Pipeline complete</span>}
      </div>
    </div>
  );
}

// ─── Docker animation ─────────────────────────────────────────────────────────
interface Container { id: number; port: number; status: 'starting' | 'running' | 'stopping' | 'stopped' }

function DockerDiagram() {
  const [containers, setContainers] = useState<Container[]>([
    { id: 1, port: 8000, status: 'running' },
  ]);
  const nextId = useRef(2);
  const nextPort = useRef(8001);

  const deploy = () => {
    if (containers.filter(c => c.status === 'running').length >= 4) return;
    const id = nextId.current++;
    const port = nextPort.current++;
    setContainers(prev => [...prev, { id, port, status: 'starting' }]);
    setTimeout(() => setContainers(prev => prev.map(c => c.id === id ? { ...c, status: 'running' } : c)), 800);
  };

  const kill = (id: number) => {
    setContainers(prev => prev.map(c => c.id === id ? { ...c, status: 'stopping' } : c));
    setTimeout(() => setContainers(prev => prev.filter(c => c.id !== id)), 600);
  };

  const running = containers.filter(c => c.status === 'running').length;

  return (
    <div className="space-y-4">
      {/* Dockerfile → Image → Containers */}
      <div className="flex items-start gap-3">
        {/* Left: image */}
        <div className="shrink-0 text-center">
          <div className="w-16 h-10 rounded-lg bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-[9px] font-black text-sky-300 mb-0.5"
            style={{ fontFamily: 'var(--font-anton)' }}>
            IMAGE<br/>v1.0
          </div>
          <div className="text-[8px] text-sky-400/50">🐳 base</div>
        </div>

        <div className="text-amber-400/40 text-xs mt-3">→</div>

        {/* Containers grid */}
        <div className="flex-1 grid grid-cols-2 gap-2">
          <AnimatePresence>
            {containers.map(c => (
              <motion.div
                key={c.id}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: c.status === 'stopping' ? 0.4 : 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-lg border px-2 py-1.5 cursor-pointer group"
                style={{
                  background: c.status === 'running' ? 'rgba(52,211,153,0.08)' : 'rgba(251,191,36,0.08)',
                  borderColor: c.status === 'running' ? 'rgba(52,211,153,0.3)' : 'rgba(251,191,36,0.3)',
                }}
                onClick={() => c.status === 'running' && kill(c.id)}
              >
                <div className="flex items-center gap-1">
                  <motion.div
                    animate={c.status === 'running' ? { opacity: [1, 0.4, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: c.status === 'running' ? '#34d399' : '#fbbf24' }} />
                  <span className="text-[9px] font-black"
                    style={{ fontFamily: 'var(--font-anton)', color: c.status === 'running' ? '#34d399' : '#fbbf24' }}>
                    :{c.port}
                  </span>
                </div>
                <div className="text-[8px] text-white/30 mt-0.5">
                  {c.status === 'starting' ? 'starting...' : c.status === 'stopping' ? 'stopping...' : 'running · click to kill'}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={deploy}
          disabled={running >= 4}
          className="flex items-center gap-1.5 bg-amber-400/15 hover:bg-amber-400/25 disabled:opacity-40 text-amber-300 text-xs font-black px-3 py-1.5 rounded-lg border border-amber-400/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> DEPLOY CONTAINER
        </button>
        <span className="text-amber-400/50 text-xs">{running} / 4 running · click container to kill</span>
      </div>
    </div>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
function ConceptStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="text-white font-black leading-none text-lg"
        style={{ fontFamily: 'var(--font-anton)' }}>{value}</div>
      <div className="text-amber-400/50 text-[9px] font-bold mt-0.5 tracking-wider">{label}</div>
    </div>
  );
}

// ─── Concept card ─────────────────────────────────────────────────────────────
function ConceptCard({ concept, isActive, onSelect }: { concept: Concept; isActive: boolean; onSelect: () => void }) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ y: -2 }}
      className={`relative text-left rounded-xl overflow-hidden border transition-all duration-200 p-4 ${
        isActive
          ? 'border-amber-400/60 bg-amber-400/8'
          : 'border-white/8 bg-white/[0.02] hover:border-amber-400/30'
      }`}
    >
      {/* Card type bar */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[9px] text-amber-400/50 font-bold tracking-widest mb-0.5"
            style={{ fontFamily: 'var(--font-anton)' }}>{concept.type}</div>
          <div className="text-white font-black text-sm tracking-wide"
            style={{ fontFamily: 'var(--font-anton)' }}>{concept.name}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-amber-300 leading-none"
            style={{ fontFamily: 'var(--font-anton)' }}>{concept.rating}</div>
          <div className="text-[8px] text-amber-400/50">RATING</div>
        </div>
      </div>
      {/* Badge icon */}
      <div className="text-2xl mb-2">{concept.badge}</div>
      {/* Tagline */}
      <div className="text-amber-300/60 text-xs italic mb-3">&ldquo;{concept.tagline}&rdquo;</div>
      {/* Stats row */}
      <div className="flex gap-4 pt-2 border-t border-white/8">
        <ConceptStat label="DIFFICULTY" value={concept.difficulty} />
        <ConceptStat label="IMPACT" value={concept.impact} />
        <ConceptStat label="REUSE" value={concept.reuse} />
      </div>
      {isActive && (
        <div className="absolute bottom-2 right-2">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        </div>
      )}
    </motion.button>
  );
}

// ─── Expanded concept detail ──────────────────────────────────────────────────
function ConceptDetail({ concept }: { concept: Concept }) {
  const diagrams: Record<ConceptId, React.ReactNode> = {
    kafka: <KafkaDiagram />,
    spark: <SparkDiagram />,
    docker: <DockerDiagram />,
  };

  return (
    <motion.div
      key={concept.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      {/* Summary */}
      <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
        <h4 className="text-xs font-black tracking-widest text-amber-400 mb-2 flex items-center gap-2"
          style={{ fontFamily: 'var(--font-anton)' }}>
          📋 TACTICAL BREAKDOWN
        </h4>
        <p className="text-amber-100/65 text-sm leading-relaxed"
          style={{ fontFamily: 'var(--font-rajdhani)' }}>{concept.summary}</p>
      </div>

      {/* Interactive diagram */}
      <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
        <h4 className="text-xs font-black tracking-widest text-amber-400 mb-3 flex items-center gap-2"
          style={{ fontFamily: 'var(--font-anton)' }}>
          🎮 LIVE DEMO
        </h4>
        {diagrams[concept.id]}
      </div>

      {/* Match log */}
      <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
        <h4 className="text-xs font-black tracking-widest text-amber-400 mb-2 flex items-center gap-2"
          style={{ fontFamily: 'var(--font-anton)' }}>
          📓 MATCH LOG — MADHUR USED THIS IN:
        </h4>
        <ul className="space-y-1.5">
          {concept.matchLog.map((m, i) => (
            <li key={i}>
              {m.url
                ? <a href={m.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-amber-200/70 text-xs hover:text-amber-200 transition-colors group"
                    style={{ fontFamily: 'var(--font-rajdhani)' }}>
                    <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-400 shrink-0" />
                    {m.label}
                    <ExternalLink className="w-2.5 h-2.5 opacity-40 group-hover:opacity-70" />
                  </a>
                : <span className="flex items-center gap-1.5 text-amber-200/60 text-xs"
                    style={{ fontFamily: 'var(--font-rajdhani)' }}>
                    <ChevronRight className="w-3 h-3 text-amber-400/40 shrink-0" />
                    {m.label}
                  </span>}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── TacticalBoard (Playbook tab) ─────────────────────────────────────────────
export default function TacticalBoard() {
  const [selected, setSelected] = useState<ConceptId>('kafka');
  const concept = CONCEPTS.find(c => c.id === selected)!;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
        <div className="text-xs font-black tracking-widest text-amber-400 mb-0.5"
          style={{ fontFamily: 'var(--font-anton)' }}>⚽ TACTICAL PLAYBOOK</div>
        <p className="text-amber-100/55 text-xs" style={{ fontFamily: 'var(--font-rajdhani)' }}>
          Three technologies I&apos;ve run in production — broken down like match tactics. Click a card, then interact with the live demo below.
        </p>
      </div>

      {/* Concept cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {CONCEPTS.map(c => (
          <ConceptCard
            key={c.id}
            concept={c}
            isActive={selected === c.id}
            onSelect={() => setSelected(c.id)}
          />
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <ConceptDetail key={selected} concept={concept} />
      </AnimatePresence>
    </div>
  );
}
