import Link from 'next/link'
import { Package } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-purple-100 dark:border-purple-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
            <Package className="w-5 h-5" />
            <span className="text-sm">© Product Dashboard. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

