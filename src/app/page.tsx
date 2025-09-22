'use client';

import { useState } from 'react';
import FIFAPlayerCard from '@/components/FIFAPlayerCard';
import PlayerReveal from '@/components/PlayerReveal';
import { playerData } from '@/data/playerData';

export default function Home() {
  const [showReveal, setShowReveal] = useState(true);

  const handleRevealComplete = () => {
    setShowReveal(false);
  };

  if (showReveal) {
    return <PlayerReveal onRevealComplete={handleRevealComplete} />;
  }

  return (
    <div className="min-h-screen">
      {/* FIFA Player Card */}
      <FIFAPlayerCard data={playerData} />
    </div>
  );
}