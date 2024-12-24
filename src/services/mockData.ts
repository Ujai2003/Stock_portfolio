// Mock current prices for demo stocks
export const MOCK_PRICES: Record<string, number> = {
    AAPL: 173.50,
    GOOGL: 2960.25,
    MSFT: 415.75,
    AMZN: 3456.80,
    TSLA: 875.30,
    // Add more mock prices as needed
  };
  
  // Add some random variation to prices to simulate market movement
  export function getRandomPriceVariation(basePrice: number): number {
    const variation = basePrice * 0.02; // 2% maximum variation
    return basePrice + (Math.random() - 0.5) * variation;
  }