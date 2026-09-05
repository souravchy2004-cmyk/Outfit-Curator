'use client';

import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { ShieldAlert, Users, Shirt, Sparkles, TrendingUp, BarChart3, Database } from 'lucide-react';

export const AdminDashboardScreen: React.FC = () => {
  const { wardrobe, savedOutfits, outfitHistory, feedbacks } = useAppStore();

  return (
    <div className="flex flex-col gap-6 pb-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-full">
              Admin Portal
            </span>
          </div>
          <h1 className="text-2xl font-bold text-font-main mt-1">Platform Analytics</h1>
          <p className="text-xs text-font-sub">Overview of system users, AI recommendations, and feedback metrics</p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-3xl bg-white border border-surface-border shadow-soft">
          <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-2">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold text-font-main">1,248</span>
          <span className="text-[11px] text-font-sub block font-medium">Active Users</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-surface-border shadow-soft">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold text-font-main">14,820</span>
          <span className="text-[11px] text-font-sub block font-medium">AI Outfits Generated</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-surface-border shadow-soft">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
            <Shirt className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold text-font-main">{wardrobe.length + 320}</span>
          <span className="text-[11px] text-font-sub block font-medium">Digitized Clothes</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-surface-border shadow-soft">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold text-font-main">94.8%</span>
          <span className="text-[11px] text-font-sub block font-medium">User Approval Rating</span>
        </div>
      </div>

      {/* Feedback Audit Table */}
      <div className="bg-white p-5 rounded-3xl border border-surface-border shadow-soft">
        <h3 className="font-bold text-xs text-font-main uppercase tracking-wider mb-3">Recent System Feedbacks</h3>
        {feedbacks.length === 0 ? (
          <p className="text-xs text-font-sub italic">No feedback entries recorded yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {feedbacks.map((f) => (
              <div key={f.id} className="p-3 rounded-2xl bg-surface-muted text-xs flex items-center justify-between">
                <div>
                  <span className={`font-bold ${f.liked ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {f.liked ? '👍 Liked Outfit' : '👎 Disliked'}
                  </span>
                  {f.reason && <p className="text-[11px] text-font-sub mt-0.5">Reason: {f.reason}</p>}
                </div>
                <span className="text-[10px] text-font-sub">{new Date(f.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
