import React, { useState } from 'react';
import { ShoppingBag, Star, MessageSquare, ArrowUpRight, Check } from 'lucide-react';
import { Product } from '../types';
import { formatINR, buildWhatsAppProductUrl } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onQuickAdd: (product: Product, size: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onQuickAdd
}) => {
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0]);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = buildWhatsAppProductUrl(product, selectedSize);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-300"
        />

        {/* Subtle Text Tag (Section 2.B: Max 1 subtle tag, no badge spam) */}
        {product.isBestSeller ? (
          <div className="absolute top-3 left-3 bg-blue-900/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs">
            Best Seller
          </div>
        ) : product.isNewArrival ? (
          <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs">
            New Drop
          </div>
        ) : null}

        {/* Discount badge */}
        <div className="absolute top-3 right-3 bg-white/95 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded shadow-xs tabular-nums">
          {product.discountPercent}% OFF
        </div>

        {/* Quick hover trigger to inspect */}
        <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="p-2 bg-white/90 backdrop-blur-xs text-slate-800 rounded-lg shadow-sm text-xs font-medium flex items-center gap-1 hover:bg-white">
            Quick View <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category and Rating metadata with dot separator */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-blue-700">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-slate-700 font-medium">
              <Star className="w-3 h-3 text-amber-500 fill-current" />
              <span className="tabular-nums">{product.rating}</span>
              <span className="text-slate-400">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-heading font-bold text-slate-900 text-base leading-snug group-hover:text-blue-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {product.description}
          </p>
        </div>

        {/* Size Selector Quick Bar */}
        <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Select Size (UK):</span>
            <span className="font-semibold text-slate-800">UK {selectedSize}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
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
        </div>

        {/* Pricing and Action Buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                {formatINR(product.price)}
              </span>
              <span className="text-xs text-slate-400 line-through tabular-nums">
                {formatINR(product.originalPrice)}
              </span>
            </div>
            <span className="text-[10px] text-emerald-600 font-medium block">
              Free Delivery Eligible
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleWhatsAppClick}
              title="Order on WhatsApp (+91 8770690143)"
              className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            <button
              onClick={handleQuickAddClick}
              disabled={justAdded}
              className={`px-3 py-2 text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
