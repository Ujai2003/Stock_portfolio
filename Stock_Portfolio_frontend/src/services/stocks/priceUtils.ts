import { PRICE_CONFIG } from './config';

/**
 * Adds random price variation to simulate market movement
 * @param basePrice The base stock price
 * @returns Price with random variation
 */
export function addPriceVariation(basePrice: number): number {
  const variation = basePrice * PRICE_CONFIG.VARIATION.PERCENTAGE;
  return basePrice + (Math.random() - 0.5) * variation;
}

/**
 * Validates if a price is within acceptable ranges
 * @param price The price to validate
 * @returns boolean indicating if price is valid
 */
export function isValidPrice(price: number): boolean {
  return price >= PRICE_CONFIG.RANGES.MIN && 
         price <= PRICE_CONFIG.RANGES.MAX;
}