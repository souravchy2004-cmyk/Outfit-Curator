'use client';

import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Occasion, StyleType, WeatherCondition } from '../../types';
import { Sparkles, ArrowRight, Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';

export const StylePreferencesScreen: React.FC = () => {
  const { 
    selectedOccasion, setSelectedOccasion,
    selectedStyle, setSelectedStyle,
    selectedWeather, setSelectedWeather,
    selectedBudget, setSelectedBudget,
    selectedColor, setSelectedColor,
    generateNewOutfit 
  } = useAppStore();

  const occasions: { name: Occasion; emoji: string }[] = [
    { name: 'Casual', emoji: '🌿' },
    { name: 'College', emoji: '🎓' },
    { name: 'Office', emoji: '💼' },
    { name: 'Party', emoji: '✨' },
    { name: 'Formal', emoji: '👔' },
    { name: 'Date', emoji: '🍷' },
    { name: 'Wedding', emoji: '💍' },
    { name: 'Dinner', emoji: '🍽️' },
  ];

  const styles: StyleType[] = [
    'Minimal', 'Trendy', 'Streetwear', 'Classy', 'Y2K', 'Boho', 'Smart Casual', 'Traditional / Ethnic'
  ];

  const weathers: { name: WeatherCondition; icon: any }[] = [
    { name: 'Sunny', icon: Sun },
    { name: 'Cloudy', icon: Cloud },
    { name: 'Rainy', icon: CloudRain },
    { name: 'Cold', icon: Snowflake },
  ];

  const budgets = ['Under ₹500', '₹500–₹1,000', '₹1,000–₹2,500', '₹2,500+'];

  return (
    <div className="flex flex-col gap-6 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-font-main">Style Preferences</h1>
        <p className="text-xs text-font-sub mt-0.5">
          Tell AI your occasion, weather, and vibe to generate matching looks.
        </p>
      </div>

      {/* OCCASION */}
      <div className="bg-white p-5 rounded-3xl border border-surface-border shadow-soft">
        <h3 className="font-bold text-xs text-font-main uppercase tracking-wider text-brand-500 mb-3">
          1. Select Occasion
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {occasions.map((occ) => {
            const isSelected = selectedOccasion === occ.name;
            return (
              <button
                key={occ.name}
                onClick={() => setSelectedOccasion(occ.name)}
                className={`py-3 px-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                  isSelected
                    ? 'bg-gradient-purple text-white border-transparent shadow-soft scale-102'
                    : 'bg-surface-muted text-font-main border-surface-border hover:border-brand-200'
                }`}
              >
                <span>{occ.emoji}</span>
                <span>{occ.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STYLE */}
      <div className="bg-white p-5 rounded-3xl border border-surface-border shadow-soft">
        <h3 className="font-bold text-xs text-font-main uppercase tracking-wider text-brand-500 mb-3">
          2. Personal Style Vibe
        </h3>
        <div className="flex flex-wrap gap-2">
          {styles.map((st) => {
            const isSelected = selectedStyle === st;
            return (
              <button
                key={st}
                onClick={() => setSelectedStyle(st)}
                className={`py-2.5 px-4 rounded-2xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-gradient-purple text-white border-transparent shadow-soft'
                    : 'bg-surface-muted text-font-main border-surface-border hover:border-brand-200'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* WEATHER */}
      <div className="bg-white p-5 rounded-3xl border border-surface-border shadow-soft">
        <h3 className="font-bold text-xs text-font-main uppercase tracking-wider text-brand-500 mb-3">
          3. Today's Weather
        </h3>
        <div className="grid grid-cols-4 gap-2.5">
          {weathers.map((w) => {
            const isSelected = selectedWeather === w.name;
            const IconComp = w.icon;
            return (
              <button
                key={w.name}
                onClick={() => setSelectedWeather(w.name)}
                className={`py-3 px-2 rounded-2xl text-xs font-semibold flex flex-col items-center gap-1.5 border transition-all ${
                  isSelected
                    ? 'bg-gradient-purple text-white border-transparent shadow-soft'
                    : 'bg-surface-muted text-font-main border-surface-border hover:border-brand-200'
                }`}
              >
                <IconComp className="w-5 h-5" />
                <span>{w.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BUDGET */}
      <div className="bg-white p-5 rounded-3xl border border-surface-border shadow-soft">
        <h3 className="font-bold text-xs text-font-main uppercase tracking-wider text-brand-500 mb-3">
          4. Preferred Outfit Budget (Optional)
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {budgets.map((b) => {
            const isSelected = selectedBudget === b;
            return (
              <button
                key={b}
                onClick={() => setSelectedBudget(b)}
                className={`py-2.5 px-3 rounded-2xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-gradient-purple text-white border-transparent shadow-soft'
                    : 'bg-surface-muted text-font-main border-surface-border hover:border-brand-200'
                }`}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-2">
        <button
          onClick={generateNewOutfit}
          className="w-full py-4 px-6 rounded-3xl bg-gradient-purple text-white font-bold text-base flex items-center justify-center gap-2 shadow-glow hover:brightness-105 active:scale-98 transition-all"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span>Generate Outfit ✨</span>
        </button>
      </div>
    </div>
  );
};
