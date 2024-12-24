// API Response Types
export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
  }
  
  // Stock API Types
  export interface StockDTO {
    id: number;
    symbol: string;
    name: string;
    quantity: number;
    buyPrice: number;
    currentPrice: number;
  }
  
  export interface PortfolioMetrics {
    totalValue: number;
    totalGainLoss: number;
    topPerformer: StockDTO | null;
    worstPerformer: StockDTO | null;
    stocks?: StockDTO[]; // Add stocks array to metrics
  }
  
  export type CreateStockDTO = Omit<StockDTO, 'id' | 'currentPrice'>;
  export type UpdateStockDTO = Partial<CreateStockDTO>;