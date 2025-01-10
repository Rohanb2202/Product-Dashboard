'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface ProductFiltersProps {
  categories: string[]
  onCategoryChange: (category: string) => void
  onSortChange: (sort: string) => void
  selectedCategory: string
  selectedSort: string
}

export default function ProductFilters({
  categories,
  onCategoryChange,
  onSortChange,
  selectedCategory,
  selectedSort
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ]

  return (
    <div className="flex gap-2">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-800 rounded-lg flex items-center justify-between text-sm text-gray-600 dark:text-gray-300"
        >
          <span className="mr-2">
            {selectedCategory || 'All Categories'}
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>
        {isOpen && (
          <div className="absolute z-50 mt-2 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-800 rounded-lg shadow-lg">
            <button
              onClick={() => {
                onCategoryChange('')
                setIsOpen(false)
              }}
              className={`w-full px-4 py-2 text-sm text-left hover:bg-purple-50 dark:hover:bg-purple-900/50 ${
                !selectedCategory ? 'bg-purple-50 dark:bg-purple-900/50' : ''
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2 text-sm text-left hover:bg-purple-50 dark:hover:bg-purple-900/50 ${
                  selectedCategory === category ? 'bg-purple-50 dark:bg-purple-900/50' : ''
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
      <select
        value={selectedSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-3 py-2 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-800 rounded-lg text-sm text-gray-600 dark:text-gray-300"
      >
        <option value="">Sort By</option>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

