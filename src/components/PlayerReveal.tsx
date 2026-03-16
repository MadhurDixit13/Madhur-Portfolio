'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlayerRevealProps {
  onRevealComplete: () => void;
}

type Phase = 'pack' | 'shake' | 'flash' | 'cards' | 'flipping' | 'spotlight' | 'complete';

// Common silver cards that get revealed before the gold
const SILVER_CARDS = [
  { rating: 71, pos: 'DEF', name: 'SYSTEMS ENG' },
  { rating: 68, pos: 'GKP', name: 'DEVOPS SPC' },
  { rating: 74, pos: 'MID', name: 'CLOUD ARCH' },
  { rating: 66, pos: 'FWD', name: 'FULLSTACK' },
];

// ─── Card Back ────────────────────────────────────────────────────────────────
function CardBack() {
  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #0d1b2a 0%, #162338 50%, #0d1b2a 100%)' }}>
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 10px,rgba(255,255,255,0.07) 10px,rgba(255,255,255,0.07) 11px),' +
            'repeating-linear-gradient(90deg,transparent,transparent 10px,rgba(255,255,255,0.07) 10px,rgba(255,255,255,0.07) 11px)',
        }} />
      {/* Center diamond */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-amber-400/50 rotate-45" />
        <div className="absolute w-5 h-5 border border-amber-400/30 rotate-45" />
      </div>
      {/* Gold border */}
      <div className="absolute inset-0 rounded-xl border border-amber-400/40" />
    </div>
  );
}

// ─── Silver Card ──────────────────────────────────────────────────────────────
function SilverCard({ rating, pos, name }: { rating: number; pos: string; name: string }) {
  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #b8bec7 0%, #9aa0aa 40%, #727880 100%)' }}>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
      {/* Diagonal texture */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'repeating-linear-gradient(55deg,transparent,transparent 3px,rgba(0,0,0,0.1) 3px,rgba(0,0,0,0.1) 5px)' }} />
      <div className="absolute inset-[7%] rounded-lg"
        style={{ background: 'linear-gradient(160deg, #2a2d35 0%, #1a1d22 100%)' }} />
      <div className="absolute inset-[7%] flex flex-col p-[8%]">
        <div>
          <div className="font-black text-gray-300 leading-none"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(18px, 3.5vw, 26px)' }}>{rating}</div>
          <div className="text-gray-400 font-bold mt-0.5"
            style={{ fontSize: 'clamp(6px, 1vw, 9px)' }}>{pos}</div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="rounded-lg bg-gray-700/40 flex items-center justify-center text-gray-500"
            style={{ width: '55%', aspectRatio: '1/1.2', fontSize: '1.5em' }}>👤</div>
        </div>
        <div className="text-center">
          <div className="text-gray-300 font-black truncate"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(5px, 0.9vw, 7px)', letterSpacing: '0.05em' }}>{name}</div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-xl border border-white/20" />
    </div>
  );
}

// ─── Gold Card (Madhur's card) ────────────────────────────────────────────────
function GoldCardFront({ glowing }: { glowing: boolean }) {
  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #f8c700 0%, #d4a017 30%, #b8860b 60%, #8b6914 100%)' }}>
      {/* Texture */}
      <div className="absolute inset-0 opacity-25"
        style={{ backgroundImage: 'repeating-linear-gradient(55deg,transparent,transparent 3px,rgba(255,255,255,0.08) 3px,rgba(255,255,255,0.08) 5px)' }} />
      {/* Shine sweep */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent" />
      {/* Dark inner area */}
      <div className="absolute inset-[6%] rounded-[0.5rem]"
        style={{ background: 'linear-gradient(160deg, #1a1205 0%, #0d0a05 100%)' }} />

      {/* Content — mirrors silver card structure: rating/pos top-left, photo, name bottom */}
      <div className="absolute inset-[6%] flex flex-col p-[8%]">
        {/* Rating + position */}
        <div>
          <div className="font-black text-amber-100 leading-none"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(18px, 3.5vw, 26px)' }}>93</div>
          <div className="text-amber-300 font-bold mt-0.5"
            style={{ fontSize: 'clamp(7px, 1vw, 9px)' }}>ENG</div>
        </div>

        {/* Photo — flex-1 so it fills remaining space without pushing name out */}
        <div className="flex-1 relative rounded overflow-hidden mt-[3%]" style={{ minHeight: 0 }}>
          <div className="absolute inset-0 bg-cover bg-top"
            style={{ backgroundImage: "url('/madhur-photo.jpg')" }} />
        </div>

        {/* Name */}
        <div className="text-center mt-[4%] shrink-0">
          <div className="font-black text-amber-100"
            style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(7px, 1.4vw, 11px)', letterSpacing: '0.02em' }}>
            MADHUR DIXIT
          </div>
        </div>
      </div>

      {/* Glow pulse when spotlit */}
      {glowing && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,215,0,0.5) 0%, transparent 70%)' }}
        />
      )}
    </div>
  );
}

