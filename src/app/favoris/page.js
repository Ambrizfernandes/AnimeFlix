"use client";

import { useCart } from "@/context/CartContext"; // Import the CartContext
import Link from "next/link";

export default function FavorisPage() {
  const { favorites, removeFromFavorites, clearFavorites } = useCart(); // Access favorites and clear function
  const isDarkMode = true; // Example variable to determine dark mode

  if (favorites.length === 0) {
    return <div className="p-4 text-center">Aucun favori pour le moment.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mes Favoris</h1>
      <button
        onClick={clearFavorites} // Clear all favorites
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Supprimer tous les favoris
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((anime) => (
          <div
            key={anime.mal_id}
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 rounded p-4 relative"
          >
            <button
              onClick={() => removeFromFavorites(anime.mal_id)} // Remove from favorites
              className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-1 rounded-full shadow hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              ❌
            </button>
            <Link href={`/produits/${anime.mal_id}`}>
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-64 h-64 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2 text-black dark:text-white">{anime.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
