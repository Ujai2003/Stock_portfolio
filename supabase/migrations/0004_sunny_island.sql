/*
  # Update current prices for existing stocks

  1. Changes
    - Updates current_price for all existing stocks based on their symbols
    - Sets default price (buy_price) for any remaining NULL values
    
  2. Security
    - No security changes needed
*/

-- Update existing stocks with NULL current prices
DO $$ 
BEGIN
  -- Tech Stocks
  UPDATE stocks SET current_price = 63.64 WHERE symbol = 'AAPL' AND current_price IS NULL;
  UPDATE stocks SET current_price = 86.32 WHERE symbol = 'GOOGL' AND current_price IS NULL;
  UPDATE stocks SET current_price = 299.65 WHERE symbol = 'MSFT' AND current_price IS NULL;
  UPDATE stocks SET current_price = 127.64 WHERE symbol = 'IBM' AND current_price IS NULL;
  UPDATE stocks SET current_price = 18.58 WHERE symbol = 'AMZN' AND current_price IS NULL;

  -- Finance Stocks
  UPDATE stocks SET current_price = 104.28 WHERE symbol = 'WFC' AND current_price IS NULL;
  UPDATE stocks SET current_price = 110.55 WHERE symbol = 'UBS' AND current_price IS NULL;
  UPDATE stocks SET current_price = 156.78 WHERE symbol = 'UPS' AND current_price IS NULL;

  -- Also add an UPDATE trigger for when stocks are updated
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_stock_current_price_trigger'
  ) THEN
    CREATE TRIGGER update_stock_current_price_trigger
      BEFORE UPDATE ON stocks
      FOR EACH ROW
      WHEN (NEW.symbol IS DISTINCT FROM OLD.symbol)  -- Only trigger when symbol changes
      EXECUTE FUNCTION set_stock_current_price();
  END IF;

  -- Set default for any remaining NULL prices
  UPDATE stocks SET current_price = buy_price WHERE current_price IS NULL;
END $$;