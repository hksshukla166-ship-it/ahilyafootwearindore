import React, { useState } from 'react';
import { X, Star, ShoppingBag, MessageSquare, Truck, ShieldCheck, Ruler, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatINR, buildWhatsAppProductUrl } from '../utils/helpers';
import { SIZE_CHART, STORE_ADDRESS, STORE_PHONE } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: number, quantity: number, color?: string) => void;
  onInstantBuy: (product: Product, size: number, color?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onInstantBuy
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = buildWhatsAppProductUrl(product, selectedSize, selectedColor);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        
        {/* Sticky Header with Title and Close Button */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              {product.categoryLabel}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">PAN India Delivery</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close product details"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Image showcase & guarantees (md:col-span-6) */}
          <div className="md:col-span-6 space-y-4">
            <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs relative">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-blue-900/90 text-white text-xs font-semibold px-2.5 py-1 rounded">
                Verified Authentic
              </div>
              <div className="absolute top-3 right-3 bg-white/95 text-blue-700 text-xs font-bold px-2.5 py-1 rounded tabular-nums">
                {product.discountPercent}% OFF
              </div>
            </div>

            {/* Trust Badges */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2.5 text-slate-700">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong>PAN INDIA Express Shipping:</strong> Dispatched within 24 hours from Indore.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong>Quality Promise:</strong> 7-Day Hassle-Free Size Exchange.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Store Pickup Available:</strong> {STORE_ADDRESS}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (md:col-span-6) */}
          <div className="md:col-span-6 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-slate-800 tabular-nums">{product.rating}</span>
                <span>({product.reviewCount} customer reviews)</span>
              </div>

              <h2 className="text-2xl font-bold font-heading text-slate-900">
                {product.name}
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Product Code: <span className="font-mono">{product.id.toUpperCase()}</span>
              </p>
            </div>

            {/* Price Box */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-blue-800 font-medium block">Special Online Price:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900 tabular-nums">
                    {formatINR(product.price)}
                  </span>
                  <span className="text-sm text-slate-400 line-through tabular-nums">
                    {formatINR(product.originalPrice)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-100/80 px-2 py-0.5 rounded">
                  Save {formatINR(product.originalPrice - product.price)}
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">Inclusive of all taxes</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color selection if available */}
            {product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Color Option: <span className="text-blue-700 font-normal">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        selectedColor === color
                          ? 'border-blue-600 bg-blue-50 text-blue-800 font-semibold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector with Size Guide Trigger */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  Select UK Size: <span className="text-blue-700 font-bold">UK {selectedSize}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  {showSizeGuide ? 'Hide Size Chart' : 'Shoe Size Guide'}
                </button>
              </div>

              {/* Size Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold tabular-nums transition-all cursor-pointer flex items-center justify-center ${
                      selectedSize === size
                        ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600 ring-offset-2'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Interactive Size Chart Drawer */}
              {showSizeGuide && (
                <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                  <div className="font-semibold text-slate-800 flex items-center justify-between">
                    <span>Indian / UK Footwear Size Standard:</span>
                    <span className="text-[11px] text-slate-500">Measure foot heel-to-toe</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-[11px]">
                      <thead>
                        <tr className="border-b border-slate-300 text-slate-500">
                          <th className="py-1">UK/IND</th>
                          <th className="py-1">EU</th>
                          <th className="py-1">US</th>
                          <th className="py-1">Length (CM)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono">
                        {SIZE_CHART.map((row) => (
                          <tr
                            key={row.uk}
                            className={row.uk === selectedSize ? 'bg-blue-100/60 font-bold text-blue-900' : ''}
                          >
                            <td className="py-1">UK {row.uk}</td>
                            <td className="py-1">{row.eu}</td>
                            <td className="py-1">{row.us}</td>
                            <td className="py-1">{row.cm} cm</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-slate-700">Quantity:</label>
              <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 rounded-l-lg transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold tabular-nums text-slate-800">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 rounded-r-lg transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Key Features List */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 text-xs text-slate-600">
              <div className="font-semibold text-slate-800 mb-1">Key Specifications:</div>
              <p>• <strong>Sole:</strong> {product.soleMaterial}</p>
              <p>• <strong>Upper:</strong> {product.upperMaterial}</p>
              {product.features.map((feat, idx) => (
                <p key={idx}>• {feat}</p>
              ))}
            </div>

            {/* Purchase Action Buttons */}
            <div className="pt-3 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedNotice ? 'Added to Cart!' : 'Add to Cart'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onInstantBuy(product, selectedSize, selectedColor)}
                  className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Instant Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* WhatsApp direct order */}
              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Order this Model via WhatsApp (+91 {STORE_PHONE})</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
