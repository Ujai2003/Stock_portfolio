import { marketCapStocks } from './data/marketCapStocks';
import { techStocks } from './data/techStocks';
import { financeStocks } from './data/financeStocks';
import { consumerStocks } from './data/consumerStocks';
import { energyStocks } from './data/energyStocks';
import { healthcareStocks } from './data/healthStocks';
import { industrialStocks } from './data/industrialStocks';
import { materialStocks } from './data/materialStocks';
import { realEstateStocks } from './data/realEstateStocks';
import { utilityStocks } from './data/utilityStocks';

// Combine all stock data sources
export const mockPrices: Record<string, number> = {
  ...marketCapStocks,
  ...techStocks,
  ...financeStocks,
  ...consumerStocks,
  ...energyStocks,
  ...healthcareStocks,
  ...industrialStocks,
  ...materialStocks,
  ...realEstateStocks,
  ...utilityStocks
};