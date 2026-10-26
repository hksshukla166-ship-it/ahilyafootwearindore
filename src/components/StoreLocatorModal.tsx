import React from 'react';
import { X, MapPin, Phone, MessageSquare, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { STORE_NAME, STORE_ADDRESS, STORE_PHONE, STORE_PHONE_INTL, STORE_PINCODE } from '../data/products';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('N73 Nandlalpura Near Ranipura Indore Madhya Pradesh')}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with store brand */}
        <div className="bg-blue-900 text-white p-6 relative">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-wider">
                Physical Retail Store & Hub
              </span>
              <h3 className="font-heading font-extrabold text-xl text-white">
                Visit {STORE_NAME}
              </h3>
              <p className="text-xs text-blue-200">
                Come try shoes in person or pickup online orders!
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content details */}
        <div className="p-6 space-y-5 text-xs text-slate-600">
          
          {/* Address Card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-900 text-sm block">Store Address</span>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {STORE_ADDRESS}
                </p>
                <p className="text-slate-500 text-[11px]">
                  Landmark: Near Ranipura Market, Indore, M.P. - {STORE_PINCODE}
                </p>
              </div>
            </div>
          </div>

          {/* Timings and Contact grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Store Timings</span>
              </div>
              <p className="text-slate-600 pl-6">
                10:30 AM – 09:30 PM<br />
                <span className="text-emerald-700 font-semibold">Open All 7 Days</span>
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Official Direct Line</span>
              </div>
              <p className="font-mono text-slate-900 font-bold pl-6 text-sm">
                +91 {STORE_PHONE}
              </p>
            </div>
          </div>

          {/* Services available at store */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 block">Available at Indore Store:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live Trial of All UK Sizes (6 to 11)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Immediate In-Store Purchase</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cash, UPI, and Card Accepted</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Same-Day PAN India Dispatch Hub</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
            </a>

            <a
              href={`tel:${STORE_PHONE}`}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call Store</span>
            </a>

            <a
              href={`https://wa.me/${STORE_PHONE_INTL.replace('+', '')}?text=${encodeURIComponent('Hello Ahilya Footwear! I am planning to visit your store at Nandlalpura Near Ranipura Indore.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center cursor-pointer"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
