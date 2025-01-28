import type { StockDTO, PortfolioMetrics } from '../types/api';

export function calculateMetrics(stocks: StockDTO[]): PortfolioMetrics {
  if (!stocks.length) {
    return {
      totalValue: 0,
      totalGainLoss: 0,
      topPerformer: null,
      worstPerformer: null,
      stocks: []
    };
  }

  const totalValue = stocks.reduce(
    (sum, stock) => sum + stock.currentPrice * stock.quantity,
    0
  );

  const totalGainLoss = stocks.reduce(
    (sum, stock) => sum + (stock.currentPrice - stock.buyPrice) * stock.quantity,
    0
  );

  const sortedStocks = [...stocks].sort(
    (a, b) =>
      (b.currentPrice - b.buyPrice) / b.buyPrice -
      (a.currentPrice - a.buyPrice) / a.buyPrice
  );

  return {
    totalValue,
    totalGainLoss,
    topPerformer: sortedStocks[0] || null,
    worstPerformer: sortedStocks[sortedStocks.length - 1] || null,
    stocks // Include the stocks array in metrics
  };
}