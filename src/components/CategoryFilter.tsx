import React from 'react';
import { FootwearCategory } from '../types';
import { CATEGORIES } from '../data/products';

interface CategoryFilterProps {
  selectedCategory: FootwearCategory;
  onSelectCategory: (category: FootwearCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl min-w-max border border-slate-200">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] tabular-nums px-1.5 py-0.2 rounded ${
                  isActive ? 'bg-blue-700/80 text-blue-100' : 'bg-slate-300/60 text-slate-600'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
