'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Ruler, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MeasurementsScreen: React.FC = () => {
  const { user, updateProfile, setCurrentView } = useAppStore();

  const [height, setHeight] = useState(user.height || "5'6\"");
  const [shirtSize, setShirtSize] = useState(user.shirtSize || 'M');
  const [trouserSize, setTrouserSize] = useState(user.trouserSize || '28');
  const [shoeSize, setShoeSize] = useState(user.shoeSize || 'UK 6');
  const [waist, setWaist] = useState(user.waist || '28 in');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      height,
      shirtSize,
      tshirtSize: shirtSize,
      trouserSize,
      shoeSize,
      waist
    });

    setSavedSuccess(true);
    confetti({ particleCount: 50 });
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-font-main">My Measurements</h1>
        <p className="text-xs text-font-sub mt-0.5">
          Store your sizes so recommended clothing fits your proportions accurately.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-5 rounded-3xl border border-surface-border shadow-soft flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-font-main block mb-1">Height</label>
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 5'6&quot;"
              className="w-full py-2.5 px-3 rounded-xl border border-surface-border text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-font-main block mb-1">Shirt / Top Size</label>
            <select
              value={shirtSize}
              onChange={(e) => setShirtSize(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-surface-border text-xs bg-white focus:outline-none focus:border-brand-500"
            >
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-font-main block mb-1">Trouser Size</label>
            <input
              type="text"
              value={trouserSize}
              onChange={(e) => setTrouserSize(e.target.value)}
              placeholder="e.g. 28, 30, 32"
              className="w-full py-2.5 px-3 rounded-xl border border-surface-border text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-font-main block mb-1">Shoe Size</label>
            <input
              type="text"
              value={shoeSize}
              onChange={(e) => setShoeSize(e.target.value)}
              placeholder="e.g. UK 6, US 7"
              className="w-full py-2.5 px-3 rounded-xl border border-surface-border text-xs focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-font-main block mb-1">Waist Measurement</label>
          <input
            type="text"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            placeholder="e.g. 28 inches"
            className="w-full py-2.5 px-3 rounded-xl border border-surface-border text-xs focus:outline-none focus:border-brand-500"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3.5 mt-2 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-soft ${
            savedSuccess
              ? 'bg-emerald-500 text-white'
              : 'bg-gradient-purple text-white hover:brightness-105'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{savedSuccess ? 'Measurements Saved!' : 'Save Measurements'}</span>
        </button>
      </form>
    </div>
  );
};
