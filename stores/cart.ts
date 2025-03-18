import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = Product & {
  quantity: number;
  variantId: string;
};

interface CartStore {
  items: CartItem[];
  itemsCount: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, variantId: string) => void;
  updateQuantity: (id: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      itemsCount: 0,
      totalPrice: 0,
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.id === item.id && i.variantId === item.variantId
          );
          let updatedItems;
          if (existingItem) {
            updatedItems = state.items.map((i) =>
              i.id === item.id && i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
          } else {
            updatedItems = [...state.items, item];
          }

          const totalPrice = updatedItems.reduce(
            (acc, i) => acc + i.price * i.quantity,
            0
          );

          const itemsCount = updatedItems.length;
          return { items: updatedItems, itemsCount, totalPrice };
        }),
      removeItem: (id, variantId) =>
        set((state) => {
          const updatedItems = state.items.filter(
            (item) => item.id !== id || item.variantId !== variantId
          );

          const totalPrice = updatedItems.reduce(
            (acc, i) => acc + i.price * i.quantity,
            0
          );

          const itemsCount = updatedItems.length;
          return { items: updatedItems, itemsCount, totalPrice };
        }),
      updateQuantity: (id, variantId, quantity) =>
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id && item.variantId === variantId
              ? { ...item, quantity: Math.max(quantity, 0) }
              : item
          );

          const totalPrice = updatedItems.reduce(
            (acc, i) => acc + i.price * i.quantity,
            0
          );

          const itemsCount = updatedItems.length;
          return { items: updatedItems, itemsCount, totalPrice };
        }),
      clearCart: () => set({ items: [], itemsCount: 0, totalPrice: 0 }),
    }),
    {
      name: "cart-storage",
    }
  )
);
