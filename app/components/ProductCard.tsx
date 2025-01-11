import Image from 'next/image'
import Link from 'next/link'
import { Product } from '../types/product'
import FavoriteButton from './FavoriteButton'
import { useCartStore } from '../store/cartStore'
import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 truncate text-gray-800 dark:text-gray-200">{product.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">${product.price.toFixed(2)}</p>
        <div className="flex justify-between items-center">
          <Link
            href={`/products/${product.id}`}
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            View Details
          </Link>
          <div className="flex items-center space-x-2">
            <FavoriteButton productId={product.id} />
            <button
              onClick={() => addToCart(product)}
              className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

