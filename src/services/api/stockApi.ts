import { apiClient } from './config';
import type { ApiResponse, StockDTO, CreateStockDTO, UpdateStockDTO } from '../../types/api';
import { mockPrices } from '../stocks/mockPrices';

export const stockApi = {
  // Get all stocks
  getAllStocks: async (): Promise<StockDTO[]> => {
    const response = await apiClient.get<StockDTO[]>('/stocks');
    return response.data;
  },

  // Add new stock
  addStock: async (stock: CreateStockDTO): Promise<StockDTO> => {
    // Get current price from mock data
    const currentPrice = mockPrices[stock.symbol] || stock.buyPrice;
    
    const response = await apiClient.post<StockDTO>('/stocks/add', {
      ...stock,
      currentPrice
    });
    return response.data;
  },

  // Update stock
  updateStock: async (id: number, stock: UpdateStockDTO): Promise<StockDTO> => {
    // If symbol is being updated, get new current price
    const currentPrice = stock.symbol ? mockPrices[stock.symbol] || stock.buyPrice : undefined;
    
    const response = await apiClient.put<StockDTO>(`/stocks/${id}`, {
      ...stock,
      ...(currentPrice && { currentPrice })
    });
    return response.data;
  },

  // Delete stock
  deleteStock: async (id: number): Promise<void> => {
    await apiClient.delete(`/stocks/${id}`);
  },

  // Get portfolio value
  getPortfolioValue: async (): Promise<number> => {
    const response = await apiClient.get<number>('/stocks/portfolio-value');
    return response.data;
  },
};