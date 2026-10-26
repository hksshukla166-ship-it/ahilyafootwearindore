import React, { useState } from 'react';
import { MessageSquare, X, Phone, ShoppingBag, Send, ChevronRight } from 'lucide-react';
import { STORE_NAME, STORE_PHONE, STORE_PHONE_INTL, STORE_ADDRESS } from '../data/products';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const startWhatsAppChat = (customText?: string) => {
    const text = customText || `Hello ${STORE_NAME}! I want to order shoes from your Indore store.`;
    const url = `https://wa.me/${STORE_PHONE_INTL.replace('+', '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Card Header in WhatsApp Emerald Green */}
          <div className="bg-emerald-600 text-white p-4 flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                AF
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">{STORE_NAME}</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
                  Official WhatsApp Support
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-emerald-200 hover:text-white rounded-md hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-50 space-y-3 text-xs">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-xs border border-slate-200 text-slate-700 space-y-1">
              <p className="font-semibold text-slate-900">
                Namaste! Welcome to Ahilya Footwear. 👟
              </p>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                How can we help you today with kicks, UK sizing, or PAN India express shipping?
              </p>
              <span className="text-[10px] text-slate-400 block text-right">Indore Hub</span>
            </div>

            {/* Quick Prompt Buttons */}
            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => startWhatsAppChat('Hello! I want to browse and order kicks on WhatsApp.')}
                className="w-full text-left p-2.5 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg text-slate-800 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-medium text-[11px]">Order Kicks on WhatsApp</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => startWhatsAppChat('Hello! Could you help me select the right UK shoe size?')}
                className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-lg text-slate-800 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-medium text-[11px]">Ask About Size & Availability</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <a
                href={`tel:${STORE_PHONE}`}
                className="w-full text-left p-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-800 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  <span className="font-medium text-[11px]">Call Store: +91 {STORE_PHONE}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Direct Send button */}
            <button
              onClick={() => startWhatsAppChat()}
              className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start Direct Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Circular Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp Chat Support"
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer ring-4 ring-emerald-600/20"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

    </div>
  );
};
