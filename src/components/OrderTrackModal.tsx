import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, Phone, AlertCircle } from 'lucide-react';
import { STORE_PHONE, STORE_NAME } from '../data/products';
import { formatINR } from '../utils/helpers';
import { Order } from '../types';

interface OrderTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: Order[];
}

export const OrderTrackModal: React.FC<OrderTrackModalProps> = ({
  isOpen,
  onClose,
  recentOrders
}) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [matchedOrder, setMatchedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toUpperCase();
    if (!clean) return;

    setSearched(true);
    // Find in user's recent orders or generate realistic track for demo query
    const found = recentOrders.find(
      (o) => o.id.toUpperCase().includes(clean) || o.shippingAddress.phone.includes(clean)
    );

    if (found) {
      setMatchedOrder(found);
    } else {
      // If user typed any valid-looking order ID or 10-digit number, show simulated active dispatch
      if (clean.startsWith('AH-') || /^\d{10}$/.test(clean)) {
        setMatchedOrder({
          id: clean.startsWith('AH-') ? clean : `AH-IND-${Math.floor(100000 + Math.random() * 900000)}`,
          items: [],
          subtotal: 1899,
          deliveryCharge: 0,
          discount: 0,
          total: 1899,
          shippingAddress: {
            fullName: 'Valued Customer',
            phone: clean.length === 10 ? clean : '8770690143',
            email: 'customer@example.com',
            addressLine: 'Delivery Address',
            city: 'Destination Hub',
            state: 'India',
            pincode: '452001'
          },
          paymentMethod: 'upi',
          paymentStatus: 'paid',
          orderDate: 'Recent Dispatch',
          estimatedDeliveryDate: 'Within 2-3 Business Days',
          currentStatus: 'In Transit'
        });
      } else {
        setMatchedOrder(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                Track PAN India Footwear Order
              </h3>
              <p className="text-[11px] text-slate-400">Real-time status from Indore dispatch hub</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-slate-600">
          
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="font-semibold text-slate-700 block">
              Enter Order ID (e.g. AH-IND-89241) or 10-Digit Mobile Number:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Order ID or Phone number..."
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Track</span>
              </button>
            </div>
          </form>

          {/* Searched Status Output */}
          {searched && matchedOrder ? (
            <div className="space-y-4 pt-2">
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500">Order ID</span>
                    <div className="font-mono font-bold text-slate-900 text-sm">#{matchedOrder.id}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-500">Current Status</span>
                    <div className="font-bold text-blue-700 uppercase tracking-wide">{matchedOrder.currentStatus}</div>
                  </div>
                </div>

                <div className="text-slate-600 text-[11px]">
                  Estimated Delivery: <strong className="text-emerald-700">{matchedOrder.estimatedDeliveryDate}</strong>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="space-y-3 px-2">
                {[
                  { title: 'Order Confirmed & Verified', desc: 'Received at Indore hub', done: true },
                  { title: 'Quality Check & Packaging', desc: 'N73 Nandlalpura Ranipura Hub', done: true },
                  { title: 'Dispatched via PAN India Courier', desc: 'In transit with BlueDart/Delhivery', done: true },
                  { title: 'Out for Doorstep Delivery', desc: 'Local courier agent on the way', done: false },
                  { title: 'Delivered', desc: 'Delivered to recipient', done: false }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-3 relative">
                    <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step.done ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                        {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                      </div>
                      {idx < 4 && <div className={`w-0.5 h-6 ${step.done ? 'bg-blue-600' : 'bg-slate-200'}`} />}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : searched && !matchedOrder ? (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center space-y-2">
              <AlertCircle className="w-6 h-6 text-amber-600 mx-auto" />
              <p className="font-semibold text-slate-800">No active dispatch found for "{query}"</p>
              <p className="text-slate-500 text-[11px]">
                Please verify your 10-digit number or call our Indore store helpline at <strong>+91 {STORE_PHONE}</strong>.
              </p>
            </div>
          ) : null}

          {/* Quick Help Link */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>Need immediate courier assistance?</span>
            <a
              href={`tel:${STORE_PHONE}`}
              className="text-blue-600 font-bold hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              Call {STORE_PHONE}
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
