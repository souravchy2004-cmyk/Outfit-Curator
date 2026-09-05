'use client';

import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentView } = useAppStore();
  const isFullBleed = ['splash', 'login', 'onboarding'].includes(currentView);

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col items-center justify-start antialiased selection:bg-brand-100 selection:text-brand-900">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl min-h-screen bg-white shadow-soft-lg flex flex-col relative pb-20 md:pb-6 transition-all">
        <Header />
        
        <main className={`flex-1 ${isFullBleed ? 'p-0' : 'p-4 md:p-6'} overflow-x-hidden`}>
          {children}
        </main>

        <BottomNav />
      </div>
    </div>
  );
};
