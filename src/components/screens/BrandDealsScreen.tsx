'use client';

import React from 'react';
import { DEMO_BRANDS, DEMO_PRODUCTS } from '../../data/seedData';
import { Tag, ExternalLink, Sparkles, Star } from 'lucide-react';

export const BrandDealsScreen: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-font-main">Style Deals & Brands</h1>
        <p className="text-xs text-font-sub mt-0.5">
          Curated partner promotions and affordable missing wardrobe pieces.
        </p>
      </div>

      {/* Sponsored Brands Section */}
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-xs text-font-sub uppercase tracking-wider">Sponsored Partner Brands</h3>
        {DEMO_BRANDS.map((b) => (
          <div
            key={b.id}
            className="p-4 rounded-3xl bg-white border border-surface-border shadow-soft flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-surface-muted overflow-hidden shrink-0 border border-surface-border p-1">
                <img src={b.logoUrl} alt={b.brandName} className="w-full h-full object-cover rounded-xl" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {b.sponsoredText}
                </span>
                <h4 className="font-bold text-xs text-font-main mt-1">{b.brandName}</h4>
                <p className="text-[10px] text-font-sub">{b.tagline}</p>
              </div>
            </div>

            {b.discountCode && (
              <div className="bg-brand-50 border border-brand-200 px-3 py-2 rounded-2xl text-center shrink-0">
                <span className="text-[9px] text-brand-600 block">CODE</span>
                <span className="font-extrabold text-xs text-brand-700">{b.discountCode}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Product Recommendations */}
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-xs text-font-sub uppercase tracking-wider">Complete Your Look Recommendations</h3>
        <div className="grid grid-cols-2 gap-3">
          {DEMO_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="p-3 rounded-2xl bg-white border border-surface-border shadow-soft flex flex-col gap-2"
            >
              <div className="w-full aspect-square bg-surface-muted rounded-xl overflow-hidden">
                <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center justify-between text-[10px] font-semibold text-font-sub">
                  <span>{prod.brand}</span>
                  <span className="flex items-center text-amber-500"><Star className="w-3 h-3 fill-amber-500" /> {prod.rating}</span>
                </div>
                <h4 className="font-bold text-xs text-font-main truncate mt-0.5">{prod.name}</h4>
                <span className="font-extrabold text-xs text-brand-500 mt-1 block">{prod.price}</span>
              </div>
              <a
                href={prod.purchaseUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 rounded-xl bg-surface-muted hover:bg-brand-50 text-brand-600 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors mt-1"
              >
                <span>Shop Now</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
