export type FootwearCategory = 
  | 'all'
  | 'sneakers'
  | 'sports'
  | 'formal'
  | 'casual'
  | 'ethnic'
  | 'boots'
  | 'slides';

export type FootwearGender = 'all' | 'men' | 'women' | 'unisex' | 'kids';

export interface Product {
  id: string;
  name: string;
  category: FootwearCategory;
  categoryLabel: string;
  gender: FootwearGender;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  sizes: number[]; // UK / IND sizing (e.g., 6, 7, 8, 9, 10, 11)
  colors: string[];
  description: string;
  features: string[];
  soleMaterial: string;
  upperMaterial: string;
  inStock: boolean;
  stockCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedSize: number;
  selectedColor?: string;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  state: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  footwearModel: string;
  verifiedBuyer: boolean;
  sizeBought?: number;
  helpfulCount: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  couponCode?: string;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending' | 'cod_confirmed';
  transactionId?: string;
  orderDate: string;
  estimatedDeliveryDate: string;
  currentStatus: 'Placed' | 'Processing' | 'Shipped from Indore' | 'In Transit' | 'Out for Delivery' | 'Delivered';
}
