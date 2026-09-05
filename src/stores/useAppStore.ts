import { create } from 'zustand';
import { 
  UserProfile, 
  WardrobeItem, 
  GeneratedOutfit, 
  OutfitOption, 
  Occasion, 
  StyleType, 
  WeatherCondition, 
  FeedbackItem, 
  StylistChatMessage,
  ClothingCategory,
  AppNotification
} from '../types';
import { DEFAULT_USER, DEMO_WARDROBE } from '../data/seedData';
import { generateId } from '../lib/utils';
import { generateOutfitOptions } from '../services/ai/outfitGenerator';

export type AppView = 
  | 'splash'
  | 'login'
  | 'onboarding'
  | 'home'
  | 'wardrobe'
  | 'add-item'
  | 'preferences'
  | 'generating'
  | 'result'
  | 'outfit-details'
  | 'saved'
  | 'profile'
  | 'history'
  | 'stylist'
  | 'premium'
  | 'settings'
  | 'measurements'
  | 'brands'
  | 'admin';

interface AppState {
  // Navigation & Shell
  currentView: AppView;
  activeTab: 'home' | 'wardrobe' | 'outfits' | 'profile';
  setCurrentView: (view: AppView) => void;
  setActiveTab: (tab: 'home' | 'wardrobe' | 'outfits' | 'profile') => void;

  // Auth & Profile
  user: UserProfile;
  isAuthenticated: boolean;
  setUser: (user: UserProfile) => void;
  loginAsGuest: () => void;
  loginWithEmail: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;

