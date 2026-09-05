'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Home, Shirt, Plus, Heart, User, Sparkles, Camera, ImagePlus } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, activeTab, setActiveTab } = useAppStore();
  const [showPlusMenu, setShowPlusMenu] = useState(false);

  const hideNavViews = ['splash', 'login', 'onboarding', 'generating'];
  if (hideNavViews.includes(currentView)) return null;

  const handleNavClick = (tab: 'home' | 'wardrobe' | 'outfits' | 'profile') => {
    setActiveTab(tab);
    setShowPlusMenu(false);
  };

  return (
    <>
      {/* Central + Modal Overlay */}
      {showPlusMenu && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center pb-24 px-4 transition-opacity animate-in fade-in"
          onClick={() => setShowPlusMenu(false)}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-soft-lg border border-surface-border flex flex-col gap-3 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-1" />
            <h3 className="font-bold text-font-main text-base">Quick Action ✨</h3>
            
            <button
              onClick={() => {
                setShowPlusMenu(false);
                setCurrentView('preferences');
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-purple text-white font-semibold flex items-center justify-center gap-2 shadow-soft hover:brightness-105 transition-all"
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span>Generate New Outfit</span>
            </button>

            <button
              onClick={() => {
                setShowPlusMenu(false);
                setCurrentView('add-item');
              }}
              className="w-full py-3 px-4 rounded-2xl bg-surface-muted text-font-main font-medium flex items-center justify-center gap-2 border border-surface-border hover:bg-brand-50 transition-all"
            >
              <ImagePlus className="w-5 h-5 text-brand-500" />
              <span>Add Clothing Item</span>
            </button>

            <button
              onClick={() => {
                setShowPlusMenu(false);
                setCurrentView('add-item');
              }}
              className="w-full py-3 px-4 rounded-2xl bg-surface-muted text-font-main font-medium flex items-center justify-center gap-2 border border-surface-border hover:bg-brand-50 transition-all"
            >
              <Camera className="w-5 h-5 text-brand-500" />
              <span>Scan / Take Photo</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Sticky Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-border py-2 px-4 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-around relative">
          {/* Home */}
          <button
            onClick={() => handleNavClick('home')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'home' && currentView === 'home' ? 'text-brand-500 font-semibold' : 'text-font-sub hover:text-font-main'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[11px]">Home</span>
          </button>

          {/* Wardrobe */}
          <button
            onClick={() => handleNavClick('wardrobe')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'wardrobe' || currentView === 'wardrobe' ? 'text-brand-500 font-semibold' : 'text-font-sub hover:text-font-main'
            }`}
          >
            <Shirt className="w-5 h-5" />
            <span className="text-[11px]">Wardrobe</span>
          </button>

          {/* Prominent Floating Central + Button */}
          <div className="relative -top-5">
            <button
              onClick={() => setShowPlusMenu(!showPlusMenu)}
              className="w-14 h-14 rounded-full bg-gradient-purple text-white flex items-center justify-center shadow-glow hover:scale-105 active:scale-95 transition-all border-4 border-white"
              aria-label="Add or Generate"
            >
              <Plus className={`w-7 h-7 transition-transform ${showPlusMenu ? 'rotate-45' : ''}`} />
            </button>
          </div>

          {/* Outfits */}
          <button
            onClick={() => handleNavClick('outfits')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'outfits' || currentView === 'saved' ? 'text-brand-500 font-semibold' : 'text-font-sub hover:text-font-main'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-[11px]">Outfits</span>
          </button>

          {/* Profile */}
          <button
            onClick={() => handleNavClick('profile')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'profile' || currentView === 'profile' ? 'text-brand-500 font-semibold' : 'text-font-sub hover:text-font-main'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[11px]">Profile</span>
          </button>
        </div>
      </nav>
    </>
  );
};
