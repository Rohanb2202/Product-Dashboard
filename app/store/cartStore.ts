import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '../types/product'

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  getCartCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            }
          }
          return { items: [...state.items, { ...product, quantity: 1 }] }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      clearCart: () => set({ items: [] }),
      getCartCount: () => get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
)

