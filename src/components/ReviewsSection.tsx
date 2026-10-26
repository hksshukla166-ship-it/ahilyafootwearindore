import React, { useState } from 'react';
import { Star, CheckCircle2, ThumbsUp, Plus, X, MessageSquare } from 'lucide-react';
import { Review } from '../types';
import { saveReviewToStorage } from '../data/reviews';
import { PRODUCTS, STORE_PHONE } from '../data/products';

interface ReviewsSectionProps {
  reviews: Review[];
  onReviewsUpdated: (reviews: Review[]) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onReviewsUpdated
}) => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [helpfulGiven, setHelpfulGiven] = useState<Record<string, boolean>>({});

  // New review form state
  const [formData, setFormData] = useState({
    author: '',
    city: 'Indore',
    state: 'Madhya Pradesh',
    rating: 5,
    footwearModel: PRODUCTS[0].name,
    title: '',
    comment: '',
    sizeBought: 9
  });

  const filteredReviews = filterRating === 'all'
    ? reviews
    : reviews.filter((r) => r.rating === filterRating);

  const handleHelpfulClick = (id: string) => {
    if (helpfulGiven[id]) return;
    setHelpfulGiven({ ...helpfulGiven, [id]: true });
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r
    );
    onReviewsUpdated(updated);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: formData.author.trim(),
      city: formData.city.trim() || 'Indore',
      state: formData.state.trim() || 'Madhya Pradesh',
      rating: formData.rating,
      date: new Date().toISOString().split('T')[0],
      title: formData.title.trim() || 'Great footwear purchase!',
      comment: formData.comment.trim(),
      footwearModel: formData.footwearModel,
      verifiedBuyer: true,
      sizeBought: formData.sizeBought,
      helpfulCount: 0
    };

    const updated = saveReviewToStorage(newRev);
    onReviewsUpdated(updated);
    setIsWriteModalOpen(false);
    // Reset form
    setFormData({
      author: '',
      city: 'Indore',
      state: 'Madhya Pradesh',
      rating: 5,
      footwearModel: PRODUCTS[0].name,
      title: '',
      comment: '',
      sizeBought: 9
    });
  };

  return (
    <section id="reviews-section" className="py-14 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
              <span>Customer Experiences</span>
              <span>·</span>
              <span>PAN India Verified Buyers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
              Customer Reviews & Ratings
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Authentic reviews from shoe lovers and customers who purchased from our Indore store and online PAN India catalog.
            </p>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Breakdown & Stats Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Average Rating Score */}
          <div className="md:col-span-4 text-center md:text-left md:border-r border-slate-200 md:pr-6 space-y-1">
            <div className="text-5xl font-black font-heading text-slate-900 tracking-tight tabular-nums">
              4.9
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-500 pt-1">
              Based on 1,280+ verified footwear orders across PAN India
            </p>
          </div>

          {/* Rating Bars */}
          <div className="md:col-span-8 space-y-2 text-xs">
            {[
              { stars: 5, percent: 92, count: 1180 },
              { stars: 4, percent: 6, count: 78 },
              { stars: 3, percent: 2, count: 22 }
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-3">
                <span className="w-14 text-slate-600 font-semibold">{row.stars} Stars</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full"
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
                <span className="w-12 text-right text-slate-400 tabular-nums">{row.percent}%</span>
              </div>
            ))}
          </div>

        </div>

        {/* Filter Tabs for Reviews */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-semibold text-slate-500 mr-1">Filter by:</span>
          <button
            onClick={() => setFilterRating('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterRating === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setFilterRating(5)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              filterRating === 5
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>5 Stars</span>
            <Star className="w-3 h-3 fill-current text-amber-400" />
          </button>
          <button
            onClick={() => setFilterRating(4)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              filterRating === 4
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>4 Stars</span>
            <Star className="w-3 h-3 fill-current text-amber-400" />
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 tabular-nums">{rev.date}</span>
                </div>

                <h4 className="font-heading font-bold text-slate-900 text-sm leading-snug">
                  {rev.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span className="font-semibold text-blue-700 truncate max-w-[200px]">
                    {rev.footwearModel}
                  </span>
                  {rev.sizeBought && <span>Size: UK {rev.sizeBought}</span>}
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div>
                    <div className="font-bold text-slate-800 flex items-center gap-1">
                      <span>{rev.author}</span>
                      {rev.verifiedBuyer && (
                        <span title="Verified Customer">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.city}, {rev.state}</span>
                  </div>

                  <button
                    onClick={() => handleHelpfulClick(rev.id)}
                    className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded transition-colors cursor-pointer ${
                      helpfulGiven[rev.id]
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful ({rev.helpfulCount})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* WRITE A REVIEW MODAL */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-base">Write a Customer Review</h3>
                <p className="text-xs text-slate-500">Share your experience with Ahilya Footwear</p>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="e.g. Ankit Trivedi"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Indore"
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Size Purchased</label>
                  <select
                    value={formData.sizeBought}
                    onChange={(e) => setFormData({ ...formData, sizeBought: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    {[6, 7, 8, 9, 10, 11].map((s) => (
                      <option key={s} value={s}>UK {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Shoe Model</label>
                <select
                  value={formData.footwearModel}
                  onChange={(e) => setFormData({ ...formData, footwearModel: e.target.value })}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Star Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating ? 'fill-current text-amber-500' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-bold text-slate-800 ml-2">{formData.rating} out of 5</span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Review Headline</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Extremely comfortable sneaker!"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Your Detailed Review *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Tell us about the cushioning, fit, delivery speed from Indore..."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
