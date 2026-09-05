'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Sparkles, ArrowRight, Shirt, Sparkle, ShieldCheck } from 'lucide-react';

export const SplashOnboardingScreen: React.FC = () => {
  const { setCurrentView } = useAppStore();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Outfit Curator",
      subtitle: "Your Personal AI Stylist",
      description: "Get perfect outfit ideas from your own digital wardrobe for every occasion.",
      badge: "AI-POWERED STYLIST",
      icon: Sparkles,
      bgGradient: "from-brand-500 to-secondary"
    },
    {
      title: "Wear What You Own",
      subtitle: "Digitize Your Clothes",
      description: "Snap or upload photos of your clothing. AI automatically organizes categories & styles.",
      badge: "SMART WARDROBE",
      icon: Shirt,
      bgGradient: "from-purple-600 to-brand-400"
    },
    {
      title: "Personalized Looks",
      subtitle: "Weather & Occasion Aware",
      description: "Receive 3 tailored outfit suggestions matching weather, occasion, and previous feedback.",
      badge: "SMART MATCHING",
      icon: ShieldCheck,
      bgGradient: "from-brand-700 to-purple-500"
    }
  ];

  const slide = slides[activeSlide];
  const IconComponent = slide.icon;

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      setCurrentView('login');
    }
  };

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Background lavender decorative shapes */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-secondary/30 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-purple flex items-center justify-center text-white shadow-soft">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg text-brand-500">Outfit Curator</span>
        </div>
        
        <button
          onClick={() => setCurrentView('login')}
          className="text-xs font-semibold text-font-sub hover:text-brand-500 transition-colors px-3 py-1.5 rounded-full hover:bg-white"
        >
          Skip
        </button>
      </div>

      {/* Central Fashion Card Illustration */}
      <div className="flex-1 flex flex-col items-center justify-center my-8 z-10">
        <div className="w-full max-w-xs aspect-square rounded-3xl bg-white p-6 shadow-soft-lg border border-surface-border flex flex-col items-center justify-center relative overflow-hidden group">
          <div className={`w-24 h-24 rounded-2xl bg-gradient-to-tr ${slide.bgGradient} flex items-center justify-center text-white shadow-glow mb-4 transition-transform group-hover:scale-105 duration-300`}>
            <IconComponent className="w-12 h-12 animate-pulse" />
          </div>

          <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-brand-50 text-brand-500 mb-2 border border-brand-100">
            {slide.badge}
          </span>

          <h2 className="text-xl font-bold text-font-main text-center">
            {slide.title}
          </h2>
          <p className="text-xs font-semibold text-brand-500 text-center mt-1">
            {slide.subtitle}
          </p>
        </div>

        {/* Description text */}
        <p className="text-sm text-font-sub text-center max-w-xs mt-6 leading-relaxed">
          {slide.description}
        </p>
      </div>

      {/* Bottom Actions & Dots */}
      <div className="flex flex-col items-center gap-6 z-10 pb-6">
        {/* Onboarding indicator dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeSlide ? 'w-8 bg-brand-500' : 'w-2.5 bg-brand-200 hover:bg-brand-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Primary CTA button */}
        <button
          onClick={handleNext}
          className="w-full max-w-xs py-4 px-6 rounded-2xl bg-gradient-purple text-white font-bold text-base flex items-center justify-center gap-2 shadow-soft-lg hover:brightness-105 active:scale-98 transition-all"
        >
          <span>{activeSlide === slides.length - 1 ? 'Get Started' : 'Continue'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-[11px] text-font-sub text-center">
          Turn your clothes into outfits you'll actually want to wear.
        </p>
      </div>
    </div>
  );
};
