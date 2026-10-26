import React from 'react';
import { MapPin, Phone, MessageSquare, Truck, ShieldCheck, Heart } from 'lucide-react';
import { STORE_NAME, STORE_TAGLINE, STORE_PHONE, STORE_PHONE_INTL, STORE_ADDRESS, STORE_PINCODE } from '../data/products';

interface FooterProps {
  onOpenStoreModal: () => void;
  onOpenTrackModal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenStoreModal,
  onOpenTrackModal,
  onNavigateSection
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                AF
              </span>
              <span className="text-white font-heading font-extrabold text-lg tracking-tight">
                {STORE_NAME}
              </span>
            </div>
            <p className="text-slate-300 font-medium">
              {STORE_TAGLINE}
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              Your trusted footwear destination from Indore. Delivering premium sneakers, formal shoes, sports kicks, and traditional footwear PAN INDIA.
            </p>
            <div className="text-[11px] text-amber-400 font-semibold bg-amber-950/40 border border-amber-800/40 p-2 rounded-lg">
              ⚠️ Official Account Notice: Old accounts disabled. Only contact +91 {STORE_PHONE}.
            </div>
          </div>

          {/* Indore Store Visit */}
          <div className="space-y-3">
            <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider">
              Indore Retail Store
            </h4>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{STORE_ADDRESS}</span>
              </p>
              <p className="text-slate-400 pl-6 text-[11px]">
                Pin Code: {STORE_PINCODE} (Near Ranipura Cloth Market)
              </p>
              <p className="text-slate-400 pl-6 text-[11px]">
                Store Timings: 10:30 AM – 9:30 PM (Daily)
              </p>
            </div>
            <button
              onClick={onOpenStoreModal}
              className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 cursor-pointer"
            >
              Get Directions & Map →
            </button>
          </div>

          {/* PAN India Shipping & Security */}
          <div className="space-y-3">
            <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider">
              PAN India Delivery
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Shipping to all 28 States & 8 UTs</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Inspected & 7-Day Exchange</span>
              </div>
            </div>
            <div className="pt-1">
              <button
                onClick={onOpenTrackModal}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Track Your Parcel
              </button>
            </div>
          </div>

          {/* Official Helpline */}
          <div className="space-y-3">
            <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider">
              Official Helpline
            </h4>
            <div className="space-y-2 text-slate-300">
              <a
                href={`tel:${STORE_PHONE}`}
                className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="font-mono font-bold text-sm">+91 {STORE_PHONE}</span>
              </a>
              <a
                href={`https://wa.me/${STORE_PHONE_INTL.replace('+', '')}?text=${encodeURIComponent('Hello Ahilya Footwear! I need assistance with online shoe ordering.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: +91 {STORE_PHONE}</span>
              </a>
            </div>
            <p className="text-[11px] text-slate-400">
              Customer support available 10 AM to 9 PM daily for sizing, tracking, and inquiries.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {STORE_NAME}. All Rights Reserved. N73 Nandlalpura Near Ranipura, Indore M.P.
          </div>
          <div className="flex items-center gap-4">
            <span>Secure 256-Bit SSL Gateway</span>
            <span>·</span>
            <span>UPI / Card / Net Banking / COD</span>
            <span>·</span>
            <span>Shipping PAN India 🇮🇳</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