// ─── Single Flip Card ─────────────────────────────────────────────────────────
function FlipCard({
  flipped, isGold, silverIndex, spotlit, cardW, cardH,
}: {
  flipped: boolean; isGold: boolean; silverIndex: number;
  spotlit: boolean; cardW: number; cardH: number;
}) {
  return (
    <div style={{ width: cardW, height: cardH, perspective: 900, flexShrink: 0 }}>
      <motion.div
        style={{
          position: 'relative', width: '100%', height: '100%',
          transformStyle: 'preserve-3d',
          transform: `rotateY(${flipped ? '180deg' : '0deg'})`,
          transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        {/* Back face */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden' }}>
          <CardBack />
        </div>
        {/* Front face */}
        <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          {isGold
            ? <GoldCardFront glowing={spotlit} />
            : <SilverCard {...SILVER_CARDS[silverIndex]} />}
        </div>
      </motion.div>

      {/* Spotlight ring */}
      {isGold && spotlit && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ boxShadow: '0 0 60px 20px rgba(251,191,36,0.6), 0 0 120px 40px rgba(251,191,36,0.2)' }}
        />
      )}
    </div>
  );
}

// ─── Confetti burst ───────────────────────────────────────────────────────────
const CONFETTI_COLORS = ['#fbbf24', '#f59e0b', '#ffffff', '#34d399', '#60a5fa', '#f472b6', '#a78bfa'];
type ConfettiPiece = { x: number; y: number; a: number; size: number; delay: number; color: string; rect: boolean; rot: number };

