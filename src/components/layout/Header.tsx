import { Plus } from 'lucide-react';

interface HeaderProps {
  onAddClick: () => void;
}

export function Header({ onAddClick }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-white">Portfolio Tracker</h1>
      <button
        onClick={onAddClick}
        className="inline-flex items-center px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-150 card-hover"
      >
        <Plus className="h-5 w-5 mr-2" aria-hidden="true" />
        Add Stock
      </button>
    </div>
  );
}