'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { ClothingCategory, ClothingType, ColorPreference, StyleType, Occasion } from '../../types';
import { analyzeClothingImage } from '../../services/ai/clothingClassifier';
import { Camera, ImagePlus, Sparkles, Check, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

export const AddClothingScreen: React.FC = () => {
  const { addWardrobeItem, setCurrentView } = useAppStore();

  const [imageUrl, setImageUrl] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<ClothingCategory>('top');
  const [type, setType] = useState<ClothingType>('Shirt');
  const [color, setColor] = useState<ColorPreference>('Black');
  const [brand, setBrand] = useState<string>('');
  const [size, setSize] = useState<string>('M');
  const [style, setStyle] = useState<StyleType>('Casual');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isAiDetected, setIsAiDetected] = useState<boolean>(false);

  // Sample clothing presets for instant demo camera/gallery selection
  const sampleImages = [
    {
      name: 'Black Cotton Oversized Tee',
      url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
      category: 'top' as ClothingCategory,
      type: 'T-shirt' as ClothingType,
      color: 'Black' as ColorPreference,
      style: 'Streetwear' as StyleType
    },
    {
      name: 'Embroidered Floral Kurta',
      url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
      category: 'top' as ClothingCategory,
      type: 'Kurta' as ClothingType,
      color: 'White' as ColorPreference,
      style: 'Traditional / Ethnic' as StyleType
    },
    {
      name: 'Classic Blue Slim Fit Jeans',
      url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
      category: 'bottom' as ClothingCategory,
      type: 'Jeans' as ClothingType,
      color: 'Blue' as ColorPreference,
      style: 'Casual' as StyleType
    },
    {
      name: 'Chic White Platform Sneakers',
      url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
      category: 'shoes' as ClothingCategory,
      type: 'Sneakers' as ClothingType,
      color: 'White' as ColorPreference,
      style: 'Trendy' as StyleType
    }
  ];

  const handleSelectSample = async (sample: typeof sampleImages[0]) => {
    setImageUrl(sample.url);
    setName(sample.name);
    setIsAnalyzing(true);

    const result = await analyzeClothingImage(sample.url);
    
    setCategory(sample.category || result.category);
    setType(sample.type || result.type);
    setColor(sample.color || result.color);
    setStyle(sample.style || result.style);
    
    setIsAnalyzing(false);
    setIsAiDetected(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

    addWardrobeItem({
      name: name || `${color} ${type}`,
      imageUrl,
      category,
      type,
      color,
      brand: brand || 'Generic',
      size: size || 'M',
      season: ['All season'],
      occasions: ['Casual', 'College', 'Office'],
      styles: [style],
      favorite: false
    });

    setCurrentView('wardrobe');
  };

  return (
    <div className="flex flex-col gap-5 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-font-main">Add New Item</h1>
        <p className="text-xs text-font-sub mt-0.5">
          Upload photo or pick from camera. AI will analyze attributes automatically.
        </p>
      </div>

      {/* Upload Dropzone Area */}
      <div className="w-full rounded-3xl bg-white border-2 border-dashed border-brand-200 p-6 flex flex-col items-center justify-center text-center shadow-soft relative overflow-hidden">
        {imageUrl ? (
          <div className="w-full flex flex-col items-center gap-3">
            <div className="w-40 h-40 rounded-2xl bg-surface-muted border border-surface-border overflow-hidden relative shadow-soft">
              <img src={imageUrl} alt="Uploaded clothing" className="w-full h-full object-cover" />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                  <Loader2 className="w-8 h-8 animate-spin text-brand-300 mb-1" />
                  <span className="text-[10px] font-bold">Analyzing...</span>
                </div>
              )}
            </div>

            <button
              onClick={() => { setImageUrl(''); setIsAiDetected(false); }}
              className="text-xs font-semibold text-brand-500 flex items-center gap-1 hover:underline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Change Photo</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center shadow-soft">
              <Camera className="w-8 h-8" />
            </div>
            
            <div>
              <h3 className="font-bold text-sm text-font-main">Take or Select Clothing Photo</h3>
              <p className="text-xs text-font-sub mt-0.5">Pick a quick sample below to test AI vision detection:</p>
            </div>

            {/* Quick Demo Sample Pickers */}
            <div className="grid grid-cols-4 gap-2 mt-2 w-full max-w-xs">
              {sampleImages.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(s)}
                  className="w-full aspect-square rounded-xl bg-surface-muted border border-surface-border overflow-hidden hover:border-brand-500 transition-all hover:scale-105"
                  title={s.name}
                >
                  <img src={s.url} alt={s.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* AI Detection Banner */}
      {isAiDetected && (
        <div className="w-full rounded-2xl bg-emerald-50 border border-emerald-200 p-3 flex items-center gap-2 text-emerald-800 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>AI vision detected category, color, and style! You can adjust details below before saving.</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSave} className="flex flex-col gap-4 bg-white p-5 rounded-3xl border border-surface-border shadow-soft">
        <div>
          <label className="text-xs font-bold text-font-main block mb-1">Item Title</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Lavender Knitted Cardigan"
            className="w-full py-2.5 px-3.5 rounded-xl border border-surface-border text-xs focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-font-main block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ClothingCategory)}
              className="w-full py-2.5 px-3 rounded-xl border border-surface-border text-xs focus:outline-none focus:border-brand-500 bg-white"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="shoes">Shoes</option>
              <option value="outerwear">Outerwear</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-font-main block mb-1">Color</label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value as ColorPreference)}
              className="w-full py-2.5 px-3 rounded-xl border border-surface-border text-xs focus:outline-none focus:border-brand-500 bg-white"
            >
              {['Black', 'White', 'Blue', 'Green', 'Red', 'Pink', 'Purple', 'Lavender', 'Beige', 'Navy', 'Grey'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-font-main block mb-1">Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value as ClothingType)}
              placeholder="e.g. Shirt, Kurta, Jeans"
              className="w-full py-2.5 px-3.5 rounded-xl border border-surface-border text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-font-main block mb-1">Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as StyleType)}
              className="w-full py-2.5 px-3 rounded-xl border border-surface-border text-xs focus:outline-none focus:border-brand-500 bg-white"
            >
              {['Casual', 'Trendy', 'Minimal', 'Classy', 'Streetwear', 'Smart Casual', 'Traditional / Ethnic'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={!imageUrl}
          className="w-full py-3.5 mt-2 rounded-2xl bg-gradient-purple text-white font-bold text-xs flex items-center justify-center gap-2 shadow-soft hover:brightness-105 disabled:opacity-50 transition-all"
        >
          <Check className="w-4 h-4" />
          <span>Save Clothing Item</span>
        </button>
      </form>
    </div>
  );
};
