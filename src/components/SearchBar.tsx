import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  selectedSize: number | null;
  onSelectSize: (size: number | null) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  resultCount: number;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedSize,
  onSelectSize,
  sortBy,
  onSortChange,
  resultCount,
  inputRef
}) => {
  const SIZES = [6, 7, 8, 9, 10, 11];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3.5">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Main Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by shoe name, type (e.g. sneakers, running, oxford, loafers)..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="sort-select" className="text-xs font-medium text-slate-500 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>

      </div>

      {/* Quick Size Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-500 font-medium mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
            Filter by Size (UK):
          </span>
          <button
            onClick={() => onSelectSize(null)}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              selectedSize === null
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Sizes
          </button>
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => onSelectSize(selectedSize === size ? null : size)}
              className={`w-7 h-7 rounded text-xs font-semibold tabular-nums transition-colors cursor-pointer flex items-center justify-center ${
                selectedSize === size
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="text-slate-500 tabular-nums">
          Showing <span className="font-semibold text-slate-900">{resultCount}</span> footwear {resultCount === 1 ? 'model' : 'models'}
        </div>
      </div>
    </div>
  );
};
