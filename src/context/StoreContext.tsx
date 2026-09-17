import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, Order, Coupon, CustomerDetails } from '../types';
import { PRODUCTS, COUPONS } from '../data/catalog';

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  lastRemovedItem: CartItem | null;
  undoRemoveFromCart: () => void;
  clearCart: () => void;
  cartCount: number;
  subtotalMinor: number;
  discountMinor: number;
  shippingFeeMinor: number;
  totalMinor: number;
  freeShippingThresholdMinor: number;
  freeShippingProgress: number; // 0 to 100 percentage
  amountLeftForFreeShippingMinor: number;

  // Coupon
  appliedCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // UI Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Orders
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (customer: CustomerDetails, paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod', deliveryMethod: 'standard' | 'express') => Promise<Order>;
  getOrderByIdOrNumber: (query: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['fulfillmentStatus']) => void;

  // Admin & Products
  products: Product[];
  updateProduct: (updated: Product) => void;
  announcementText: string;
  setAnnouncementText: (text: string) => void;
  announcementVisible: boolean;
  setAnnouncementVisible: (visible: boolean) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD_MINOR = 99900; // ₹999
const STANDARD_SHIPPING_FEE_MINOR = 8000; // ₹80

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nakhla_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastRemovedItem, setLastRemovedItem] = useState<CartItem | null>(null);

  // Wishlist state persisted
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nakhla_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Announcement bar
  const [announcementText, setAnnouncementText] = useState('Free Express Shipping across India on orders above ₹999 • Fresh Harvest 2026');
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  // Products state (can be updated in admin)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('nakhla_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Orders state persisted
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('nakhla_orders');
      if (saved) return JSON.parse(saved);
      // Pre-seed an example order so order tracking can be tested immediately!
      return [
        {
          id: 'ord-seed-1',
          publicToken: 'tok-98421',
          orderNumber: 'NKH-98421',
          customer: {
            fullName: 'Kabir Singhania',
            email: 'kabir.s@example.com',
            phone: '+91 98201 54321',
            addressLine1: 'B-402, Royal Palms Residencies, Bandra West',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400050'
          },
          items: [
            {
              id: 'seed-item-1',
              productId: 'prod-ajwa',
              variantId: 'var-ajwa-500',
              productName: 'Ajwa Al-Madinah (VIP Grade)',
              variety: 'Ajwa',
              variantLabel: '500g Signature Box',
              weightGrams: 500,
              priceMinor: 145000,
              quantity: 1,
              image: '/images/ajwa.jpg'
            }
          ],
          deliveryMethod: 'express',
          paymentMethod: 'upi',
          paymentStatus: 'paid',
          fulfillmentStatus: 'shipped',
          subtotalMinor: 145000,
          shippingFeeMinor: 0,
          discountMinor: 14500,
          totalMinor: 130500,
          couponApplied: 'NAKHLA10',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          estimatedDeliveryDate: 'In 2 Business Days',
          trackingNumber: 'BLUEDART-NKH-8829'
        }
      ];
    } catch {
      return [];
    }
  });

  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nakhla_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nakhla_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nakhla_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Sync products
  useEffect(() => {
    try {
      localStorage.setItem('nakhla_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart actions
  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.variantId === variant.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${variant.id}-${Date.now()}`,
          productId: product.id,
          variantId: variant.id,
          productName: product.name,
          variety: product.variety,
          variantLabel: variant.label,
          weightGrams: variant.weightGrams,
          priceMinor: variant.priceMinor,
          quantity,
          image: product.cutoutImage || product.images[0],
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added ${quantity}x ${product.name} (${variant.label}) to cart`);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    const itemToRemove = cart.find((item) => item.id === cartItemId);
    if (itemToRemove) {
      setLastRemovedItem(itemToRemove);
      setCart((prev) => prev.filter((item) => item.id !== cartItemId));
      showToast(`Removed "${itemToRemove.productName}"`);
    }
  };

  const undoRemoveFromCart = () => {
    if (lastRemovedItem) {
      setCart((prev) => [...prev, lastRemovedItem]);
      showToast(`Restored "${lastRemovedItem.productName}"`);
      setLastRemovedItem(null);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalMinor = cart.reduce((sum, item) => sum + item.priceMinor * item.quantity, 0);

  // Shipping calculation
  const isFreeShipping = subtotalMinor >= FREE_SHIPPING_THRESHOLD_MINOR || subtotalMinor === 0;
  const shippingFeeMinor = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE_MINOR;
  const amountLeftForFreeShippingMinor = Math.max(0, FREE_SHIPPING_THRESHOLD_MINOR - subtotalMinor);
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotalMinor / FREE_SHIPPING_THRESHOLD_MINOR) * 100)
  );

  // Coupon logic
  const applyCoupon = (code: string): boolean => {
    const sanitized = code.trim().toUpperCase();
    const found = COUPONS.find((c) => c.code === sanitized);
    if (!found) {
      setCouponError('Invalid coupon code. Try NAKHLA10 or RAMADAN.');
      return false;
    }

    if (found.minSubtotalMinor && subtotalMinor < found.minSubtotalMinor) {
      setCouponError(`This coupon requires a minimum subtotal of ₹${found.minSubtotalMinor / 100}`);
      return false;
    }

    setAppliedCoupon(found);
    setCouponError(null);
    showToast(`Coupon "${found.code}" applied successfully!`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
    showToast('Coupon removed');
  };

  // Discount calculation
  let discountMinor = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountMinor = Math.round((subtotalMinor * appliedCoupon.discountValue) / 100);
    } else {
      discountMinor = appliedCoupon.discountValue;
    }
  }
  discountMinor = Math.min(discountMinor, subtotalMinor);

  const totalMinor = Math.max(0, subtotalMinor - discountMinor + shippingFeeMinor);

  // Order Placement
  const placeOrder = async (
    customer: CustomerDetails,
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod',
    deliveryMethod: 'standard' | 'express'
  ): Promise<Order> => {
    // Generate order number
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `NKH-${randomSuffix}`;
    const publicToken = `tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      publicToken,
      orderNumber,
      customer,
      items: [...cart],
      deliveryMethod,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'cod_verified' : 'paid',
      fulfillmentStatus: 'confirmed',
      subtotalMinor,
      shippingFeeMinor,
      discountMinor,
      totalMinor,
      couponApplied: appliedCoupon?.code,
      createdAt: new Date().toISOString(),
      estimatedDeliveryDate: deliveryMethod === 'express' ? 'In 24-48 Hours' : 'In 3-5 Business Days',
      trackingNumber: `NKH-TRK-${Math.floor(100000 + Math.random() * 900000)}`
    };

    // Save order
    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);

    // Clear cart
    clearCart();
    setAppliedCoupon(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(false);

    return newOrder;
  };

  const getOrderByIdOrNumber = (query: string): Order | undefined => {
    const clean = query.trim().toUpperCase();
    return orders.find(
      (o) =>
        o.orderNumber.toUpperCase() === clean ||
        o.publicToken.toUpperCase() === clean ||
        o.customer.phone.replace(/\D/g, '').includes(clean.replace(/\D/g, ''))
    );
  };

  const updateOrderStatus = (orderId: string, status: Order['fulfillmentStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, fulfillmentStatus: status } : o))
    );
    showToast(`Order status updated to ${status.toUpperCase()}`);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Updated product "${updated.name}"`);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        lastRemovedItem,
        undoRemoveFromCart,
        clearCart,
        cartCount,
        subtotalMinor,
        discountMinor,
        shippingFeeMinor,
        totalMinor,
        freeShippingThresholdMinor: FREE_SHIPPING_THRESHOLD_MINOR,
        freeShippingProgress,
        amountLeftForFreeShippingMinor,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        currentOrder,
        placeOrder,
        getOrderByIdOrNumber,
        updateOrderStatus,
        products,
        updateProduct,
        announcementText,
        setAnnouncementText,
        announcementVisible,
        setAnnouncementVisible,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
