'use client';

import React from 'react';
import { useAppStore, AppView } from '../../stores/useAppStore';
import { ChevronLeft, Sparkles, Bell, Crown, Heart } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, onBack }) => {
  const { user, currentView, setCurrentView, notifications } = useAppStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    if (currentView === 'result' || currentView === 'outfit-details') {
      setCurrentView('home');
    } else if (currentView === 'add-item' || currentView === 'preferences') {
      setCurrentView('home');
    } else if (currentView === 'stylist' || currentView === 'history' || currentView === 'premium' || currentView === 'settings') {
      setCurrentView('profile');
    } else {
      setCurrentView('home');
    }
  };

  const isMainScreen = ['splash', 'login', 'onboarding'].includes(currentView);
  if (isMainScreen) return null;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-surface-border px-4 py-3 transition-all">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack || (currentView !== 'home' && currentView !== 'wardrobe' && currentView !== 'saved' && currentView !== 'profile') ? (
            <button
              onClick={handleBack}
              className="w-9 h-9 rounded-full bg-surface-muted flex items-center justify-center text-font-main hover:bg-brand-100 transition-colors"
              aria-label="Go Back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
              <div className="w-8 h-8 rounded-xl bg-gradient-purple flex items-center justify-center text-white shadow-soft">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <span className="font-bold text-lg tracking-tight bg-gradient-purple text-transparent bg-clip-text">
                Outfit Curator
              </span>
            </div>
          )}
          
          {title && (
            <h1 className="font-semibold text-base text-font-main truncate">
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-2">
          {user.subscriptionPlan === 'free' && (
            <button 
              onClick={() => setCurrentView('premium')}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors"
            >
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span>Pro</span>
            </button>
          )}

          <button
            onClick={() => setCurrentView('stylist')}
            className="w-9 h-9 rounded-full bg-surface-muted flex items-center justify-center text-brand-500 hover:bg-brand-100 transition-colors relative"
            title="Personal AI Stylist"
          >
            <Sparkles className="w-4.5 h-4.5" />
          </button>

          <button 
            onClick={() => setCurrentView('notifications' as any)}
            className="w-9 h-9 rounded-full bg-surface-muted flex items-center justify-center text-font-main hover:bg-brand-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-error border-2 border-white" />
            )}
          </button>

          <div 
            onClick={() => setCurrentView('profile')}
            className="w-9 h-9 rounded-full border-2 border-brand-200 overflow-hidden cursor-pointer hover:border-brand-500 transition-colors"
          >
            <img 
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} 
              alt={user.name}
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
    </header>
  );
};
