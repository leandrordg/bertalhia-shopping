import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartStore = {
  items: CartItem[];
  itemsCount: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, variantId: string) => void;
  updateQuantity: (id: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => {
      const calculateCartTotals = (items: CartItem[]) => ({
        totalPrice: items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        itemsCount: items.length,
      });

      return {
        items: [],
        itemsCount: 0,
        totalPrice: 0,

        addItem: (item) =>
          set((state) => {
            const existingItem = state.items.find(
              (i) => i.id === item.id && i.variantId === item.variantId
            );

            if (existingItem) {
              const updatedItems = state.items.filter(
                (i) => i.id !== item.id || i.variantId !== item.variantId
              );

              return {
                items: [...updatedItems, item],
                ...calculateCartTotals([...updatedItems, item]),
              };
            }

            return {
              items: [...state.items, item],
              ...calculateCartTotals([...state.items, item]),
            };
          }),

        removeItem: (id, variantId) =>
          set((state) => {
            const updatedItems = state.items.filter(
              (item) => item.id !== id || item.variantId !== variantId
            );

            return {
              items: updatedItems,
              ...calculateCartTotals(updatedItems),
            };
          }),

        updateQuantity: (id, variantId, quantity) =>
          set((state) => {
            const updatedItems = state.items.map((item) => {
              if (item.id === id && item.variantId === variantId) {
                const maxQuantity =
                  item.variants.find((v) => v.id === variantId)?.quantity ?? 0;

                const newQuantity = Math.min(
                  Math.max(quantity, 1),
                  maxQuantity
                );
                if (newQuantity === item.quantity) return item;

                return { ...item, quantity: newQuantity };
              }
              return item;
            });

            return {
              items: updatedItems,
              ...calculateCartTotals(updatedItems),
            };
          }),

        clearCart: () => set({ items: [], itemsCount: 0, totalPrice: 0 }),
      };
    },
    { name: "cart-storage" }
  )
);
