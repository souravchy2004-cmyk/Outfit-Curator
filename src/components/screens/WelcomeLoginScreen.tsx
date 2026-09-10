'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { Sparkles, Mail, UserCheck, Lock, ArrowRight, UserPlus, LogIn, Users } from 'lucide-react';

export const WelcomeLoginScreen: React.FC = () => {
  const { 
    loginAsGuest, 
    loginWithPassword, 
    signUpWithEmail, 
    registeredUsers, 
    switchUserAccount,
    setCurrentView 
  } = useAppStore();

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) return;

    if (isSignUp) {
      if (!name) {
        setErrorMsg('Please enter your full name');
        return;
      }
      const success = signUpWithEmail(name, email, password);
      if (!success) {
        setErrorMsg('An account with this email already exists');
        return;
      }
      setShowEmailModal(false);
    } else {
      const res = loginWithPassword(email, password);
      if (!res.success) {
        setErrorMsg(res.message || 'Invalid login credentials');
        return;
      }
      setShowEmailModal(false);
    }
  };

  const handleSelectQuickUser = (userId: string) => {
    switchUserAccount(userId);
  };

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Top Header Graphic */}
      <div className="flex flex-col items-center text-center pt-6 z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-purple flex items-center justify-center text-white shadow-soft-lg mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <span className="text-xs font-semibold text-brand-500 tracking-wide uppercase px-3 py-1 rounded-full bg-brand-50 border border-brand-100">
          Outfit Curator AI
        </span>
        <h1 className="text-2xl font-bold text-font-main mt-3">
          Sign In or Create Account
        </h1>
        <p className="text-xs text-font-sub max-w-xs mt-1">
          Create your personalized AI wardrobe account with Name & Password.
        </p>
      </div>

      {/* Account Switcher Section */}
      <div className="w-full max-w-xs mx-auto my-4 z-10 bg-white p-4 rounded-3xl border border-surface-border shadow-soft">
        <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-brand-500 uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          <span>Quick Switch Accounts</span>
        </div>
        <div className="flex flex-col gap-2">
          {registeredUsers.map((u) => (
            <button
              key={u.id}
              onClick={() => handleSelectQuickUser(u.id)}
              className="p-2 rounded-2xl bg-surface-muted border border-surface-border flex items-center justify-between hover:border-brand-300 transition-all text-left group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img src={u.avatarUrl} alt={u.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-font-main truncate group-hover:text-brand-500">{u.name}</h4>
                  <p className="text-[10px] text-font-sub truncate">{u.email}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full shrink-0">
                Login →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Login Buttons */}
      <div className="w-full max-w-xs mx-auto flex flex-col gap-3 my-2 z-10">
        {/* Email/Password Auth */}
        <button
          onClick={() => { setIsSignUp(false); setErrorMsg(''); setShowEmailModal(true); }}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-purple text-white font-semibold text-sm flex items-center justify-center gap-3 shadow-soft hover:brightness-105 transition-all"
        >
          <LogIn className="w-5 h-5" />
          <span>Sign In with Password</span>
        </button>

        <button
          onClick={() => { setIsSignUp(true); setErrorMsg(''); setShowEmailModal(true); }}
          className="w-full py-3 px-4 rounded-2xl bg-white border border-brand-200 text-brand-600 font-bold text-xs flex items-center justify-center gap-2 hover:bg-brand-50 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Create New Account</span>
        </button>

        <div className="flex items-center my-0.5">
          <div className="flex-1 h-px bg-surface-border" />
          <span className="px-3 text-[10px] font-medium text-font-sub">OR</span>
          <div className="flex-1 h-px bg-surface-border" />
        </div>

        {/* Guest Auth */}
        <button
          onClick={() => { loginAsGuest(); setCurrentView('home'); }}
          className="w-full py-2.5 px-4 rounded-2xl bg-surface-muted border border-surface-border font-medium text-font-main text-xs flex items-center justify-center gap-2 hover:bg-brand-50 transition-all"
        >
          <UserCheck className="w-4 h-4 text-brand-500" />
          <span>Continue as Guest</span>
        </button>
      </div>

      <div className="text-center z-10 pb-4">
        <p className="text-[10px] text-font-sub">
          Outfit Curator • Powered by Gemini AI
        </p>
      </div>

      {/* Email / Password Sign In / Sign Up Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-soft-lg border border-surface-border flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-font-main">
                {isSignUp ? 'Create New Account' : 'Sign In'}
              </h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-gray-400 hover:text-font-main text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleEmailAuth} className="flex flex-col gap-3">
              {isSignUp && (
                <div>
                  <label className="text-xs font-semibold text-font-sub block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full py-2.5 px-3.5 rounded-xl border border-surface-border text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-font-sub block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full py-2.5 px-3.5 rounded-xl border border-surface-border text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-font-sub block mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full py-2.5 px-3.5 rounded-xl border border-surface-border text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 rounded-xl bg-gradient-purple text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-soft hover:brightness-105 transition-all"
              >
                <span>{isSignUp ? 'Create Account & Start' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-xs text-font-sub border-t border-surface-border pt-3">
              <button
                type="button"
                onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); }}
                className="text-brand-500 font-semibold hover:underline"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
