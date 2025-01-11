'use client'

import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Product } from '../types/product'
import Image from 'next/image'

interface ProductSearchProps {
  products: Product[]
}

export default function ProductSearch({ products }: ProductSearchProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (query.length > 1) {
      const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
      setSuggestions(filteredProducts)
      setIsOpen(true)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [query, products])

  const handleSearch = (productId?: number) => {
    if (productId) {
      router.push(`/products/${productId}`)
    } else if (query) {
      router.push(`/products?search=${encodeURIComponent(query)}`)
    }
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-800 rounded-lg text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-800 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((product) => (
            <div
              key={product.id}
              className="flex items-center px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-900/50 cursor-pointer"
              onClick={() => handleSearch(product.id)}
            >
              <div className="w-12 h-12 mr-4 relative flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{product.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

