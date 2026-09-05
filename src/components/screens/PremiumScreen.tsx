'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Crown, Check, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PremiumScreen: React.FC = () => {
  const { user, updateProfile, setCurrentView } = useAppStore();
  const [selectedPlan, setSelectedPlan] = useState<'premium' | 'personal_stylist'>('premium');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

  const handleSubscribe = () => {
    updateProfile({ subscriptionPlan: selectedPlan });
    setSubscribedSuccess(true);
    confetti({ particleCount: 100, spread: 80 });
    setTimeout(() => {
      setSubscribedSuccess(false);
      setCurrentView('home');
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Header Banner */}
      <div className="w-full rounded-3xl bg-gradient-purple p-6 text-white text-center shadow-soft-lg relative overflow-hidden">
        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-amber-300 mx-auto mb-3 shadow-glow">
          <Crown className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">Curator Premium</h1>
        <p className="text-xs text-brand-100 mt-1 max-w-xs mx-auto">
          Unlock unlimited AI outfit visualizations, personal AI stylist chat, and advanced wardrobe analytics.
        </p>
      </div>

      {/* Plan Switcher */}
      <div className="grid grid-cols-2 gap-3">
        {/* Premium Plan Card */}
        <div
          onClick={() => setSelectedPlan('premium')}
          className={`p-5 rounded-3xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
            selectedPlan === 'premium'
              ? 'border-brand-500 bg-white shadow-soft-lg ring-2 ring-brand-500'
              : 'border-surface-border bg-white shadow-soft opacity-80'
          }`}
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-600 px-2.5 py-1 rounded-full">
              POPULAR CHOICE
            </span>
            <h3 className="font-extrabold text-base text-font-main mt-2">Pro Stylist</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-extrabold text-font-main">₹99</span>
              <span className="text-xs text-font-sub">/ month</span>
            </div>
          </div>

          <ul className="flex flex-col gap-2 mt-4 text-xs text-font-main">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Unlimited AI Outfits</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> AI Stylist Chat</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Weather Recommendations</li>
          </ul>
        </div>

        {/* Personal Stylist Plan Card */}
        <div
          onClick={() => setSelectedPlan('personal_stylist')}
          className={`p-5 rounded-3xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
            selectedPlan === 'personal_stylist'
              ? 'border-brand-500 bg-white shadow-soft-lg ring-2 ring-brand-500'
              : 'border-surface-border bg-white shadow-soft opacity-80'
          }`}
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">
              VIP ACCESS
            </span>
            <h3 className="font-extrabold text-base text-font-main mt-2">Personal VIP</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-extrabold text-font-main">₹199</span>
              <span className="text-xs text-font-sub">/ month</span>
            </div>
          </div>

          <ul className="flex flex-col gap-2 mt-4 text-xs text-font-main">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Everything in Pro</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Human Stylist Audit</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Priority Generation</li>
          </ul>
        </div>
      </div>

      {/* Subscribe Action Button */}
      <div className="pt-2">
        <button
          onClick={handleSubscribe}
          className={`w-full py-4 px-6 rounded-3xl font-bold text-base flex items-center justify-center gap-2 shadow-glow transition-all ${
            subscribedSuccess
              ? 'bg-emerald-500 text-white'
              : 'bg-gradient-purple text-white hover:brightness-105'
          }`}
        >
          <Crown className="w-5 h-5" />
          <span>
            {subscribedSuccess 
              ? 'Welcome to Premium! ✨' 
              : `Start Free Trial • ₹${selectedPlan === 'premium' ? '99' : '199'}/mo`}
          </span>
        </button>
        <p className="text-[11px] text-font-sub text-center mt-2">
          Cancel anytime from account settings. Secure Razorpay / UPI ready.
        </p>
      </div>
    </div>
  );
};
