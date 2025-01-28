import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/Dashboard';
import { StockList } from './components/StockList';
import { StockForm } from './components/StockForm';
import { useStocks } from './hooks/useStocks';
import type { CreateStockDTO } from './types/api';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingStock, setEditingStock] = useState<any>(undefined);
  const { 
    stocks, 
    metrics, 
    loading, 
    error, 
    addStock, 
    editStock, 
    deleteStock 
  } = useStocks();

  const handleSubmit = async (stockData: CreateStockDTO) => {
    try {
      if (editingStock) {
        await editStock(editingStock.id, stockData);
      } else {
        await addStock(stockData);
      }
      setShowForm(false);
      setEditingStock(undefined);
    } catch (err) {
      console.error('Failed to save stock:', err);
    }
  };

  if (error) {
    return <div className="text-red-600 p-4">Error: {error}</div>;
  }

  return (
    <div className="animated-bg min-h-screen">
      <div className="backdrop-blur-sm bg-white/30 min-h-screen">
        <div className="max-w-7xl mx-auto p-8">
          <div className="fade-in">
            <Header onAddClick={() => setShowForm(true)} />
          </div>
          <Dashboard metrics={metrics} />
          <div className="mt-8 fade-in" style={{ animationDelay: '0.3s' }}>
            <StockList
              stocks={stocks}
              loading={loading}
              onEdit={(stock) => {
                setEditingStock(stock);
                setShowForm(true);
              }}
              onDelete={deleteStock}
            />
          </div>
          {showForm && (
            <StockForm
              stock={editingStock}
              onSubmit={handleSubmit}
              onClose={() => {
                setShowForm(false);
                setEditingStock(undefined);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}