import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Thank You for Your Order!</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Your order has been successfully placed. We'll send you an email with the order details shortly.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

