'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight } from 'lucide-react';

// ─── Tech logo helper ─────────────────────────────────────────────────────────
// Uses Simple Icons CDN — free, svg, colored white for dark backgrounds
function TechLogo({ slug, alt, size = 28 }: { slug: string; alt: string; size?: number }) {
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/ffffff`}
      alt={alt}
      width={size}
      height={size}
      style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.3))' }}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
    />
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
type ConceptId = 'kafka' | 'spark' | 'docker' | 'kubernetes' | 'timescaledb' | 'langchain';

interface Concept {
  id: ConceptId;
  name: string;
  tagline: string;
  type: string;
  difficulty: number;
  impact: number;
  reuse: number;
  rating: number;
  iconSlug: string;
  matchLog: { label: string; url: string }[];
  summary: string;
}

const CONCEPTS: Concept[] = [
  {
    id: 'kafka',
    name: 'APACHE KAFKA',
    tagline: 'The Pressing Game',
    type: 'MESSAGE BROKER',
    difficulty: 82, impact: 95, reuse: 91, rating: 93,
    iconSlug: 'apachekafka',
    summary: 'Just like a high-press forces turnovers, Kafka keeps data moving forward in real time. Producers push events into topics; consumers pull and process at their own pace, decoupling every player on the pitch.',
    matchLog: [
      { label: 'CarePulse Analytics', url: 'https://github.com/MadhurDixit13/CarePulse' },
      { label: 'Kafka Stock Market Analysis', url: 'https://github.com/MadhurDixit13/Kafka_Stock_Market_Data_Analysis' },
    ],
  },
  {
    id: 'spark',
    name: 'APACHE SPARK',
    tagline: 'The Counter-Attack',
    type: 'DISTRIBUTED ENGINE',
    difficulty: 88, impact: 97, reuse: 89, rating: 95,
    iconSlug: 'apachespark',
    summary: 'Spark runs the counter-attack. It takes raw data and accelerates it through a DAG of parallel transformations across a distributed cluster. Lazy evaluation means it waits for the perfect moment to strike.',
    matchLog: [
      { label: 'CarePulse Analytics', url: 'https://github.com/MadhurDixit13/CarePulse' },
      { label: 'MiniSpark (rebuilt from scratch)', url: 'https://github.com/MadhurDixit13/MiniSpark' },
    ],
  },
  {
    id: 'docker',
    name: 'DOCKER',
    tagline: 'Squad Rotation',
    type: 'CONTAINER RUNTIME',
    difficulty: 75, impact: 93, reuse: 96, rating: 91,
    iconSlug: 'docker',
    summary: 'Docker is squad rotation. Each container is a player with a fixed role, swappable without touching the rest of the team. Build once, run anywhere. Used at Runara.ai for reproducible LLM A/B testing pipelines.',
    matchLog: [
      { label: 'Runara.ai — LLM deployment pipelines', url: '' },
      { label: 'Reddit SentimentFlow', url: 'https://github.com/MadhurDixit13/SentimentFlow' },
    ],
  },
  {
    id: 'kubernetes',
    name: 'KUBERNETES',
    tagline: 'The Formation',
    type: 'ORCHESTRATION',
    difficulty: 91, impact: 94, reuse: 90, rating: 92,
    iconSlug: 'kubernetes',
    summary: 'Kubernetes is the formation board. You declare the shape of your squad (desired state), and the manager (control plane) keeps rearranging players (pods) across the field (nodes) to maintain it, even when players go down.',
    matchLog: [
      { label: 'Runara.ai — production ML serving', url: '' },
      { label: 'AllyIn.ai — GPU telemetry platform', url: 'https://www.linkedin.com/company/allyin-ai/posts/?feedView=all' },
    ],
  },
  {
    id: 'timescaledb',
    name: 'TIMESCALEDB',
    tagline: 'The Match Recorder',
    type: 'TIME-SERIES DB',
    difficulty: 78, impact: 90, reuse: 83, rating: 88,
    iconSlug: 'timescale',
    summary: 'TimescaleDB is the match recorder, storing every second of every play as a time-stamped event. Built on Postgres, it chunks data into hypertables by time so querying "last 5 minutes" is instant, not a full-table scan.',
    matchLog: [
      { label: 'AllyIn.ai — 100M+ GPU metrics pipeline', url: 'https://www.linkedin.com/company/allyin-ai/posts/?feedView=all' },
    ],
  },
  {
    id: 'langchain',
    name: 'LANGCHAIN',
    tagline: 'The Playmaker',
    type: 'LLM FRAMEWORK',
    difficulty: 80, impact: 92, reuse: 88, rating: 90,
    iconSlug: 'langchain',
    summary: 'LangChain is the playmaker, connecting LLMs to memory, tools, and search systems. Used to build a context-aware agent with hybrid search (SQL + Vector + Graph) that routes each question to the right data source.',
    matchLog: [
      { label: 'Heartland Community Network', url: 'https://www.heartlandnet.com/' },
    ],
  },
];

// ─── Kafka animation ──────────────────────────────────────────────────────────
function KafkaDiagram() {
  const [messages, setMessages] = useState<{ id: number; progress: number; consumer: number }[]>([]);
  const [msgCount, setMsgCount] = useState(0);
  const [queue, setQueue] = useState([0, 1, 2]);
  const nextId = useRef(3);

  const sendMessage = useCallback(() => {
    const id = nextId.current++;
    setMessages(prev => [...prev, { id, progress: 0, consumer: Math.floor(Math.random() * 2) }]);
    setMsgCount(c => c + 1);
    setQueue(prev => [...prev.slice(-4), id].slice(-5));
  }, []);

  useEffect(() => {
    const frame = setInterval(() => {
      setMessages(prev => prev.map(m => ({ ...m, progress: m.progress + 2.5 })).filter(m => m.progress <= 105));
    }, 30);
    return () => clearInterval(frame);
  }, []);

  useEffect(() => {
    const t = setInterval(sendMessage, 2200);
    return () => clearInterval(t);
  }, [sendMessage]);

  return (
    <div className="space-y-4">
      <div className="relative h-28 rounded-xl overflow-hidden border border-white/8 bg-black/30">
        {/* PRODUCER */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-center">
          <div className="w-14 h-10 rounded-lg bg-amber-500/20 border border-amber-400/30 flex flex-col items-center justify-center gap-0.5 mb-0.5">
            <TechLogo slug="apachekafka" alt="Kafka" size={16} />
            <span className="text-[8px] font-black text-amber-300" style={{ fontFamily: 'var(--font-anton)' }}>PROD</span>
          </div>
          <div className="text-[8px] text-amber-400/50">producer</div>
        </div>
        {/* TOPIC */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-center">
          <div className="w-20 h-12 rounded-lg bg-white/5 border border-white/15 flex flex-col items-center justify-center gap-0.5 overflow-hidden">
            <div className="text-[8px] text-amber-400/60 font-bold">TOPIC</div>
            <div className="flex gap-0.5">
              {queue.slice(-3).map((id, i) => (
                <motion.div key={id} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="w-3.5 h-3.5 rounded bg-amber-400/30 border border-amber-400/40 text-[7px] text-amber-300 flex items-center justify-center">{i}</motion.div>
              ))}
            </div>
          </div>
          <div className="text-[9px] text-amber-400/50 mt-0.5">partition 0</div>
        </div>
        {/* CONSUMERS */}
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
          <motion.div key={m.id}
            className="absolute w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]"
            style={{
              top: m.progress > 50 ? (m.consumer === 0 ? '25%' : '70%') : '50%',
              left: m.progress <= 50
                ? `${8 + (m.progress / 50) * 35}%`
                : `${43 + ((m.progress - 50) / 50) * 43}%`,
              transform: 'translateY(-50%)',
              transition: 'top 0.2s ease',
            }} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <button onClick={sendMessage}
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
const STAGE_COLORS = ['#6b7280', '#fbbf24', '#f59e0b', '#d97706', '#34d399'];

function SparkDiagram() {
  const [active, setActive] = useState(-1);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [particles, setParticles] = useState<{ id: number; stage: number }[]>([]);
  const nextId = useRef(0);

  const runPipeline = () => {
    if (running) return;
    setRunning(true); setDone(false); setParticles([]);
    STAGES.forEach((_, i) => {
      setTimeout(() => {
        setActive(i);
        const count = Math.max(4 - i, 1);
        setParticles(prev => [
          ...prev.filter(p => p.stage < i),
          ...Array.from({ length: count }, () => ({ id: nextId.current++, stage: i })),
        ]);
      }, i * 750);
    });
    setTimeout(() => { setRunning(false); setDone(true); setActive(-1); }, STAGES.length * 750 + 500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-1 overflow-x-auto py-2">
        {STAGES.map((stage, i) => (
          <div key={i} className="flex items-center gap-1 shrink-0">
            <div className="flex flex-col items-center gap-1">
              <motion.div
                animate={active === i ? { scale: [1, 1.12, 1], boxShadow: [`0 0 0px transparent`, `0 0 16px ${STAGE_COLORS[i]}`, `0 0 0px transparent`] } : {}}
                transition={{ duration: 0.4, repeat: active === i ? Infinity : 0 }}
                className="w-12 h-12 rounded-lg flex items-center justify-center border transition-all duration-300"
                style={{
                  background: active === i ? `${STAGE_COLORS[i]}25` : 'rgba(255,255,255,0.04)',
                  borderColor: active === i ? `${STAGE_COLORS[i]}60` : 'rgba(255,255,255,0.08)',
                }}>
                {i === 0 && <TechLogo slug="apachespark" alt="Spark" size={20} />}
                {i === 1 && <span className="text-lg">⚙</span>}
                {i === 2 && <span className="text-lg">🔍</span>}
                {i === 3 && <span className="text-lg">∑</span>}
                {i === 4 && <span className="text-lg text-emerald-400">✓</span>}
              </motion.div>
              <div className="text-[8px] font-black tracking-wider transition-colors duration-300"
                style={{ fontFamily: 'var(--font-anton)', color: active === i ? STAGE_COLORS[i] : 'rgba(255,255,255,0.3)' }}>
                {stage}
              </div>
              <div className="flex gap-0.5 h-3">
                <AnimatePresence>
                  {particles.filter(p => p.stage === i).map(p => (
                    <motion.div key={p.id} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                      className="w-1.5 h-1.5 rounded-full" style={{ background: STAGE_COLORS[i] }} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
            {i < STAGES.length - 1 && (
              <motion.div animate={active > i ? { opacity: 1 } : { opacity: 0.15 }} className="text-amber-400 text-xs -mt-4">→</motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <button onClick={runPipeline} disabled={running}
          className="flex items-center gap-1.5 bg-amber-400/15 hover:bg-amber-400/25 disabled:opacity-40 text-amber-300 text-xs font-black px-3 py-1.5 rounded-lg border border-amber-400/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> {running ? 'RUNNING...' : 'RUN PIPELINE'}
        </button>
        {done && <span className="text-emerald-400 text-xs font-bold">Pipeline complete</span>}
      </div>
    </div>
  );
}

// ─── Docker animation ─────────────────────────────────────────────────────────
interface Container { id: number; port: number; status: 'starting' | 'running' | 'stopping' }

function DockerDiagram() {
  const [containers, setContainers] = useState<Container[]>([{ id: 1, port: 8000, status: 'running' }]);
  const nextId = useRef(2);
  const nextPort = useRef(8001);

  const deploy = () => {
    if (containers.filter(c => c.status === 'running').length >= 4) return;
    const id = nextId.current++; const port = nextPort.current++;
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
      <div className="flex items-start gap-3">
        <div className="shrink-0 text-center">
          <div className="w-16 h-12 rounded-lg bg-sky-500/15 border border-sky-400/30 flex flex-col items-center justify-center gap-1 mb-0.5">
            <TechLogo slug="docker" alt="Docker" size={18} />
            <span className="text-[8px] font-black text-sky-300" style={{ fontFamily: 'var(--font-anton)' }}>IMAGE</span>
          </div>
          <div className="text-[8px] text-sky-400/50">v1.0</div>
        </div>
        <div className="text-amber-400/40 text-xs mt-4">→</div>
        <div className="flex-1 grid grid-cols-2 gap-2">
          <AnimatePresence>
            {containers.map(c => (
              <motion.div key={c.id}
                initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: c.status === 'stopping' ? 0.4 : 1 }}
                exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.3 }}
                className="relative rounded-lg border px-2 py-1.5 cursor-pointer"
                style={{
                  background: c.status === 'running' ? 'rgba(52,211,153,0.08)' : 'rgba(251,191,36,0.08)',
                  borderColor: c.status === 'running' ? 'rgba(52,211,153,0.3)' : 'rgba(251,191,36,0.3)',
                }}
                onClick={() => c.status === 'running' && kill(c.id)}>
                <div className="flex items-center gap-1">
                  <motion.div animate={c.status === 'running' ? { opacity: [1, 0.4, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: c.status === 'running' ? '#34d399' : '#fbbf24' }} />
                  <span className="text-[9px] font-black" style={{ fontFamily: 'var(--font-anton)', color: c.status === 'running' ? '#34d399' : '#fbbf24' }}>
                    :{c.port}
                  </span>
                </div>
                <div className="text-[8px] text-white/30 mt-0.5">
                  {c.status === 'starting' ? 'starting...' : c.status === 'stopping' ? 'stopping...' : 'click to kill'}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={deploy} disabled={running >= 4}
          className="flex items-center gap-1.5 bg-amber-400/15 hover:bg-amber-400/25 disabled:opacity-40 text-amber-300 text-xs font-black px-3 py-1.5 rounded-lg border border-amber-400/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> DEPLOY
        </button>
        <span className="text-amber-400/50 text-xs">{running}/4 running</span>
      </div>
    </div>
  );
}

// ─── Kubernetes animation ─────────────────────────────────────────────────────
interface Pod { id: number; node: number; status: 'pending' | 'running' | 'terminating' }

function KubernetesDiagram() {
  const [pods, setPods] = useState<Pod[]>([
    { id: 1, node: 0, status: 'running' },
    { id: 2, node: 1, status: 'running' },
  ]);
  const nextId = useRef(3);

  const scale = () => {
    if (pods.filter(p => p.status === 'running').length >= 4) return;
    const id = nextId.current++;
    const node = pods.length % 2;
    setPods(prev => [...prev, { id, node, status: 'pending' }]);
    setTimeout(() => setPods(prev => prev.map(p => p.id === id ? { ...p, status: 'running' } : p)), 900);
  };

  const killPod = (id: number) => {
    setPods(prev => prev.map(p => p.id === id ? { ...p, status: 'terminating' } : p));
    // K8s self-heals: restart after 1.5s
    setTimeout(() => {
      const newId = nextId.current++;
      setPods(prev => {
        const withoutOld = prev.filter(p => p.id !== id);
        const node = withoutOld.length % 2;
        return [...withoutOld, { id: newId, node, status: 'pending' }];
      });
      setTimeout(() => setPods(prev => prev.map(p => p.id === newId ? { ...p, status: 'running' } : p)), 900);
    }, 1500);
  };

  const nodes = [0, 1];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {nodes.map(nodeId => (
          <div key={nodeId} className="rounded-lg border border-white/8 p-2 bg-white/[0.02]">
            <div className="flex items-center gap-1.5 mb-2">
              <TechLogo slug="kubernetes" alt="K8s" size={12} />
              <span className="text-[9px] font-black text-white/50" style={{ fontFamily: 'var(--font-anton)' }}>NODE-{nodeId + 1}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <AnimatePresence>
                {pods.filter(p => p.node === nodeId).map(pod => (
                  <motion.div key={pod.id}
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: pod.status === 'terminating' ? 0.4 : 1 }}
                    exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                    className="rounded px-1.5 py-1 cursor-pointer border text-center"
                    style={{
                      background: pod.status === 'running' ? 'rgba(52,211,153,0.12)' : pod.status === 'pending' ? 'rgba(251,191,36,0.12)' : 'rgba(239,68,68,0.12)',
                      borderColor: pod.status === 'running' ? 'rgba(52,211,153,0.4)' : pod.status === 'pending' ? 'rgba(251,191,36,0.4)' : 'rgba(239,68,68,0.4)',
                      minWidth: 44,
                    }}
                    onClick={() => pod.status === 'running' && killPod(pod.id)}>
                    <motion.div className="w-1.5 h-1.5 rounded-full mx-auto mb-0.5"
                      animate={pod.status === 'running' ? { opacity: [1, 0.3, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ background: pod.status === 'running' ? '#34d399' : pod.status === 'pending' ? '#fbbf24' : '#ef4444' }} />
                    <div className="text-[7px] font-bold text-white/60">pod-{pod.id}</div>
                    <div className="text-[6px] text-white/30">{pod.status === 'terminating' ? 'restarting...' : pod.status}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <button onClick={scale} disabled={pods.filter(p => p.status === 'running').length >= 4}
          className="flex items-center gap-1.5 bg-amber-400/15 hover:bg-amber-400/25 disabled:opacity-40 text-amber-300 text-xs font-black px-3 py-1.5 rounded-lg border border-amber-400/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> SCALE UP
        </button>
        <span className="text-amber-400/50 text-xs">click pod to kill — K8s self-heals</span>
      </div>
    </div>
  );
}

// ─── TimescaleDB animation ────────────────────────────────────────────────────
function TimescaleDBDiagram() {
  const [dataPoints, setDataPoints] = useState<{ t: number; v: number }[]>([]);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startIngestion = () => {
    if (running) {
      setRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setDataPoints(prev => {
        const next = [...prev, { t: Date.now(), v: 40 + Math.random() * 55 }].slice(-20);
        return next;
      });
    }, 400);
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const maxV = 100;
  const W = 280, H = 70;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/8 bg-black/30 p-3">
        {/* Hypertable label */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[9px] font-black text-amber-400" style={{ fontFamily: 'var(--font-anton)' }}>gpu_metrics (hypertable)</span>
          </div>
          <span className="text-[9px] text-white/30">{dataPoints.length} rows</span>
        </div>
        {/* Sparkline */}
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ height: 70 }}>
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map(f => (
            <line key={f} x1={0} y1={H * f} x2={W} y2={H * f} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
          ))}
          {/* Sparkline */}
          {dataPoints.length > 1 && (
            <polyline
              fill="none"
              stroke="#fbbf24"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              points={dataPoints.map((p, i) => {
                const x = (i / (dataPoints.length - 1)) * W;
                const y = H - (p.v / maxV) * H;
                return `${x},${y}`;
              }).join(' ')}
            />
          )}
          {/* Fill */}
          {dataPoints.length > 1 && (
            <polygon
              fill="rgba(251,191,36,0.08)"
              points={[
                ...dataPoints.map((p, i) => {
                  const x = (i / (dataPoints.length - 1)) * W;
                  const y = H - (p.v / maxV) * H;
                  return `${x},${y}`;
                }),
                `${W},${H}`, `0,${H}`,
              ].join(' ')}
            />
          )}
          {/* Latest dot */}
          {dataPoints.length > 0 && (() => {
            const last = dataPoints[dataPoints.length - 1];
            const x = W;
            const y = H - (last.v / maxV) * H;
            return <circle cx={x} cy={y} r={3} fill="#fbbf24" />;
          })()}
        </svg>
        {/* Chunk indicators */}
        <div className="flex gap-1 mt-2">
          {['chunk_1', 'chunk_2', 'chunk_3', 'live'].map((c, i) => (
            <div key={c} className="flex-1 rounded px-1 py-0.5 text-center border"
              style={{
                background: i === 3 ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.03)',
                borderColor: i === 3 ? 'rgba(251,191,36,0.4)' : 'rgba(255,255,255,0.08)',
              }}>
              <div className="text-[7px] font-bold truncate"
                style={{ color: i === 3 ? '#fbbf24' : 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-anton)' }}>{c}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={startIngestion}
          className="flex items-center gap-1.5 bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 text-xs font-black px-3 py-1.5 rounded-lg border border-amber-400/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> {running ? 'STOP INGEST' : 'START INGEST'}
        </button>
        <span className="text-amber-400/50 text-xs">real-time GPU metrics</span>
      </div>
    </div>
  );
}

// ─── LangChain animation ──────────────────────────────────────────────────────
const LC_SOURCES = ['SQL DB', 'Vector Store', 'Graph DB'] as const;
const LC_COLORS = ['#60a5fa', '#a78bfa', '#34d399'];

function LangChainDiagram() {
  const [query, setQuery] = useState('');
  const [routing, setRouting] = useState<number | null>(null);
  const [result, setResult] = useState('');
  const [thinking, setThinking] = useState(false);

  const QUERIES = [
    { text: 'Who are the high-risk patients?', source: 0, answer: 'Found 23 high-risk patients in SQL.' },
    { text: 'Find similar symptoms to patient 42', source: 1, answer: 'Vector search: 8 similar cases found.' },
    { text: 'How is patient 42 connected to Dr. Lee?', source: 2, answer: 'Graph traversal: 2 hops via Clinic-A.' },
  ];

  const runQuery = (qi: number) => {
    if (thinking) return;
    setThinking(true); setResult(''); setRouting(null);
    setQuery(QUERIES[qi].text);
    setTimeout(() => setRouting(QUERIES[qi].source), 700);
    setTimeout(() => { setResult(QUERIES[qi].answer); setThinking(false); }, 1800);
  };

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-white/8 bg-black/30 p-3">
        {/* Agent box */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center">
            <TechLogo slug="langchain" alt="LangChain" size={16} />
          </div>
          <div>
            <div className="text-[9px] font-black text-amber-300" style={{ fontFamily: 'var(--font-anton)' }}>LANGCHAIN AGENT</div>
            <div className="text-[8px] text-white/30">hybrid search router</div>
          </div>
          {thinking && (
            <motion.div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400"
              animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.6, repeat: Infinity }} />
          )}
        </div>
        {/* Query display */}
        {query && (
          <div className="bg-white/5 rounded px-2 py-1.5 mb-2 text-[9px] text-white/60 italic border border-white/8">
            &ldquo;{query}&rdquo;
          </div>
        )}
        {/* Sources */}
        <div className="flex gap-2">
          {LC_SOURCES.map((s, i) => (
            <motion.div key={s}
              animate={routing === i ? { scale: [1, 1.05, 1], boxShadow: [`0 0 0px transparent`, `0 0 10px ${LC_COLORS[i]}`, `0 0 0px transparent`] } : {}}
              transition={{ duration: 0.5, repeat: routing === i ? 3 : 0 }}
              className="flex-1 rounded border px-1 py-1.5 text-center transition-all duration-300"
              style={{
                background: routing === i ? `${LC_COLORS[i]}20` : 'rgba(255,255,255,0.03)',
                borderColor: routing === i ? `${LC_COLORS[i]}60` : 'rgba(255,255,255,0.08)',
              }}>
              <div className="text-[8px] font-black" style={{ fontFamily: 'var(--font-anton)', color: routing === i ? LC_COLORS[i] : 'rgba(255,255,255,0.3)' }}>{s}</div>
            </motion.div>
          ))}
        </div>
        {/* Result */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            className="mt-2 bg-emerald-500/10 border border-emerald-500/25 rounded px-2 py-1.5 text-[9px] text-emerald-300">
            {result}
          </motion.div>
        )}
      </div>
      {/* Query buttons */}
      <div className="flex flex-col gap-1.5">
        {QUERIES.map((q, i) => (
          <button key={i} onClick={() => runQuery(i)} disabled={thinking}
            className="text-left flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.06] disabled:opacity-50 border border-white/8 rounded-lg px-3 py-1.5 transition-colors"
            style={{ fontFamily: 'var(--font-rajdhani)' }}>
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: LC_COLORS[i] }} />
            <span className="text-white/60 text-xs">{q.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
function ConceptStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="text-white font-black leading-none text-lg" style={{ fontFamily: 'var(--font-anton)' }}>{value}</div>
      <div className="text-amber-400/50 text-[9px] font-bold mt-0.5 tracking-wider">{label}</div>
    </div>
  );
}

// ─── Concept card ─────────────────────────────────────────────────────────────
function ConceptCard({ concept, isActive, onSelect }: { concept: Concept; isActive: boolean; onSelect: () => void }) {
  return (
    <motion.button onClick={onSelect} whileHover={{ y: -2 }}
      className={`relative text-left rounded-xl overflow-hidden border transition-all duration-200 p-4 w-full ${isActive ? 'border-amber-400/60 bg-amber-400/8' : 'border-white/8 bg-white/[0.02] hover:border-amber-400/30'}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="text-[9px] text-amber-400/50 font-bold tracking-widest mb-0.5" style={{ fontFamily: 'var(--font-anton)' }}>{concept.type}</div>
          <div className="text-white font-black text-sm tracking-wide" style={{ fontFamily: 'var(--font-anton)' }}>{concept.name}</div>
        </div>
        <div className="text-right ml-2">
          <div className="text-2xl font-black text-amber-300 leading-none" style={{ fontFamily: 'var(--font-anton)' }}>{concept.rating}</div>
          <div className="text-[8px] text-amber-400/50">RATING</div>
        </div>
      </div>
      <TechLogo slug={concept.iconSlug} alt={concept.name} size={24} />
      <div className="text-amber-300/60 text-xs italic mt-2 mb-3">&ldquo;{concept.tagline}&rdquo;</div>
      <div className="flex gap-4 pt-2 border-t border-white/8">
        <ConceptStat label="DIFF" value={concept.difficulty} />
        <ConceptStat label="IMPACT" value={concept.impact} />
        <ConceptStat label="REUSE" value={concept.reuse} />
      </div>
      {isActive && <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
    </motion.button>
  );
}

