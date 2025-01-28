import { MOCK_PRICES, getRandomPriceVariation } from './mockData';

export async function getStockPrice(symbol: string): Promise<number> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const basePrice = MOCK_PRICES[symbol] || 100; // Default price if symbol not found
  return getRandomPriceVariation(basePrice);
}