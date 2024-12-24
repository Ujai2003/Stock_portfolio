import type { StockDTO } from '../types/api';

// Keep track of latest prices by symbol
const priceCache: Record<string, number> = {};

/**
 * Synchronizes prices for stocks with the same symbol
 * to ensure they have the same current price
 */
export function syncStockPrices(stocks: StockDTO[]): StockDTO[] {
  // First pass: update price cache with latest prices
  stocks.forEach(stock => {
    priceCache[stock.symbol] = stock.currentPrice;
  });

  // Second pass: ensure all stocks with same symbol have same price
  return stocks.map(stock => ({
    ...stock,
    currentPrice: priceCache[stock.symbol]
  }));
}