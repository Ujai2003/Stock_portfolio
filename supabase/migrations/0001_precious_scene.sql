/*
  # Update current prices for stocks

  1. Changes
    - Updates current_price for existing stocks based on mock price data
    - Adds default current price if mock price not found
    - Ensures current_price is never null

  2. Notes
    - Uses a CASE statement to match stock symbols with known prices
    - Provides a reasonable default price if no match found
*/

DO $$ 
BEGIN
  -- Update GOOGL
  UPDATE stocks 
  SET current_price = 86.32
  WHERE symbol = 'GOOGL' AND current_price IS NULL;

  -- Update IBM
  UPDATE stocks 
  SET current_price = 127.64
  WHERE symbol = 'IBM' AND current_price IS NULL;

  -- Update AMZN
  UPDATE stocks 
  SET current_price = 18.58
  WHERE symbol = 'AMZN' AND current_price IS NULL;

  -- Update WFC
  UPDATE stocks 
  SET current_price = 104.28
  WHERE symbol = 'WFC' AND current_price IS NULL;

  -- Update UBS
  UPDATE stocks 
  SET current_price = 110.55
  WHERE symbol = 'UBS' AND current_price IS NULL;

  -- Update UPS
  UPDATE stocks 
  SET current_price = 156.78
  WHERE symbol = 'UPS' AND current_price IS NULL;

  -- Update any remaining NULL prices with a default value
  UPDATE stocks 
  SET current_price = buy_price
  WHERE current_price IS NULL;
END $$;