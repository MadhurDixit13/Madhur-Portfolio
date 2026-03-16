'use client';

import { useState } from 'react';
import FIFAPlayerCard from '@/components/FIFAPlayerCard';
import PlayerReveal from '@/components/PlayerReveal';
import CursorTrail from '@/components/CursorTrail';
import { playerData } from '@/data/playerData';

export default function Home() {
  const [showReveal, setShowReveal] = useState(true);

  if (showReveal) {
    return <PlayerReveal onRevealComplete={() => setShowReveal(false)} />;
  }

  return (
    <>
      <CursorTrail />
      <div className="min-h-screen">
        <FIFAPlayerCard data={playerData} />
      </div>
    </>
  );
}