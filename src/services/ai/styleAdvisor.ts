import { StylistChatMessage, WardrobeItem } from '../../types';
import { generateId } from '../../lib/utils';

export async function askAIStylist(userQuery: string, wardrobe: WardrobeItem[]): Promise<StylistChatMessage> {
  // Simulate AI response delay
  await new Promise(resolve => setTimeout(resolve, 900));

  const queryLower = userQuery.toLowerCase();
  let responseText = '';
  let recommendedItems: WardrobeItem[] = [];

  // Match wardrobe items dynamically
  const tops = wardrobe.filter(i => i.category === 'top');
  const bottoms = wardrobe.filter(i => i.category === 'bottom');
  const shoes = wardrobe.filter(i => i.category === 'shoes');
  const accessories = wardrobe.filter(i => i.category === 'accessories');

  if (queryLower.includes('college') || queryLower.includes('university') || queryLower.includes('class')) {
    const top = tops.find(t => t.color === 'White' || t.color === 'Lavender') || tops[0];
    const bottom = bottoms.find(b => b.type === 'Jeans') || bottoms[0];
    const shoe = shoes.find(s => s.type === 'Sneakers') || shoes[0];
    
    responseText = `For college tomorrow, I recommend pairing your ${top?.name || 'white shirt'} with your ${bottom?.name || 'blue jeans'}. Complete the look with your ${shoe?.name || 'white sneakers'} and a sleek watch for a relaxed yet smart campus style! 🎓✨`;
    if (top) recommendedItems.push(top);
    if (bottom) recommendedItems.push(bottom);
    if (shoe) recommendedItems.push(shoe);

  } else if (queryLower.includes('date') || queryLower.includes('dinner')) {
    const top = tops.find(t => t.color === 'Pink' || t.color === 'Lavender' || t.color === 'Black') || tops[0];
    const bottom = bottoms.find(b => b.type === 'Skirt' || b.type === 'Trousers') || bottoms[0];
    const acc = accessories.find(a => a.type === 'Handbag') || accessories[0];

    responseText = `For a date or dinner, your ${top?.name || 'pink silk top'} paired with ${bottom?.name || 'tailored beige trousers'} creates a sophisticated, elegant aesthetic. Don't forget your ${acc?.name || 'beige handbag'}! 🍷💕`;
    if (top) recommendedItems.push(top);
    if (bottom) recommendedItems.push(bottom);
    if (acc) recommendedItems.push(acc);

  } else if (queryLower.includes('black shirt') || queryLower.includes('jeans') || queryLower.includes('shoes')) {
    const shoe = shoes.find(s => s.color === 'White') || shoes[0];
    const acc = accessories[0];

    responseText = `Your black shirt and blue jeans are a timeless combination! I recommend pairing them with your ${shoe?.name || 'white sneakers'} for a clean contrast. If you're heading out in the evening, add your ${acc?.name || 'gold watch'} to elevate the outfit. 👟⌚`;
    if (shoe) recommendedItems.push(shoe);
    if (acc) recommendedItems.push(acc);

  } else if (queryLower.includes('formal') || queryLower.includes('office') || queryLower.includes('meeting')) {
    const top = tops.find(t => t.color === 'White') || tops[0];
    const bottom = bottoms.find(b => b.color === 'Beige' || b.color === 'Black') || bottoms[0];
    const shoe = shoes.find(s => s.type === 'Loafers') || shoes[0];

    responseText = `For a formal office look, crisp coordination is key. Pair your ${top?.name || 'white button shirt'} with your ${bottom?.name || 'beige trousers'} and ${shoe?.name || 'black loafers'}. Keep accessories minimal and polished. 💼✨`;
    if (top) recommendedItems.push(top);
    if (bottom) recommendedItems.push(bottom);
    if (shoe) recommendedItems.push(shoe);

  } else {
    responseText = `Based on your digital wardrobe of ${wardrobe.length} items, I suggest trying a monochrome or neutral color block combination today. Your ${tops[0]?.name || 'top'} and ${bottoms[0]?.name || 'bottom'} make a great base look! 🌟`;
    if (tops[0]) recommendedItems.push(tops[0]);
    if (bottoms[0]) recommendedItems.push(bottoms[0]);
  }

  return {
    id: generateId(),
    sender: 'assistant',
    content: responseText,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    recommendedItems
  };
}
