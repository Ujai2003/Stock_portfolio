import { useState, useEffect } from 'react';
import { stockApi } from '../services/api/stockApi';
import { getStockPrice } from '../services/stocks/stockService';
import type { StockDTO, CreateStockDTO, UpdateStockDTO, PortfolioMetrics } from '../types/api';
import { calculateMetrics } from '../utils/stockCalculations';
import { syncStockPrices } from '../utils/priceSync';

export function useStocks() {
  const [stocks, setStocks] = useState<StockDTO[]>([]);
  const [metrics, setMetrics] = useState<PortfolioMetrics>({
    totalValue: 0,
    totalGainLoss: 0,
    topPerformer: null,
    worstPerformer: null,
    stocks: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStockPrices = async (stocksData: StockDTO[]): Promise<StockDTO[]> => {
    const updatedStocks = await Promise.all(
      stocksData.map(async (stock) => {
        try {
          const currentPrice = await getStockPrice(stock.symbol);
          return { ...stock, currentPrice };
        } catch (err) {
          console.error(`Failed to fetch price for ${stock.symbol}:`, err);
          return stock;
        }
      })
    );
    return syncStockPrices(updatedStocks);
  };

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const stocksData = await stockApi.getAllStocks();
      const stocksWithPrices = await updateStockPrices(stocksData);
      setStocks(stocksWithPrices);
      setMetrics(calculateMetrics(stocksWithPrices));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stocks';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addStock = async (stockData: CreateStockDTO) => {
    try {
      await stockApi.addStock(stockData);
      await fetchStocks();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add stock';
      setError(errorMessage);
      throw err;
    }
  };

  const editStock = async (id: number, stockData: UpdateStockDTO) => {
    try {
      await stockApi.updateStock(id, stockData);
      await fetchStocks();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update stock';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteStock = async (id: number) => {
    try {
      await stockApi.deleteStock(id);
      await fetchStocks();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete stock';
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      if (!mounted) return;
      await fetchStocks();
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute

    return () => {
      mounted = false;
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  return {
    stocks,
    metrics,
    loading,
    error,
    addStock,
    editStock,
    deleteStock
  };
}