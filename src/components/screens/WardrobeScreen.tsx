'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { ClothingCategory } from '../../types';
import { Plus, Search, Heart, Trash2, Sparkles, Filter, Shirt } from 'lucide-react';

export const WardrobeScreen: React.FC = () => {
  const { 
    wardrobe, 
    selectedCategoryFilter, 
    setCategoryFilter, 
    toggleFavoriteItem, 
    deleteWardrobeItem, 
    setCurrentView 
  } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');

  const categories: { key: ClothingCategory | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'top', label: 'Tops' },
    { key: 'bottom', label: 'Bottoms' },
    { key: 'shoes', label: 'Shoes' },
    { key: 'outerwear', label: 'Outerwear' },
    { key: 'accessories', label: 'Accessories' },
  ];

  const filteredWardrobe = wardrobe.filter((item) => {
    const matchesCategory = selectedCategoryFilter === 'all' || item.category === selectedCategoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.color.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-5 pb-6">
      {/* Header & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-font-main">My Wardrobe</h1>
          <p className="text-xs text-font-sub mt-0.5">
            {wardrobe.length} digital clothing items
          </p>
        </div>

        <button
          onClick={() => setCurrentView('add-item')}
          className="py-2.5 px-4 rounded-2xl bg-gradient-purple text-white font-semibold text-xs flex items-center gap-1.5 shadow-soft hover:brightness-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Item</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-font-sub absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by color, item name, type..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-surface-border text-xs focus:outline-none focus:border-brand-500 shadow-soft"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const count = cat.key === 'all' 
            ? wardrobe.length 
            : wardrobe.filter(i => i.category === cat.key).length;

          return (
            <button
              key={cat.key}
              onClick={() => setCategoryFilter(cat.key)}
              className={`py-2 px-3.5 rounded-2xl text-xs font-semibold shrink-0 transition-all ${
                selectedCategoryFilter === cat.key
                  ? 'bg-gradient-purple text-white shadow-soft'
                  : 'bg-white text-font-main border border-surface-border hover:border-brand-200'
              }`}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid of Items or Empty State */}
      {filteredWardrobe.length === 0 ? (
        <div className="w-full py-12 px-4 rounded-3xl bg-white border border-surface-border text-center flex flex-col items-center justify-center gap-3 shadow-soft my-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center">
            <Shirt className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-base text-font-main">
            {searchQuery ? 'No matching clothing items' : 'Your wardrobe is empty'}
          </h3>
          <p className="text-xs text-font-sub max-w-xs">
            {searchQuery 
              ? 'Try adjusting your search query or category filter.' 
              : 'Add your first clothing item and let AI create your first outfit look.'}
          </p>
          <button
            onClick={() => setCurrentView('add-item')}
            className="mt-2 py-3 px-5 rounded-2xl bg-gradient-purple text-white font-semibold text-xs flex items-center gap-2 shadow-soft hover:brightness-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add Clothes</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
          {filteredWardrobe.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-surface-border overflow-hidden shadow-soft flex flex-col group relative"
            >
              {/* Image Preview Container */}
              <div className="w-full aspect-square bg-surface-muted relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Favorite Heart Button */}
                <button
                  onClick={() => toggleFavoriteItem(item.id)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-rose-500 hover:scale-110 transition-transform shadow-sm"
                  aria-label="Favorite item"
                >
                  <Heart className={`w-4 h-4 ${item.favorite ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
                </button>

                {/* Color Tag Badge */}
                <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-sm">
                  {item.color}
                </span>

                {/* Category Tag */}
                <span className="absolute bottom-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-500 text-white backdrop-blur-sm capitalize">
                  {item.category}
                </span>
              </div>

              {/* Item Info */}
              <div className="p-3 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-bold text-xs text-font-main line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-font-sub mt-0.5">
                    {item.brand ? `${item.brand} • ` : ''}{item.type}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-surface-border">
                  <span className="text-[9px] font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                    {item.styles[0] || 'Casual'}
                  </span>

                  <button
                    onClick={() => deleteWardrobeItem(item.id)}
                    className="text-gray-400 hover:text-rose-500 p-1 transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
