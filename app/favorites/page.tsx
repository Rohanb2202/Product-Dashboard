'use client'

import { useEffect, useState } from 'react'
import { useFavoriteStore } from '../store/favoriteStore'
import ProductCard from '../components/ProductCard'
import { Product } from '../types/product'
import { AlertCircle } from 'lucide-react'

export default function FavoritesPage() {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const favorites = useFavoriteStore((state) => state.favorites)

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const products = await Promise.all(
          favorites.map(async (id) => {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`)
            if (!res.ok) {
              throw new Error(`Failed to fetch product ${id}`)
            }
            return res.json()
          })
        )
        setFavoriteProducts(products)
      } catch (err) {
        console.error('Error fetching favorites:', err)
        setError('Failed to fetch favorite products. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFavoriteProducts()
  }, [favorites])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Favorites</h1>
      
      {isLoading && (
        <div className="text-center text-gray-600 dark:text-gray-400">
          Loading your favorite products...
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <p>{error}</p>
          </div>
        </div>
      )}

      {!isLoading && !error && favoriteProducts.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400 text-center">
          You haven't added any favorites yet. Explore our products and add some to your favorites!
        </p>
      )}

      {!isLoading && !error && favoriteProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

