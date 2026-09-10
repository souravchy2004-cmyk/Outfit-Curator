'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Occasion, WeatherCondition } from '../../types';
import { Sparkles, Sun, Cloud, CloudRain, Snowflake, Shirt, Heart, History, ArrowRight, Lightbulb, ChevronRight, Plus, MapPin, SlidersHorizontal, Check } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { 
    user, 
    wardrobe, 
    savedOutfits, 
    outfitHistory, 
    currentWeather,
    updateWeather,
    setCurrentView, 
    setSelectedOccasion, 
    generateNewOutfit 
  } = useAppStore();

  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(currentWeather.city);
  const [selectedTemp, setSelectedTemp] = useState(currentWeather.tempCelsius);
  const [selectedCond, setSelectedCond] = useState<WeatherCondition>(currentWeather.condition);

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'London', 'New York', 'Tokyo', 'Paris'];
  const weatherOptions: { name: WeatherCondition; icon: any; tip: string }[] = [
    { name: 'Sunny', icon: Sun, tip: 'Breathable cottons and light layers recommended!' },
    { name: 'Cloudy', icon: Cloud, tip: 'Comfortable casuals or light cardigans work best.' },
    { name: 'Rainy', icon: CloudRain, tip: 'Avoid suede shoes! Waterproof jacket & sneakers recommended.' },
    { name: 'Cold', icon: Snowflake, tip: 'Sweaters, coats, and boots for cozy warmth.' },
  ];

  const quickStyles: { title: Occasion; emoji: string }[] = [
    { title: 'College', emoji: '🎓' },
    { title: 'Office', emoji: '💼' },
    { title: 'Date', emoji: '🍷' },
    { title: 'Party', emoji: '✨' },
    { title: 'Casual', emoji: '🌿' },
    { title: 'Wedding', emoji: '💍' },
  ];

  const handleQuickStyleClick = (occ: Occasion) => {
    setSelectedOccasion(occ);
    generateNewOutfit();
  };

  const handleApplyWeather = () => {
    const opt = weatherOptions.find(w => w.name === selectedCond);
    updateWeather({
      city: selectedCity,
      tempCelsius: Number(selectedTemp),
      condition: selectedCond,
      description: `${selectedCond} in ${selectedCity}`,
      tip: opt?.tip || 'Tailored outfit suggestions for your current weather.'
    });
    setShowWeatherModal(false);
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Welcome Banner Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-font-main tracking-tight">
              Hey, {user.name.split(' ')[0]} 👋
            </h1>
            <button
              onClick={() => setCurrentView('login')}
              className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100 hover:bg-brand-100"
              title="Switch Account"
            >
              Switch User
            </button>
          </div>
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

      {/* Interactive Weather Card */}
      <div 
        onClick={() => setShowWeatherModal(true)}
        className="w-full rounded-3xl bg-gradient-purple p-5 text-white shadow-soft-lg relative overflow-hidden cursor-pointer hover:brightness-105 transition-all group"
      >
        <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <div className="flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm w-max">
              <MapPin className="w-3 h-3 text-amber-300" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Weather in {currentWeather.city} • Tap to change
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold">{currentWeather.tempCelsius}°C</span>
              <span className="text-sm font-semibold text-brand-100">{currentWeather.condition}</span>
            </div>
            <p className="text-xs text-brand-100 mt-1 max-w-[220px]">
              {currentWeather.tip}
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-amber-300 shadow-soft group-hover:scale-105 transition-transform">
            {currentWeather.condition === 'Sunny' && <Sun className="w-8 h-8 animate-spin-slow" />}
            {currentWeather.condition === 'Cloudy' && <Cloud className="w-8 h-8" />}
            {currentWeather.condition === 'Rainy' && <CloudRain className="w-8 h-8" />}
            {currentWeather.condition === 'Cold' && <Snowflake className="w-8 h-8" />}
            <span className="text-[9px] font-bold text-white mt-0.5">Edit ✏️</span>
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
            <p className="text-xs text-brand-100 font-normal">Gemini AI match for your day</p>
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
            Gemini AI Style Tip of the Day
          </h4>
          <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
            "For today's <b>{currentWeather.condition}</b> weather in <b>{currentWeather.city}</b> ({currentWeather.tempCelsius}°C), try pairing your <b>White Kurta / Shirt</b> with <b>Denim Jeans</b> and comfortable sneakers!"
          </p>
        </div>
      </div>

      {/* Quick Style Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-base text-font-main">Quick Style</h3>
          <span className="text-xs font-semibold text-brand-500">Instant Match</span>
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
                  <span className="text-[10px] text-font-sub">Generate look</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-font-sub group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>

      {/* Weather Customizer Modal Dialog */}
      {showWeatherModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-soft-lg border border-surface-border flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-font-main flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-500" />
                <span>Customize Weather Report</span>
              </h3>
              <button
                onClick={() => setShowWeatherModal(false)}
                className="text-gray-400 hover:text-font-main text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* City Selector */}
            <div>
              <label className="text-xs font-bold text-font-main block mb-1">Select City / Location</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-surface-border text-xs focus:outline-none focus:border-brand-500 bg-white"
              >
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Temperature Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-font-main mb-1">
                <span>Temperature (°C)</span>
                <span className="text-brand-500 font-extrabold text-sm">{selectedTemp}°C</span>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                value={selectedTemp}
                onChange={(e) => setSelectedTemp(Number(e.target.value))}
                className="w-full accent-brand-500"
              />
            </div>

            {/* Condition Grid */}
            <div>
              <label className="text-xs font-bold text-font-main block mb-1">Weather Condition</label>
              <div className="grid grid-cols-2 gap-2">
                {weatherOptions.map((w) => {
                  const isSel = selectedCond === w.name;
                  const IconC = w.icon;
                  return (
                    <button
                      key={w.name}
                      type="button"
                      onClick={() => setSelectedCond(w.name)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        isSel
                          ? 'bg-gradient-purple text-white border-transparent shadow-soft'
                          : 'bg-surface-muted text-font-main border-surface-border hover:border-brand-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <IconC className="w-4 h-4" />
                        <span>{w.name}</span>
                      </div>
                      {isSel && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleApplyWeather}
              className="w-full py-3 mt-1 rounded-xl bg-gradient-purple text-white font-bold text-xs flex items-center justify-center gap-2 shadow-soft hover:brightness-105 transition-all"
            >
              <span>Apply Weather & Update Outfits ✨</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
