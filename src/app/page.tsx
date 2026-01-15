'use client';

import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import Dashboard from '@/components/Dashboard';
import DataSources from '@/components/DataSources';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [activeView, setActiveView] = useState('chat');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 flex flex-col">
        {activeView === 'chat' && <ChatInterface />}
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'datasources' && <DataSources />}
        {activeView === 'admin' && <div className="p-6">Admin Panel coming soon...</div>}
      </main>
    </div>
  );
}
