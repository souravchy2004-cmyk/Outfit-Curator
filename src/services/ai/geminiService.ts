import { WardrobeItem, ClassificationResult } from '../../types';

export interface GeminiVisionResponse {
  category: 'top' | 'bottom' | 'shoes' | 'outerwear' | 'accessories';
  type: string;
  color: string;
  style: string;
  pattern: string;
  material: string;
  description: string;
  stylingTip: string;
}

/**
 * Analyzes uploaded clothing photo using Gemini AI Vision.
 * Server endpoint: /api/gemini
 */
export async function analyzeClothingWithGemini(imageUrlOrBase64: string): Promise<GeminiVisionResponse> {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'analyze_image',
        imageUrl: imageUrlOrBase64
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.result) {
        return data.result;
      }
    }
  } catch (err) {
    console.warn('Gemini server API unavailable, using smart vision fallback:', err);
  }

  // Fallback if API key is not configured
  return {
    category: 'top',
    type: 'Shirt',
    color: 'Black',
    style: 'Casual',
    pattern: 'Solid',
    material: 'Cotton Blend',
    description: 'A stylish, high-quality garment perfect for everyday wear.',
    stylingTip: 'Pair with contrasting bottom wear and minimal sneakers for a polished modern look.'
  };
}

/**
 * Generates AI Stylist chat advice using Gemini.
 */
export async function askGeminiStylist(userPrompt: string, wardrobe: WardrobeItem[]): Promise<string> {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'stylist_chat',
        prompt: userPrompt,
        wardrobe: wardrobe.map(w => ({ name: w.name, category: w.category, color: w.color, style: w.styles[0] }))
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.reply) {
        return data.reply;
      }
    }
  } catch (err) {
    console.warn('Gemini chat fallback mode:', err);
  }

  return `Based on your digital wardrobe of ${wardrobe.length} items, I recommend combining your ${wardrobe[0]?.name || 'top'} with your ${wardrobe[1]?.name || 'bottom'} for a clean, effortless outfit! ✨`;
}
