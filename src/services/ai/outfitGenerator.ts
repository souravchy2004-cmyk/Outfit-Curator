import { WardrobeItem, OutfitOption, GeneratedOutfit, Occasion, StyleType, WeatherCondition, FeedbackItem } from '../../types';
import { generateId } from '../../lib/utils';

export interface GenerateOutfitParams {
  userId: string;
  wardrobe: WardrobeItem[];
  occasion: Occasion;
  style: StyleType;
  weather: WeatherCondition;
  budget?: string;
  colorPreference?: string;
  fitPreference?: string;
  feedbackHistory?: FeedbackItem[];
}

// Color compatibility matrix
const COLOR_COMPATIBILITY: Record<string, string[]> = {
  White: ['Black', 'Blue', 'Beige', 'Navy', 'Grey', 'Lavender', 'Pink', 'Red', 'Green'],
  Black: ['White', 'Blue', 'Beige', 'Grey', 'Red', 'Pink', 'Lavender', 'Navy'],
  Blue: ['White', 'Black', 'Beige', 'Grey', 'Lavender', 'Navy'],
  Beige: ['White', 'Black', 'Blue', 'Navy', 'Brown'],
  Lavender: ['White', 'Blue', 'Beige', 'Black', 'Grey'],
  Pink: ['White', 'Blue', 'Black', 'Beige'],
  Navy: ['White', 'Beige', 'Blue', 'Grey', 'Black'],
  Grey: ['White', 'Black', 'Blue', 'Pink', 'Lavender'],
};

export function generateOutfitOptions(params: GenerateOutfitParams): GeneratedOutfit {
  const { userId, wardrobe, occasion, style, weather } = params;

  // Filter items by category
  const tops = wardrobe.filter(item => item.category === 'top');
  const bottoms = wardrobe.filter(item => item.category === 'bottom');
  const shoes = wardrobe.filter(item => item.category === 'shoes');
  const outerwears = wardrobe.filter(item => item.category === 'outerwear');
  const accessoriesList = wardrobe.filter(item => item.category === 'accessories');

  // Fallback safety if wardrobe is empty or limited
  const defaultTop = tops[0];
  const defaultBottom = bottoms[0];
  const defaultShoe = shoes[0];

  // Helper score function for an item combination
  const calculateComboScore = (
    top?: WardrobeItem, 
    bottom?: WardrobeItem, 
    shoe?: WardrobeItem,
    outer?: WardrobeItem
  ): { score: number; tags: string[]; explanation: string } => {
    let score = 70; // Base score
    const tags: string[] = [style, occasion];

    if (top) {
      if (top.occasions.includes(occasion)) score += 8;
      if (top.styles.includes(style)) score += 8;
    }
    if (bottom) {
      if (bottom.occasions.includes(occasion)) score += 8;
      if (bottom.styles.includes(style)) score += 8;
    }
    if (shoe) {
      if (shoe.occasions.includes(occasion)) score += 6;
      if (shoe.styles.includes(style)) score += 6;
    }

    // Color harmony score
    if (top && bottom) {
      const topCompatibleColors = COLOR_COMPATIBILITY[top.color] || ['White', 'Black'];
      if (topCompatibleColors.includes(bottom.color) || top.color === bottom.color) {
        score += 10;
        tags.push('Color Matched');
      }
    }

    // Weather score
    if (weather === 'Cold' && outer) {
      score += 10;
      tags.push('Weather Safe');
    } else if (weather === 'Sunny') {
      tags.push('Breathable');
    }

    // Cap score to 98
    score = Math.min(score, 98);

    const explanation = `This look is tailored for a ${occasion.toLowerCase()} setting with a ${style.toLowerCase()} vibe. The ${top?.name || 'top'} pairs effortlessly with the ${bottom?.name || 'bottom'}, providing comfort suitable for ${weather.toLowerCase()} conditions.`;

    return { score, tags, explanation };
  };

  // Build Option A (Best Matched Core Look)
  const topA = tops.find(t => t.occasions.includes(occasion)) || defaultTop;
  const bottomA = bottoms.find(b => b.occasions.includes(occasion)) || defaultBottom;
  const shoeA = shoes.find(s => s.occasions.includes(occasion)) || defaultShoe;
  const accA = accessoriesList.slice(0, 2);
  const comboA = calculateComboScore(topA, bottomA, shoeA);

  const optionA: OutfitOption = {
    id: generateId(),
    optionLabel: 'Option A',
    title: `${style} ${occasion} Chic`,
    top: topA,
    bottom: bottomA,
    shoes: shoeA,
    accessories: accA,
    style,
    occasion,
    weather,
    score: comboA.score,
    explanation: comboA.explanation,
    tags: comboA.tags,
    visualImageUrl: topA?.imageUrl || 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80',
    estimatedCost: 'From Wardrobe'
  };

  // Build Option B (Alternative Casual/Trendy Twist)
  const topB = tops.find(t => t.id !== topA?.id) || defaultTop;
  const bottomB = bottoms.find(b => b.id !== bottomA?.id) || defaultBottom;
  const shoeB = shoes.find(s => s.id !== shoeA?.id) || defaultShoe;
  const outerB = outerwears[0];
  const comboB = calculateComboScore(topB, bottomB, shoeB, outerB);

  const optionB: OutfitOption = {
    id: generateId(),
    optionLabel: 'Option B',
    title: `Smart & Relaxed Look`,
    top: topB,
    bottom: bottomB,
    shoes: shoeB,
    outerwear: outerB,
    accessories: accessoriesList.slice(1, 2),
    style: 'Smart Casual',
    occasion,
    weather,
    score: Math.max(comboB.score - 2, 75),
    explanation: `A versatile alternative combining your ${topB?.name || 'top'} with ${bottomB?.name || 'bottom'}. Perfect if you want a slightly more relaxed tone.`,
    tags: ['Versatile', occasion, 'Layered'],
    visualImageUrl: topB?.imageUrl || 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80',
    estimatedCost: 'From Wardrobe'
  };

  // Build Option C (Elevated / Traditional / Statement Look)
  const topC = tops.find(t => t.styles.includes('Classy') || t.styles.includes('Traditional / Ethnic')) || tops[tops.length - 1] || defaultTop;
  const bottomC = bottoms.find(b => b.id !== bottomA?.id && b.id !== bottomB?.id) || defaultBottom;
  const shoeC = shoes.find(s => s.styles.includes('Classy')) || defaultShoe;
  const comboC = calculateComboScore(topC, bottomC, shoeC);

  const optionC: OutfitOption = {
    id: generateId(),
    optionLabel: 'Option C',
    title: `Elevated Statement Outfit`,
    top: topC,
    bottom: bottomC,
    shoes: shoeC,
    accessories: accessoriesList.slice(0, 1),
    style: 'Classy',
    occasion,
    weather,
    score: Math.max(comboC.score - 4, 72),
    explanation: `An elevated style choice featuring your ${topC?.name || 'top'}. Great for making a refined impression.`,
    tags: ['Elevated', 'Classy', 'Polished'],
    visualImageUrl: topC?.imageUrl || 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=600&q=80',
    estimatedCost: 'From Wardrobe'
  };

  return {
    id: generateId(),
    userId,
    options: [optionA, optionB, optionC],
    selectedOptionId: optionA.id,
    occasion,
    style,
    weather,
    createdAt: new Date().toISOString(),
    saved: false,
    worn: false,
  };
}
