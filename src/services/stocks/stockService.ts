import { mockPrices } from './mockPrices';
import { PRICE_CONFIG } from './config';
import { addPriceVariation, isValidPrice } from './priceUtils';

/**
 * Gets the current price for a stock symbol
 * @param symbol Stock symbol to look up
 * @returns Promise resolving to the current stock price
 */
export async function getStockPrice(symbol: string): Promise<number> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const basePrice = mockPrices[symbol] || PRICE_CONFIG.DEFAULT_PRICE;
  const price = addPriceVariation(basePrice);
  
  if (!isValidPrice(price)) {
    return basePrice; // Fallback to base price if variation puts it out of range
  }
  
  return price;
}