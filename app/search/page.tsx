import { Product } from '../types/product'
import ProductCard from '../components/ProductCard'

async function searchProducts(query: string): Promise<Product[]> {
  const res = await fetch(`https://fakestoreapi.com/products`)
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  const products: Product[] = await res.json()
  return products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  )
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q
  const products = await searchProducts(query)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Search Results for "{query}"</h1>
      {products.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

