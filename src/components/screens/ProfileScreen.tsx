'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { 
  Shirt, Heart, History, Sparkles, Crown, Settings, 
  Ruler, Tag, LogOut, ChevronRight, UserPlus, Users, CloudSun 
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { 
    user, 
    registeredUsers, 
    switchUserAccount, 
    wardrobe, 
    savedOutfits, 
    outfitHistory, 
    currentWeather,
    logout, 
    setCurrentView 
  } = useAppStore();

  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const menuItems = [
    { label: 'My Digital Wardrobe', icon: Shirt, count: `${wardrobe.length} Items`, action: () => setCurrentView('wardrobe') },
    { label: 'Saved Outfits', icon: Heart, count: `${savedOutfits.length} Saved`, action: () => setCurrentView('saved') },
    { label: 'Outfit History & Logs', icon: History, count: `${outfitHistory.length} Looks`, action: () => setCurrentView('history') },
    { label: 'Personal Gemini AI Stylist', icon: Sparkles, badge: 'Gemini AI', action: () => setCurrentView('stylist') },
    { label: 'Weather Settings & Location', icon: CloudSun, badge: currentWeather.city, action: () => setCurrentView('home') },
    { label: 'My Body Measurements & Sizes', icon: Ruler, action: () => setCurrentView('measurements') },
    { label: 'Style Deals & Brand Offers', icon: Tag, badge: 'Deals', action: () => setCurrentView('brands') },
    { label: 'Upgrade to Curator Premium', icon: Crown, badge: user.subscriptionPlan === 'free' ? 'Upgrade' : 'Pro Active', action: () => setCurrentView('premium') },
    { label: 'Account Settings & Language', icon: Settings, action: () => setCurrentView('settings') },
  ];

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* User Profile Card */}
      <div className="w-full rounded-3xl bg-white border border-surface-border p-5 shadow-soft flex items-center justify-between gap-3">
        <div className="flex items-center gap-3.5 min-w-0">
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

        <button
          onClick={() => setShowSwitchModal(true)}
          className="p-2.5 rounded-2xl bg-surface-muted border border-surface-border text-brand-600 hover:bg-brand-50 transition-colors flex flex-col items-center shrink-0"
          title="Switch User Account"
        >
          <Users className="w-4 h-4 text-brand-500" />
          <span className="text-[9px] font-bold mt-0.5">Switch</span>
        </button>
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

      {/* Switch Account & Logout Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setCurrentView('login')}
          className="py-3 px-4 rounded-2xl bg-white border border-brand-200 text-brand-600 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-brand-50 transition-colors shadow-soft"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add / Switch User</span>
        </button>

        <button
          onClick={logout}
          className="py-3 px-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Switch Account Modal */}
      {showSwitchModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-soft-lg border border-surface-border flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-font-main flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-500" />
                <span>Switch User Account</span>
              </h3>
              <button
                onClick={() => setShowSwitchModal(false)}
                className="text-gray-400 hover:text-font-main text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {registeredUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    switchUserAccount(u.id);
                    setShowSwitchModal(false);
                  }}
                  className={`p-3 rounded-2xl border flex items-center justify-between text-left transition-all ${
                    u.id === user.id
                      ? 'border-brand-500 bg-brand-50/70 font-bold'
                      : 'border-surface-border bg-surface-muted hover:border-brand-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={u.avatarUrl} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-font-main">{u.name}</h4>
                      <p className="text-[10px] text-font-sub">{u.email}</p>
                    </div>
                  </div>
                  {u.id === user.id && (
                    <span className="text-[10px] font-bold text-brand-600 bg-white px-2 py-0.5 rounded-full border border-brand-200">
                      Active
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setShowSwitchModal(false);
                setCurrentView('login');
              }}
              className="w-full py-2.5 rounded-xl bg-surface-muted hover:bg-brand-50 text-brand-600 font-bold text-xs flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create / Login Another Account</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
