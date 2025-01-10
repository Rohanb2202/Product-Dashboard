import { notFound } from 'next/navigation'
import Image from 'next/image'
import FavoriteButton from '../../components/FavoriteButton'
import { Product } from '../../types/product'

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch product')
  }
  return res.json()
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <div className="relative h-96 w-full">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{product.title}</h1>
        <p className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
        <p className="mb-4">
          <span className="font-semibold text-gray-800 dark:text-gray-200">Category:</span> {product.category}
        </p>
        <div className="flex items-center gap-4">
          <button className="bg-primary dark:bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300">
            Add to Cart
          </button>
          <FavoriteButton productId={product.id} />
        </div>
      </div>
    </div>
  )
}

