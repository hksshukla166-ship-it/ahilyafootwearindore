import { Product, CartItem, Order } from '../types';
import { STORE_PHONE_INTL, STORE_NAME, STORE_ADDRESS } from '../data/products';

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function generateOrderId(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `AH-IND-${randomNum}`;
}

export function buildWhatsAppProductUrl(product: Product, size: number, color?: string): string {
  const text = `*Order Inquiry: ${STORE_NAME}* 👟\n\n` +
    `Hello Ahilya Footwear, I want to order this footwear:\n` +
    `• *Model:* ${product.name}\n` +
    `• *Size:* UK ${size}\n` +
    `• *Color:* ${color || product.colors[0]}\n` +
    `• *Price:* ₹${product.price} (MRP: ₹${product.originalPrice})\n` +
    `• *Store:* ${STORE_ADDRESS}\n\n` +
    `Please confirm stock availability and PAN India shipping details.`;

  return `https://wa.me/${STORE_PHONE_INTL.replace('+', '')}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppCartUrl(items: CartItem[], total: number, orderId?: string): string {
  let text = `*New Order - ${STORE_NAME}* 👟\n`;
  if (orderId) text += `*Order ID:* #${orderId}\n`;
  text += `*Total Amount:* ₹${total}\n\n*Items Ordered:*\n`;

  items.forEach((item, index) => {
    text += `${index + 1}. ${item.product.name} (UK Size ${item.selectedSize}) x ${item.quantity} = ₹${item.product.price * item.quantity}\n`;
  });

  text += `\nPlease confirm my PAN India delivery dispatch. Thank you!`;
  return `https://wa.me/${STORE_PHONE_INTL.replace('+', '')}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppDirectChatUrl(): string {
  const text = `Namaste ${STORE_NAME}! I'm visiting your website and have a question regarding footwear sizing, stock, or PAN India shipping from your Indore Ranipura store.`;
  return `https://wa.me/${STORE_PHONE_INTL.replace('+', '')}?text=${encodeURIComponent(text)}`;
}

export function calculateCartTotals(items: CartItem[], discountAmount: number = 0) {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryCharge = subtotal > 1499 || subtotal === 0 ? 0 : 99;
  const total = Math.max(0, subtotal + deliveryCharge - discountAmount);

  return {
    subtotal,
    deliveryCharge,
    total
  };
}
