'use client'

import { useFavoriteStore } from '../store/favoriteStore'

interface FavoriteButtonProps {
  productId: number
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ productId }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore()
  const favorite = isFavorite(productId)

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(productId)
    } else {
      addFavorite(productId)
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full ${
        favorite
          ? 'bg-red-500 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
      }`}
    >
      {favorite ? '❤️' : '🤍'}
    </button>
  )
}

export default FavoriteButton

