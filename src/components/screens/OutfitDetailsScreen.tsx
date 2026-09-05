'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { ClothingCategory, WardrobeItem } from '../../types';
import { Check, RefreshCw, Sparkles, Heart, Share2, ArrowLeft, Shirt, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OutfitDetailsScreen: React.FC = () => {
  const { 
    selectedOutfitOption, 
    wardrobe, 
    replaceItemInOutfitOption, 
    saveCurrentOutfit, 
    markOutfitAsWorn, 
    currentGeneratedOutfit,
    setCurrentView 
  } = useAppStore();

  const [replacingCategory, setReplacingCategory] = useState<ClothingCategory | null>(null);
  const [wornSuccess, setWornSuccess] = useState(false);

  if (!selectedOutfitOption) {
    return (
      <div className="py-12 text-center">
        <p className="text-xs text-font-sub">No outfit selected.</p>
        <button onClick={() => setCurrentView('home')} className="mt-2 text-xs text-brand-500 underline">
          Go Home
        </button>
      </div>
    );
  }

  const itemsList = [
    { label: 'Top', category: 'top' as ClothingCategory, item: selectedOutfitOption.top },
    { label: 'Bottom', category: 'bottom' as ClothingCategory, item: selectedOutfitOption.bottom },
    { label: 'Shoes', category: 'shoes' as ClothingCategory, item: selectedOutfitOption.shoes },
    { label: 'Outerwear', category: 'outerwear' as ClothingCategory, item: selectedOutfitOption.outerwear },
  ].filter(i => i.item !== undefined);

  const handleWearLook = () => {
    if (currentGeneratedOutfit) {
      markOutfitAsWorn(currentGeneratedOutfit.id);
    }
    setWornSuccess(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => setWornSuccess(false), 3000);
  };

  const compatibleItems = replacingCategory 
    ? wardrobe.filter(w => w.category === replacingCategory)
    : [];

  return (
    <div className="flex flex-col gap-5 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-font-main">Outfit Details</h1>
        <p className="text-xs text-font-sub mt-0.5">
          {selectedOutfitOption.style} look for {selectedOutfitOption.occasion} ({selectedOutfitOption.weather})
        </p>
      </div>

      {/* Item Breakdown List */}
      <div className="flex flex-col gap-3">
        {itemsList.map(({ label, category, item }) => (
          <div
            key={category}
            className="p-3.5 rounded-3xl bg-white border border-surface-border flex items-center justify-between shadow-soft hover:border-brand-200 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-surface-muted overflow-hidden shrink-0 border border-surface-border">
                <img src={item!.imageUrl} alt={item!.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase text-brand-500 bg-brand-50 px-2 py-0.5 rounded-full">
                  {label}
                </span>
                <h4 className="font-bold text-xs text-font-main mt-0.5">{item!.name}</h4>
                <p className="text-[10px] text-font-sub">{item!.color} • {item!.brand || item!.type}</p>
              </div>
            </div>

            <button
              onClick={() => setReplacingCategory(category)}
              className="py-1.5 px-3 rounded-xl bg-surface-muted hover:bg-brand-100 text-brand-600 font-semibold text-xs transition-colors shrink-0"
            >
              Replace
            </button>
          </div>
        ))}
      </div>

      {/* AI Reasoning Summary */}
      <div className="p-4 rounded-2xl bg-brand-50 border border-brand-100 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
        <p className="text-xs text-brand-900 leading-relaxed">
          <b>Stylist Note:</b> {selectedOutfitOption.explanation}
        </p>
      </div>

      {/* Primary CTA: Wear This Look */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          onClick={handleWearLook}
          className={`w-full py-4 px-6 rounded-3xl font-bold text-sm flex items-center justify-center gap-2 shadow-glow transition-all ${
            wornSuccess 
              ? 'bg-emerald-500 text-white' 
              : 'bg-gradient-purple text-white hover:brightness-105'
          }`}
        >
          <Check className="w-5 h-5" />
          <span>{wornSuccess ? 'Worn Today! ✨ Saved to History' : 'Wear This Look Today ✨'}</span>
        </button>
      </div>

      {/* Replace Item Modal Sheet */}
      {replacingCategory && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 border border-surface-border flex flex-col gap-3 shadow-soft-lg max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-font-main capitalize">
                Replace {replacingCategory}
              </h3>
              <button
                onClick={() => setReplacingCategory(null)}
                className="text-gray-400 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-font-sub">
              Choose another {replacingCategory} from your wardrobe to customize your outfit:
            </p>

            <div className="grid grid-cols-2 gap-2.5 my-2">
              {compatibleItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    replaceItemInOutfitOption(replacingCategory, item);
                    setReplacingCategory(null);
                  }}
                  className="p-2.5 rounded-2xl border border-surface-border bg-surface-muted flex flex-col gap-1 cursor-pointer hover:border-brand-500 hover:bg-white transition-all group"
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-white">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="font-bold text-xs text-font-main truncate">{item.name}</h4>
                  <p className="text-[9px] text-font-sub">{item.color} • {item.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
