'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { OutfitOption } from '../../types';
import { Heart, RefreshCw, Share2, Sparkles, Check, ThumbsUp, ThumbsDown, Sliders, ChevronRight, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OutfitResultScreen: React.FC = () => {
  const { 
    currentGeneratedOutfit, 
    selectedOutfitOption, 
    selectOutfitOption, 
    saveCurrentOutfit, 
    submitFeedback, 
    generateNewOutfit, 
    setCurrentView 
  } = useAppStore();

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackReason, setFeedbackReason] = useState('');

  if (!currentGeneratedOutfit || !selectedOutfitOption) {
    return (
      <div className="py-12 text-center">
        <p className="text-xs text-font-sub">No generated outfit available.</p>
        <button
          onClick={generateNewOutfit}
          className="mt-3 py-2.5 px-4 rounded-xl bg-gradient-purple text-white font-semibold text-xs"
        >
          Generate New Outfit
        </button>
      </div>
    );
  }

  const handleSave = () => {
    saveCurrentOutfit();
    setSavedSuccess(true);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLike = () => {
    submitFeedback(currentGeneratedOutfit.id, true);
    confetti({ particleCount: 50, spread: 50 });
  };

  const handleDislikeSubmit = (reason: string) => {
    submitFeedback(currentGeneratedOutfit.id, false, reason);
    setShowFeedbackModal(false);
  };

  return (
    <div className="flex flex-col gap-5 pb-6">
      {/* Header & Option Tabs */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-font-main">Your Outfit</h1>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {selectedOutfitOption.score}% Match
          </span>
        </div>
        <p className="text-xs text-font-sub mt-0.5">
          Choose your look from 3 AI recommendations below:
        </p>
      </div>

      {/* Option A / B / C Selector Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {currentGeneratedOutfit.options.map((option) => {
          const isSelected = selectedOutfitOption.id === option.id;
          return (
            <button
              key={option.id}
              onClick={() => selectOutfitOption(option)}
              className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1 border ${
                isSelected
                  ? 'bg-gradient-purple text-white border-transparent shadow-soft scale-102'
                  : 'bg-white text-font-main border-surface-border hover:border-brand-200'
              }`}
            >
              <span>{option.optionLabel}</span>
              <span className={`text-[10px] font-normal ${isSelected ? 'text-brand-100' : 'text-font-sub'}`}>
                {option.style}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Visual Outfit Composition Card */}
      <div className="w-full rounded-3xl bg-white border border-surface-border p-4 shadow-soft-lg flex flex-col gap-4">
        {/* Top/Bottom/Shoes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {selectedOutfitOption.top && (
            <div 
              onClick={() => setCurrentView('outfit-details')}
              className="rounded-2xl bg-surface-muted border border-surface-border p-2 flex flex-col gap-1 cursor-pointer hover:border-brand-300 transition-colors group"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-white">
                <img src={selectedOutfitOption.top.imageUrl} alt={selectedOutfitOption.top.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <span className="text-[9px] font-bold uppercase text-brand-500">Top</span>
              <p className="text-xs font-semibold text-font-main truncate">{selectedOutfitOption.top.name}</p>
            </div>
          )}

          {selectedOutfitOption.bottom && (
            <div 
              onClick={() => setCurrentView('outfit-details')}
              className="rounded-2xl bg-surface-muted border border-surface-border p-2 flex flex-col gap-1 cursor-pointer hover:border-brand-300 transition-colors group"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-white">
                <img src={selectedOutfitOption.bottom.imageUrl} alt={selectedOutfitOption.bottom.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <span className="text-[9px] font-bold uppercase text-brand-500">Bottom</span>
              <p className="text-xs font-semibold text-font-main truncate">{selectedOutfitOption.bottom.name}</p>
            </div>
          )}

          {selectedOutfitOption.shoes && (
            <div 
              onClick={() => setCurrentView('outfit-details')}
              className="rounded-2xl bg-surface-muted border border-surface-border p-2 flex flex-col gap-1 cursor-pointer hover:border-brand-300 transition-colors group"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-white">
                <img src={selectedOutfitOption.shoes.imageUrl} alt={selectedOutfitOption.shoes.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <span className="text-[9px] font-bold uppercase text-brand-500">Shoes</span>
              <p className="text-xs font-semibold text-font-main truncate">{selectedOutfitOption.shoes.name}</p>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {selectedOutfitOption.tags.map((tag, idx) => (
            <span key={idx} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand-600 border border-brand-100">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Why This Outfit Card */}
      <div className="w-full rounded-3xl bg-white border border-surface-border p-5 shadow-soft">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-purple text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm text-font-main">Why this outfit?</h3>
        </div>
        <p className="text-xs text-font-sub leading-relaxed">
          "{selectedOutfitOption.explanation}"
        </p>
      </div>

      {/* Action Buttons Row */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleSave}
          className={`py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-soft ${
            savedSuccess 
              ? 'bg-emerald-500 text-white' 
              : 'bg-gradient-purple text-white hover:brightness-105'
          }`}
        >
          {savedSuccess ? <Check className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
          <span>{savedSuccess ? 'Saved to Outfits!' : '♡ Save Outfit'}</span>
        </button>

        <button
          onClick={() => setCurrentView('outfit-details')}
          className="py-3.5 px-4 rounded-2xl bg-white border border-surface-border text-font-main font-semibold text-xs flex items-center justify-center gap-2 hover:bg-brand-50 transition-all shadow-soft"
        >
          <Sliders className="w-4 h-4 text-brand-500" />
          <span>Details & Customize</span>
        </button>
      </div>

      {/* Feedback & Regenerate */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-muted border border-surface-border">
        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            className={`w-9 h-9 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${
              currentGeneratedOutfit.liked === true ? 'text-rose-500 bg-rose-50' : 'text-gray-500'
            }`}
            title="Like this recommendation"
          >
            <ThumbsUp className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={() => setShowFeedbackModal(true)}
            className={`w-9 h-9 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${
              currentGeneratedOutfit.liked === false ? 'text-red-500 bg-red-50' : 'text-gray-500'
            }`}
            title="Not for me"
          >
            <ThumbsDown className="w-4.5 h-4.5" />
          </button>
        </div>

        <button
          onClick={generateNewOutfit}
          className="text-xs font-semibold text-brand-500 flex items-center gap-1.5 hover:underline"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      </div>

      {/* Dislike Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-soft-lg border border-surface-border flex flex-col gap-3">
            <h3 className="font-bold text-base text-font-main">Why don't you like this look?</h3>
            <p className="text-xs text-font-sub">Your feedback helps AI personalize future recommendations.</p>

            <div className="flex flex-col gap-2 my-2">
              {['Not my style', 'Wrong colors', 'Not comfortable', 'Too formal', 'Wrong weather fit'].map((r) => (
                <button
                  key={r}
                  onClick={() => handleDislikeSubmit(r)}
                  className="w-full text-left py-2.5 px-3.5 rounded-xl border border-surface-border text-xs font-medium hover:bg-brand-50 hover:border-brand-200 transition-colors"
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFeedbackModal(false)}
              className="text-xs font-semibold text-gray-400 hover:text-font-main pt-1"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
