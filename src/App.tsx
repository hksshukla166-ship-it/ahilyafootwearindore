/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { NoticeBanner } from './components/NoticeBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReviewsSection } from './components/ReviewsSection';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { OrderTrackModal } from './components/OrderTrackModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { Footer } from './components/Footer';

import { Product, CartItem, FootwearCategory, Order, Review } from './types';
import { PRODUCTS, STORE_NAME, STORE_PHONE } from './data/products';
import { getStoredReviews } from './data/reviews';
import { Truck, ShieldCheck, MapPin, MessageSquare, RotateCcw } from 'lucide-react';

export default function App() {
  // Catalog State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FootwearCategory>('all');
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('featured');

  // Modals & Panels State
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  // Cart & Order State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ahilya_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0);
  const [checkoutCoupon, setCheckoutCoupon] = useState<string | undefined>();
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ahilya_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(() => getStoredReviews());

  // Search input ref for header trigger
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ahilya_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync orders to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ahilya_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Cart operations
  const handleAddToCart = (product: Product, size: number, quantity: number = 1, color?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }

      const newItem: CartItem = {
        id: `${product.id}-${size}-${Date.now()}`,
        productId: product.id,
        product,
        selectedSize: size,
        selectedColor: color || product.colors[0],
        quantity
      };
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleInstantBuy = (product: Product, size: number, color?: string) => {
    handleAddToCart(product, size, 1, color);
    setActiveProductModal(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleProceedToCheckout = (discount: number, coupon?: string) => {
    setCheckoutDiscount(discount);
    setCheckoutCoupon(coupon);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
  };

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Size filter
      if (selectedSize !== null && !item.sizes.includes(selectedSize)) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCat = item.categoryLabel.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesColor = item.colors.some((c) => c.toLowerCase().includes(q));
        if (!matchesName && !matchesCat && !matchesDesc && !matchesColor) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [searchQuery, selectedCategory, selectedSize, sortBy]);

  // Navigation Helper
  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'sneakers-filter') {
      setSelectedCategory('sneakers');
      const el = document.getElementById('catalog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFocusSearch = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 300);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSize(null);
    setSortBy('featured');
  };

  const cartTotalItems = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* 1. Official Account Security Warning Banner */}
      <NoticeBanner />

      {/* 2. Top Bar Navigation (Zone 1 Brand | Zone 2 Links | Zone 3 Action) */}
      <Header
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStoreModal={() => setIsStoreModalOpen(true)}
        onOpenTrackModal={() => setIsTrackModalOpen(true)}
        onNavigateSection={handleNavigateSection}
        onToggleSearchFocus={handleFocusSearch}
      />

      {/* 3. Hero Section: "Kicks For Your Clicks", PAN India & Indore Showcase */}
      <Hero
        onExploreClick={() => handleNavigateSection('catalog-section')}
        onOpenStoreModal={() => setIsStoreModalOpen(true)}
      />

      {/* 4. Value Strip: Why Buy from Ahilya Footwear */}
      <section className="bg-white border-y border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-xs sm:text-sm">Shipping PAN INDIA</span>
                <span className="text-slate-500 text-[11px]">Delhivery & BlueDart express dispatch</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-xs sm:text-sm">Secure Payment Gateway</span>
                <span className="text-slate-500 text-[11px]">UPI, Cards, Net Banking & COD</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-xs sm:text-sm">Indore Physical Store</span>
                <span className="text-slate-500 text-[11px]">Nandlalpura Near Ranipura hub</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-xs sm:text-sm">Direct WhatsApp Order</span>
                <span className="text-slate-500 text-[11px]">1-click order to +91 {STORE_PHONE}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Main Catalog Section with Live Search & Footwear Filters */}
      <main id="catalog-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
              Curated Footwear Collection
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
              All Types Of Footwear Available
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Premium court sneakers, athletic running shoes, formal leather brogues, suede loafers, and traditional mojaris.
            </p>
          </div>

          <div className="text-xs text-slate-500">
            Official Indore Store · Verified Authentic
          </div>
        </div>

        {/* Search Bar & Size Filter */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultCount={filteredProducts.length}
          inputRef={searchInputRef}
        />

        {/* Category Segmented Buttons */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Product Cards Grid (3 cols on desktop, 2 on tablet, 1 on mobile) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={(p) => setActiveProductModal(p)}
                onQuickAdd={(p, size) => handleAddToCart(p, size, 1)}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <RotateCcw className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-slate-900 text-lg">No matching footwear found</h3>
            <p className="text-xs text-slate-500">
              We couldn't find any footwear matching "{searchQuery}". Try clearing your size or search terms.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Reset Filters & Show All Shoes
            </button>
          </div>
        )}

      </main>

      {/* 6. Customer Reviews Section with 4.9 Rating & Submission Form */}
      <ReviewsSection
        reviews={reviews}
        onReviewsUpdated={(updated) => setReviews(updated)}
      />

      {/* 7. Footer with PAN India Courier Details, Store Address & Phone */}
      <Footer
        onOpenStoreModal={() => setIsStoreModalOpen(true)}
        onOpenTrackModal={() => setIsTrackModalOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* 8. Floating WhatsApp Help & Order Widget */}
      <WhatsAppWidget />

      {/* 9. Product Details Modal with Size Guide & Direct WhatsApp Buy */}
      {activeProductModal && (
        <ProductDetailModal
          product={activeProductModal}
          onClose={() => setActiveProductModal(null)}
          onAddToCart={(p, size, qty, color) => handleAddToCart(p, size, qty, color)}
          onInstantBuy={handleInstantBuy}
        />
      )}

      {/* 10. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* 11. Secure Payment Gateway & PAN India Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discountAmount={checkoutDiscount}
        couponCode={checkoutCoupon}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* 12. Indore Store Locator & Directions Modal */}
      <StoreLocatorModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
      />

      {/* 13. PAN India Order Tracking Modal */}
      <OrderTrackModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        recentOrders={orders}
      />

    </div>
  );
}
