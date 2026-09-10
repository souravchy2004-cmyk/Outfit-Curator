'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { askGeminiStylist } from '../../services/ai/geminiService';
import { Sparkles, Send, Bot, User, Loader2, Zap } from 'lucide-react';

export const StylistChatScreen: React.FC = () => {
  const { stylistMessages, addStylistMessage, wardrobe, setCurrentView } = useAppStore();
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiMode, setAiMode] = useState<'live' | 'mock' | null>(null);

  const quickPrompts = [
    "What should I wear to college tomorrow?",
    "How should I style my white shirt?",
    "What should I wear for a dinner date?",
    "Which shoes go with my blue jeans?",
    "Suggest an outfit for rainy weather"
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = {
      id: Math.random().toString(36).substring(2),
      sender: 'user' as const,
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    addStylistMessage(userMsg);
    setInputQuery('');
    setIsTyping(true);

    try {
      // Call Gemini AI via backend /api/gemini route
      const reply = await askGeminiStylist(textToSend, wardrobe);
      
      // Detect mock vs live mode from response
      if (reply.includes('Gemini AI Stylist') || reply.includes('Gemini')) {
        setAiMode('mock');
      } else {
        setAiMode('live');
      }

      const aiMsg = {
        id: Math.random().toString(36).substring(2),
        sender: 'assistant' as const,
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      addStylistMessage(aiMsg);
    } catch (err) {
      const fallback = {
        id: Math.random().toString(36).substring(2),
        sender: 'assistant' as const,
        content: `Based on your ${wardrobe.length} wardrobe items, I recommend a clean, elegant combination. Try your White Kurta or Shirt with Blue Jeans and White Sneakers for a smart casual look! ✨`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      addStylistMessage(fallback);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] justify-between pb-2">
      {/* Header Info */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-purple-subtle border border-brand-100 mb-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-purple text-white flex items-center justify-center shadow-soft shrink-0">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-xs text-font-main">Personal Gemini AI Stylist</h2>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
              aiMode === 'live' 
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                : 'bg-amber-100 text-amber-700 border border-amber-200'
            }`}>
              {aiMode === 'live' ? '⚡ Gemini Live' : '🤖 Smart Mode'}
            </span>
          </div>
          <p className="text-[10px] text-font-sub">Powered by Google Gemini • {wardrobe.length} wardrobe items trained</p>
        </div>
      </div>

      {/* Gemini Key Hint Banner */}
      <div className="mb-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2">
        <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-800 leading-relaxed">
          <b>Activate Live Gemini AI:</b> Add <code className="bg-amber-100 px-1 rounded">GEMINI_API_KEY=your_key</code> to <code className="bg-amber-100 px-1 rounded">.env</code> file and restart backend. Get key free at <b>aistudio.google.com</b>
        </p>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
        {stylistMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white ${
              msg.sender === 'user' ? 'bg-brand-500' : 'bg-gradient-purple'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-gradient-purple text-white rounded-tr-none shadow-soft'
                : 'bg-white text-font-main rounded-tl-none border border-surface-border shadow-soft'
            }`}>
              <p>{msg.content}</p>

              {msg.recommendedItems && msg.recommendedItems.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-gray-100">
                  {msg.recommendedItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setCurrentView('wardrobe')}
                      className="p-1.5 rounded-xl bg-surface-muted border border-surface-border flex items-center gap-2 cursor-pointer hover:border-brand-300"
                    >
                      <img src={item.imageUrl} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold truncate text-font-main">{item.name}</p>
                        <p className="text-[9px] text-font-sub">{item.color}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <span className="block text-[9px] opacity-70 mt-1 text-right">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 mr-auto bg-white p-3 rounded-2xl border border-surface-border shadow-soft">
            <Loader2 className="w-4 h-4 text-brand-500 animate-spin" />
            <span className="text-xs text-font-sub italic">Gemini AI is thinking...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts & Input Bar */}
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="py-1.5 px-3 rounded-full bg-white border border-surface-border text-[10px] font-semibold text-brand-600 shrink-0 hover:bg-brand-50 transition-colors shadow-xs"
            >
              ✨ {qp}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask Gemini AI anything about your style..."
            className="flex-1 py-3 px-4 rounded-2xl bg-white border border-surface-border text-xs focus:outline-none focus:border-brand-500 shadow-soft"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="w-11 h-11 rounded-2xl bg-gradient-purple text-white flex items-center justify-center disabled:opacity-40 hover:brightness-105 shadow-soft shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
