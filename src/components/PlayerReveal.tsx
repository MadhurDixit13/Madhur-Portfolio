'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface PlayerRevealProps {
  onRevealComplete: () => void;
}

export default function PlayerReveal({ onRevealComplete }: PlayerRevealProps) {
  const [phase, setPhase] = useState<'pack' | 'tear' | 'flare' | 'location' | 'position' | 'club' | 'walkout' | 'card' | 'complete'>('pack');
  const [isRevealing, setIsRevealing] = useState(false);

  const startReveal = () => {
    setIsRevealing(true);
    setPhase('pack');
    
    // Pack opening sequence - Slower timing for better experience
    setTimeout(() => setPhase('tear'), 2000);
    setTimeout(() => setPhase('flare'), 4000);
    setTimeout(() => setPhase('location'), 6000);
    setTimeout(() => setPhase('position'), 8000);
    setTimeout(() => setPhase('club'), 10000);
    setTimeout(() => setPhase('walkout'), 12000);
    setTimeout(() => setPhase('card'), 14000);
    setTimeout(() => {
      setPhase('complete');
      setTimeout(() => onRevealComplete(), 3000);
    }, 16000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 text-center">
        {phase === 'pack' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Premium Gold Pack */}
            <motion.div
              className="w-40 h-56 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg shadow-2xl mx-auto relative border-4 border-yellow-300"
              animate={{ 
                y: [0, -10, 0],
                rotateY: [0, 5, 0],
                boxShadow: [
                  "0 0 20px rgba(255, 215, 0, 0.5)",
                  "0 0 40px rgba(255, 215, 0, 0.8)",
                  "0 0 20px rgba(255, 215, 0, 0.5)"
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Gold wrapper texture */}
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-lg opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-lg" />
              
              {/* Gold card inside wrapper */}
              <div className="absolute inset-2 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-md shadow-inner">
                <div className="absolute top-2 left-2 right-2 h-1 bg-yellow-300 rounded" />
                <div className="absolute top-4 left-2 right-2 h-1 bg-yellow-300 rounded" />
                <div className="absolute top-6 left-2 right-2 h-1 bg-yellow-300 rounded" />
                <div className="absolute bottom-4 left-2 right-2 h-1 bg-yellow-300 rounded" />
                <div className="absolute bottom-2 left-2 right-2 h-1 bg-yellow-300 rounded" />
                
                {/* Gold sparkles */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-200 text-2xl animate-pulse">✨</div>
              </div>
              
              {/* Premium tear tab */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-500 rounded-bl-lg">
                <div className="absolute top-2 left-2 w-4 h-4 border-2 border-yellow-200 rounded-full" />
              </div>
              
              {/* Gold border glow */}
              <div className="absolute inset-0 rounded-lg border-2 border-yellow-200 animate-pulse" />
            </motion.div>
            
            <motion.button
              onClick={startReveal}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-yellow-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              OPEN GOLD PACK
            </motion.button>
          </motion.div>
        )}

        {phase === 'tear' && (
          <motion.div
            initial={{ scale: 1, rotateY: 0 }}
            animate={{ scale: 1.2, rotateY: 15 }}
            transition={{ duration: 1.5 }}
            className="space-y-8"
          >
            {/* Tearing gold wrapper */}
            <motion.div
              className="w-40 h-56 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg shadow-2xl mx-auto relative border-4 border-yellow-300"
              animate={{ 
                scale: [1, 1.1, 1],
                rotateX: [0, 10, 0],
                boxShadow: [
                  "0 0 30px rgba(255, 215, 0, 0.6)",
                  "0 0 60px rgba(255, 215, 0, 0.9)",
                  "0 0 30px rgba(255, 215, 0, 0.6)"
                ]
              }}
              transition={{ 
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              {/* Torn gold wrapper effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-lg opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-lg" />
              
              {/* Gold card emerging */}
              <motion.div 
                className="absolute inset-2 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-md shadow-inner"
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute top-2 left-2 right-2 h-1 bg-yellow-300 rounded" />
                <div className="absolute top-4 left-2 right-2 h-1 bg-yellow-300 rounded" />
                <div className="absolute top-6 left-2 right-2 h-1 bg-yellow-300 rounded" />
                <div className="absolute bottom-4 left-2 right-2 h-1 bg-yellow-300 rounded" />
                <div className="absolute bottom-2 left-2 right-2 h-1 bg-yellow-300 rounded" />
                
                {/* Gold sparkles */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-200 text-2xl animate-pulse">✨</div>
              </motion.div>
              
              {/* Tear effect */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-500 rounded-bl-lg opacity-70" />
            </motion.div>
            
            <div className="text-yellow-300 text-lg font-semibold animate-pulse">TEARING OPEN GOLD PACK...</div>
          </motion.div>
        )}

        {phase === 'flare' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 3, opacity: 1 }}
            exit={{ scale: 5, opacity: 0 }}
            transition={{ duration: 2 }}
            className="w-96 h-96 bg-gradient-radial from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center"
          >
            <div className="text-6xl">🏆</div>
          </motion.div>
        )}


        {phase === 'location' && (
          <motion.div
            initial={{ scale: 0, rotateY: 180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5 }}
            className="space-y-4"
          >
            <motion.div 
              className="text-6xl"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🇺🇸
            </motion.div>
            <div className="text-2xl font-bold text-yellow-300 animate-pulse">CINCINNATI, OH</div>
            <div className="text-lg text-yellow-200">CURRENT LOCATION</div>
            <div className="text-sm text-yellow-100">⭐ GOLD CARD ⭐</div>
          </motion.div>
        )}

        {phase === 'position' && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="space-y-4"
          >
            <motion.div 
              className="text-4xl"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              💻
            </motion.div>
            <div className="text-2xl font-bold text-yellow-300 animate-pulse">ML INFRASTRUCTURE ENGINEER</div>
            <div className="text-lg text-yellow-200">TECHNICAL ROLE</div>
            <div className="text-sm text-yellow-100">⭐ GOLD CARD ⭐</div>
          </motion.div>
        )}

        {phase === 'club' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="space-y-4"
          >
            <motion.div 
              className="text-4xl"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -10, 0]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🏢
            </motion.div>
            <div className="text-2xl font-bold text-yellow-300 animate-pulse">ALLYIN.AI</div>
            <div className="text-lg text-yellow-200">CURRENT COMPANY</div>
            <div className="text-sm text-yellow-100">⭐ GOLD CARD ⭐</div>
          </motion.div>
        )}

        {phase === 'walkout' && (
          <motion.div
            initial={{ x: '100vw', scale: 0.8 }}
            animate={{ x: 0, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.div 
              className="text-6xl"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              👨‍💼
            </motion.div>
            <div className="text-3xl font-bold text-yellow-300 tracking-wider animate-pulse">MADHUR DIXIT</div>
            <div className="text-xl text-yellow-200">ENTERING THE OFFICE</div>
            <div className="text-lg text-yellow-100">⭐ GOLD CARD ⭐</div>
          </motion.div>
        )}

        {phase === 'card' && (
          <motion.div
            initial={{ scale: 0.1, rotateX: 90, y: -100 }}
            animate={{ 
              scale: 1, 
              rotateX: 0, 
              y: 0,
              boxShadow: [
                "0 0 30px rgba(255, 215, 0, 0.5)",
                "0 0 60px rgba(255, 215, 0, 0.8)",
                "0 0 30px rgba(255, 215, 0, 0.5)"
              ]
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="bg-gradient-to-br from-yellow-600 via-yellow-700 to-yellow-800 rounded-2xl p-8 border-4 border-yellow-400 shadow-2xl"
          >
            <div className="text-center space-y-4">
              <motion.div 
                className="text-4xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                👨‍💼
              </motion.div>
              <div className="text-2xl font-bold text-yellow-100 animate-pulse">MADHUR DIXIT</div>
              <div className="text-lg text-yellow-200">ML INFRASTRUCTURE ENGINEER</div>
              <div className="flex justify-center gap-4 text-sm text-yellow-300">
                <span>🇮🇳 INDIA</span>
                <span>🇺🇸 CINCINNATI, OH</span>
                <span>🏢 ALLYIN.AI</span>
              </div>
              <div className="flex justify-center gap-2">
                <Star className="w-5 h-5 text-yellow-300 fill-current" />
                <Star className="w-5 h-5 text-yellow-300 fill-current" />
                <Star className="w-5 h-5 text-yellow-300 fill-current" />
                <Star className="w-5 h-5 text-yellow-300 fill-current" />
                <Star className="w-5 h-5 text-yellow-300 fill-current" />
              </div>
              <div className="text-sm text-yellow-100 font-bold">⭐ GOLD CARD ⭐</div>
            </div>
          </motion.div>
        )}

        {phase === 'complete' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <motion.div 
              className="text-6xl"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 15, 0]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🏆
            </motion.div>
            <div className="text-2xl font-bold text-yellow-300 animate-pulse">GOLD CARD REVEALED!</div>
            <div className="text-lg text-yellow-200">Loading your portfolio...</div>
            <div className="text-sm text-yellow-100">⭐ RARE GOLD CARD ⭐</div>
          </motion.div>
        )}
      </div>

      {/* Gold Particle Effects */}
      {isRevealing && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
          {/* Gold sparkles */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute text-yellow-300 text-xl"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
