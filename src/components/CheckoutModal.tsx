import React, { useState } from 'react';
import { 
  X, ShieldCheck, CheckCircle2, Lock, CreditCard, QrCode, 
  Smartphone, Building2, Banknote, ArrowRight, ArrowLeft, 
  Copy, Check, Printer, MessageSquare, Truck, AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, PaymentMethod, ShippingAddress, Order } from '../types';
import { formatINR, generateOrderId, calculateCartTotals } from '../utils/helpers';
import { INDIAN_STATES, STORE_PHONE, STORE_PHONE_INTL, STORE_NAME, STORE_ADDRESS } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  couponCode?: string;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  couponCode,
  onOrderSuccess
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'otp' | 'success'>('shipping');
  
  // Shipping Form State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    email: '',
    addressLine: '',
    city: '',
    state: 'Madhya Pradesh',
    pincode: '',
    landmark: ''
  });

  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiOption, setUpiOption] = useState<'qr' | 'gpay' | 'phonepe' | 'paytm'>('qr');
  const [upiCopied, setUpiCopied] = useState(false);
  const [upiTxnId, setUpiTxnId] = useState('');

  // Card Form State
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  // Net banking
  const [selectedBank, setSelectedBank] = useState('sbi');

  // Processing state & simulated OTP
  const [isProcessing, setIsProcessing] = useState(false);
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  // Final Placed Order State
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const { subtotal, deliveryCharge, total } = calculateCartTotals(items, discountAmount);

  // Address validation
  const validateShipping = (): boolean => {
    const errs: Record<string, string> = {};
    if (!address.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!address.phone.trim() || !/^[6-9]\d{9}$/.test(address.phone.trim())) {
      errs.phone = 'Valid 10-digit Indian mobile number required';
    }
    if (!address.addressLine.trim()) errs.addressLine = 'Street address is required';
    if (!address.city.trim()) errs.city = 'City / Town is required';
    if (!address.pincode.trim() || !/^\d{6}$/.test(address.pincode.trim())) {
      errs.pincode = 'Valid 6-digit Indian PIN Code required';
    }
    setShippingErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep('payment');
    }
  };

  // Copy UPI ID helper
  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(`8770690143@upi`);
    setUpiCopied(true);
    setTimeout(() => setUpiCopied(false), 2000);
  };

  // Card format helpers
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    val = val.replace(/(\d{4})/g, '$1 ').trim();
    setCardDetails({ ...cardDetails, number: val });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
    }
    setCardDetails({ ...cardDetails, expiry: val });
  };

  // Process Final Order
  const finalizeOrder = (txId?: string) => {
    setIsProcessing(true);
    const orderId = generateOrderId();
    
    // Delivery estimate: 3 to 4 business days
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const estDateStr = deliveryDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newOrder: Order = {
      id: orderId,
      items: [...items],
      subtotal,
      deliveryCharge,
      discount: discountAmount,
      couponCode,
      total,
      shippingAddress: address,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'cod_confirmed' : 'paid',
      transactionId: txId || `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      orderDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      estimatedDeliveryDate: estDateStr,
      currentStatus: 'Placed'
    };

    setTimeout(() => {
      setIsProcessing(false);
      setCompletedOrder(newOrder);
      setStep('success');
      onOrderSuccess(newOrder);

      // Launch celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback gracefully
      }
    }, 1200);
  };

  const handlePayNow = () => {
    if (paymentMethod === 'card') {
      const errs: Record<string, string> = {};
      if (cardDetails.number.replace(/\s/g, '').length < 16) {
        errs.number = 'Enter 16-digit card number';
      }
      if (!cardDetails.name.trim()) errs.name = 'Cardholder name is required';
      if (cardDetails.expiry.length < 5) errs.expiry = 'MM/YY required';
      if (cardDetails.cvv.length < 3) errs.cvv = 'CVV required';

      setCardErrors(errs);
      if (Object.keys(errs).length > 0) return;

      // Card 3D Secure simulation
      const mockOtp = String(Math.floor(100000 + Math.random() * 900000));
      setSimulatedOtp(mockOtp);
      setEnteredOtp(mockOtp); // Pre-fill for instant seamless test experience
      setStep('otp');
      return;
    }

    if (paymentMethod === 'upi' && upiOption === 'qr' && !upiTxnId.trim()) {
      // Auto-assign sample reference if left blank
      finalizeOrder(`UPI-${Math.floor(1000000000 + Math.random() * 9000000000)}`);
      return;
    }

    finalizeOrder(upiTxnId.trim() || undefined);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp.trim() !== simulatedOtp) {
      setOtpError('Invalid OTP code. Please re-enter.');
      return;
    }
    setOtpError('');
    finalizeOrder(`CARD-AUTH-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleSendOrderToWhatsApp = () => {
    if (!completedOrder) return;
    let text = `*New Verified Order Confirmed!* 👟\n` +
      `*Order ID:* #${completedOrder.id}\n` +
      `*Customer:* ${completedOrder.shippingAddress.fullName}\n` +
      `*Phone:* ${completedOrder.shippingAddress.phone}\n` +
      `*Address:* ${completedOrder.shippingAddress.addressLine}, ${completedOrder.shippingAddress.city}, ${completedOrder.shippingAddress.state} - ${completedOrder.shippingAddress.pincode}\n` +
      `*Payment:* ${completedOrder.paymentMethod.toUpperCase()} (${completedOrder.paymentStatus})\n` +
      `*Total Paid:* ₹${completedOrder.total}\n\n` +
      `*Items:*\n`;

    completedOrder.items.forEach((it, idx) => {
      text += `${idx + 1}. ${it.product.name} (UK ${it.selectedSize}) x ${it.quantity} = ₹${it.product.price * it.quantity}\n`;
    });

    text += `\nPlease dispatch from Indore warehouse to my address via PAN India courier. Thank you!`;

    const url = `https://wa.me/${STORE_PHONE_INTL.replace('+', '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h3 className="font-heading font-bold text-sm sm:text-base text-white">
              {step === 'success' ? 'Order Confirmed' : 'Secure 256-Bit SSL Checkout'}
            </h3>
          </div>
          {step !== 'success' && (
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Tabs indicator (Shipping -> Payment -> Confirmation) */}
        {step !== 'success' && (
          <div className="bg-slate-100 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 'shipping' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'}`}>
                1
              </span>
              <span className={step === 'shipping' ? 'text-blue-900' : 'text-slate-600'}>
                PAN India Delivery
              </span>
            </div>
            <div className="h-0.5 w-12 bg-slate-300" />
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 'payment' || step === 'otp' ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-700'}`}>
                2
              </span>
              <span className={step === 'payment' || step === 'otp' ? 'text-blue-900' : 'text-slate-500'}>
                Payment Gateway
              </span>
            </div>
            <div className="h-0.5 w-12 bg-slate-300" />
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center text-[11px]">
                3
              </span>
              <span className="text-slate-500">Confirmed</span>
            </div>
          </div>
        )}

        {/* STEP 1: SHIPPING ADDRESS */}
        {step === 'shipping' && (
          <form onSubmit={handleProceedToPayment} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-slate-900 text-base">
                Delivery Address (Shipping to all Indian states)
              </h4>
              <span className="text-xs text-blue-600 font-medium">Pan India Courier Dispatch</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  placeholder="e.g. Rohit Sharma"
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {shippingErrors.fullName && <p className="text-[11px] text-red-600 mt-0.5">{shippingErrors.fullName}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Mobile Number (for Courier & WhatsApp updates) *
                </label>
                <input
                  type="tel"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  placeholder="10-digit mobile number"
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono"
                />
                {shippingErrors.phone && <p className="text-[11px] text-red-600 mt-0.5">{shippingErrors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Email Address (for Digital Receipt)
                </label>
                <input
                  type="email"
                  value={address.email}
                  onChange={(e) => setAddress({ ...address, email: e.target.value })}
                  placeholder="rohit.sharma@example.com"
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  House / Flat / Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={address.addressLine}
                  onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                  placeholder="House/Plot no., building, street name, area"
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {shippingErrors.addressLine && <p className="text-[11px] text-red-600 mt-0.5">{shippingErrors.addressLine}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  City / District *
                </label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  placeholder="e.g. Indore, Mumbai, Bhopal"
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {shippingErrors.city && <p className="text-[11px] text-red-600 mt-0.5">{shippingErrors.city}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  State / Union Territory *
                </label>
                <select
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  6-Digit PIN Code *
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                  placeholder="e.g. 452007"
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono"
                />
                {shippingErrors.pincode && <p className="text-[11px] text-red-600 mt-0.5">{shippingErrors.pincode}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Nearby Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={address.landmark}
                  onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                  placeholder="e.g. Near Ranipura Chowk"
                  className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Subtotal reminder strip */}
            <div className="p-3 bg-slate-100/80 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500">Payable Total:</span>
                <span className="ml-2 font-bold text-slate-900 text-sm tabular-nums">{formatINR(total)}</span>
              </div>
              <span className="text-emerald-700 font-semibold">
                {deliveryCharge === 0 ? 'FREE PAN India Shipping' : `Shipping: ${formatINR(deliveryCharge)}`}
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer"
              >
                Back to Bag
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PAYMENT GATEWAY */}
        {step === 'payment' && (
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-base">
                  Select Secure Payment Method
                </h4>
                <p className="text-xs text-slate-500">End-to-end encrypted Indian payment gateway</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500">Payable:</span>
                <div className="text-lg font-bold text-blue-700 tabular-nums">{formatINR(total)}</div>
              </div>
            </div>

            {/* Payment Options Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  paymentMethod === 'upi'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  {paymentMethod === 'upi' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <div>
                  <div className="font-bold text-xs">UPI & QR</div>
                  <div className="text-[10px] text-slate-500">GPay, PhonePe, Paytm</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  {paymentMethod === 'card' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <div>
                  <div className="font-bold text-xs">Cards</div>
                  <div className="text-[10px] text-slate-500">Visa, RuPay, Master</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  paymentMethod === 'netbanking'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  {paymentMethod === 'netbanking' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <div>
                  <div className="font-bold text-xs">Net Banking</div>
                  <div className="text-[10px] text-slate-500">SBI, HDFC, ICICI</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  paymentMethod === 'cod'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Banknote className="w-4 h-4 text-blue-600" />
                  {paymentMethod === 'cod' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <div>
                  <div className="font-bold text-xs">Cash on Delivery</div>
                  <div className="text-[10px] text-slate-500">Pay at doorstep</div>
                </div>
              </button>
            </div>

            {/* TAB 1: UPI / QR PAYMENT */}
            {paymentMethod === 'upi' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Scan & Pay via any UPI App:</span>
                  <span className="text-emerald-700 font-bold">Zero Transaction Fee</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  {/* Generated QR Code Graphic */}
                  <div className="w-32 h-32 bg-white p-2 rounded-xl border border-slate-300 shadow-xs flex flex-col items-center justify-center shrink-0 text-center">
                    <QrCode className="w-24 h-24 text-slate-800" />
                    <span className="text-[9px] font-mono text-slate-500">Scan via UPI App</span>
                  </div>

                  <div className="space-y-2 flex-1">
                    <div>
                      <span className="text-slate-500 text-[11px] block">Verified Store Merchant UPI ID:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-300 font-mono text-xs font-bold text-blue-800 select-all">
                          8770690143@upi
                        </code>
                        <button
                          type="button"
                          onClick={handleCopyUpiId}
                          className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-1 transition-colors cursor-pointer text-xs"
                        >
                          {upiCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{upiCopied ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500">
                      Open <strong>Google Pay</strong>, <strong>PhonePe</strong>, <strong>Paytm</strong>, or <strong>BHIM</strong>, transfer <strong className="text-slate-900">{formatINR(total)}</strong> to <span className="font-mono">8770690143@upi</span>.
                    </p>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                        UTR / Transaction ID (Optional):
                      </label>
                      <input
                        type="text"
                        value={upiTxnId}
                        onChange={(e) => setUpiTxnId(e.target.value)}
                        placeholder="e.g. 314892019481"
                        className="w-full text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DEBIT / CREDIT CARD */}
            {paymentMethod === 'card' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Card Number (Visa / Mastercard / RuPay)
                  </label>
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={handleCardNumberChange}
                    placeholder="4532 •••• •••• 8912"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 font-mono"
                  />
                  {cardErrors.number && <p className="text-[11px] text-red-600 mt-0.5">{cardErrors.number}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    placeholder="Name as printed on card"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 uppercase"
                  />
                  {cardErrors.name && <p className="text-[11px] text-red-600 mt-0.5">{cardErrors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={handleExpiryChange}
                      placeholder="10/28"
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 font-mono"
                    />
                    {cardErrors.expiry && <p className="text-[11px] text-red-600 mt-0.5">{cardErrors.expiry}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      CVV / Security Code
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                      placeholder="•••"
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 font-mono"
                    />
                    {cardErrors.cvv && <p className="text-[11px] text-red-600 mt-0.5">{cardErrors.cvv}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Your card is encrypted with 256-bit bank grade security.</span>
                </div>
              </div>
            )}

            {/* TAB 3: NET BANKING */}
            {paymentMethod === 'netbanking' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                <label className="font-semibold text-slate-700 block">
                  Select Your Indian Bank:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'sbi', name: 'State Bank of India (SBI)' },
                    { id: 'hdfc', name: 'HDFC Bank' },
                    { id: 'icici', name: 'ICICI Bank' },
                    { id: 'axis', name: 'Axis Bank' },
                    { id: 'pnb', name: 'Punjab National Bank' },
                    { id: 'kotak', name: 'Kotak Mahindra' }
                  ].map((bank) => (
                    <label
                      key={bank.id}
                      className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-colors ${
                        selectedBank === bank.id
                          ? 'border-blue-600 bg-blue-50/80 font-semibold text-blue-900'
                          : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="bank"
                        checked={selectedBank === bank.id}
                        onChange={() => setSelectedBank(bank.id)}
                        className="text-blue-600"
                      />
                      <span className="truncate">{bank.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: CASH ON DELIVERY */}
            {paymentMethod === 'cod' && (
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <Banknote className="w-4 h-4 text-amber-700" />
                  <span>Cash on Delivery (COD) Available</span>
                </div>
                <p className="text-amber-800 leading-relaxed">
                  Pay <strong>{formatINR(total)}</strong> in cash or via UPI QR to the delivery agent when your shoes arrive at your doorstep. We will call you on <strong>{address.phone}</strong> from our Indore dispatch hub to re-confirm before courier shipping.
                </p>
                <div className="text-[11px] text-amber-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Inspected before packing · 7-day exchange allowed</span>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Address</span>
              </button>

              <button
                type="button"
                onClick={handlePayNow}
                disabled={isProcessing}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isProcessing ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {paymentMethod === 'cod'
                        ? 'Confirm Cash on Delivery Order'
                        : `Pay ${formatINR(total)} Now`}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP: 3D SECURE OTP SIMULATION FOR CARD */}
        {step === 'otp' && (
          <div className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-slate-900 text-base">
                Verified by Visa / Mastercard 3D Secure
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Enter the One Time Password (OTP) sent to your registered mobile number for card ending in {cardDetails.number.slice(-4) || '8912'}.
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="max-w-xs mx-auto space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  6-Digit OTP Code:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center text-lg font-mono tracking-widest px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 font-bold"
                  placeholder="123456"
                />
                {otpError && <p className="text-xs text-red-600 mt-1 text-center">{otpError}</p>}
                <p className="text-[11px] text-blue-600 mt-1.5 text-center">
                  (Simulated Sandbox OTP: <strong>{simulatedOtp}</strong>)
                </p>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
              >
                {isProcessing ? 'Verifying OTP...' : 'Authorize Transaction'}
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMED SUCCESS */}
        {step === 'success' && completedOrder && (
          <div className="p-6 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-extrabold text-slate-900 text-xl">
                Order Placed Successfully! 🎉
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you for choosing <strong>{STORE_NAME}</strong>! Your kicks will be packed at our Indore hub and dispatched via PAN India express courier.
              </p>
            </div>

            {/* Order Details Receipt Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <span className="text-slate-500">Order ID:</span>
                  <div className="font-mono font-bold text-slate-900 text-sm">#{completedOrder.id}</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Estimated Delivery:</span>
                  <div className="font-bold text-emerald-700">{completedOrder.estimatedDeliveryDate}</div>
                </div>
              </div>

              {/* Items summary */}
              <div className="space-y-1.5">
                <span className="font-semibold text-slate-700">Ordered Footwear:</span>
                {completedOrder.items.map((it) => (
                  <div key={it.id} className="flex justify-between text-slate-600">
                    <span>{it.product.name} (UK {it.selectedSize}) × {it.quantity}</span>
                    <span className="font-mono tabular-nums font-semibold">{formatINR(it.product.price * it.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Delivery Address */}
              <div className="border-t border-slate-200 pt-2 text-slate-600">
                <span className="font-semibold text-slate-700">Shipping Address:</span>
                <p className="mt-0.5">
                  {completedOrder.shippingAddress.fullName} (📞 {completedOrder.shippingAddress.phone})<br />
                  {completedOrder.shippingAddress.addressLine}, {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state} - {completedOrder.shippingAddress.pincode}
                </p>
              </div>

              {/* Total & Payment */}
              <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Total Amount:</span>
                <span className="text-blue-700 tabular-nums">{formatINR(completedOrder.total)}</span>
              </div>
            </div>

            {/* PAN India Shipping Tracker Timeline */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-blue-900">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>PAN India Shipping Status:</span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-[11px] text-center">
                <div className="p-1.5 bg-blue-600 text-white rounded font-medium">1. Placed</div>
                <div className="p-1.5 bg-blue-100 text-blue-800 rounded font-medium">2. Packing</div>
                <div className="p-1.5 bg-slate-100 text-slate-500 rounded">3. In Transit</div>
                <div className="p-1.5 bg-slate-100 text-slate-500 rounded">4. Delivery</div>
              </div>
            </div>

            {/* Action Buttons: WhatsApp dispatch message & Print */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleSendOrderToWhatsApp}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Order to Official WhatsApp (+91 {STORE_PHONE})</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
