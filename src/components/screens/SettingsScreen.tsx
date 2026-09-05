'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Settings, Globe, Bell, Shield, Moon, HelpCircle, ChevronRight, Check } from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { user, updateProfile } = useAppStore();
  const [language, setLanguage] = useState<'English' | 'Hindi'>('English');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="flex flex-col gap-6 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-font-main">Settings</h1>
        <p className="text-xs text-font-sub mt-0.5">
          Manage your app preferences, language, and notifications
        </p>
      </div>

      {/* Language Selector */}
      <div className="bg-white p-5 rounded-3xl border border-surface-border shadow-soft">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-brand-500" />
          <h3 className="font-bold text-xs text-font-main uppercase tracking-wider">Language Settings</h3>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {(['English', 'Hindi'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`py-3 px-4 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all ${
                language === lang
                  ? 'bg-gradient-purple text-white border-transparent shadow-soft'
                  : 'bg-surface-muted text-font-main border-surface-border hover:border-brand-200'
              }`}
            >
              <span>{lang === 'English' ? 'English (US)' : 'हिन्दी (Hindi)'}</span>
              {language === lang && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications Switch */}
      <div className="bg-white p-5 rounded-3xl border border-surface-border shadow-soft flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
            <Bell className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-font-main">Daily Outfit Reminders</h4>
            <p className="text-[10px] text-font-sub">Receive morning weather & style recommendations</p>
          </div>
        </div>

        <button
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          className={`w-12 h-6 rounded-full transition-colors p-0.5 relative ${
            notificationsEnabled ? 'bg-brand-500' : 'bg-gray-300'
          }`}
        >
          <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
            notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
          }`} />
        </button>
      </div>

      {/* Security & Support Links */}
      <div className="bg-white rounded-3xl border border-surface-border shadow-soft overflow-hidden divide-y divide-surface-border">
        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-surface-muted">
          <div className="flex items-center gap-3">
            <Shield className="w-4.5 h-4.5 text-brand-500" />
            <span className="text-xs font-semibold text-font-main">Privacy & Data Permissions</span>
          </div>
          <ChevronRight className="w-4 h-4 text-font-sub" />
        </div>

        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-surface-muted">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4.5 h-4.5 text-brand-500" />
            <span className="text-xs font-semibold text-font-main">Feedback & Customer Support</span>
          </div>
          <ChevronRight className="w-4 h-4 text-font-sub" />
        </div>
      </div>
    </div>
  );
};
