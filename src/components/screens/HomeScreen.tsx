'use client';

import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Occasion } from '../../types';
import { Sparkles, Sun, Cloud, Shirt, Heart, History, ArrowRight, Lightbulb, ChevronRight, Plus } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { 
    user, 
    wardrobe, 
    savedOutfits, 
    outfitHistory, 
    setCurrentView, 
    setSelectedOccasion, 
    generateNewOutfit 
  } = useAppStore();

  const quickStyles: { title: Occasion; emoji: string; color: string }[] = [
    { title: 'College', emoji: '🎓', color: 'from-blue-500 to-indigo-600' },
    { title: 'Office', emoji: '💼', color: 'from-purple-600 to-indigo-700' },
    { title: 'Date', emoji: '🍷', color: 'from-pink-500 to-rose-600' },
    { title: 'Party', emoji: '✨', color: 'from-amber-500 to-purple-600' },
    { title: 'Casual', emoji: '🌿', color: 'from-emerald-500 to-teal-600' },
    { title: 'Wedding', emoji: '💍', color: 'from-yellow-500 to-amber-600' },
  ];

  const handleQuickStyleClick = (occ: Occasion) => {
    setSelectedOccasion(occ);
    generateNewOutfit();
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Welcome Banner Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-font-main tracking-tight">
            Hey, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs text-font-sub mt-0.5">
            What are you wearing today?
          </p>
        </div>

        <button
          onClick={() => setCurrentView('add-item')}
          className="flex items-center gap-1.5 text-xs font-semibold text-brand-500 bg-brand-50 hover:bg-brand-100 border border-brand-100 px-3 py-2 rounded-2xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Clothes</span>
        </button>
      </div>

      {/* Weather Card */}
      <div className="w-full rounded-3xl bg-gradient-purple p-5 text-white shadow-soft-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
              Today's Weather • Mumbai
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold">28°C</span>
              <span className="text-sm font-medium text-brand-100">Sunny & Pleasant</span>
            </div>
            <p className="text-xs text-brand-100 mt-1 max-w-[220px]">
              Breathable cottons and light layers recommended for today.
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300">
            <Sun className="w-8 h-8 animate-spin-slow" />
          </div>
        </div>
      </div>

      {/* Main Hero CTA */}
      <button
        onClick={() => setCurrentView('preferences')}
        className="w-full py-4 px-6 rounded-3xl bg-gradient-purple text-white font-bold text-base flex items-center justify-between shadow-glow hover:brightness-105 active:scale-98 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-amber-300">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-left">
            <h3 className="font-extrabold text-base">Create My Outfit ✨</h3>
            <p className="text-xs text-brand-100 font-normal">AI Stylist match for your day</p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setCurrentView('wardrobe')}
          className="p-3.5 rounded-2xl bg-white border border-surface-border flex flex-col items-center justify-center gap-1.5 shadow-soft hover:border-brand-200 transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Shirt className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-font-main">My Wardrobe</span>
          <span className="text-[10px] text-font-sub">{wardrobe.length} Items</span>
        </button>

        <button
          onClick={() => setCurrentView('saved')}
          className="p-3.5 rounded-2xl bg-white border border-surface-border flex flex-col items-center justify-center gap-1.5 shadow-soft hover:border-brand-200 transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Heart className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-font-main">Saved Outfits</span>
          <span className="text-[10px] text-font-sub">{savedOutfits.length} Saved</span>
        </button>

        <button
          onClick={() => setCurrentView('history')}
          className="p-3.5 rounded-2xl bg-white border border-surface-border flex flex-col items-center justify-center gap-1.5 shadow-soft hover:border-brand-200 transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <History className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-font-main">History</span>
          <span className="text-[10px] text-font-sub">{outfitHistory.length} Looks</span>
        </button>
      </div>

      {/* AI Style Tip */}
      <div className="w-full rounded-2xl bg-amber-50/80 border border-amber-200/60 p-4 flex items-start gap-3 shadow-soft">
        <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
            AI Style Tip of the Day
          </h4>
          <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
            "Try pairing your <b>White Kurta</b> with <b>Blue Jeans</b> and <b>White Sneakers</b> for a clean, effortless Indo-Western look today!"
          </p>
        </div>
      </div>

      {/* Quick Style Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-base text-font-main">Quick Style</h3>
          <span className="text-xs font-semibold text-brand-500">Instant AI Match</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickStyles.map((qs) => (
            <button
              key={qs.title}
              onClick={() => handleQuickStyleClick(qs.title)}
              className="p-3.5 rounded-2xl bg-white border border-surface-border flex items-center justify-between shadow-soft hover:border-brand-300 transition-all text-left group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{qs.emoji}</span>
                <div>
                  <h4 className="font-semibold text-xs text-font-main group-hover:text-brand-500 transition-colors">
                    {qs.title}
                  </h4>
                  <span className="text-[10px] text-font-sub">Style look</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-font-sub group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>

      {/* Wardrobe Preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-base text-font-main">Your Wardrobe</h3>
          <button 
            onClick={() => setCurrentView('wardrobe')}
            className="text-xs font-semibold text-brand-500 hover:underline flex items-center gap-1"
          >
            <span>View All ({wardrobe.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {wardrobe.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => setCurrentView('wardrobe')}
              className="w-24 shrink-0 rounded-2xl bg-white border border-surface-border overflow-hidden shadow-soft cursor-pointer hover:border-brand-300 transition-all group"
            >
              <div className="w-full h-24 bg-surface-muted relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-1 right-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                  {item.color}
                </span>
              </div>
              <div className="p-2">
                <p className="text-[11px] font-medium text-font-main truncate">{item.name}</p>
                <p className="text-[9px] text-font-sub capitalize">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
