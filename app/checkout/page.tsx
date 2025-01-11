'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '../store/cartStore'
import Image from 'next/image'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Clear the cart and redirect to a thank you page
    clearCart()
    router.push('/thank-you')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <Image src={item.image} alt={item.title} width={60} height={60} className="object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Total: ${total.toFixed(2)}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">ZIP / Postal Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full px-4 py-2 text-white font-medium rounded-md ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

