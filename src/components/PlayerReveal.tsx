'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlayerRevealProps {
  onRevealComplete: () => void;
}

// Gold particles — rendered only client-side
function GoldParticles() {
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-400"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.9, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

type Phase =
  | 'pack'
  | 'tear'
  | 'flare'
  | 'location'
  | 'position'
  | 'club'
  | 'walkout'
  | 'card'
  | 'complete';

export default function PlayerReveal({ onRevealComplete }: PlayerRevealProps) {
  const [phase, setPhase] = useState<Phase>('pack');
  const [revealing, setRevealing] = useState(false);

  const startReveal = () => {
    setRevealing(true);
    const timeline: [Phase, number][] = [
      ['tear', 1800],
      ['flare', 3600],
      ['location', 5400],
      ['position', 7200],
      ['club', 9000],
      ['walkout', 10800],
      ['card', 12600],
      ['complete', 14400],
    ];
    timeline.forEach(([p, ms]) => setTimeout(() => setPhase(p), ms));
    setTimeout(() => onRevealComplete(), 17200);
  };

  return (
    <div className="min-h-screen bg-[#020408] relative overflow-hidden flex items-center justify-center">
      {/* Stadium light beams */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-amber-400/20 to-transparent rotate-6 blur-sm" />
        <div className="absolute top-0 left-1/2 w-2 h-full bg-gradient-to-b from-amber-300/30 to-transparent -rotate-3 blur-sm" />
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-amber-400/20 to-transparent -rotate-6 blur-sm" />
        <div className="absolute top-0 left-1/3 w-px h-2/3 bg-gradient-to-b from-white/10 to-transparent rotate-2 blur-[2px]" />
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      {revealing && <GoldParticles />}

      <div className="relative z-10 text-center px-6">
        <AnimatePresence mode="wait">

          {phase === 'pack' && (
            <motion.div
              key="pack"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.15, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              {/* Premium Gold Pack */}
              <motion.div
                className="w-36 h-52 mx-auto relative cursor-pointer"
                animate={{
                  y: [0, -12, 0],
                  rotateY: [0, 8, 0],
                  boxShadow: [
                    '0 0 30px rgba(251,191,36,0.4)',
                    '0 0 60px rgba(251,191,36,0.8)',
                    '0 0 30px rgba(251,191,36,0.4)',
                  ],
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ borderRadius: 12, perspective: 600 }}
              >
                {/* Pack body */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 border-2 border-amber-200/60" />
                {/* Shine stripe */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                {/* Inner card preview */}
                <div className="absolute inset-3 rounded-lg bg-gradient-to-b from-yellow-700 to-yellow-900 shadow-inner flex flex-col items-center justify-center gap-1">
                  <div className="text-amber-200 text-3xl">⚡</div>
                  <div className="text-amber-300 text-[10px] font-bold tracking-widest">GOLD</div>
                </div>
                {/* Tear tab */}
                <div className="absolute top-0 right-0 w-7 h-7 bg-amber-400 rounded-bl-xl flex items-center justify-center">
                  <div className="w-3 h-3 border border-amber-200 rounded-full" />
                </div>
                {/* Pulsing border */}
                <motion.div
                  className="absolute inset-0 rounded-xl border border-amber-200/50"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              </motion.div>

              <motion.button
                onClick={startReveal}
                className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black py-4 px-10 rounded-xl transition-all duration-200 border-2 border-amber-300/60 tracking-widest text-sm shadow-lg shadow-amber-500/30"
                style={{ fontFamily: 'var(--font-anton)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(251,191,36,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">OPEN GOLD PACK</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </motion.button>
            </motion.div>
          )}

          {phase === 'tear' && (
            <motion.div
              key="tear"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1.2], rotateY: [0, 10, 20] }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="space-y-6"
            >
              <div className="w-36 h-52 mx-auto relative" style={{ perspective: 600 }}>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 border-2 border-amber-200/60" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <motion.div
                  className="absolute inset-3 rounded-lg bg-gradient-to-b from-yellow-600 to-yellow-800"
                  animate={{ y: [-2, -8, -2], scale: [1, 1.04, 1] }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-3xl">⚡</div>
                </motion.div>
              </div>
              <motion.div
                className="text-amber-300 font-bold tracking-widest text-sm"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                TEARING OPEN...
              </motion.div>
            </motion.div>
          )}

          {phase === 'flare' && (
            <motion.div
              key="flare"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 3, 2.5], opacity: [0, 1, 0.8] }}
              exit={{ scale: 5, opacity: 0 }}
              transition={{ duration: 1.8 }}
              className="w-64 h-64 rounded-full flex items-center justify-center"
              style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.9) 0%, rgba(251,191,36,0.4) 40%, transparent 70%)' }}
            >
              <span className="text-7xl">🏆</span>
            </motion.div>
          )}

          {phase === 'location' && (
            <motion.div
              key="location"
              initial={{ scale: 0.5, rotateY: 180, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="space-y-4"
            >
              <motion.div
                className="text-7xl"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >🇺🇸</motion.div>
              <div className="text-3xl font-black text-amber-300 tracking-widest" style={{ fontFamily: 'var(--font-anton)' }}>
                SAN JOSE, CA
              </div>
              <div className="text-amber-400/70 text-sm tracking-widest font-semibold">CURRENT LOCATION</div>
            </motion.div>
          )}

          {phase === 'position' && (
            <motion.div
              key="position"
              initial={{ x: 120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -120, opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="space-y-4"
            >
              <div className="text-6xl">⚡</div>
              <div className="text-3xl font-black text-amber-300 tracking-widest" style={{ fontFamily: 'var(--font-anton)' }}>
                PRODUCT SOFTWARE
              </div>
              <div className="text-2xl font-black text-amber-200 tracking-widest" style={{ fontFamily: 'var(--font-anton)' }}>
                DEVELOPER
              </div>
              <div className="text-amber-400/70 text-sm tracking-widest font-semibold">POSITION</div>
            </motion.div>
          )}

          {phase === 'club' && (
            <motion.div
              key="club"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.3, opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="space-y-4"
            >
              <motion.div
                className="text-5xl"
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >⚡</motion.div>
              <div className="text-3xl font-black text-amber-300 tracking-widest" style={{ fontFamily: 'var(--font-anton)' }}>
                RUNARA.AI
              </div>
              <div className="text-amber-400/70 text-sm tracking-widest font-semibold">CURRENT CLUB</div>
            </motion.div>
          )}

          {phase === 'walkout' && (
            <motion.div
              key="walkout"
              initial={{ x: '60vw', scale: 0.8, opacity: 0 }}
              animate={{ x: 0, scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="space-y-5"
            >
              <div className="text-7xl">👨‍💻</div>
              <div className="text-4xl font-black text-amber-300 tracking-widest" style={{ fontFamily: 'var(--font-anton)' }}>
                MADHUR DIXIT
              </div>
              <div className="text-amber-400/70 text-sm tracking-widest font-semibold">ENTERING THE FIELD</div>
            </motion.div>
          )}

          {phase === 'card' && (
            <motion.div
              key="card"
              initial={{ scale: 0.1, rotateX: 90, y: -80, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, y: 0, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            >
              {/* Mini FIFA card */}
              <div className="relative w-52 h-72 mx-auto rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-[0_0_60px_rgba(251,191,36,0.5)]">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent" />
                {/* Rating */}
                <div className="absolute top-3 left-3 text-black">
                  <div className="text-4xl font-black leading-none" style={{ fontFamily: 'var(--font-anton)' }}>93</div>
                  <div className="text-xs font-bold tracking-wider mt-0.5">ENG</div>
                  <div className="text-base mt-0.5">🇮🇳</div>
                </div>
                {/* HERO badge */}
                <div className="absolute top-3 right-3 bg-black/40 rounded px-1.5 py-0.5">
                  <div className="text-amber-300 text-[9px] font-black tracking-widest">BUILDER</div>
                </div>
                {/* Photo */}
                <div className="absolute inset-x-0 top-0 bottom-16 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/madhur-photo.jpg')", backgroundPosition: 'center 15%' }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                {/* Stats row */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-around px-2 text-black">
                  {[['95','TEC'],['94','SOL'],['93','INV'],['91','COM'],['88','LED']].map(([v,l]) => (
                    <div key={l} className="text-center">
                      <div className="text-sm font-black leading-none" style={{ fontFamily: 'var(--font-anton)' }}>{v}</div>
                      <div className="text-[8px] font-bold">{l}</div>
                    </div>
                  ))}
                </div>
                {/* Name */}
                <div className="absolute bottom-1 left-0 right-0 text-center">
                  <div className="text-black text-xs font-black tracking-[0.15em]" style={{ fontFamily: 'var(--font-anton)' }}>MADHUR DIXIT</div>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-5"
            >
              <motion.div
                className="text-7xl"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >🏆</motion.div>
              <div className="text-3xl font-black text-amber-300 tracking-widest" style={{ fontFamily: 'var(--font-anton)' }}>
                GOLD CARD REVEALED
              </div>
              <motion.div
                className="text-amber-400/60 text-sm tracking-widest"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                LOADING PORTFOLIO...
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
