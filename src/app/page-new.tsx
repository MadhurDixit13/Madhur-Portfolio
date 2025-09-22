'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [activeTab, setActiveTab] = useState('aboutme');

  return (
    <div className="min-h-screen">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-8">
        <h1 className="text-4xl font-bold text-white">Madhur Dixit</h1>
        <p className="text-gray-300">Software/Data Engineer</p>
      </div>
    </div>
  );
}
