/**
 * Counts unique stocks in portfolio based on symbol
 * @param stocks Array of stocks
 * @returns Number of unique stocks
 */
export function countUniqueStocks(stocks: any[]): number {
    const uniqueSymbols = new Set(stocks.map(stock => stock.symbol));
    return uniqueSymbols.size;
  }