'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { StyleType, ColorPreference, Occasion, WeatherCondition } from '../../types';
import { Sparkles, Check, ArrowRight, ChevronLeft } from 'lucide-react';

export const UserOnboardingScreen: React.FC = () => {
  const { user, updateProfile, setCurrentView } = useAppStore();
  const [step, setStep] = useState(1);

  // Local state for step forms
  const [gender, setGender] = useState<'Women' | 'Men' | 'Unisex' | 'Non-binary'>(user.genderPreference || 'Women');
  const [styles, setStyles] = useState<StyleType[]>(user.stylePreferences || ['Casual', 'Trendy']);
  const [colors, setColors] = useState<ColorPreference[]>(user.colorPreferences || ['Black', 'White', 'Lavender', 'Blue']);
  const [occasions, setOccasions] = useState<Occasion[]>(user.preferredOccasions || ['Casual', 'College', 'Office']);

  const allStyles: StyleType[] = [
    'Minimal', 'Trendy', 'Streetwear', 'Classy', 'Y2K', 'Boho', 
    'Casual', 'Formal', 'Smart Casual', 'Traditional / Ethnic'
  ];

  const allColors: { name: ColorPreference; hex: string }[] = [
    { name: 'Black', hex: '#171717' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'Green', hex: '#10B981' },
    { name: 'Red', hex: '#EF4444' },
    { name: 'Pink', hex: '#EC4899' },
    { name: 'Purple', hex: '#8B5CF6' },
    { name: 'Lavender', hex: '#C084FC' },
    { name: 'Beige', hex: '#F59E0B' },
    { name: 'Brown', hex: '#78350F' },
    { name: 'Grey', hex: '#6B7280' },
    { name: 'Navy', hex: '#1E3A8A' }
  ];

  const allOccasions: Occasion[] = [
    'Casual', 'College', 'Office', 'Party', 'Formal', 'Date', 
    'Wedding', 'Meeting', 'Dinner', 'Travel'
  ];

  const toggleSelection = <T,>(item: T, list: T[], setList: (newVal: T[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleFinish = () => {
    updateProfile({
      genderPreference: gender,
      stylePreferences: styles,
      colorPreferences: colors,
      preferredOccasions: occasions,
      onboardingCompleted: true
    });
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col justify-between p-6 max-w-md mx-auto">
      {/* Header & Step Progress */}
      <div>
        <div className="flex items-center justify-between pt-2 mb-4">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="w-9 h-9 rounded-full bg-surface-muted flex items-center justify-center text-font-main hover:bg-brand-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-9 h-9" />
          )}

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map(s => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step ? 'w-6 bg-brand-500' : 'w-2 bg-brand-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleFinish}
            className="text-xs font-semibold text-font-sub hover:text-brand-500"
          >
            Skip
          </button>
        </div>

        {/* STEP 1: GENDER & BASIC FIT */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <span className="text-xs font-semibold text-brand-500 tracking-wide uppercase px-3 py-1 rounded-full bg-brand-50 border border-brand-100">
              Step 1 of 4
            </span>
            <h1 className="text-2xl font-bold text-font-main mt-3">
              Who are we styling for?
            </h1>
            <p className="text-xs text-font-sub mt-1">
              This helps us customize clothing suggestions for your profile.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {(['Women', 'Men', 'Unisex', 'Non-binary'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`p-4 rounded-2xl border text-left font-semibold transition-all ${
                    gender === g
                      ? 'border-brand-500 bg-brand-50/70 text-brand-700 shadow-soft'
                      : 'border-surface-border bg-white text-font-main hover:border-brand-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{g}</span>
                    {gender === g && (
                      <div className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: STYLE PREFERENCES */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <span className="text-xs font-semibold text-brand-500 tracking-wide uppercase px-3 py-1 rounded-full bg-brand-50 border border-brand-100">
              Step 2 of 4
            </span>
            <h1 className="text-2xl font-bold text-font-main mt-3">
              What's your personal style?
            </h1>
            <p className="text-xs text-font-sub mt-1">
              Select one or multiple styles that match your vibe.
            </p>

            <div className="flex flex-wrap gap-2.5 mt-6">
              {allStyles.map((st) => {
                const isSelected = styles.includes(st);
                return (
                  <button
                    key={st}
                    onClick={() => toggleSelection(st, styles, setStyles)}
                    className={`py-2.5 px-4 rounded-2xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-gradient-purple text-white border-transparent shadow-soft'
                        : 'bg-white text-font-main border-surface-border hover:border-brand-200'
                    }`}
                  >
                    {st} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: COLOR PREFERENCES */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <span className="text-xs font-semibold text-brand-500 tracking-wide uppercase px-3 py-1 rounded-full bg-brand-50 border border-brand-100">
              Step 3 of 4
            </span>
            <h1 className="text-2xl font-bold text-font-main mt-3">
              Favorite clothing colors?
            </h1>
            <p className="text-xs text-font-sub mt-1">
              We'll prioritize these shades when generating recommendations.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-6">
              {allColors.map((c) => {
                const isSelected = colors.includes(c.name);
                return (
                  <button
                    key={c.name}
                    onClick={() => toggleSelection(c.name, colors, setColors)}
                    className={`p-3 rounded-2xl border flex items-center gap-2.5 text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/80 font-bold text-brand-700 shadow-soft'
                        : 'border-surface-border bg-white text-font-main hover:border-brand-200'
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full border border-gray-300 shadow-inner shrink-0" 
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="truncate">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: OCCASIONS */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right duration-300">
            <span className="text-xs font-semibold text-brand-500 tracking-wide uppercase px-3 py-1 rounded-full bg-brand-50 border border-brand-100">
              Step 4 of 4
            </span>
            <h1 className="text-2xl font-bold text-font-main mt-3">
              What occasions do you dress for?
            </h1>
            <p className="text-xs text-font-sub mt-1">
              Select key occasions to tailor your daily outfit suggestions.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {allOccasions.map((occ) => {
                const isSelected = occasions.includes(occ);
                return (
                  <button
                    key={occ}
                    onClick={() => toggleSelection(occ, occasions, setOccasions)}
                    className={`py-3 px-4 rounded-2xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-gradient-purple text-white border-transparent shadow-soft'
                        : 'bg-white text-font-main border-surface-border hover:border-brand-200'
                    }`}
                  >
                    {occ} {isSelected && '✨'}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="pt-6">
        <button
          onClick={() => {
            if (step < 4) setStep(step + 1);
            else handleFinish();
          }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-purple text-white font-bold text-base flex items-center justify-center gap-2 shadow-soft-lg hover:brightness-105 transition-all"
        >
          <span>{step === 4 ? 'Complete Setup ✨' : 'Next Step'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
