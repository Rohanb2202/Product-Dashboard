import { Package, Search, Zap } from 'lucide-react'

const features = [
  {
    icon: Package,
    title: 'Extensive Catalog',
    description: 'Browse through thousands of carefully selected products across multiple categories.'
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Find exactly what you\'re looking for with our intelligent search and filtering system.'
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'Stay informed with live inventory updates and price changes as they happen.'
  }
]

export default function Features() {
  return (
    <div className="py-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 hover:scale-105 transition-transform duration-200 border border-purple-100 dark:border-purple-900"
        >
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mb-4">
            <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

