'use client';

import React from 'react';
import { useAppStore } from '../stores/useAppStore';
import { AppShell } from '../components/layout/AppShell';

import { SplashOnboardingScreen } from '../components/screens/SplashOnboardingScreen';
import { WelcomeLoginScreen } from '../components/screens/WelcomeLoginScreen';
import { UserOnboardingScreen } from '../components/screens/UserOnboardingScreen';
import { HomeScreen } from '../components/screens/HomeScreen';
import { WardrobeScreen } from '../components/screens/WardrobeScreen';
import { AddClothingScreen } from '../components/screens/AddClothingScreen';
import { StylePreferencesScreen } from '../components/screens/StylePreferencesScreen';
import { OutfitGenerationScreen } from '../components/screens/OutfitGenerationScreen';
import { OutfitResultScreen } from '../components/screens/OutfitResultScreen';
import { OutfitDetailsScreen } from '../components/screens/OutfitDetailsScreen';
import { SavedOutfitsScreen } from '../components/screens/SavedOutfitsScreen';
import { ProfileScreen } from '../components/screens/ProfileScreen';
import { StylistChatScreen } from '../components/screens/StylistChatScreen';
import { PremiumScreen } from '../components/screens/PremiumScreen';
import { OutfitHistoryScreen } from '../components/screens/OutfitHistoryScreen';
import { BrandDealsScreen } from '../components/screens/BrandDealsScreen';
import { SettingsScreen } from '../components/screens/SettingsScreen';
import { MeasurementsScreen } from '../components/screens/MeasurementsScreen';
import { AdminDashboardScreen } from '../components/screens/AdminDashboardScreen';

export default function MainPage() {
  const { currentView } = useAppStore();

  const renderScreen = () => {
    switch (currentView) {
      case 'splash':
        return <SplashOnboardingScreen />;
      case 'login':
        return <WelcomeLoginScreen />;
      case 'onboarding':
        return <UserOnboardingScreen />;
      case 'home':
        return <HomeScreen />;
      case 'wardrobe':
        return <WardrobeScreen />;
      case 'add-item':
        return <AddClothingScreen />;
      case 'preferences':
        return <StylePreferencesScreen />;
      case 'generating':
        return <OutfitGenerationScreen />;
      case 'result':
        return <OutfitResultScreen />;
      case 'outfit-details':
        return <OutfitDetailsScreen />;
      case 'saved':
        return <SavedOutfitsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'stylist':
        return <StylistChatScreen />;
      case 'premium':
        return <PremiumScreen />;
      case 'history':
        return <OutfitHistoryScreen />;
      case 'brands':
        return <BrandDealsScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'measurements':
        return <MeasurementsScreen />;
      case 'admin':
        return <AdminDashboardScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return <AppShell>{renderScreen()}</AppShell>;
}