function GoldBurst({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      setPieces(Array.from({ length: 90 }, () => ({
        x: 40 + Math.random() * 20,
        y: 30 + Math.random() * 25,
        a: Math.random() * 360,
        size: Math.random() * 6 + 3,
        delay: Math.random() * 0.5,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rect: Math.random() > 0.45,
        rot: Math.random() * 360,
      })));
    }
  }, [active]);

  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((p, i) => {
        const dist = 100 + Math.random() * 160;
        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.rect ? p.size * 1.8 : p.size,
              height: p.rect ? p.size * 0.7 : p.size,
              borderRadius: p.rect ? 1 : '50%',
              background: p.color,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            animate={{
              x: Math.cos((p.a * Math.PI) / 180) * dist,
              y: Math.sin((p.a * Math.PI) / 180) * dist + 40,
              opacity: 0,
              scale: 0,
              rotate: p.rot,
            }}
            transition={{ duration: 1.0 + Math.random() * 0.8, delay: p.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PlayerReveal({ onRevealComplete }: PlayerRevealProps) {
  const [phase, setPhase] = useState<Phase>('pack');
  const [flipped, setFlipped] = useState([false, false, false, false, false]);
  const [spotlit, setSpotlit] = useState(false);
  const [burst, setBurst] = useState(false);
  const started = useRef(false);

  // Card dimensions — responsive
  const cardW = typeof window !== 'undefined' && window.innerWidth < 480 ? 62 : 82;
  const cardH = Math.round(cardW * 1.42);

  const startReveal = () => {
    if (started.current) return;
    started.current = true;

    // Shake pack
    setPhase('shake');

    // Flash
    setTimeout(() => setPhase('flash'), 1100);

    // Cards slide in
    setTimeout(() => setPhase('cards'), 1700);

    // Flip each card — 800ms apart, starting at 2600ms
    const FLIP_START = 2600;
    const FLIP_GAP = 900;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        setFlipped(prev => { const n = [...prev]; n[i] = true; return n; });
        if (i === 4) {
          // Gold card flipped — spotlight + burst
          setTimeout(() => {
            setPhase('spotlight');
            setSpotlit(true);
            setBurst(true);
          }, 700);
        }
      }, FLIP_START + i * FLIP_GAP);
    }

    // Complete — transition to portfolio
    const COMPLETE_AT = FLIP_START + 4 * FLIP_GAP + 700 + 3200;
    setTimeout(() => setPhase('complete'), COMPLETE_AT);
    setTimeout(onRevealComplete, COMPLETE_AT + 1400);
  };

  // Fan positions for 5 cards
  const cardPositions = [
    { rotate: -10, y: -8 },
    { rotate: -5,  y: -4 },
    { rotate:  0,  y:  0 },
    { rotate:  5,  y: -4 },
    { rotate: 10,  y: -8 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{ background: '#020408' }}>

      {/* Stadium light beams */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[25%] w-px h-3/4 opacity-15 rotate-6"
          style={{ background: 'linear-gradient(to bottom, #fbbf24, transparent)', filter: 'blur(1px)' }} />
        <div className="absolute top-0 left-[50%] w-[2px] h-4/5 opacity-25 -rotate-2"
          style={{ background: 'linear-gradient(to bottom, #fbbf24, transparent)', filter: 'blur(2px)' }} />
        <div className="absolute top-0 right-[25%] w-px h-3/4 opacity-15 -rotate-6"
          style={{ background: 'linear-gradient(to bottom, #fbbf24, transparent)', filter: 'blur(1px)' }} />
        {/* Ambient pool */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full"
          animate={{ opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ background: 'radial-gradient(ellipse, rgba(251,191,36,0.15) 0%, transparent 70%)' }}
        />
      </div>

      {/* White flash overlay */}
      <AnimatePresence>
        {phase === 'flash' && (
          <motion.div
            key="flash"
            className="absolute inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, times: [0, 0.2, 0.5, 1] }}
            style={{ background: 'radial-gradient(ellipse at 50% 30%, #fff9e0 0%, #ffd700 40%, transparent 80%)' }}
          />
        )}
      </AnimatePresence>

      {/* Spotlight darkening overlay when gold card is shown */}
      <AnimatePresence>
        {(phase === 'spotlight' || phase === 'complete') && (
          <motion.div
            key="dim"
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'complete' ? 0 : 0.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 25%, #000 80%)' }}
          />
        )}
      </AnimatePresence>

      {/* Burst particles */}
      <GoldBurst active={burst} />

      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* ── PACK PHASE ── */}
        <AnimatePresence mode="wait">
          {(phase === 'pack' || phase === 'shake') && (
            <motion.div
              key="pack-view"
              className="flex flex-col items-center gap-8"
              exit={{ scale: 1.3, opacity: 0, transition: { duration: 0.3 } }}
            >
              {/* The Pack */}
              <motion.div
                style={{ width: 140, height: 200, position: 'relative', borderRadius: 14, cursor: 'pointer' }}
                animate={phase === 'shake'
                  ? { x: [-6, 6, -8, 8, -5, 5, -3, 3, 0], rotate: [-2, 2, -3, 3, -2, 2, 0],
                      scale: [1, 1.04, 1.02, 1.05, 1.02, 1],
                      boxShadow: ['0 0 30px rgba(251,191,36,0.4)', '0 0 80px rgba(251,191,36,0.9)', '0 0 40px rgba(251,191,36,0.6)'] }
                  : { y: [0, -12, 0], rotateY: [0, 4, 0],
                      boxShadow: ['0 0 20px rgba(251,191,36,0.3)', '0 0 45px rgba(251,191,36,0.6)', '0 0 20px rgba(251,191,36,0.3)'] }
                }
                transition={phase === 'shake'
                  ? { duration: 1, ease: 'easeOut' }
                  : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                {/* Pack body */}
                <div className="absolute inset-0 rounded-[14px] overflow-hidden border-2 border-amber-200/60"
                  style={{ background: 'linear-gradient(160deg, #f8c700 0%, #d4a017 35%, #b8860b 65%, #8b6914 100%)' }}>
                  {/* Foil shimmer */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                    style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)' }}
                  />
                  {/* Diagonal lines */}
                  <div className="absolute inset-0 opacity-15"
                    style={{ backgroundImage: 'repeating-linear-gradient(55deg,transparent,transparent 3px,rgba(255,255,255,0.1) 3px,rgba(255,255,255,0.1) 5px)' }} />
                  {/* Inner area */}
                  <div className="absolute inset-[10%] rounded-[8px]"
                    style={{ background: 'linear-gradient(160deg, #1a1205 0%, #0d0a05 100%)' }}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <div className="text-amber-400 font-black tracking-widest"
                        style={{ fontFamily: 'var(--font-anton)', fontSize: 11 }}>ULTIMATE</div>
                      <div className="w-8 h-8 border-2 border-amber-400/60 rotate-45 flex items-center justify-center">
                        <div className="w-4 h-4 border border-amber-300/40 rotate-45" />
                      </div>
                      <div className="text-amber-400 font-black tracking-widest"
                        style={{ fontFamily: 'var(--font-anton)', fontSize: 11 }}>TEAM</div>
                    </div>
                  </div>
                  {/* Tear tab */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-amber-400 rounded-bl-[10px] flex items-center justify-center border-l border-b border-amber-200/50">
                    <div className="w-3 h-3 border border-amber-200/70 rounded-full" />
                  </div>
                  {/* Pulsing border */}
                  <motion.div
                    className="absolute inset-0 rounded-[14px] border border-amber-200/60"
                    animate={{ opacity: [0.3, 0.9, 0.3] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Open button */}
              {phase === 'pack' && (
                <motion.button
                  onClick={startReveal}
                  className="relative overflow-hidden text-black font-black py-3.5 px-10 rounded-xl border-2 border-amber-300/70 shadow-lg shadow-amber-500/25 tracking-widest"
                  style={{
                    fontFamily: 'var(--font-anton)',
                    fontSize: 14,
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  }}
                  whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(251,191,36,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="relative z-10">OPEN PACK</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2 }}
                  />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CARDS PHASE ── */}
        <AnimatePresence>
          {(phase === 'cards' || phase === 'flipping' || phase === 'spotlight' || phase === 'complete') && (
            <motion.div
              key="cards-view"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'complete' ? 0 : 1 }}
              transition={{ duration: phase === 'complete' ? 1.2 : 0.4 }}
            >
              {/* 5 cards in a row */}
              <div className="flex items-end justify-center gap-2 sm:gap-3">
                {[0,1,2,3,4].map(i => {
                  const isGold = i === 4;
                  const { rotate, y } = cardPositions[i];
                  const isSpotlit = spotlit && isGold;
                  const isDimmed = spotlit && !isGold;

                  return (
                    <motion.div
                      key={i}
                      initial={{ y: -160, opacity: 0, rotate: 0 }}
                      animate={{
                        y: isSpotlit ? y - 20 : y,
                        opacity: isDimmed ? 0.25 : 1,
                        rotate: isSpotlit ? 0 : rotate,
                        scale: isSpotlit ? 1.12 : 1,
                        zIndex: isSpotlit ? 20 : 10 - i,
                      }}
                      transition={{
                        delay: i * 0.07,
                        duration: 0.45,
                        ease: 'easeOut',
                        ...(isSpotlit ? { scale: { duration: 0.5 }, y: { duration: 0.5 } } : {}),
                      }}
                    >
                      <FlipCard
                        flipped={flipped[i]}
                        isGold={isGold}
                        silverIndex={i}
                        spotlit={isSpotlit}
                        cardW={cardW}
                        cardH={cardH}
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Spotlight label */}
              <AnimatePresence>
                {phase === 'spotlight' && (
                  <motion.div
                    key="gold-label"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-center"
                  >
                    <motion.div
                      className="font-black tracking-[0.2em] text-amber-300"
                      style={{ fontFamily: 'var(--font-anton)', fontSize: 'clamp(18px, 4vw, 28px)' }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      RARE GOLD CARD
                    </motion.div>
                    <div className="flex justify-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.span key={i} className="text-amber-400"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + i * 0.1 }}>★</motion.span>
                      ))}
                    </div>
                    <motion.div
                      className="text-amber-400/60 font-semibold mt-2"
                      style={{ fontFamily: 'var(--font-rajdhani)', fontSize: 13 }}
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 1 }}
                    >
                      Loading portfolio...
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