  // Wardrobe Management
  wardrobe: WardrobeItem[];
  selectedCategoryFilter: ClothingCategory | 'all';
  setCategoryFilter: (category: ClothingCategory | 'all') => void;
  addWardrobeItem: (item: Omit<WardrobeItem, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  updateWardrobeItem: (id: string, updates: Partial<WardrobeItem>) => void;
  deleteWardrobeItem: (id: string) => void;
  toggleFavoriteItem: (id: string) => void;

  // Style Preferences & Generation State
  selectedOccasion: Occasion;
  selectedStyle: StyleType;
  selectedWeather: WeatherCondition;
  selectedBudget: string;
  selectedColor: string;
  selectedFit: string;
  setSelectedOccasion: (occ: Occasion) => void;
  setSelectedStyle: (st: StyleType) => void;
  setSelectedWeather: (w: WeatherCondition) => void;
  setSelectedBudget: (b: string) => void;
  setSelectedColor: (c: string) => void;

  // Generated & Saved Outfits
  currentGeneratedOutfit: GeneratedOutfit | null;
  selectedOutfitOption: OutfitOption | null;
  savedOutfits: GeneratedOutfit[];
  outfitHistory: GeneratedOutfit[];
  generateNewOutfit: () => void;
  selectOutfitOption: (option: OutfitOption) => void;
  saveCurrentOutfit: () => void;
  deleteSavedOutfit: (id: string) => void;
  markOutfitAsWorn: (id: string) => void;
  replaceItemInOutfitOption: (category: ClothingCategory, newItem: WardrobeItem) => void;

  // Feedback
  feedbacks: FeedbackItem[];
  submitFeedback: (outfitId: string, liked: boolean, reason?: string) => void;

  // AI Stylist Chat
  stylistMessages: StylistChatMessage[];
  addStylistMessage: (msg: StylistChatMessage) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Navigation
  currentView: 'home',
  activeTab: 'home',
  setCurrentView: (view) => set({ currentView: view }),
  setActiveTab: (tab) => {
    set({ activeTab: tab });
    if (tab === 'home') set({ currentView: 'home' });
    else if (tab === 'wardrobe') set({ currentView: 'wardrobe' });
    else if (tab === 'outfits') set({ currentView: 'saved' });
    else if (tab === 'profile') set({ currentView: 'profile' });
  },

  // User Auth
  user: DEFAULT_USER,
  isAuthenticated: true,
  setUser: (user) => set({ user }),
  loginAsGuest: () => set({
    user: {
      ...DEFAULT_USER,
      id: `guest-${Date.now()}`,
      name: 'Guest Fashionista',
      email: 'guest@outfitcurator.app',
      isGuest: true
    },
    isAuthenticated: true,
    currentView: 'home'
  }),
  loginWithEmail: (email, name) => set({
    user: {
      ...DEFAULT_USER,
      name: name || email.split('@')[0],
      email,
      isGuest: false
    },
    isAuthenticated: true,
    currentView: 'home'
  }),
  logout: () => set({
    isAuthenticated: false,
    currentView: 'login'
  }),
  updateProfile: (updates) => set((state) => ({
    user: { ...state.user, ...updates }
  })),

  // Wardrobe
  wardrobe: DEMO_WARDROBE,
  selectedCategoryFilter: 'all',
  setCategoryFilter: (cat) => set({ selectedCategoryFilter: cat }),
  addWardrobeItem: (itemData) => set((state) => {
    const newItem: WardrobeItem = {
      ...itemData,
      id: generateId(),
      userId: state.user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return { wardrobe: [newItem, ...state.wardrobe] };
  }),
  updateWardrobeItem: (id, updates) => set((state) => ({
    wardrobe: state.wardrobe.map(i => i.id === id ? { ...i, ...updates, updatedAt: new Date().toISOString() } : i)
  })),
  deleteWardrobeItem: (id) => set((state) => ({
    wardrobe: state.wardrobe.filter(i => i.id !== id)
  })),
  toggleFavoriteItem: (id) => set((state) => ({
    wardrobe: state.wardrobe.map(i => i.id === id ? { ...i, favorite: !i.favorite } : i)
  })),

  // Preferences
  selectedOccasion: 'College',
  selectedStyle: 'Trendy',
  selectedWeather: 'Sunny',
  selectedBudget: '₹1,000–₹2,500',
  selectedColor: 'Lavender',
  selectedFit: 'Regular',
  setSelectedOccasion: (occ) => set({ selectedOccasion: occ }),
  setSelectedStyle: (st) => set({ selectedStyle: st }),
  setSelectedWeather: (w) => set({ selectedWeather: w }),
  setSelectedBudget: (b) => set({ selectedBudget: b }),
  setSelectedColor: (c) => set({ selectedColor: c }),

  // Generated & Saved Outfits
  currentGeneratedOutfit: null,
  selectedOutfitOption: null,
  savedOutfits: [],
  outfitHistory: [],
  
  generateNewOutfit: () => {
    const state = get();
    set({ currentView: 'generating' });

    setTimeout(() => {
      const outfit = generateOutfitOptions({
        userId: state.user.id,
        wardrobe: state.wardrobe,
        occasion: state.selectedOccasion,
        style: state.selectedStyle,
        weather: state.selectedWeather,
        budget: state.selectedBudget,
        feedbackHistory: state.feedbacks
      });

      set({
        currentGeneratedOutfit: outfit,
        selectedOutfitOption: outfit.options[0],
        outfitHistory: [outfit, ...state.outfitHistory],
        currentView: 'result'
      });
    }, 1500);
  },

  selectOutfitOption: (option) => set((state) => ({
    selectedOutfitOption: option,
    currentGeneratedOutfit: state.currentGeneratedOutfit ? {
      ...state.currentGeneratedOutfit,
      selectedOptionId: option.id
    } : null
  })),

  saveCurrentOutfit: () => set((state) => {
    if (!state.currentGeneratedOutfit) return state;
    const updated = { ...state.currentGeneratedOutfit, saved: true };
    const exists = state.savedOutfits.some(o => o.id === updated.id);
    return {
      currentGeneratedOutfit: updated,
      savedOutfits: exists ? state.savedOutfits : [updated, ...state.savedOutfits]
    };
  }),

  deleteSavedOutfit: (id) => set((state) => ({
    savedOutfits: state.savedOutfits.filter(o => o.id !== id)
  })),

  markOutfitAsWorn: (id) => set((state) => ({
    savedOutfits: state.savedOutfits.map(o => o.id === id ? { ...o, worn: true } : o),
    outfitHistory: state.outfitHistory.map(o => o.id === id ? { ...o, worn: true } : o)
  })),

  replaceItemInOutfitOption: (category, newItem) => set((state) => {
    if (!state.selectedOutfitOption || !state.currentGeneratedOutfit) return state;

    const updatedOption: OutfitOption = {
      ...state.selectedOutfitOption,
      [category === 'top' ? 'top' : category === 'bottom' ? 'bottom' : category === 'shoes' ? 'shoes' : 'outerwear']: newItem
    };

    const updatedOptions = state.currentGeneratedOutfit.options.map(opt => 
      opt.id === updatedOption.id ? updatedOption : opt
    );

    return {
      selectedOutfitOption: updatedOption,
      currentGeneratedOutfit: {
        ...state.currentGeneratedOutfit,
        options: updatedOptions
      }
    };
  }),

  // Feedback
  feedbacks: [],
  submitFeedback: (outfitId, liked, reason) => set((state) => {
    const newFeedback: FeedbackItem = {
      id: generateId(),
      userId: state.user.id,
      outfitId,
      liked,
      reason,
      createdAt: new Date().toISOString()
    };
    return {
      feedbacks: [newFeedback, ...state.feedbacks],
      currentGeneratedOutfit: state.currentGeneratedOutfit?.id === outfitId ? {
        ...state.currentGeneratedOutfit,
        liked,
        dislikedReason: reason
      } : state.currentGeneratedOutfit
    };
  }),

  // AI Stylist Chat
  stylistMessages: [
    {
      id: 'msg-welcome',
      sender: 'assistant',
      content: "Hello Sakshi! 👋 I'm your Personal AI Stylist. Ask me anything about what to wear today, how to style a piece from your wardrobe, or outfit ideas for any occasion!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ],
  addStylistMessage: (msg) => set((state) => ({
    stylistMessages: [...state.stylistMessages, msg]
  })),

  // Notifications
  notifications: [
    {
      id: 'notif-1',
      title: 'Good Morning! ☀️',
      message: 'It is 28°C and sunny in Mumbai today. Tap to get your outfit for college!',
      timestamp: 'Today, 8:00 AM',
      read: false,
      type: 'weather'
    },
    {
      id: 'notif-2',
      title: 'New AI Style Tip ✨',
      message: 'Try pairing your White Kurta with Blue Jeans for a chic Indo-Western look.',
      timestamp: 'Yesterday',
      read: true,
      type: 'recommendation'
    }
  ],
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  }))
}));
