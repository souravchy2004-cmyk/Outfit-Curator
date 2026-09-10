const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('url');

const PORT = process.env.PORT || 5000;
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

// Load .env file if present
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (key && !process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}
loadEnv();

// ---- Gemini API Helpers ----

function callGeminiApi(apiKey, requestBody) {
  return new Promise((resolve, reject) => {
    const bodyStr = JSON.stringify(requestBody);
    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Invalid Gemini API response: ' + data.slice(0, 200)));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Gemini API timeout')); });
    req.write(bodyStr);
    req.end();
  });
}

async function analyzeClothingWithGemini(apiKey, imageUrl) {
  const prompt = `You are an expert fashion AI. Analyze this clothing item image and return a JSON object with these exact keys:
{
  "category": one of ["top", "bottom", "shoes", "outerwear", "accessories"],
  "type": clothing type name (e.g. "T-Shirt", "Kurta", "Jeans", "Blazer"),
  "color": primary color (e.g. "White", "Navy Blue"),
  "style": style tag (e.g. "Casual", "Formal", "Ethnic", "Streetwear"),
  "pattern": pattern (e.g. "Solid", "Striped", "Printed", "Checked"),
  "material": fabric (e.g. "Cotton", "Polyester", "Denim", "Linen"),
  "description": 1 sentence fashion description,
  "stylingTip": 1 practical styling tip
}
Return ONLY the JSON, no markdown, no explanation.`;

  const body = {
    contents: [{
      parts: [
        { text: prompt },
        { inlineData: { mimeType: 'image/jpeg', data: imageUrl.replace(/^data:image\/\w+;base64,/, '') } }
      ]
    }],
    generationConfig: { temperature: 0.2, maxOutputTokens: 500 }
  };

  // If URL (not base64), use URI part
  if (imageUrl.startsWith('http')) {
    body.contents[0].parts[1] = { fileData: { mimeType: 'image/jpeg', fileUri: imageUrl } };
  }

  const geminiRes = await callGeminiApi(apiKey, body);
  const text = geminiRes?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const cleaned = text.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
}

async function chatWithGeminiStylist(apiKey, prompt, wardrobe) {
  const wardrobeStr = wardrobe && wardrobe.length > 0
    ? wardrobe.map(w => `• ${w.name} (${w.category}, ${w.color}, ${w.style || 'Casual'})`).join('\n')
    : 'No wardrobe items yet';

  const systemPrompt = `You are Aria, a friendly and expert AI fashion stylist from Mumbai, India. You give personalized outfit advice in a warm, conversational tone. You speak in simple English with occasional fashion terms. Keep responses under 150 words. Be specific and actionable.

USER'S WARDROBE:
${wardrobeStr}

USER QUESTION: ${prompt}

Give specific outfit advice based on the wardrobe items above. Mention specific items by name if relevant. End with a confidence tip or fashion mantra.`;

  const body = {
    contents: [{ parts: [{ text: systemPrompt }] }],
    generationConfig: { temperature: 0.8, maxOutputTokens: 300 }
  };

  const geminiRes = await callGeminiApi(apiKey, body);
  return geminiRes?.candidates?.[0]?.content?.parts?.[0]?.text || null;
}