// ─── Diagram router ───────────────────────────────────────────────────────────
function ConceptDiagram({ id }: { id: ConceptId }) {
  switch (id) {
    case 'kafka':       return <KafkaDiagram />;
    case 'spark':       return <SparkDiagram />;
    case 'docker':      return <DockerDiagram />;
    case 'kubernetes':  return <KubernetesDiagram />;
    case 'timescaledb': return <TimescaleDBDiagram />;
    case 'langchain':   return <LangChainDiagram />;
  }
}

// ─── Concept detail ───────────────────────────────────────────────────────────
function ConceptDetail({ concept }: { concept: Concept }) {
  return (
    <motion.div key={concept.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="space-y-4">
      <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
        <h4 className="text-xs font-black tracking-widest text-amber-400 mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-anton)' }}>
          TACTICAL BREAKDOWN
        </h4>
        <p className="text-amber-100/80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-rajdhani)' }}>{concept.summary}</p>
      </div>
      <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
        <h4 className="text-xs font-black tracking-widest text-amber-400 mb-3" style={{ fontFamily: 'var(--font-anton)' }}>
          LIVE DEMO
        </h4>
        <ConceptDiagram id={concept.id} />
      </div>
      <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
        <h4 className="text-xs font-black tracking-widest text-amber-400 mb-2" style={{ fontFamily: 'var(--font-anton)' }}>
          MATCH LOG — MADHUR USED THIS IN:
        </h4>
        <ul className="space-y-1.5">
          {concept.matchLog.map((m, i) => (
            <li key={i}>
              {m.url
                ? <a href={m.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-amber-200/70 text-xs hover:text-amber-200 transition-colors group" style={{ fontFamily: 'var(--font-rajdhani)' }}>
                    <ChevronRight className="w-3 h-3 text-amber-400/60 group-hover:text-amber-400 shrink-0" />
                    {m.label}<ExternalLink className="w-2.5 h-2.5 opacity-40 group-hover:opacity-70" />
                  </a>
                : <span className="flex items-center gap-1.5 text-amber-200/60 text-xs" style={{ fontFamily: 'var(--font-rajdhani)' }}>
                    <ChevronRight className="w-3 h-3 text-amber-400/40 shrink-0" />{m.label}
                  </span>}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── TacticalBoard ────────────────────────────────────────────────────────────
export default function TacticalBoard() {
  const [selected, setSelected] = useState<ConceptId>('kafka');
  const concept = CONCEPTS.find(c => c.id === selected)!;

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
        <div className="text-xs font-black tracking-widest text-amber-400 mb-0.5" style={{ fontFamily: 'var(--font-anton)' }}>
          TACTICAL PLAYBOOK
        </div>
        <p className="text-amber-100/55 text-xs" style={{ fontFamily: 'var(--font-rajdhani)' }}>
          Six technologies I&apos;ve run in production, broken down like match tactics. Pick a card and interact with the live demo.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CONCEPTS.map(c => (
          <ConceptCard key={c.id} concept={c} isActive={selected === c.id} onSelect={() => setSelected(c.id)} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <ConceptDetail key={selected} concept={concept} />
      </AnimatePresence>
    </div>
  );
}
