import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    const { action, imageUrl, prompt, wardrobe } = body;

    // If no GEMINI_API_KEY is provided, return structured smart fallback response
    if (!apiKey) {
      if (action === 'analyze_image') {
        return NextResponse.json({
          success: true,
          mode: 'mock_ai',
          message: 'Running in Smart AI fallback mode. Set GEMINI_API_KEY in .env to activate live Gemini LLM Vision.',
          result: {
            category: 'top',
            type: 'Shirt / Kurta',
            color: 'Lavender / Black',
            style: 'Trendy',
            pattern: 'Solid',
            material: '100% Cotton',
            description: 'Analyzed garment: Versatile piece with comfortable fit and elegant silhouette.',
            stylingTip: 'Great for layering with light jacket or pairing with denim jeans and sneakers.'
          }
        });
      }

      if (action === 'stylist_chat') {
        const wardrobeSummary = Array.isArray(wardrobe) ? wardrobe.map((w: any) => w.name).join(', ') : 'clothes';
        return NextResponse.json({
          success: true,
          mode: 'mock_ai',
          reply: `Here is a custom recommendation from your digital closet (${wardrobeSummary}): Try pairing your top items with high-waisted denim and minimal white sneakers for a trendy day out! 🌟`
        });
      }
    }

    // Live Google Gemini API Integration
    if (action === 'analyze_image') {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const systemPrompt = `You are a world-class AI fashion stylist and clothing classifier. Analyze the provided image or image URL and extract JSON containing:
{
  "category": "top" | "bottom" | "shoes" | "outerwear" | "accessories",
  "type": "T-shirt" | "Shirt" | "Kurta" | "Jeans" | "Trousers" | "Sneakers" | "Loafers" | "Jacket" | "Watch" | "Bag",
  "color": "Black" | "White" | "Blue" | "Lavender" | "Beige" | "Pink" | "Navy" | "Red" | "Green",
  "style": "Casual" | "Trendy" | "Minimal" | "Classy" | "Streetwear" | "Traditional / Ethnic",
  "pattern": "Solid" | "Graphic" | "Embroidered" | "Denim" | "Striped",
  "material": "Cotton" | "Denim" | "Silk" | "Wool" | "Leather",
  "description": "Brief fashion description",
  "stylingTip": "Actionable styling tip"
}. Return ONLY valid JSON format.`;

      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: systemPrompt },
              { text: `Image URL to analyze: ${imageUrl}` }
            ]
          }]
        })
      });

      const geminiData = await response.json();
      const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      let parsedResult;
      try {
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        parsedResult = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
      } catch (e) {
        parsedResult = null;
      }

      return NextResponse.json({
        success: true,
        mode: 'live_gemini',
        result: parsedResult || {
          category: 'top',
          type: 'Shirt',
          color: 'Black',
          style: 'Casual',
          pattern: 'Solid',
          material: 'Cotton',
          description: rawText || 'Analyzed with Gemini Vision AI.',
          stylingTip: 'Pair with neutral bottoms and comfortable shoes.'
        }
      });
    }

    if (action === 'stylist_chat') {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const wardrobeContext = JSON.stringify(wardrobe || []);
      const promptText = `You are "Outfit Curator AI", a friendly personal AI stylist.
The user's actual wardrobe contains these clothes: ${wardrobeContext}.
User question: "${prompt}".
Provide a helpful, stylish response recommending specific items from their wardrobe! Keep it concise and enthusiastic with emojis.`;

      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });

      const geminiData = await response.json();
      const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'I recommend styling your favorite top with denim jeans today! ✨';

      return NextResponse.json({
        success: true,
        mode: 'live_gemini',
        reply
      });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });

  } catch (error: any) {
    console.error('Gemini API Route error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
