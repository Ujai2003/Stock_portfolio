/*
  # Add trigger for current price handling
  
  1. Changes
    - Creates a function to set current price from mock data
    - Adds trigger to automatically set current price on insert
    - Ensures new stocks always have a current price
*/

-- Function to set current price based on symbol
CREATE OR REPLACE FUNCTION set_stock_current_price()
RETURNS TRIGGER AS $$
BEGIN
  -- Set current price based on symbol matches
  CASE NEW.symbol
    WHEN 'AAPL' THEN NEW.current_price := 63.64
    WHEN 'GOOGL' THEN NEW.current_price := 86.32
    WHEN 'MSFT' THEN NEW.current_price := 299.65
    WHEN 'IBM' THEN NEW.current_price := 127.64
    WHEN 'AMZN' THEN NEW.current_price := 18.58
    WHEN 'WFC' THEN NEW.current_price := 104.28
    WHEN 'UBS' THEN NEW.current_price := 110.55
    WHEN 'UPS' THEN NEW.current_price := 156.78
    -- Add more stock symbols as needed
    ELSE NEW.current_price := NEW.buy_price  -- Default to buy price if symbol not found
  END CASE;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new stock insertions
CREATE TRIGGER set_stock_current_price_trigger
  BEFORE INSERT ON stocks
  FOR EACH ROW
  EXECUTE FUNCTION set_stock_current_price();