// ---- HTTP Server ----

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Endpoint: GET /api/health
  if (req.method === 'GET' && pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      server: 'Outfit Curator Backend API',
      geminiKeyConfigured: !!process.env.GEMINI_API_KEY,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Endpoint: GET /api/images
  if (req.method === 'GET' && pathname === '/api/images') {
    fs.readdir(UPLOADS_DIR, (err, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Could not list uploads' }));
        return;
      }
      const images = files.map(file => ({
        filename: file,
        url: `/uploads/${file}`,
        size: fs.statSync(path.join(UPLOADS_DIR, file)).size
      }));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, count: images.length, images }));
    });
    return;
  }

  // Endpoint: POST /api/upload
  if (req.method === 'POST' && pathname === '/api/upload') {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(body);
      const contentType = req.headers['content-type'] || '';

      if (contentType.includes('application/json')) {
        try {
          const json = JSON.parse(buffer.toString());
          const base64Data = json.base64 || json.image;
          if (!base64Data) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'No image base64 data provided' }));
            return;
          }

          const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          const mimeType = matches ? matches[1] : 'image/jpeg';
          const dataStr = matches ? matches[2] : base64Data;
          const ext = mimeType.split('/')[1] || 'jpg';
          const filename = `clothing_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
          const filePath = path.join(UPLOADS_DIR, filename);

          fs.writeFileSync(filePath, Buffer.from(dataStr, 'base64'));
          const imageUrl = `/uploads/${filename}`;

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, imageUrl, filename }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
        return;
      }

      const filename = `clothing_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.jpg`;
      const filePath = path.join(UPLOADS_DIR, filename);
      fs.writeFileSync(filePath, buffer);

      const imageUrl = `/uploads/${filename}`;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, imageUrl, filename }));
    });
    return;
  }

  // Endpoint: POST /api/gemini — Gemini AI Vision and Stylist Chat
  if (req.method === 'POST' && pathname === '/api/gemini') {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', async () => {
      try {
        const json = JSON.parse(Buffer.concat(body).toString());
        const apiKey = process.env.GEMINI_API_KEY;

        // ---- analyze_image action ----
        if (json.action === 'analyze_image') {
          if (apiKey) {
            try {
              const result = await analyzeClothingWithGemini(apiKey, json.imageUrl || '');
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, mode: 'live_gemini', result }));
              return;
            } catch (geminiErr) {
              console.warn('Live Gemini analyze_image failed, using mock:', geminiErr.message);
            }
          }
          // Mock fallback
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            mode: 'mock_ai',
            result: {
              category: 'top',
              type: 'Shirt / Kurta',
              color: 'Black',
              style: 'Trendy',
              pattern: 'Solid',
              material: '100% Cotton',
              description: 'Smart casual garment with clean lines — great for multiple occasions.',
              stylingTip: 'Pair with dark denim jeans and white sneakers for an effortless look.'
            }
          }));
          return;
        }

        // ---- stylist_chat action ----
        if (json.action === 'stylist_chat') {
          if (apiKey) {
            try {
              const reply = await chatWithGeminiStylist(apiKey, json.prompt, json.wardrobe);
              if (reply) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, mode: 'live_gemini', reply }));
                return;
              }
            } catch (geminiErr) {
              console.warn('Live Gemini chat failed, using mock:', geminiErr.message);
            }
          }
          // Mock fallback
          const wardrobeCount = json.wardrobe?.length || 0;
          const mockReplies = [
            `Looking fab is easy with your ${wardrobeCount}-item wardrobe! For ${json.prompt?.toLowerCase().includes('college') ? 'college' : 'your occasion'}, go with a crisp white shirt, dark jeans and clean sneakers. Add a watch and you're golden! ✨`,
            `Style tip from your wardrobe: mix your top pieces with contrasting bottoms. A solid colored kurta or shirt with blue/black jeans works for almost any occasion! Own it with confidence 💪`,
            `Your wardrobe has great potential! Try a smart color-block approach — pair light tops with dark bottoms. Add a belt and minimal accessories. Fashion is about wearing your confidence! 👑`,
            `For a weather-ready outfit: layer a denim jacket over a tee with joggers/jeans. Keep shoes simple — sneakers or loafers. Always carry a light scarf during season transitions! 🌟`,
          ];
          const randomReply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, mode: 'mock_ai', reply: randomReply }));
          return;
        }

        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Unknown Gemini action. Use: analyze_image or stylist_chat' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Serve static uploaded images
  if (req.method === 'GET' && pathname.startsWith('/uploads/')) {
    const filePath = path.join(__dirname, 'public', pathname);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Image Not Found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      const mime = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': 'public, max-age=31536000' });
      res.end(data);
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint Not Found' }));
});

server.listen(PORT, () => {
  console.log(`\n🚀 Outfit Curator Backend Server running at http://localhost:${PORT}`);
  console.log(`✨ Gemini AI Key: ${process.env.GEMINI_API_KEY ? '✅ CONFIGURED — Live AI Active' : '⚠️  NOT SET — Smart Mock Mode active'}`);
  console.log(`   To enable live AI: add GEMINI_API_KEY=your_key to .env file`);
  console.log(`   Get free key: https://aistudio.google.com/app/apikey`);
  console.log(`📁 Uploads dir: ${UPLOADS_DIR}\n`);
});
