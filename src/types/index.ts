export type DateVariety = 'Ajwa' | 'Medjool' | 'Mabroom' | 'Safawi' | 'Sukkari' | 'Khudri';

export type TextureType = 'Soft & Moist' | 'Chewy & Firm' | 'Lush & Melting' | 'Crisp & Sweet' | 'Semi-Dry';

export type SweetnessLevel = 'Subtle & Natural' | 'Balanced Caramel' | 'Rich Toffee' | 'Honey Sweet' | 'Deep Molasses';

export interface ProductVariant {
  id: string;
  sku: string;
  weightGrams: number;
  label: string; // e.g. "250g Box", "500g Box", "1kg Royal Pack"
  priceMinor: number; // e.g. 55000 = ₹550.00
  compareAtPriceMinor?: number; // e.g. 65000 = ₹650.00
  inventoryQuantity: number;
  isPopular?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  variety: DateVariety;
  origin: string; // e.g. "Al-Madinah Al-Munawwarah, Saudi Arabia"
  texture: TextureType;
  sweetness: SweetnessLevel;
  size: 'Medium' | 'Large' | 'Jumbo';
  colorTone: string;
  badge?: 'Bestseller' | 'Royal Grade' | 'Holy Origin' | 'New Harvest' | 'Limited Stock' | 'Gift Pick';
  rating: number;
  reviewCount: number;
  images: string[];
  cutoutImage: string;
  variants: ProductVariant[];
  featured: boolean;
  category: 'all' | 'premium' | 'soft' | 'semi-dry' | 'gifts' | 'everyday';
  pairingSuggestions: string[];
  harvestSeason: string;
  nutritionalNotes: {
    caloriesPer100g: number;
    potassiumMg: number;
    fiberG: number;
    naturalSugarsG: number;
  };
}

export interface HeroSlide {
  id: string;
  variety: DateVariety;
  title: string;
  tagline: string;
  eyebrow: string;
  description: string;
  origin: string;
  sensoryMicrocopy: string;
  accentColor: string;
  blobColor: string;
  blobSvgPath: string;
  productCutout: string;
  halvedDateImage?: string;
  priceFrom: number;
  rating: number;
  reviews: number;
  productSlug: string;
}

export interface CartItem {
  id: string; // unique item id in cart
  productId: string;
  variantId: string;
  productName: string;
  variety: DateVariety;
  variantLabel: string;
  weightGrams: number;
  priceMinor: number;
  quantity: number;
  image: string;
  giftNote?: string;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 10 for 10%, 15000 for ₹150
  minSubtotalMinor?: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  giftMessage?: string;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface Order {
  id: string;
  publicToken: string;
  orderNumber: string;
  items: CartItem[];
  customer: CustomerDetails;
  deliveryMethod: 'standard' | 'express';
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'cod_verified';
  fulfillmentStatus: 'confirmed' | 'packed' | 'shipped' | 'delivered';
  subtotalMinor: number;
  shippingFeeMinor: number;
  discountMinor: number;
  totalMinor: number;
  couponApplied?: string;
  createdAt: string;
  estimatedDeliveryDate: string;
  trackingNumber?: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verifiedPurchase: boolean;
  avatarUrl?: string;
}

export interface GiftBoxConfig {
  boxStyle: 'velvet-emerald' | 'royal-brass' | 'gold-foil-sand';
  boxSize: '2-variety' | '4-variety' | '6-variety';
  selectedVarieties: DateVariety[];
  customMessage: string;
  ribbonColor: 'gold' | 'emerald' | 'burgundy';
  giftWrap: boolean;
}
