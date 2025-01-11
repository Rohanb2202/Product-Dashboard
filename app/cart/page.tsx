'use client'

import { useCartStore } from '../store/cartStore'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCartStore()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <Image src={item.image} alt={item.title} width={80} height={80} className="object-cover" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">Total: ${total.toFixed(2)}</p>
            <div className="space-x-4">
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Clear Cart
              </button>
              <Link
                href="/checkout"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

