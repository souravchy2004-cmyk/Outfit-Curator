'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Occasion } from '../../types';
import { Heart, Trash2, Check, Sparkles, Plus, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SavedOutfitsScreen: React.FC = () => {
  const { savedOutfits, deleteSavedOutfit, markOutfitAsWorn, selectOutfitOption, setCurrentView } = useAppStore();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = ['all', 'Casual', 'College', 'Office', 'Party', 'Formal', 'Date'];

  const filteredOutfits = savedOutfits.filter(o => 
    selectedFilter === 'all' || o.occasion === selectedFilter
  );

  const handleWear = (id: string) => {
    markOutfitAsWorn(id);
    confetti({ particleCount: 60, spread: 60 });
  };

  return (
    <div className="flex flex-col gap-5 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-font-main">Saved Outfits</h1>
        <p className="text-xs text-font-sub mt-0.5">
          {savedOutfits.length} saved looks in your style closet
        </p>
      </div>

      {/* Occasion Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedFilter(tab)}
            className={`py-2 px-3.5 rounded-2xl text-xs font-semibold shrink-0 transition-all capitalize ${
              selectedFilter === tab
                ? 'bg-gradient-purple text-white shadow-soft'
                : 'bg-white text-font-main border border-surface-border hover:border-brand-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid or Empty state */}
      {filteredOutfits.length === 0 ? (
        <div className="py-12 px-4 rounded-3xl bg-white border border-surface-border text-center flex flex-col items-center justify-center gap-3 shadow-soft my-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-base text-font-main">No saved looks yet</h3>
          <p className="text-xs text-font-sub max-w-xs">
            Generate outfit suggestions and tap "♡ Save Outfit" to collect your favorite styles here.
          </p>
          <button
            onClick={() => setCurrentView('preferences')}
            className="mt-2 py-3 px-5 rounded-2xl bg-gradient-purple text-white font-semibold text-xs flex items-center gap-2 shadow-soft hover:brightness-105"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create Your First Outfit</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOutfits.map((outfit) => {
            const selectedOpt = outfit.options.find(o => o.id === outfit.selectedOptionId) || outfit.options[0];
            return (
              <div
                key={outfit.id}
                className="p-4 rounded-3xl bg-white border border-surface-border shadow-soft flex flex-col gap-3 group"
              >
                {/* Outfit Title & Badge */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-brand-50 text-brand-600 px-2.5 py-0.5 rounded-full">
                      {outfit.occasion} • {outfit.style}
                    </span>
                    <h3 className="font-bold text-sm text-font-main mt-1">{selectedOpt.title}</h3>
                  </div>

                  <button
                    onClick={() => deleteSavedOutfit(outfit.id)}
                    className="text-gray-400 hover:text-rose-500 p-1.5 transition-colors"
                    title="Delete outfit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Thumbnails of clothes in this outfit */}
                <div className="grid grid-cols-3 gap-2 bg-surface-muted p-2 rounded-2xl border border-surface-border">
                  {selectedOpt.top && (
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-white">
                      <img src={selectedOpt.top.imageUrl} alt={selectedOpt.top.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  {selectedOpt.bottom && (
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-white">
                      <img src={selectedOpt.bottom.imageUrl} alt={selectedOpt.bottom.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  {selectedOpt.shoes && (
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-white">
                      <img src={selectedOpt.shoes.imageUrl} alt={selectedOpt.shoes.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => {
                      selectOutfitOption(selectedOpt);
                      setCurrentView('outfit-details');
                    }}
                    className="text-xs font-semibold text-brand-500 hover:underline flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => handleWear(outfit.id)}
                    className={`py-2 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                      outfit.worn
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gradient-purple text-white hover:brightness-105 shadow-soft'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{outfit.worn ? 'Worn Today' : 'Wear This Look'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
