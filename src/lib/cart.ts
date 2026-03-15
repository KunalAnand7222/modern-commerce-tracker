import { create } from "zustand";
import { CartItem, Product } from "./types";

// Simple store without zustand dependency - using React context pattern instead
let cartItems: CartItem[] = [];
let listeners: Set<() => void> = new Set();

function notify() {
  listeners.forEach((l) => l());
}

export const cartStore = {
  getItems: () => cartItems,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  addItem: (product: Product) => {
    const existing = cartItems.find((item) => item.product.id === product.id);
    if (existing) {
      cartItems = cartItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      cartItems = [...cartItems, { product, quantity: 1 }];
    }
    notify();
  },
  removeItem: (productId: number) => {
    cartItems = cartItems.filter((item) => item.product.id !== productId);
    notify();
  },
  updateQuantity: (productId: number, quantity: number) => {
    if (quantity <= 0) {
      cartStore.removeItem(productId);
      return;
    }
    cartItems = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    notify();
  },
  getTotal: () =>
    cartItems.reduce((sum, item) => {
      const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
      return sum + discountedPrice * item.quantity;
    }, 0),
  getCount: () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
  clear: () => {
    cartItems = [];
    notify();
  },
};

// React hook
import { useSyncExternalStore } from "react";

export function useCart() {
  const items = useSyncExternalStore(cartStore.subscribe, cartStore.getItems);
  const count = useSyncExternalStore(cartStore.subscribe, cartStore.getCount);
  const total = useSyncExternalStore(cartStore.subscribe, cartStore.getTotal);

  return {
    items,
    count,
    total,
    addItem: cartStore.addItem,
    removeItem: cartStore.removeItem,
    updateQuantity: cartStore.updateQuantity,
    clear: cartStore.clear,
  };
}
