import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Truck, RefreshCw, Star, MapPin } from 'lucide-react';
import { STORE_NAME, STORE_TAGLINE, STORE_PHONE, STORE_PHONE_INTL } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onOpenStoreModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenStoreModal }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white">
      {/* Subtle architectural background grid glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e40af_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute -top-40 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-18 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline and Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed inline metadata tag */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-blue-300">
              <span className="text-blue-400 font-semibold uppercase tracking-wider">Official Store</span>
              <span aria-hidden="true">·</span>
              <span>Shipping PAN India</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                4.9 / 5 Rating
              </span>
            </div>

            {/* Display Headline without orphan wrapping */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading leading-tight max-w-2xl" style={{ textWrap: 'balance' }}>
              {STORE_NAME} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-200">
                {STORE_TAGLINE}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
              All types of footwear available. From high-energy court sneakers and sports runners to handcrafted formal oxfords, suede loafers, and traditional wedding mojaris.
            </p>

            {/* Physical Location Pin Button */}
            <button
              onClick={onOpenStoreModal}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 px-3.5 py-2 rounded-lg transition-colors cursor-pointer text-left"
            >
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span>📍 N73 Nandlalpura Near Ranipura Indore M.P.</span>
              <span className="text-blue-400 text-xs underline font-semibold ml-1">Visit Store →</span>
            </button>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-lg shadow-lg shadow-blue-900/40 transition-all flex items-center gap-2 group cursor-pointer whitespace-nowrap"
              >
                <span>Browse Footwear</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${STORE_PHONE_INTL.replace('+', '')}?text=${encodeURIComponent('Hello Ahilya Footwear! I saw your website and want to order kicks on WhatsApp.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-lg shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Quick Order</span>
              </a>
            </div>

            {/* Trust Points */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>PAN India Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>100% Quality Checked</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Easy 7-Day Exchange</span>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Sneaker Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl group">
              <img
                src="/src/assets/images/hero_sneaker_showcase_1793001987243.jpg"
                alt="Ahilya Footwear Signature Air Velocity Sneaker"
                className="w-full h-72 sm:h-84 lg:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              
              {/* Image Scrim & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-wider">
                      Featured Drop
                    </span>
                    <h2 className="text-lg font-bold text-white font-heading">
                      Air Velocity Retro Court
                    </h2>
                    <p className="text-xs text-slate-300">Sizes UK 6 to 11 available</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through">₹3,299</span>
                    <div className="text-lg font-bold text-white tabular-nums">₹1,899</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick delivery promise card */}
            <div className="mt-3 bg-blue-900/40 border border-blue-800/60 rounded-lg p-3 text-xs text-blue-200 flex items-center justify-between">
              <span>🇮🇳 Dispatching daily from Indore to all 28 states</span>
              <span className="font-semibold text-white">COD Available</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
