// Configuration for price handling
export const PRICE_CONFIG = {
    DEFAULT_PRICE: 75.00,
    RANGES: {
      MIN: 0.01,
      MAX: 1000.00
    },
    VARIATION: {
      PERCENTAGE: 0.02 // 2% maximum variation
    }
  } as const;