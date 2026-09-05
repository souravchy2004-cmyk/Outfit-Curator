'use client';

import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { 
  Shirt, Heart, History, Sparkles, Crown, Settings, 
  Ruler, Tag, LogOut, ChevronRight, MessageSquare 
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { user, wardrobe, savedOutfits, outfitHistory, logout, setCurrentView } = useAppStore();

  const menuItems = [
    { label: 'My Digital Wardrobe', icon: Shirt, count: `${wardrobe.length} Items`, action: () => setCurrentView('wardrobe') },
    { label: 'Saved Outfits', icon: Heart, count: `${savedOutfits.length} Saved`, action: () => setCurrentView('saved') },
    { label: 'Outfit History & Logs', icon: History, count: `${outfitHistory.length} Looks`, action: () => setCurrentView('history') },
    { label: 'Personal AI Stylist Chat', icon: Sparkles, badge: 'AI', action: () => setCurrentView('stylist') },
    { label: 'My Body Measurements & Sizes', icon: Ruler, action: () => setCurrentView('measurements') },
    { label: 'Style Deals & Brand Offers', icon: Tag, badge: 'Deals', action: () => setCurrentView('brands') },
    { label: 'Upgrade to Curator Premium', icon: Crown, badge: user.subscriptionPlan === 'free' ? 'Upgrade' : 'Pro Active', action: () => setCurrentView('premium') },
    { label: 'Account Settings & Language', icon: Settings, action: () => setCurrentView('settings') },
  ];

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* User Header Profile Card */}
      <div className="w-full rounded-3xl bg-white border border-surface-border p-5 shadow-soft flex items-center gap-4">
        <div className="w-16 h-16 rounded-full border-2 border-brand-500 overflow-hidden shadow-soft shrink-0">
          <img 
            src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} 
            alt={user.name} 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-base text-font-main truncate">{user.name}</h2>
            {user.subscriptionPlan === 'free' ? (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Free</span>
            ) : (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gradient-purple text-white">PRO</span>
            )}
          </div>
          <p className="text-xs text-font-sub truncate">{user.email}</p>
          <span className="inline-block text-[10px] font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full mt-1">
            {user.genderPreference} • Style: {user.stylePreferences[0] || 'Casual'}
          </span>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-surface-border text-center shadow-soft">
          <span className="block font-extrabold text-lg text-brand-500">{savedOutfits.length}</span>
          <span className="text-[10px] font-semibold text-font-sub">Saved Outfits</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-surface-border text-center shadow-soft">
          <span className="block font-extrabold text-lg text-brand-500">{wardrobe.length}</span>
          <span className="text-[10px] font-semibold text-font-sub">Wardrobe Items</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-surface-border text-center shadow-soft">
          <span className="block font-extrabold text-lg text-brand-500">{outfitHistory.length}</span>
          <span className="text-[10px] font-semibold text-font-sub">Looks Created</span>
        </div>
      </div>

      {/* Menu List */}
      <div className="w-full bg-white rounded-3xl border border-surface-border shadow-soft overflow-hidden divide-y divide-surface-border">
        {menuItems.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <button
              key={idx}
              onClick={item.action}
              className="w-full p-4 flex items-center justify-between hover:bg-surface-muted transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <IconComp className="w-4.5 h-4.5" />
                </div>
                <span className="text-xs font-semibold text-font-main">{item.label}</span>
              </div>

              <div className="flex items-center gap-2">
                {item.count && (
                  <span className="text-[11px] text-font-sub font-medium">{item.count}</span>
                )}
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-purple text-white">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-font-sub group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full py-3.5 px-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Log Out Account</span>
      </button>
    </div>
  );
};
