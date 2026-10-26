import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageSquare, Tag, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { formatINR, buildWhatsAppCartUrl, calculateCartTotals } from '../utils/helpers';
import { COUPONS, STORE_PHONE } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (appliedDiscount: number, couponCode?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Calculate discount
  let discountAmount = 0;
  if (appliedCoupon && COUPONS[appliedCoupon]) {
    const coupon = COUPONS[appliedCoupon];
    if (coupon.discountAmount) {
      discountAmount = coupon.discountAmount;
    } else if (coupon.discountPercent) {
      discountAmount = Math.round((rawSubtotal * coupon.discountPercent) / 100);
    }
  }

  const { subtotal, deliveryCharge, total } = calculateCartTotals(items, discountAmount);
  const freeShippingTarget = 1499;
  const remainingForFreeShipping = Math.max(0, freeShippingTarget - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingTarget) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (COUPONS[code]) {
      const coup = COUPONS[code];
      if (rawSubtotal < coup.minOrder) {
        setCouponError(`Min order of ₹${coup.minOrder} required for ${code}`);
        return;
      }
      setAppliedCoupon(code);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try AHILYA100 or KICKS10');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleWhatsAppCheckout = () => {
    const url = buildWhatsAppCartUrl(items, total);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-250">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-slate-900 text-base">Your Shoe Bag</h2>
              <p className="text-xs text-slate-500 tabular-nums">
                {items.reduce((s, i) => s + i.quantity, 0)} item(s) selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-blue-50 px-5 py-2.5 border-b border-blue-100 text-xs">
          {remainingForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-blue-900 font-medium">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  Add {formatINR(remainingForFreeShipping)} more for FREE PAN India delivery!
                </span>
                <span className="tabular-nums font-semibold">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full bg-blue-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="text-emerald-700 font-semibold flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>You unlocked FREE Express PAN India Delivery! 🚚🇮🇳</span>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 divide-y divide-slate-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-slate-500">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-slate-800 text-lg">Your bag is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Looks like you haven't picked your kicks yet. Browse our sneakers, formals, and casuals!
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="pt-3.5 first:pt-0 flex gap-3.5">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-heading font-semibold text-slate-900 text-xs sm:text-sm line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500 space-x-2">
                      <span>Size: <strong className="text-slate-800 font-bold">UK {item.selectedSize}</strong></span>
                      {item.selectedColor && (
                        <span>· Color: <span className="text-slate-800">{item.selectedColor}</span></span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {/* Stepper */}
                    <div className="flex items-center border border-slate-200 rounded-md bg-slate-50 text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 hover:bg-slate-200 transition-colors text-slate-600 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold tabular-nums text-slate-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 hover:bg-slate-200 transition-colors text-slate-600 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-bold text-slate-900 text-sm tabular-nums">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Coupon & Order Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/70 space-y-3.5">
            
            {/* Coupon Code Section */}
            <div className="space-y-1.5">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg text-xs text-emerald-800 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon}</strong> Applied (-{formatINR(discountAmount)})</span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-emerald-700 hover:text-emerald-900 text-[11px] underline font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon code (e.g. AHILYA100)"
                      className="w-full uppercase text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg placeholder:normal-case focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-red-600 font-medium">{couponError}</p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="tabular-nums font-semibold text-slate-900">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>PAN India Express Shipping</span>
                <span className="tabular-nums font-semibold">
                  {deliveryCharge === 0 ? (
                    <span className="text-emerald-600 uppercase font-bold text-[11px]">Free</span>
                  ) : (
                    formatINR(deliveryCharge)
                  )}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon Discount</span>
                  <span className="tabular-nums font-semibold">-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-bold text-slate-900">
                <span>Total Amount:</span>
                <span className="tabular-nums text-blue-700">{formatINR(total)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => onProceedToCheckout(discountAmount, appliedCoupon || undefined)}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Order this Bag on WhatsApp (+91 {STORE_PHONE})</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
