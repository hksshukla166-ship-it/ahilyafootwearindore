import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronRight, X, PhoneCall } from 'lucide-react';
import { STORE_PHONE, STORE_PHONE_INTL } from '../data/products';

export const NoticeBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <aside aria-label="Official announcement" className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white text-xs sm:text-sm font-medium px-4 py-2 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="flex items-center gap-1.5 shrink-0 bg-white/20 text-white px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-200" />
              Notice
            </span>
            <p className="truncate text-amber-50">
              <strong className="text-white font-semibold">OLD ACCOUNT DISABLED:</strong> This is our verified official website & direct WhatsApp line (📞 <span className="underline font-bold text-white tracking-wide">{STORE_PHONE}</span>). Shipping PAN India.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowDetails(true)}
              className="text-white hover:text-amber-100 text-xs font-semibold underline underline-offset-2 flex items-center gap-0.5 transition-colors cursor-pointer"
            >
              Learn More
              <ChevronRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Dismiss notice"
              className="p-1 hover:bg-white/10 rounded transition-colors text-amber-100 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Notice Explanation Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900">Official Notice to Customers</h3>
                  <p className="text-xs text-slate-500">Security & Authentication Update</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-600 leading-relaxed mb-6">
              <p>
                Please be advised that our previous Instagram / social media business account has been <strong>disabled</strong>. Do NOT transfer funds or place orders through any old accounts or third-party handles.
              </p>
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg space-y-2 text-xs text-blue-900">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Official Verified Contact:</span>
                </div>
                <p className="pl-6 font-mono text-sm font-bold text-blue-800">
                  +91 {STORE_PHONE}
                </p>
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Physical Store in Indore:</span>
                </div>
                <p className="pl-6 text-slate-700">
                  N73 Nandlalpura Near Ranipura, Indore, Madhya Pradesh
                </p>
              </div>
              <p className="text-xs text-slate-500">
                All online transactions made on this website are protected by 256-bit SSL encryption with official order tracking and WhatsApp dispatch confirmation.
              </p>
            </div>

            <div className="flex gap-2">
              <a
                href={`tel:${STORE_PHONE}`}
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Call {STORE_PHONE}
              </a>
              <button
                onClick={() => setShowDetails(false)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
