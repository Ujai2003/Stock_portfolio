/*
  # Update current prices for stocks

  1. Changes
    - Sets current prices for all stocks with NULL values
    - Adds default values for unknown symbols

  2. Updates
    - Sets specific prices for known stock symbols
    - Sets buy_price as default for unknown symbols
*/

DO $$ 
BEGIN
  -- Update known stock prices
  UPDATE stocks 
  SET current_price = CASE symbol
    WHEN 'GOOGL' THEN 86.32
    WHEN 'IBM' THEN 127.64
    WHEN 'AMZN' THEN 18.58
    WHEN 'WFC' THEN 104.28
    WHEN 'UBS' THEN 110.55
    WHEN 'UPS' THEN 156.78
    WHEN 'RUS' THEN buy_price  -- Using buy_price for unknown symbol
    ELSE buy_price  -- Default to buy_price for any other symbols
  END
  WHERE current_price IS NULL;

  -- Ensure no NULL values remain
  UPDATE stocks 
  SET current_price = buy_price
  WHERE current_price IS NULL;
END $$;