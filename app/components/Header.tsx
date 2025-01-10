'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFavoriteStore } from '../store/favoriteStore'
import ThemeToggle from './ThemeToggle'
import { Package, Heart } from 'lucide-react'

const Header = () => {
  const pathname = usePathname()
  const favoriteCount = useFavoriteStore((state) => state.favorites.length)

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-purple-100 dark:border-purple-900">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
              <Package className="w-6 h-6" />
              <span className="font-semibold">Product Dashboard</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/products"
                className={`text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                  pathname === '/products' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Products
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/favorites"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors relative"
            >
              <Heart className={`w-5 h-5 ${pathname === '/favorites' ? 'fill-purple-600 stroke-purple-600 dark:fill-purple-400 dark:stroke-purple-400' : 'text-gray-600 dark:text-gray-300'}`} />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 dark:bg-purple-400 text-white text-xs rounded-full flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

