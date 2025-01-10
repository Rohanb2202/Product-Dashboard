import Link from 'next/link'

export default function Hero() {
  return (
    <div className="py-20 md:py-32 text-center space-y-8">
      <h1 className="text-4xl md:text-6xl font-bold text-purple-600 dark:text-purple-400">
        Discover Amazing Products
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
        Explore our curated collection of premium products with real-time inventory tracking and personalized recommendations.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
        <Link
          href="/products"
          className="w-full sm:w-auto px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          Browse Products
          <span className="text-lg">→</span>
        </Link>
        <Link
          href="/favorites"
          className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border border-purple-200 dark:border-purple-800"
        >
          View Favorites
        </Link>
      </div>
    </div>
  )
}

