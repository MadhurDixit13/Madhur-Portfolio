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
type ConceptId = 'kafka' | 'spark' | 'docker' | 'kubernetes' | 'timescaledb' | 'langchain' | 'redis' | 'airflow' | 'fastapi' | 'prometheus' | 'influxdb' | 'celery' | 'terraform' | 'databricks' | 'postgresql' | 'grafana' | 'clickhouse' | 'langgraph';

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
  {
    id: 'redis',
    name: 'REDIS',
    tagline: 'The Quick Release',
    type: 'IN-MEMORY STORE',
    difficulty: 65, impact: 91, reuse: 94, rating: 89,
    iconSlug: 'redis',
    summary: 'Redis is the quick release — it bypasses the midfield entirely and delivers answers in microseconds from in-memory storage. First request hits the database; every repeat is served from cache. Used for job queues (Celery broker) and rate-limiting in the GPU telemetry platform.',
    matchLog: [
      { label: 'AllyIn.ai — GPU telemetry rate limiting', url: 'https://www.linkedin.com/company/allyin-ai/posts/?feedView=all' },
      { label: 'Runara.ai — inference job queue (Celery)', url: '' },
    ],
  },
  {
    id: 'airflow',
    name: 'APACHE AIRFLOW',
    tagline: 'The Match Schedule',
    type: 'WORKFLOW ORCHESTRATOR',
    difficulty: 76, impact: 89, reuse: 87, rating: 86,
    iconSlug: 'apacheairflow',
    summary: 'Airflow is the fixture list — it defines the order, dependencies, and timing of every task in a pipeline. DAGs make workflows visual and debuggable. Used in SentimentFlow to orchestrate the full Reddit ingestion, sentiment scoring, and reporting pipeline on a schedule.',
    matchLog: [
      { label: 'Reddit SentimentFlow', url: 'https://github.com/MadhurDixit13/SentimentFlow' },
    ],
  },
  {
    id: 'fastapi',
    name: 'FASTAPI',
    tagline: 'The Box-to-Box Runner',
    type: 'ASYNC API FRAMEWORK',
    difficulty: 60, impact: 90, reuse: 95, rating: 88,
    iconSlug: 'fastapi',
    summary: 'FastAPI is the box-to-box midfielder — fast, async, and everywhere at once. Its automatic OpenAPI docs and Pydantic validation mean fewer errors at the boundary. Replaced Flask at Liquid Rocketry Lab, cutting API response time by 40% through async I/O.',
    matchLog: [
      { label: 'Liquid Rocketry Lab — Flask to FastAPI migration', url: 'https://liquidrocketry.com/' },
      { label: 'AllyIn.ai — GPU metrics API', url: 'https://www.linkedin.com/company/allyin-ai/posts/?feedView=all' },
    ],
  },
  {
    id: 'prometheus',
    name: 'PROMETHEUS',
    tagline: 'The Scout Report',
    type: 'METRICS & ALERTING',
    difficulty: 70, impact: 92, reuse: 90, rating: 91,
    iconSlug: 'prometheus',
    summary: 'Prometheus is the scout — it scrapes every node on a fixed interval, stores time-series metrics, and fires alerts the moment a stat drops below threshold. Used with DCGM at AllyIn.ai to track GPU utilisation, SM occupancy, and memory bandwidth in real time.',
    matchLog: [
      { label: 'AllyIn.ai — GPU telemetry platform (DCGM + Prometheus)', url: 'https://www.linkedin.com/company/allyin-ai/posts/?feedView=all' },
    ],
  },
  {
    id: 'influxdb',
    name: 'INFLUXDB',
    tagline: 'The Time-Keeper',
    type: 'TIME-SERIES DB',
    difficulty: 72, impact: 88, reuse: 84, rating: 85,
    iconSlug: 'influxdb',
    summary: 'InfluxDB is the time-keeper, purpose-built for high-frequency sensor data. At Liquid Rocketry Lab, migrating queries from legacy InfluxQL to Flux cut retrieval time by 96% (50s → 2s) by leveraging push-down filters and multi-measurement joins.',
    matchLog: [
      { label: 'Liquid Rocketry Lab — 96% query speedup (InfluxQL → Flux)', url: 'https://liquidrocketry.com/' },
    ],
  },
  {
    id: 'celery',
    name: 'CELERY',
    tagline: 'The Rotation Squad',
    type: 'TASK QUEUE',
    difficulty: 68, impact: 87, reuse: 89, rating: 84,
    iconSlug: 'celery',
    summary: 'Celery is the rotation squad — background workers that pick up tasks from a broker (Redis) and process them without blocking the main thread. Used at Runara.ai to queue LLM inference jobs so the API stays responsive while heavy GPU work runs asynchronously.',
    matchLog: [
      { label: 'Runara.ai — LLM inference job queue', url: '' },
    ],
  },
  {
    id: 'terraform',
    name: 'TERRAFORM',
    tagline: 'The Transfer Window',
    type: 'INFRASTRUCTURE AS CODE',
    difficulty: 80, impact: 93, reuse: 92, rating: 90,
    iconSlug: 'terraform',
    summary: 'Terraform is the transfer window. You declare the squad you want (desired infra), and Terraform\'s plan/apply cycle negotiates with every cloud API to make it reality. State files track what\'s on the pitch; drift detection fires when the real world diverges from the blueprint. Used at Runara.ai to provision GPU serving infrastructure reproducibly.',
    matchLog: [
      { label: 'Runara.ai — GPU serving infra', url: '' },
    ],
  },
  {
    id: 'databricks',
    name: 'DATABRICKS',
    tagline: 'The Training Ground',
    type: 'LAKEHOUSE PLATFORM',
    difficulty: 84, impact: 95, reuse: 86, rating: 92,
    iconSlug: 'databricks',
    summary: 'Databricks is the training ground where raw talent (Bronze) gets shaped into match-ready form (Gold). The medallion architecture layers cleaning, enrichment, and aggregation so each squad member arrives at the pitch analysis-ready. Used in CarePulse Analytics to process 10,000+ patient records on AWS Kinesis with SCD Type 2 dimensions and CDC logic.',
    matchLog: [
      { label: 'CarePulse Analytics — Bronze→Gold medallion', url: 'https://github.com/MadhurDixit13/CarePulse' },
    ],
  },
  {
    id: 'postgresql',
    name: 'POSTGRESQL',
    tagline: 'The Tactical Database',
    type: 'RELATIONAL DATABASE',
    difficulty: 70, impact: 91, reuse: 97, rating: 89,
    iconSlug: 'postgresql',
    summary: 'PostgreSQL is the squad database — it stores every player stat, every formation, every historical record with ACID guarantees. Its query planner chooses between sequential scans, index seeks, and joins the way a manager reads the match; the right execution plan turns a 5s query into a 50ms sprint. Used across multiple projects for schema design, indexing, and complex analytics.',
    matchLog: [
      { label: 'Heartland Community Network — story REST API + GSI', url: 'https://www.heartlandnet.com/' },
      { label: 'AllyIn.ai — GPU telemetry relational store', url: 'https://www.linkedin.com/company/allyin-ai/posts/?feedView=all' },
    ],
  },
  {
    id: 'grafana',
    name: 'GRAFANA',
    tagline: 'The Match Dashboard',
    type: 'OBSERVABILITY UI',
    difficulty: 65, impact: 92, reuse: 93, rating: 90,
    iconSlug: 'grafana',
    summary: 'Grafana is the live match dashboard — every metric, every trend, every anomaly visualised in real time. It transforms Prometheus scrape data into the tactical board every manager needs to make substitution decisions. Built dashboards at AllyIn.ai tracking GPU SM occupancy, memory bandwidth, and inference throughput across H100/L40S fleet.',
    matchLog: [
      { label: 'AllyIn.ai GPU telemetry dashboards', url: 'https://www.linkedin.com/company/allyin-ai/posts/?feedView=all' },
    ],
  },
  {
    id: 'clickhouse',
    name: 'CLICKHOUSE',
    tagline: 'The Dead Ball Specialist',
    type: 'OLAP DATABASE',
    difficulty: 82, impact: 95, reuse: 88, rating: 91,
    iconSlug: 'clickhouse',
    summary: 'ClickHouse is the dead-ball specialist — give it a set piece (analytical query over billions of rows) and it delivers in milliseconds. Columnar storage and vectorised execution mean WHERE clauses scan only the relevant columns, skipping 90% of data. Used at Runara.ai for aggregating inference latency and cost metrics across GPU fleet at scale.',
    matchLog: [
      { label: 'Runara.ai inference analytics', url: '' },
    ],
  },
  {
    id: 'langgraph',
    name: 'LANGGRAPH',
    tagline: 'The Tactical Shape-Shifter',
    type: 'AGENTIC FRAMEWORK',
    difficulty: 85, impact: 91, reuse: 84, rating: 89,
    iconSlug: 'langchain',
    summary: "LangGraph gives agents a nervous system — stateful, cyclical graphs where LLMs reason, use tools, and loop back to reconsider. Unlike LangChain's linear chains, LangGraph handles branching logic: if the agent is uncertain, it retries; if it hits an edge, it escalates. The missing piece between a simple RAG pipeline and a true autonomous agent.",
    matchLog: [
      { label: 'Runara.ai — agentic LLM orchestration', url: '' },
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

// ─── Redis animation ──────────────────────────────────────────────────────────
interface CacheEntry { key: string; value: string; ttl: number; maxTtl: number }

function RedisDiagram() {
  const [cache, setCache] = useState<CacheEntry[]>([
    { key: 'user:42', value: '{ name: "Alice" }', ttl: 28, maxTtl: 30 },
    { key: 'gpu:util', value: '{ sm: 87% }', ttl: 10, maxTtl: 10 },
  ]);
  const [lastGet, setLastGet] = useState<{ key: string; hit: boolean } | null>(null);
  const [hitCount, setHitCount] = useState(0);
  const [missCount, setMissCount] = useState(0);

  // TTL countdown
  useEffect(() => {
    const t = setInterval(() => {
      setCache(prev => prev
        .map(e => ({ ...e, ttl: e.ttl - 1 }))
        .filter(e => e.ttl > 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const getKey = (key: string) => {
    const hit = cache.some(e => e.key === key);
    setLastGet({ key, hit });
    if (hit) setHitCount(c => c + 1);
    else {
      setMissCount(c => c + 1);
      // Simulate DB fetch + cache set
      const entries: Record<string, string> = { 'user:42': '{ name: "Alice" }', 'session:99': '{ token: "xyz" }', 'gpu:util': '{ sm: 87% }' };
      if (entries[key]) {
        setCache(prev => [...prev.filter(e => e.key !== key), { key, value: entries[key], ttl: 20, maxTtl: 20 }]);
      }
    }
    setTimeout(() => setLastGet(null), 1200);
  };

  const KEYS = ['user:42', 'session:99', 'gpu:util'];

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-white/8 bg-black/30 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <TechLogo slug="redis" alt="Redis" size={14} />
            <span className="text-[9px] font-black text-red-400" style={{ fontFamily: 'var(--font-anton)' }}>CACHE STORE</span>
          </div>
          <div className="flex gap-3 text-[9px]">
            <span className="text-emerald-400">HIT {hitCount}</span>
            <span className="text-red-400">MISS {missCount}</span>
          </div>
        </div>
        {/* Cache entries */}
        <div className="space-y-1.5 mb-2">
          {cache.length === 0 && <div className="text-white/20 text-[9px] text-center py-2">cache empty</div>}
          {cache.map(e => (
            <div key={e.key} className="flex items-center gap-2 rounded-lg px-2 py-1.5 border border-white/8 bg-white/[0.02]">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              <span className="text-red-300 text-[9px] font-black w-20 shrink-0" style={{ fontFamily: 'var(--font-anton)' }}>{e.key}</span>
              <span className="text-white/40 text-[8px] flex-1 truncate">{e.value}</span>
              <div className="shrink-0 text-[8px] text-amber-400/60 w-16">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-amber-400/60 rounded-full"
                    style={{ width: `${(e.ttl / e.maxTtl) * 100}%` }} />
                </div>
                <div className="text-center mt-0.5">{e.ttl}s</div>
              </div>
            </div>
          ))}
        </div>
        {/* GET result */}
        <AnimatePresence>
          {lastGet && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className={`text-[9px] font-black px-2 py-1 rounded border mb-2 ${lastGet.hit ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-red-500/40 bg-red-500/10 text-red-300'}`}
              style={{ fontFamily: 'var(--font-anton)' }}>
              {lastGet.hit ? `CACHE HIT — ${lastGet.key}` : `CACHE MISS — fetching from DB...`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {KEYS.map(k => (
          <button key={k} onClick={() => getKey(k)}
            className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-[10px] font-black px-2.5 py-1.5 rounded-lg border border-red-500/25 transition-colors"
            style={{ fontFamily: 'var(--font-anton)' }}>
            GET {k}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Airflow animation ────────────────────────────────────────────────────────
type TaskStatus = 'idle' | 'running' | 'success' | 'failed';
interface AirflowTask { id: string; label: string; deps: string[] }

const DAG_TASKS: AirflowTask[] = [
  { id: 'fetch', label: 'FETCH', deps: [] },
  { id: 'validate', label: 'VALIDATE', deps: ['fetch'] },
  { id: 'transform', label: 'TRANSFORM', deps: ['validate'] },
  { id: 'sentiment', label: 'SENTIMENT', deps: ['transform'] },
  { id: 'load', label: 'LOAD', deps: ['sentiment'] },
];

function AirflowDiagram() {
  const [statuses, setStatuses] = useState<Record<string, TaskStatus>>({});
  const [running, setRunning] = useState(false);
  const [dagRuns, setDagRuns] = useState(0);

  const triggerDag = () => {
    if (running) return;
    setRunning(true);
    setDagRuns(r => r + 1);
    const init: Record<string, TaskStatus> = {};
    DAG_TASKS.forEach(t => { init[t.id] = 'idle'; });
    setStatuses(init);

    DAG_TASKS.forEach((task, i) => {
      setTimeout(() => {
        setStatuses(prev => ({ ...prev, [task.id]: 'running' }));
        setTimeout(() => {
          setStatuses(prev => ({ ...prev, [task.id]: 'success' }));
          if (i === DAG_TASKS.length - 1) setRunning(false);
        }, 700);
      }, i * 900);
    });
  };

  const statusColor = (s: TaskStatus) => ({
    idle: 'rgba(255,255,255,0.08)',
    running: 'rgba(251,191,36,0.2)',
    success: 'rgba(52,211,153,0.2)',
    failed: 'rgba(239,68,68,0.2)',
  }[s]);

  const statusBorder = (s: TaskStatus) => ({
    idle: 'rgba(255,255,255,0.1)',
    running: 'rgba(251,191,36,0.5)',
    success: 'rgba(52,211,153,0.5)',
    failed: 'rgba(239,68,68,0.5)',
  }[s]);

  const statusTextColor = (s: TaskStatus) => ({
    idle: 'rgba(255,255,255,0.3)',
    running: '#fbbf24',
    success: '#34d399',
    failed: '#ef4444',
  }[s]);

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-white/8 bg-black/30 p-3">
        <div className="flex items-center gap-1.5 mb-3">
          <TechLogo slug="apacheairflow" alt="Airflow" size={14} />
          <span className="text-[9px] font-black text-amber-400" style={{ fontFamily: 'var(--font-anton)' }}>
            sentimentflow_dag {dagRuns > 0 && `· run #${dagRuns}`}
          </span>
        </div>
        {/* DAG pipeline — horizontal */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {DAG_TASKS.map((task, i) => {
            const s = statuses[task.id] ?? 'idle';
            return (
              <div key={task.id} className="flex items-center gap-1 shrink-0">
                <motion.div
                  animate={s === 'running' ? { scale: [1, 1.08, 1] } : {}}
                  transition={{ duration: 0.5, repeat: s === 'running' ? Infinity : 0 }}
                  className="rounded-lg px-2 py-2 text-center border transition-all duration-300"
                  style={{ background: statusColor(s), borderColor: statusBorder(s), minWidth: 52 }}>
                  <div className="text-[8px] font-black" style={{ fontFamily: 'var(--font-anton)', color: statusTextColor(s) }}>
                    {task.label}
                  </div>
                  <div className="text-[7px] mt-0.5" style={{ color: statusTextColor(s) }}>
                    {s === 'idle' ? 'queued' : s === 'running' ? '▶ running' : s === 'success' ? '✓ done' : '✗ fail'}
                  </div>
                </motion.div>
                {i < DAG_TASKS.length - 1 && (
                  <motion.div animate={s === 'success' ? { opacity: 1 } : { opacity: 0.2 }}
                    className="text-amber-400 text-xs">→</motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={triggerDag} disabled={running}
          className="flex items-center gap-1.5 bg-amber-400/15 hover:bg-amber-400/25 disabled:opacity-40 text-amber-300 text-xs font-black px-3 py-1.5 rounded-lg border border-amber-400/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> {running ? 'RUNNING...' : 'TRIGGER DAG'}
        </button>
        <span className="text-amber-400/50 text-xs">{dagRuns} runs</span>
      </div>
    </div>
  );
}

// ─── FastAPI animation ────────────────────────────────────────────────────────
interface ApiRequest { id: number; path: string; method: string; status: 'pending' | 'done'; duration: number; elapsed: number }

function FastAPIDiagram() {
  const [requests, setRequests] = useState<ApiRequest[]>([]);
  const [totalReqs, setTotalReqs] = useState(0);
  const nextId = useRef(0);

  const ENDPOINTS = [
    { path: '/metrics/gpu', method: 'GET', duration: 40 },
    { path: '/batch/infer', method: 'POST', duration: 120 },
    { path: '/health', method: 'GET', duration: 15 },
    { path: '/models/list', method: 'GET', duration: 55 },
  ];

  const fireRequests = () => {
    const batch = ENDPOINTS.map(ep => ({
      id: nextId.current++,
      path: ep.path,
      method: ep.method,
      status: 'pending' as const,
      duration: ep.duration,
      elapsed: 0,
    }));
    setRequests(batch);
    setTotalReqs(t => t + batch.length);

    batch.forEach(req => {
      setTimeout(() => {
        setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'done' } : r));
      }, req.duration);
    });
  };

  // Progress animation
  useEffect(() => {
    const t = setInterval(() => {
      setRequests(prev => prev.map(r =>
        r.status === 'pending' ? { ...r, elapsed: Math.min(r.elapsed + 8, r.duration) } : r
      ));
    }, 16);
    return () => clearInterval(t);
  }, []);

  const methodColor = (m: string) => m === 'GET' ? '#34d399' : '#60a5fa';

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-white/8 bg-black/30 p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <TechLogo slug="fastapi" alt="FastAPI" size={14} />
            <span className="text-[9px] font-black text-emerald-400" style={{ fontFamily: 'var(--font-anton)' }}>ASYNC FASTAPI</span>
          </div>
          <span className="text-[9px] text-white/30">{totalReqs} requests served</span>
        </div>
        {/* Request list */}
        <div className="space-y-1.5">
          {requests.length === 0 && (
            <div className="text-white/20 text-[9px] text-center py-3">fire requests to see async handling</div>
          )}
          {requests.map(req => (
            <div key={req.id} className="flex items-center gap-2">
              <span className="text-[8px] font-black w-8 shrink-0"
                style={{ fontFamily: 'var(--font-anton)', color: methodColor(req.method) }}>{req.method}</span>
              <span className="text-white/50 text-[9px] w-28 shrink-0 truncate">{req.path}</span>
              <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full"
                  style={{
                    width: `${(req.elapsed / req.duration) * 100}%`,
                    background: req.status === 'done' ? '#34d399' : '#fbbf24',
                  }} />
              </div>
              <span className="text-[8px] w-10 text-right shrink-0"
                style={{ color: req.status === 'done' ? '#34d399' : '#fbbf24' }}>
                {req.status === 'done' ? `${req.duration}ms` : '...'}
              </span>
            </div>
          ))}
        </div>
        {requests.length > 0 && requests.every(r => r.status === 'done') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-2 text-[8px] text-emerald-400/70 text-center">
            All handled concurrently — async = no blocking
          </motion.div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button onClick={fireRequests}
          className="flex items-center gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-black px-3 py-1.5 rounded-lg border border-emerald-500/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> FIRE REQUESTS
        </button>
        <span className="text-amber-400/50 text-xs">all run concurrently</span>
      </div>
    </div>
  );
}

// ─── Prometheus animation ─────────────────────────────────────────────────────
function PrometheusDiagram() {
  const [metrics, setMetrics] = useState<{ name: string; value: number; unit: string; alert: boolean }[]>([
    { name: 'GPU SM Occupancy', value: 87, unit: '%', alert: false },
    { name: 'Memory Bandwidth', value: 72, unit: '%', alert: false },
    { name: 'GPU Temperature', value: 68, unit: '°C', alert: false },
    { name: 'VRAM Usage', value: 91, unit: '%', alert: true },
  ]);
  const [scraping, setScraping] = useState(false);
  const [lastScrape, setLastScrape] = useState<string | null>(null);

  const scrape = () => {
    if (scraping) return;
    setScraping(true);
    setTimeout(() => {
      setMetrics(prev => prev.map(m => {
        const delta = (Math.random() - 0.48) * 8;
        const newVal = Math.min(99, Math.max(10, Math.round(m.value + delta)));
        return { ...m, value: newVal, alert: m.name === 'VRAM Usage' ? newVal > 88 : newVal > 95 };
      }));
      setLastScrape(new Date().toLocaleTimeString());
      setScraping(false);
    }, 600);
  };

  useEffect(() => {
    const t = setInterval(scrape, 3000);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-white/8 bg-black/30 p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <TechLogo slug="prometheus" alt="Prometheus" size={14} />
            <span className="text-[9px] font-black text-orange-400" style={{ fontFamily: 'var(--font-anton)' }}>DCGM EXPORTER</span>
          </div>
          {lastScrape && <span className="text-[8px] text-white/30">scraped {lastScrape}</span>}
        </div>
        <div className="space-y-2">
          {metrics.map(m => (
            <div key={m.name} className="flex items-center gap-2">
              <span className="text-[9px] text-white/50 w-36 shrink-0">{m.name}</span>
              <div className="flex-1 h-2 bg-white/8 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${m.value}%`,
                    background: m.alert ? 'linear-gradient(90deg,#ef4444,#f87171)' : m.value > 80 ? 'linear-gradient(90deg,#f59e0b,#fbbf24)' : 'linear-gradient(90deg,#34d399,#6ee7b7)',
                  }} />
              </div>
              <div className="flex items-center gap-1 w-14 shrink-0 justify-end">
                <span className="text-[9px] font-black" style={{ fontFamily: 'var(--font-anton)', color: m.alert ? '#ef4444' : '#fbbf24' }}>
                  {m.value}{m.unit}
                </span>
                {m.alert && <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-[8px] text-red-400">⚠</motion.span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={scrape} disabled={scraping}
          className="flex items-center gap-1.5 bg-orange-500/15 hover:bg-orange-500/25 disabled:opacity-40 text-orange-300 text-xs font-black px-3 py-1.5 rounded-lg border border-orange-500/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> {scraping ? 'SCRAPING...' : 'SCRAPE NOW'}
        </button>
        <span className="text-amber-400/50 text-xs">auto-scrapes every 3s</span>
      </div>
    </div>
  );
}

// ─── InfluxDB animation ───────────────────────────────────────────────────────
const INFLUX_QUERIES = [
  { label: 'InfluxQL (legacy)', lang: 'legacy', query: 'SELECT mean("value") FROM "sensors"\nGROUP BY time(1m)\nWHERE time > now() - 1h', duration: 50000, color: '#ef4444' },
  { label: 'Flux (optimised)', lang: 'flux', query: 'from(bucket: "sensors")\n  |> range(start: -1h)\n  |> filter(fn: r => r._field == "value")\n  |> aggregateWindow(every: 1m, fn: mean)', duration: 2000, color: '#34d399' },
];

function InfluxDBDiagram() {
  const [running, setRunning] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<Record<number, number>>({});
  const [done, setDone] = useState<Record<number, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runQuery = (idx: number) => {
    if (running !== null) return;
    setRunning(idx);
    setDone(prev => ({ ...prev, [idx]: false }));
    setElapsed(prev => ({ ...prev, [idx]: 0 }));

    const target = INFLUX_QUERIES[idx].duration;
    const step = 80;
    let acc = 0;
    timerRef.current = setInterval(() => {
      acc += step;
      setElapsed(prev => ({ ...prev, [idx]: acc }));
      if (acc >= target) {
        clearInterval(timerRef.current!);
        setElapsed(prev => ({ ...prev, [idx]: target }));
        setDone(prev => ({ ...prev, [idx]: true }));
        setRunning(null);
      }
    }, step);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  return (
    <div className="space-y-3">
      {INFLUX_QUERIES.map((q, idx) => (
        <div key={idx} className="rounded-xl border border-white/8 bg-black/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <TechLogo slug="influxdb" alt="InfluxDB" size={13} />
              <span className="text-[9px] font-black" style={{ fontFamily: 'var(--font-anton)', color: q.color }}>{q.label}</span>
            </div>
            {done[idx] && (
              <span className="text-[9px] font-black" style={{ fontFamily: 'var(--font-anton)', color: q.color }}>
                {(q.duration / 1000).toFixed(1)}s
              </span>
            )}
            {running === idx && (
              <span className="text-[9px] text-white/40">{(elapsed[idx] / 1000).toFixed(1)}s...</span>
            )}
          </div>
          <div className="bg-black/40 rounded px-2 py-1.5 mb-2 font-mono text-[8px] text-white/40 whitespace-pre leading-relaxed border border-white/5">
            {q.query}
          </div>
          {(running === idx || done[idx]) && (
            <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: q.color }}
                animate={{ width: done[idx] ? '100%' : `${Math.min(((elapsed[idx] ?? 0) / q.duration) * 100, 99)}%` }}
                transition={{ duration: 0.08 }} />
            </div>
          )}
          <button onClick={() => runQuery(idx)} disabled={running !== null}
            className="mt-2 flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded border transition-colors disabled:opacity-40"
            style={{ fontFamily: 'var(--font-anton)', color: q.color, borderColor: `${q.color}40`, background: `${q.color}10` }}>
            <ChevronRight className="w-3 h-3" /> {running === idx ? 'RUNNING...' : done[idx] ? 'RUN AGAIN' : 'RUN QUERY'}
          </button>
        </div>
      ))}
      {done[0] && done[1] && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center text-[9px] font-black text-emerald-400 py-1" style={{ fontFamily: 'var(--font-anton)' }}>
          FLUX IS 25x FASTER — same data, smarter query
        </motion.div>
      )}
    </div>
  );
}

// ─── Celery animation ─────────────────────────────────────────────────────────
interface CeleryJob { id: number; name: string; worker: number; status: 'queued' | 'running' | 'done'; progress: number }

function CeleryDiagram() {
  const [jobs, setJobs] = useState<CeleryJob[]>([]);
  const [totalDone, setTotalDone] = useState(0);
  const nextId = useRef(1);

  const JOB_TYPES = ['infer:llama-3', 'infer:mistral', 'embed:batch', 'score:toxicity'];

  const enqueue = () => {
    const name = JOB_TYPES[Math.floor(Math.random() * JOB_TYPES.length)];
    const id = nextId.current++;
    const worker = Math.floor(Math.random() * 3);
    setJobs(prev => [...prev, { id, name, worker, status: 'queued', progress: 0 }]);

    setTimeout(() => {
      setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'running' } : j));
      const duration = 1800 + Math.random() * 1200;
      const step = 60;
      let p = 0;
      const t = setInterval(() => {
        p += (step / duration) * 100;
        setJobs(prev => prev.map(j => j.id === id ? { ...j, progress: Math.min(p, 100) } : j));
        if (p >= 100) {
          clearInterval(t);
          setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'done', progress: 100 } : j));
          setTotalDone(d => d + 1);
          setTimeout(() => setJobs(prev => prev.filter(j => j.id !== id)), 1000);
        }
      }, step);
    }, 300 + Math.random() * 400);
  };

  const workerColors = ['#60a5fa', '#a78bfa', '#34d399'];

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-white/8 bg-black/30 p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <TechLogo slug="celery" alt="Celery" size={14} />
            <span className="text-[9px] font-black text-emerald-400" style={{ fontFamily: 'var(--font-anton)' }}>3 WORKERS · REDIS BROKER</span>
          </div>
          <span className="text-[8px] text-white/30">{totalDone} completed</span>
        </div>
        {/* Workers */}
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          {[0, 1, 2].map(w => {
            const workerJobs = jobs.filter(j => j.worker === w);
            return (
              <div key={w} className="rounded border border-white/8 p-1.5 bg-white/[0.02]">
                <div className="text-[7px] font-black mb-1.5" style={{ fontFamily: 'var(--font-anton)', color: workerColors[w] }}>
                  WORKER-{w + 1}
                </div>
                <AnimatePresence>
                  {workerJobs.map(j => (
                    <motion.div key={j.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="mb-1">
                      <div className="text-[7px] text-white/40 truncate mb-0.5">{j.name}</div>
                      <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ background: workerColors[w], width: `${j.progress}%` }} />
                      </div>
                    </motion.div>
                  ))}
                  {workerJobs.length === 0 && (
                    <div className="text-[7px] text-white/20">idle</div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        {/* Queue */}
        <div className="text-[8px] text-white/30 text-center">
          {jobs.filter(j => j.status === 'queued').length} jobs queued · {jobs.filter(j => j.status === 'running').length} running
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={enqueue}
          className="flex items-center gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-black px-3 py-1.5 rounded-lg border border-emerald-500/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> QUEUE JOB
        </button>
        <span className="text-amber-400/50 text-xs">API stays unblocked</span>
      </div>
    </div>
  );
}

// ─── Terraform animation ──────────────────────────────────────────────────────
const TF_RESOURCES = [
  { name: 'aws_instance.api_server', type: 'EC2' },
  { name: 'aws_s3_bucket.model_store', type: 'S3' },
  { name: 'aws_db_instance.metrics_pg', type: 'RDS' },
  { name: 'aws_security_group.gpu_sg', type: 'SG' },
] as const;

function TerraformDiagram() {
  type TFStatus = 'pending' | 'creating' | 'created';
  const [phase, setPhase] = useState<'idle' | 'planning' | 'planned' | 'applying' | 'applied'>('idle');
  const [statuses, setStatuses] = useState<TFStatus[]>(['pending', 'pending', 'pending', 'pending']);

  const plan = () => {
    if (phase !== 'idle' && phase !== 'applied') return;
    setPhase('planning');
    setStatuses(['pending', 'pending', 'pending', 'pending']);
    setTimeout(() => setPhase('planned'), 1400);
  };

  const apply = () => {
    if (phase !== 'planned') return;
    setPhase('applying');
    TF_RESOURCES.forEach((_, i) => {
      setTimeout(() => {
        setStatuses(prev => { const n = [...prev]; n[i] = 'creating'; return n; });
        setTimeout(() => {
          setStatuses(prev => { const n = [...prev]; n[i] = 'created'; return n; });
          if (i === TF_RESOURCES.length - 1) setPhase('applied');
        }, 700);
      }, i * 600);
    });
  };

  const statusColor = (s: TFStatus) => s === 'created' ? '#34d399' : s === 'creating' ? '#fbbf24' : 'rgba(255,255,255,0.15)';
  const statusLabel = (s: TFStatus) => s === 'created' ? '✓ created' : s === 'creating' ? '⟳ creating...' : '○ pending';

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-white/8 bg-black/30 p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <TechLogo slug="terraform" alt="Terraform" size={14} />
            <span className="text-[9px] font-black text-purple-400" style={{ fontFamily: 'var(--font-anton)' }}>
              {phase === 'planning' ? 'PLANNING...' : phase === 'planned' ? 'PLAN READY' : phase === 'applying' ? 'APPLYING...' : phase === 'applied' ? 'APPLIED ✓' : 'TERRAFORM'}
            </span>
          </div>
          {phase === 'planned' && (
            <span className="text-[9px] text-amber-400/70">{TF_RESOURCES.length} to add · 0 to destroy</span>
          )}
        </div>
        {/* Plan output-style log */}
        {(phase === 'planned' || phase === 'applying' || phase === 'applied') && (
          <div className="bg-black/50 rounded font-mono text-[8px] p-2 mb-2 border border-white/5 space-y-1">
            {TF_RESOURCES.map((r, i) => (
              <motion.div key={r.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2">
                <span style={{ color: statusColor(statuses[i]) }}>{statusLabel(statuses[i])}</span>
                <span className="text-white/40">{r.name}</span>
                <span className="text-white/20">({r.type})</span>
              </motion.div>
            ))}
          </div>
        )}
        {phase === 'idle' && (
          <div className="text-white/20 text-[9px] text-center py-2">run plan to preview infrastructure changes</div>
        )}
        {phase === 'planning' && (
          <div className="flex items-center gap-2 py-2">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-purple-400" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.6, repeat: Infinity }} />
            <span className="text-[9px] text-purple-400/70">Refreshing state...</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={plan} disabled={phase === 'planning' || phase === 'applying'}
          className="flex items-center gap-1.5 bg-purple-500/15 hover:bg-purple-500/25 disabled:opacity-40 text-purple-300 text-xs font-black px-3 py-1.5 rounded-lg border border-purple-500/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> PLAN
        </button>
        <button onClick={apply} disabled={phase !== 'planned'}
          className="flex items-center gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 disabled:opacity-40 text-emerald-300 text-xs font-black px-3 py-1.5 rounded-lg border border-emerald-500/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> APPLY
        </button>
        <span className="text-amber-400/40 text-xs ml-auto">
          {phase === 'applied' ? `${TF_RESOURCES.length} resources provisioned` : 'plan first, then apply'}
        </span>
      </div>
    </div>
  );
}

// ─── Databricks animation ─────────────────────────────────────────────────────
const MEDALLION_LAYERS = [
  { name: 'BRONZE', color: '#cd7f32', bg: 'rgba(205,127,50,0.12)', border: 'rgba(205,127,50,0.35)', desc: 'Raw ingest' },
  { name: 'SILVER', color: '#b0c4de', bg: 'rgba(176,196,222,0.12)', border: 'rgba(176,196,222,0.35)', desc: 'Cleaned + joined' },
  { name: 'GOLD', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.35)', desc: 'Aggregated KPIs' },
] as const;

function DatabricksDiagram() {
  const [layer, setLayer] = useState(-1);
  const [rows, setRows] = useState([0, 0, 0]);
  const [running, setRunning] = useState(false);

  const runBatch = () => {
    if (running) return;
    setRunning(true);
    setLayer(0); setRows([0, 0, 0]);
    // Bronze: ingest
    let bronzeCount = 0;
    const bronzeTimer = setInterval(() => {
      bronzeCount += 312 + Math.floor(Math.random() * 200);
      setRows(prev => [Math.min(bronzeCount, 10247), prev[1], prev[2]]);
      if (bronzeCount >= 10247) { clearInterval(bronzeTimer); step1(); }
    }, 100);
  };

  const step1 = () => {
    setLayer(1);
    let silverCount = 0;
    const t = setInterval(() => {
      silverCount += 210 + Math.floor(Math.random() * 150);
      setRows(prev => [prev[0], Math.min(silverCount, 9874), prev[2]]);
      if (silverCount >= 9874) { clearInterval(t); step2(); }
    }, 120);
  };

  const step2 = () => {
    setLayer(2);
    let goldCount = 0;
    const t = setInterval(() => {
      goldCount += 15 + Math.floor(Math.random() * 10);
      setRows(prev => [prev[0], prev[1], Math.min(goldCount, 150)]);
      if (goldCount >= 150) { clearInterval(t); setLayer(3); setRunning(false); }
    }, 90);
  };

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-white/8 bg-black/30 p-3">
        <div className="flex items-center gap-1.5 mb-3">
          <TechLogo slug="databricks" alt="Databricks" size={14} />
          <span className="text-[9px] font-black text-amber-400" style={{ fontFamily: 'var(--font-anton)' }}>MEDALLION ARCHITECTURE</span>
          {layer === 3 && <span className="ml-auto text-[9px] text-emerald-400 font-black" style={{ fontFamily: 'var(--font-anton)' }}>COMPLETE ✓</span>}
        </div>
        <div className="flex items-center gap-1.5">
          {MEDALLION_LAYERS.map((l, i) => (
            <div key={l.name} className="flex items-center gap-1.5 flex-1">
              <motion.div
                animate={layer === i ? { boxShadow: [`0 0 0px transparent`, `0 0 12px ${l.color}`, `0 0 0px transparent`] } : {}}
                transition={{ duration: 0.8, repeat: layer === i ? Infinity : 0 }}
                className="flex-1 rounded-lg border p-2 text-center transition-all duration-300"
                style={{ background: layer >= i ? l.bg : 'rgba(255,255,255,0.02)', borderColor: layer >= i ? l.border : 'rgba(255,255,255,0.06)' }}>
                <div className="text-[8px] font-black mb-0.5" style={{ fontFamily: 'var(--font-anton)', color: layer >= i ? l.color : 'rgba(255,255,255,0.2)' }}>
                  {l.name}
                </div>
                <div className="text-[7px] text-white/30 mb-1">{l.desc}</div>
                <div className="text-[10px] font-black" style={{ fontFamily: 'var(--font-anton)', color: layer >= i ? l.color : 'rgba(255,255,255,0.15)' }}>
                  {rows[i].toLocaleString()}
                </div>
                <div className="text-[6px] text-white/20">rows</div>
              </motion.div>
              {i < MEDALLION_LAYERS.length - 1 && (
                <motion.div animate={layer > i ? { opacity: 1 } : { opacity: 0.15 }}
                  className="text-amber-400 text-xs shrink-0">→</motion.div>
              )}
            </div>
          ))}
        </div>
        {layer === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-2 text-center text-[9px] font-black text-amber-400/70" style={{ fontFamily: 'var(--font-anton)' }}>
            150 high-risk patients identified · Gold layer ready for BI
          </motion.div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button onClick={runBatch} disabled={running}
          className="flex items-center gap-1.5 bg-amber-400/15 hover:bg-amber-400/25 disabled:opacity-40 text-amber-300 text-xs font-black px-3 py-1.5 rounded-lg border border-amber-400/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> {running ? 'PROCESSING...' : 'RUN BATCH JOB'}
        </button>
        <span className="text-amber-400/50 text-xs">CarePulse · 10,247 patient records</span>
      </div>
    </div>
  );
}

// ─── PostgreSQL animation ──────────────────────────────────────────────────────
const PG_QUERIES = [
  {
    label: 'SEQ SCAN (no index)',
    query: 'SELECT * FROM stories\nWHERE author_id = 42;',
    plan: [{ op: 'Seq Scan on stories', cost: '0..4821', rows: 1, note: 'filter on author_id' }],
    duration: 4820,
    color: '#ef4444',
  },
  {
    label: 'INDEX SCAN (with GSI)',
    query: 'SELECT * FROM stories\nWHERE author_id = 42;\n-- idx: stories_author_id_idx',
    plan: [
      { op: 'Index Scan (stories_author_id_idx)', cost: '0..8', rows: 1, note: 'index cond: author_id=42' },
    ],
    duration: 8,
    color: '#34d399',
  },
] as const;

function PostgreSQLDiagram() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<Record<number, number>>({});
  const [done, setDone] = useState<Record<number, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runQuery = (idx: number) => {
    if (activeIdx !== null) return;
    const target = PG_QUERIES[idx].duration;
    const step = target > 1000 ? 120 : 6;
    setActiveIdx(idx);
    setDone(prev => ({ ...prev, [idx]: false }));
    setElapsed(prev => ({ ...prev, [idx]: 0 }));
    let acc = 0;
    timerRef.current = setInterval(() => {
      acc += step;
      setElapsed(prev => ({ ...prev, [idx]: acc }));
      if (acc >= target) {
        clearInterval(timerRef.current!);
        setElapsed(prev => ({ ...prev, [idx]: target }));
        setDone(prev => ({ ...prev, [idx]: true }));
        setActiveIdx(null);
      }
    }, step > 50 ? 80 : 10);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  return (
    <div className="space-y-3">
      {PG_QUERIES.map((q, idx) => (
        <div key={idx} className="rounded-xl border border-white/8 bg-black/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <TechLogo slug="postgresql" alt="PostgreSQL" size={13} />
              <span className="text-[9px] font-black" style={{ fontFamily: 'var(--font-anton)', color: q.color }}>{q.label}</span>
            </div>
            {done[idx] && (
              <span className="text-[9px] font-black" style={{ fontFamily: 'var(--font-anton)', color: q.color }}>
                {q.duration >= 1000 ? `${(q.duration / 1000).toFixed(1)}s` : `${q.duration}ms`}
              </span>
            )}
            {activeIdx === idx && (
              <span className="text-[9px] text-white/40">
                {(elapsed[idx] / (q.duration > 1000 ? 1000 : 1)).toFixed(q.duration > 1000 ? 2 : 0)}{q.duration > 1000 ? 's' : 'ms'}...
              </span>
            )}
          </div>
          <div className="bg-black/40 rounded px-2 py-1.5 mb-2 font-mono text-[8px] text-white/40 whitespace-pre leading-relaxed border border-white/5">
            {q.query}
          </div>
          {/* EXPLAIN plan */}
          {(done[idx] || activeIdx === idx) && (
            <div className="bg-black/30 rounded px-2 py-1.5 mb-2 border border-white/5">
              {q.plan.map((p, pi) => (
                <motion.div key={pi} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-[8px] font-mono space-y-0.5">
                  <div style={{ color: q.color }}>{p.op}</div>
                  <div className="text-white/30">cost={p.cost}  rows={p.rows}</div>
                  <div className="text-white/20 italic">{p.note}</div>
                </motion.div>
              ))}
            </div>
          )}
          {(activeIdx === idx || done[idx]) && (
            <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: q.color }}
                animate={{ width: done[idx] ? '100%' : `${Math.min(((elapsed[idx] ?? 0) / q.duration) * 100, 99)}%` }}
                transition={{ duration: 0.08 }} />
            </div>
          )}
          <button onClick={() => runQuery(idx)} disabled={activeIdx !== null}
            className="mt-2 flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded border transition-colors disabled:opacity-40"
            style={{ fontFamily: 'var(--font-anton)', color: q.color, borderColor: `${q.color}40`, background: `${q.color}10` }}>
            <ChevronRight className="w-3 h-3" /> {activeIdx === idx ? 'RUNNING...' : done[idx] ? 'RUN AGAIN' : 'EXPLAIN ANALYZE'}
          </button>
        </div>
      ))}
      {done[0] && done[1] && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center text-[9px] font-black text-emerald-400 py-1" style={{ fontFamily: 'var(--font-anton)' }}>
          INDEX SCAN IS 600x FASTER — same query, right schema design
        </motion.div>
      )}
    </div>
  );
}

// ─── Grafana diagram ──────────────────────────────────────────────────────────
const GRAFANA_PANELS = [
  { title: 'GPU Utilization', color: '#34d399', unit: '%' },
  { title: 'Inference Latency', color: '#60a5fa', unit: 'ms' },
  { title: 'Cost/hr', color: '#fbbf24', unit: '$' },
] as const;

function GrafanaDiagram() {
  const [animKey, setAnimKey] = useState(0);
  const [panelData, setPanelData] = useState<number[][]>([[], [], []]);

  const generate = () => {
    return GRAFANA_PANELS.map((_, pi) =>
      Array.from({ length: 12 }, () => {
        if (pi === 0) return 40 + Math.random() * 55;
        if (pi === 1) return 20 + Math.random() * 180;
        return 0.8 + Math.random() * 3.2;
      })
    );
  };

  useEffect(() => {
    setPanelData(generate());
  }, [animKey]);

  const refresh = () => setAnimKey(k => k + 1);

  return (
    <div className="space-y-3">
      {GRAFANA_PANELS.map((panel, pi) => {
        const data = panelData[pi] ?? [];
        const W = 240, H = 48;
        const max = data.length > 0 ? Math.max(...data) : 1;
        const min = data.length > 0 ? Math.min(...data) : 0;
        const range = max - min || 1;
        const pts = data.map((v, i) => `${data.length > 1 ? (i / (data.length - 1)) * W : W / 2},${H - ((v - min) / range) * (H - 6) - 3}`).join(' ');
        const fillPts = data.length > 1 ? `${pts} ${W},${H} 0,${H}` : '';
        const lastVal = data[data.length - 1];
        return (
          <div key={pi} className="rounded-lg border border-white/8 bg-black/30 p-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-black tracking-wider" style={{ fontFamily: 'var(--font-anton)', color: panel.color }}>{panel.title}</span>
              {lastVal !== undefined && (
                <span className="text-[10px] font-black" style={{ fontFamily: 'var(--font-anton)', color: panel.color }}>
                  {pi === 2 ? `$${lastVal.toFixed(2)}` : `${Math.round(lastVal)}${panel.unit}`}
                </span>
              )}
            </div>
            <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ height: 48 }}>
              {[0.25, 0.5, 0.75].map(f => (
                <line key={f} x1={0} y1={H * f} x2={W} y2={H * f} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
              ))}
              {data.length > 1 && (
                <>
                  <motion.polygon key={`fill-${animKey}-${pi}`} fill={`${panel.color}18`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
                    points={fillPts} />
                  <motion.polyline key={`line-${animKey}-${pi}`} fill="none" stroke={panel.color} strokeWidth={1.5}
                    strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    points={pts} />
                  <circle cx={(data.length - 1) / (data.length - 1) * W} cy={H - ((data[data.length - 1] - min) / range) * (H - 6) - 3} r={3} fill={panel.color} />
                </>
              )}
            </svg>
          </div>
        );
      })}
      <div className="flex items-center justify-between">
        <button onClick={refresh}
          className="flex items-center gap-1.5 bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 text-xs font-black px-3 py-1.5 rounded-lg border border-amber-400/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> REFRESH
        </button>
        <span className="text-amber-400/50 text-xs">AllyIn.ai H100/L40S fleet</span>
      </div>
    </div>
  );
}

// ─── ClickHouse diagram ───────────────────────────────────────────────────────
const CH_COLUMNS = ['timestamp', 'gpu_id', 'sm_occ', 'mem_bw', 'cost_hr'] as const;
const CH_ROWS = [
  ['2025-01-01 00:00', 'H100-01', '87%', '412 GB/s', '$3.20'],
  ['2025-01-01 00:01', 'H100-02', '91%', '398 GB/s', '$3.20'],
  ['2025-01-01 00:02', 'L40S-01', '54%', '201 GB/s', '$1.80'],
  ['2025-01-01 00:03', 'H100-01', '89%', '405 GB/s', '$3.20'],
  ['2025-01-01 00:04', 'L40S-02', '62%', '215 GB/s', '$1.80'],
];

function ClickHouseDiagram() {
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [highlightCols, setHighlightCols] = useState<number[]>([]);
  const [dimRows, setDimRows] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [mode, setMode] = useState<'columnar' | 'sequential'>('columnar');

  const runQuery = () => {
    if (phase === 'scanning') return;
    setPhase('scanning');
    setHighlightCols([]);
    setDimRows([]);
    setResult(null);
    // Highlight WHERE condition cols (sm_occ = index 2, gpu_id = index 1)
    setTimeout(() => setHighlightCols([1, 2]), 400);
    // Fade non-matching rows (rows where sm_occ < 85 → indices 2,4)
    setTimeout(() => setDimRows([2, 4]), 900);
    const timing = mode === 'columnar' ? '23ms' : '4.8s';
    setTimeout(() => {
      setResult(`Result: 2.1M rows in ${timing}`);
      setPhase('done');
    }, mode === 'columnar' ? 1200 : 2400);
  };

  const toggleMode = () => {
    setMode(m => m === 'columnar' ? 'sequential' : 'columnar');
    setPhase('idle');
    setHighlightCols([]);
    setDimRows([]);
    setResult(null);
  };

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-white/8 bg-black/30 p-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 mb-2">
          <TechLogo slug="clickhouse" alt="ClickHouse" size={14} />
          <span className="text-[9px] font-black text-amber-400" style={{ fontFamily: 'var(--font-anton)' }}>gpu_metrics · 2.1M rows</span>
          <span className="ml-auto text-[9px] text-white/30">{mode === 'columnar' ? 'COLUMNAR SCAN' : 'SEQUENTIAL SCAN'}</span>
        </div>
        <div className="font-mono text-[7px]">
          {/* Header */}
          <div className="flex gap-0 mb-1">
            {CH_COLUMNS.map((col, ci) => (
              <div key={ci} className="px-1.5 py-0.5 text-center transition-all duration-300"
                style={{
                  minWidth: ci === 0 ? 90 : 60,
                  background: highlightCols.includes(ci) ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.05)',
                  color: highlightCols.includes(ci) ? '#fbbf24' : 'rgba(255,255,255,0.4)',
                  borderBottom: `1px solid ${highlightCols.includes(ci) ? 'rgba(251,191,36,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  fontWeight: 700,
                }}>
                {col}
              </div>
            ))}
          </div>
          {/* Rows */}
          {CH_ROWS.map((row, ri) => (
            <motion.div key={ri} animate={{ opacity: dimRows.includes(ri) ? 0.15 : 1 }}
              transition={{ duration: 0.4 }} className="flex gap-0">
              {row.map((cell, ci) => (
                <div key={ci} className="px-1.5 py-0.5 text-center transition-all duration-300"
                  style={{
                    minWidth: ci === 0 ? 90 : 60,
                    color: highlightCols.includes(ci) ? '#fbbf24' : 'rgba(255,255,255,0.3)',
                    background: highlightCols.includes(ci) ? 'rgba(251,191,36,0.05)' : 'transparent',
                  }}>
                  {cell}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
        {result && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-[9px] font-black px-2 py-1 rounded border"
            style={{
              fontFamily: 'var(--font-anton)',
              color: mode === 'columnar' ? '#34d399' : '#ef4444',
              borderColor: mode === 'columnar' ? 'rgba(52,211,153,0.3)' : 'rgba(239,68,68,0.3)',
              background: mode === 'columnar' ? 'rgba(52,211,153,0.08)' : 'rgba(239,68,68,0.08)',
            }}>
            {result}
          </motion.div>
        )}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <button onClick={runQuery} disabled={phase === 'scanning'}
          className="flex items-center gap-1.5 bg-amber-400/15 hover:bg-amber-400/25 disabled:opacity-40 text-amber-300 text-xs font-black px-3 py-1.5 rounded-lg border border-amber-400/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> RUN QUERY
        </button>
        <button onClick={toggleMode}
          className="flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-lg border transition-colors"
          style={{
            fontFamily: 'var(--font-anton)',
            color: mode === 'columnar' ? '#60a5fa' : '#fbbf24',
            borderColor: mode === 'columnar' ? 'rgba(96,165,250,0.3)' : 'rgba(251,191,36,0.3)',
            background: mode === 'columnar' ? 'rgba(96,165,250,0.08)' : 'rgba(251,191,36,0.08)',
          }}>
          SWITCH: {mode === 'columnar' ? 'SEQUENTIAL' : 'COLUMNAR'}
        </button>
        <span className="text-amber-400/40 text-[9px] ml-auto">columnar: 23ms · seq: 4.8s</span>
      </div>
    </div>
  );
}

// ─── LangGraph diagram ────────────────────────────────────────────────────────
const LG_NODES = ['START', 'REASON', 'TOOL USE', 'REFLECT', 'END'] as const;
type LGNode = typeof LG_NODES[number];
const LG_EDGES: [LGNode, LGNode][] = [
  ['START', 'REASON'],
  ['REASON', 'TOOL USE'],
  ['TOOL USE', 'REFLECT'],
  ['REFLECT', 'REASON'],
  ['REFLECT', 'END'],
];
const LG_COLORS: Record<LGNode, string> = {
  START: '#34d399',
  REASON: '#fbbf24',
  'TOOL USE': '#60a5fa',
  REFLECT: '#a78bfa',
  END: '#34d399',
};

function LangGraphDiagram() {
  const [activeNode, setActiveNode] = useState<LGNode | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<LGNode[]>([]);
  const [running, setRunning] = useState(false);
  const [loopCount, setLoopCount] = useState(0);

  const runAgent = () => {
    if (running) return;
    setRunning(true);
    setActiveNode(null);
    setVisitedNodes([]);
    setLoopCount(0);

    // Path: START → REASON → TOOL USE → REFLECT → REASON → TOOL USE → REFLECT → END
    const path: LGNode[] = ['START', 'REASON', 'TOOL USE', 'REFLECT', 'REASON', 'TOOL USE', 'REFLECT', 'END'];
    let loopsSeen = 0;
    path.forEach((node, i) => {
      setTimeout(() => {
        setActiveNode(node);
        setVisitedNodes(prev => prev.includes(node) ? prev : [...prev, node]);
        if (node === 'REASON' && i > 0) { loopsSeen++; setLoopCount(loopsSeen); }
        if (i === path.length - 1) { setTimeout(() => setRunning(false), 600); }
      }, i * 700);
    });
  };

  // Node positions for a simple flow layout
  const nodePositions: Record<LGNode, { x: number; y: number }> = {
    START:      { x: 40,  y: 80 },
    REASON:     { x: 120, y: 80 },
    'TOOL USE': { x: 200, y: 80 },
    REFLECT:    { x: 280, y: 80 },
    END:        { x: 360, y: 80 },
  };

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-white/8 bg-black/30 p-3">
        <div className="flex items-center gap-1.5 mb-3">
          <TechLogo slug="langchain" alt="LangGraph" size={14} />
          <span className="text-[9px] font-black text-purple-400" style={{ fontFamily: 'var(--font-anton)' }}>LANGGRAPH AGENT</span>
          {loopCount > 0 && <span className="ml-auto text-[9px] text-amber-400/60">loops: {loopCount}</span>}
        </div>
        <svg width="100%" viewBox="0 0 400 160" style={{ height: 100 }}>
          {/* Edges */}
          {LG_EDGES.map(([from, to], i) => {
            const fp = nodePositions[from], tp = nodePositions[to];
            const isLoop = from === 'REFLECT' && to === 'REASON';
            if (isLoop) {
              return (
                <path key={i}
                  d={`M ${fp.x} ${fp.y} C ${fp.x} 130, ${tp.x} 130, ${tp.x} ${tp.y}`}
                  fill="none" stroke="rgba(167,139,250,0.3)" strokeWidth={1.5}
                  strokeDasharray="4 3" />
              );
            }
            return (
              <line key={i} x1={fp.x} y1={fp.y} x2={tp.x} y2={tp.y}
                stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
            );
          })}
          {/* Nodes */}
          {LG_NODES.map(node => {
            const pos = nodePositions[node];
            const isActive = activeNode === node;
            const isVisited = visitedNodes.includes(node);
            const color = LG_COLORS[node];
            return (
              <g key={node}>
                <motion.circle cx={pos.x} cy={pos.y} r={20}
                  fill={isActive ? `${color}30` : isVisited ? `${color}15` : 'rgba(255,255,255,0.04)'}
                  stroke={isActive ? color : isVisited ? `${color}60` : 'rgba(255,255,255,0.12)'}
                  strokeWidth={isActive ? 2 : 1}
                  animate={isActive ? { r: [20, 22, 20] } : { r: 20 }}
                  transition={{ duration: 0.4, repeat: isActive ? Infinity : 0 }}
                />
                <text x={pos.x} y={pos.y - 2} textAnchor="middle" dominantBaseline="middle"
                  fontSize={6} fontWeight="700"
                  style={{ fontFamily: 'var(--font-anton)', fill: isActive ? color : isVisited ? `${color}90` : 'rgba(255,255,255,0.3)' }}>
                  {node.split(' ')[0]}
                </text>
                {node.includes(' ') && (
                  <text x={pos.x} y={pos.y + 6} textAnchor="middle" dominantBaseline="middle"
                    fontSize={6} fontWeight="700"
                    style={{ fontFamily: 'var(--font-anton)', fill: isActive ? color : isVisited ? `${color}90` : 'rgba(255,255,255,0.3)' }}>
                    {node.split(' ')[1]}
                  </text>
                )}
              </g>
            );
          })}
          {/* Loop label */}
          <text x={200} y={148} textAnchor="middle" fontSize={7} fill="rgba(167,139,250,0.4)"
            style={{ fontFamily: 'var(--font-rajdhani)' }}>loop back if uncertain</text>
        </svg>
        {activeNode && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[9px] font-black text-center mt-1"
            style={{ fontFamily: 'var(--font-anton)', color: LG_COLORS[activeNode] }}>
            {activeNode === 'REASON' && 'REASONING...'}
            {activeNode === 'TOOL USE' && 'CALLING TOOL...'}
            {activeNode === 'REFLECT' && (loopCount < 2 ? 'UNCERTAIN — LOOPING BACK' : 'CONFIDENT — EXITING')}
            {activeNode === 'START' && 'AGENT STARTING'}
            {activeNode === 'END' && 'TASK COMPLETE ✓'}
          </motion.div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button onClick={runAgent} disabled={running}
          className="flex items-center gap-1.5 bg-purple-500/15 hover:bg-purple-500/25 disabled:opacity-40 text-purple-300 text-xs font-black px-3 py-1.5 rounded-lg border border-purple-500/25 transition-colors"
          style={{ fontFamily: 'var(--font-anton)' }}>
          <ChevronRight className="w-3 h-3" /> {running ? 'RUNNING...' : 'RUN AGENT'}
        </button>
        <span className="text-amber-400/50 text-xs">stateful · cyclical · autonomous</span>
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
    case 'redis':       return <RedisDiagram />;
    case 'airflow':     return <AirflowDiagram />;
    case 'fastapi':     return <FastAPIDiagram />;
    case 'prometheus':  return <PrometheusDiagram />;
    case 'influxdb':    return <InfluxDBDiagram />;
    case 'celery':      return <CeleryDiagram />;
    case 'terraform':   return <TerraformDiagram />;
    case 'databricks':  return <DatabricksDiagram />;
    case 'postgresql':  return <PostgreSQLDiagram />;
    case 'grafana':     return <GrafanaDiagram />;
    case 'clickhouse':  return <ClickHouseDiagram />;
    case 'langgraph':   return <LangGraphDiagram />;
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

// ─── Shimmer skeleton ─────────────────────────────────────────────────────────
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-xl overflow-hidden relative ${className}`}
      style={{ background: 'rgba(255,255,255,0.04)' }}>
      <motion.div className="absolute inset-0"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', repeatDelay: 0.3 }}
        style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(251,191,36,0.08) 50%, transparent 70%)' }} />
    </div>
  );
}

// ─── TacticalBoard ────────────────────────────────────────────────────────────
export default function TacticalBoard() {
  const [selected, setSelected] = useState<ConceptId>('kafka');
  const [mounted, setMounted] = useState(false);
  const concept = CONCEPTS.find(c => c.id === selected)!;

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-16" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-32" />)}
        </div>
        <Skeleton className="h-48" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
        <div className="text-xs font-black tracking-widest text-amber-400 mb-0.5" style={{ fontFamily: 'var(--font-anton)' }}>
          TACTICAL PLAYBOOK
        </div>
        <p className="text-amber-100/55 text-xs" style={{ fontFamily: 'var(--font-rajdhani)' }}>
          Eighteen technologies I&apos;ve run in production, broken down like match tactics. Pick a card and interact with the live demo.
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
