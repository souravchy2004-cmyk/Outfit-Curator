'use client';

import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { History, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { formatDate } from '../../lib/utils';

export const OutfitHistoryScreen: React.FC = () => {
  const { outfitHistory, setCurrentView } = useAppStore();

  return (
    <div className="flex flex-col gap-5 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-font-main">Outfit History</h1>
        <p className="text-xs text-font-sub mt-0.5">
          Past AI-generated recommendations and worn outfits log
        </p>
      </div>

      {outfitHistory.length === 0 ? (
        <div className="py-12 px-4 rounded-3xl bg-white border border-surface-border text-center flex flex-col items-center justify-center gap-3 shadow-soft my-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <History className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-base text-font-main">No outfit history yet</h3>
          <p className="text-xs text-font-sub max-w-xs">
            Generate recommendations to build your personal fashion timeline over time.
          </p>
          <button
            onClick={() => setCurrentView('preferences')}
            className="mt-2 py-3 px-5 rounded-2xl bg-gradient-purple text-white font-semibold text-xs shadow-soft"
          >
            Generate Outfit
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {outfitHistory.map((h) => {
            const opt = h.options[0];
            return (
              <div
                key={h.id}
                className="p-4 rounded-3xl bg-white border border-surface-border shadow-soft flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-surface-muted overflow-hidden shrink-0 border border-surface-border">
                    <img src={opt.visualImageUrl || opt.top?.imageUrl} alt={opt.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold uppercase text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                        {h.occasion}
                      </span>
                      <span className="text-[10px] text-font-sub">{formatDate(h.createdAt)}</span>
                    </div>
                    <h4 className="font-bold text-xs text-font-main mt-0.5">{opt.title}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {h.worn ? (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Worn
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      Generated
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
