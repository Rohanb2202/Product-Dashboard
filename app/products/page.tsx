'use client'

import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import ProductSearch from '../components/ProductSearch'
import { Product } from '../types/product'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSort, setSelectedSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        const data = await res.json()
        setProducts(data)
        setFilteredProducts(data)
        
        // Get unique categories
        const uniqueCategories = Array.from(new Set(data.map((product: Product) => product.category)))
        setCategories(uniqueCategories as string[])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let result = [...products]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory)
    }

    // Apply sorting
    if (selectedSort) {
      switch (selectedSort) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          result.sort((a, b) => b.price - a.price)
          break
        case 'name-asc':
          result.sort((a, b) => a.title.localeCompare(b.title))
          break
        case 'name-desc':
          result.sort((a, b) => b.title.localeCompare(a.title))
          break
      }
    }

    setFilteredProducts(result)
  }, [selectedCategory, selectedSort, searchQuery, products])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600 dark:text-gray-400">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
          Products {filteredProducts.length > 0 && `(${filteredProducts.length})`}
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <ProductSearch onSearch={setSearchQuery} />
          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            selectedSort={selectedSort}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSelectedSort}
          />
        </div>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          No products found. Try adjusting your search or filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

