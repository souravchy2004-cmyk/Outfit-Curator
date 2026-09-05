export type ClothingCategory = 'top' | 'bottom' | 'shoes' | 'outerwear' | 'dress' | 'accessories';

export type ClothingType = 
  | 'T-shirt' | 'Shirt' | 'Hoodie' | 'Sweater' | 'Jacket' | 'Cardigan'
  | 'Jeans' | 'Trousers' | 'Shorts' | 'Skirt' | 'Pants'
  | 'Sneakers' | 'Formal shoes' | 'Sandals' | 'Loafers' | 'Boots'
  | 'Watch' | 'Bag' | 'Handbag' | 'Backpack' | 'Sunglasses' | 'Belt' | 'Hat'
  | 'Kurta' | 'Saree' | 'Salwar suit' | 'Sherwani' | 'Lehenga' | 'Ethnic wear';

export type ColorPreference = 
  | 'Black' | 'White' | 'Blue' | 'Green' | 'Red' | 'Pink' | 'Purple' 
  | 'Beige' | 'Brown' | 'Grey' | 'Navy' | 'Yellow' | 'Olive' | 'Lavender';

export type Occasion = 
  | 'Casual' | 'College' | 'Office' | 'Party' | 'Formal' | 'Date' 
  | 'Wedding' | 'Meeting' | 'Dinner' | 'Travel' | 'Camping';

export type StyleType = 
  | 'Minimal' | 'Trendy' | 'Streetwear' | 'Classy' | 'Y2K' | 'Boho' 
  | 'Casual' | 'Formal' | 'Smart Casual' | 'Traditional / Ethnic';

export type WeatherCondition = 'Sunny' | 'Cloudy' | 'Rainy' | 'Cold' | 'Hot' | 'Humid';

export type FitPreference = 'Slim' | 'Regular' | 'Oversized' | 'Relaxed';

export type BudgetRange = 'Under ₹500' | '₹500–₹1,000' | '₹1,000–₹2,500' | '₹2,500+';

export interface WardrobeItem {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  category: ClothingCategory;
  type: ClothingType;
  color: ColorPreference;
  brand?: string;
  size?: string;
  season: ('Summer' | 'Winter' | 'Monsoon' | 'All season')[];
  occasions: Occasion[];
  styles: StyleType[];
  pattern?: string;
  material?: string;
  fit?: FitPreference;
  favorite?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isGuest: boolean;
  genderPreference: 'Women' | 'Men' | 'Unisex' | 'Non-binary';
  height?: string;
  bodyType?: string;
  shirtSize?: string;
  tshirtSize?: string;
  trouserSize?: string;
  shoeSize?: string;
  waist?: string;
  preferredFit?: FitPreference;
  stylePreferences: StyleType[];
  colorPreferences: ColorPreference[];
  preferredOccasions: Occasion[];
  preferredWeather: WeatherCondition[];
  subscriptionPlan: 'free' | 'premium' | 'personal_stylist';
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface OutfitOption {
  id: string;
  optionLabel: 'Option A' | 'Option B' | 'Option C';
  title: string;
  top?: WardrobeItem;
  bottom?: WardrobeItem;
  shoes?: WardrobeItem;
  outerwear?: WardrobeItem;
  dress?: WardrobeItem;
  accessories?: WardrobeItem[];
  style: StyleType;
  occasion: Occasion;
  weather: WeatherCondition;
  score: number;
  explanation: string;
  tags: string[];
  visualImageUrl?: string;
  estimatedCost?: string;
  missingItems?: {
    category: ClothingCategory;
    type: string;
    suggestion: string;
  }[];
}

export interface GeneratedOutfit {
  id: string;
  userId: string;
  options: OutfitOption[];
  selectedOptionId?: string;
  occasion: Occasion;
  style: StyleType;
  weather: WeatherCondition;
  createdAt: string;
  saved: boolean;
  worn: boolean;
  liked?: boolean;
  dislikedReason?: string;
}

export interface FeedbackItem {
  id: string;
  userId: string;
  outfitId: string;
  liked: boolean;
  reason?: string;
  createdAt: string;
}

export interface StylistChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  recommendedItems?: WardrobeItem[];
  recommendedOutfit?: OutfitOption;
}

export interface ProductRecommendation {
  id: string;
  name: string;
  brand: string;
  price: string;
  rating: number;
  imageUrl: string;
  purchaseUrl: string;
  category: ClothingCategory;
}

export interface BrandPromotion {
  id: string;
  brandName: string;
  logoUrl: string;
  tagline: string;
  discountCode?: string;
  category: string;
  sponsoredText: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'weather' | 'recommendation' | 'reminder' | 'system';
}
