'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Loader2, Wand2 } from 'lucide-react';

export const OutfitGenerationScreen: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    "Analyzing your wardrobe",
    "Understanding your style",
    "Checking weather in Mumbai",
    "Matching color compatibility",
    "Selecting shoes & accessories",
    "Creating 3 outfit options",
    "Preparing your personal look"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < stages.length - 1) return prev + 1;
        return prev;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto relative overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute top-1/4 w-72 h-72 rounded-full bg-brand-300/30 blur-3xl animate-pulse pointer-events-none" />

      {/* Center Animated Fashion Graphic */}
      <div className="w-28 h-28 rounded-3xl bg-gradient-purple flex items-center justify-center text-white shadow-glow mb-6 animate-bounce">
        <Wand2 className="w-14 h-14" />
      </div>

      <h1 className="text-2xl font-extrabold text-font-main tracking-tight">
        Finding your perfect outfit...
      </h1>
      <p className="text-xs text-brand-500 font-semibold mt-1">
        Our AI stylist is working its magic ✨
      </p>

      {/* Progress Card Checklist */}
      <div className="w-full bg-white rounded-3xl p-6 border border-surface-border shadow-soft-lg mt-8 text-left flex flex-col gap-3">
        {stages.map((stageText, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;

          return (
            <div key={idx} className="flex items-center gap-3 transition-all">
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-5 h-5 text-brand-500 animate-spin shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-200 shrink-0" />
              )}

              <span className={`text-xs font-medium ${
                isDone 
                  ? 'text-font-main font-semibold' 
                  : isCurrent 
                  ? 'text-brand-500 font-bold' 
                  : 'text-font-sub'
              }`}>
                {stageText}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
