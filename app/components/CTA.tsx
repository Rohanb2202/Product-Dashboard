import Link from 'next/link'

export default function CTA() {
  return (
    <div className="py-20 bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 text-white text-center">
      <div className="container mx-auto px-4 space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold">Ready to Explore?</h2>
        <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
          Join thousands of satisfied customers who have discovered their perfect products through our platform.
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-3 bg-white text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-colors duration-200"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

