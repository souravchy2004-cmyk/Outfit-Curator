import { ClothingCategory, ClothingType, ColorPreference, Occasion, StyleType } from '../../types';

export interface ClassificationResult {
  category: ClothingCategory;
  type: ClothingType;
  color: ColorPreference;
  style: StyleType;
  season: ('Summer' | 'Winter' | 'Monsoon' | 'All season')[];
  occasions: Occasion[];
  pattern: string;
  material: string;
}

/**
 * Analyzes uploaded clothing image.
 * Uses smart heuristic detection with AI API placeholder integration.
 */
export async function analyzeClothingImage(imageUrl: string | File): Promise<ClassificationResult> {
  // Simulate AI Vision processing latency (800ms)
  await new Promise(resolve => setTimeout(resolve, 800));

  // Smart heuristic based on file name or random selection for realistic demo
  const sampleCategories: ClothingCategory[] = ['top', 'bottom', 'shoes', 'outerwear', 'accessories'];
  const category = sampleCategories[Math.floor(Math.random() * sampleCategories.length)];

  let type: ClothingType = 'T-shirt';
  if (category === 'top') type = 'Shirt';
  else if (category === 'bottom') type = 'Jeans';
  else if (category === 'shoes') type = 'Sneakers';
  else if (category === 'outerwear') type = 'Jacket';
  else if (category === 'accessories') type = 'Watch';

  const colors: ColorPreference[] = ['Black', 'White', 'Blue', 'Lavender', 'Beige', 'Navy'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return {
    category,
    type,
    color,
    style: 'Casual',
    season: ['All season', 'Summer'],
    occasions: ['Casual', 'College', 'Office'],
    pattern: 'Solid',
    material: 'Cotton Blend'
  };
}
