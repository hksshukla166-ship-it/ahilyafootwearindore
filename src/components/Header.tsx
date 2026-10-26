import React, { useState } from 'react';
import { ShoppingBag, Search, MapPin, Truck, Phone, MessageSquare, Menu, X } from 'lucide-react';
import { STORE_NAME, STORE_PHONE, STORE_PHONE_INTL } from '../data/products';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenStoreModal: () => void;
  onOpenTrackModal: () => void;
  onNavigateSection: (sectionId: string) => void;
  onToggleSearchFocus: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenStoreModal,
  onOpenTrackModal,
  onNavigateSection,
  onToggleSearchFocus
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Primary Top Bar adhering to the Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Brand Wordmark (Single text element in display face) */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl sm:text-2xl font-bold tracking-tight text-blue-900 font-heading whitespace-nowrap shrink-0 flex items-center gap-2 group"
          >
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-blue-700 transition-colors">
              AF
            </span>
            <span className="tracking-tight">AHILYA FOOTWEAR</span>
          </a>

          {/* Zone 2: 4–5 single-line clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('catalog-section')}
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              All Footwear
            </button>
            <button
              onClick={() => handleNavClick('sneakers-filter')}
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Sneakers & Kicks
            </button>
            <button
              onClick={onOpenStoreModal}
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Indore Store
            </button>
            <button
              onClick={() => handleNavClick('reviews-section')}
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Customer Reviews
            </button>
            <button
              onClick={onOpenTrackModal}
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 text-slate-600"
            >
              <Truck className="w-3.5 h-3.5 text-slate-500" />
              Track Order
            </button>
          </nav>

          {/* Zone 3: Primary Action & Bag Button */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <button
              onClick={onToggleSearchFocus}
              aria-label="Search footwear"
              className="p-2 sm:px-3 sm:py-2 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline text-xs font-medium text-slate-500">Search shoes...</span>
            </button>

            <a
              href={`https://wa.me/${STORE_PHONE_INTL.replace('+', '')}?text=${encodeURIComponent('Hello Ahilya Footwear! I would like to inquire about kicks & footwear sizes.')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Support"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              WhatsApp Help
            </a>

            <button
              onClick={onOpenCart}
              aria-label={`Shopping Cart with ${cartCount} items`}
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="bg-white text-blue-700 text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center tabular-nums shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-800">
            <button
              onClick={() => handleNavClick('catalog-section')}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg text-slate-800 cursor-pointer"
            >
              All Footwear Catalog
            </button>
            <button
              onClick={() => handleNavClick('sneakers-filter')}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg text-slate-800 cursor-pointer"
            >
              Sneakers & Kicks
            </button>
            <button
              onClick={() => {
                onOpenStoreModal();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg text-blue-700 flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              Visit Indore Store (Ranipura)
            </button>
            <button
              onClick={() => handleNavClick('reviews-section')}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg text-slate-800 cursor-pointer"
            >
              Customer Reviews (4.9 ★)
            </button>
            <button
              onClick={() => {
                onOpenTrackModal();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-lg text-slate-800 flex items-center gap-2 cursor-pointer"
            >
              <Truck className="w-4 h-4 text-slate-500" />
              Track PAN India Order
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${STORE_PHONE}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-600" />
              Call Support: +91 {STORE_PHONE}
            </a>
            <a
              href={`https://wa.me/${STORE_PHONE_INTL.replace('+', '')}?text=${encodeURIComponent('Hello Ahilya Footwear Indore! I would like to order shoes via WhatsApp.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-xs font-semibold text-white transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Direct WhatsApp Order
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
