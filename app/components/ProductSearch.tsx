import { Search } from 'lucide-react'

interface ProductSearchProps {
  onSearch: (query: string) => void
}

export default function ProductSearch({ onSearch }: ProductSearchProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-800 rounded-lg text-sm text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
    </div>
  )
}

