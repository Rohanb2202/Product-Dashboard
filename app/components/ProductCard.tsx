import Image from 'next/image'
import Link from 'next/link'
import { Product } from '../types/product'
import FavoriteButton from './FavoriteButton'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
            className="text-primary dark:text-blue-400 hover:underline"
          >
            View Details
          </Link>
          <FavoriteButton productId={product.id} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard

