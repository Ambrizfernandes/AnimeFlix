"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from '@/context/CartContext'; // Import the CartContext

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToFavorites, favorites } = useCart(); // Use the addToFavorites function and favorites state

  useEffect(() => {
    const fetchProducts = async () => {
      const res1 = await fetch("https://api.jikan.moe/v4/anime?page=1");
      const res2 = await fetch("https://api.jikan.moe/v4/anime?page=2");
      const res3 = await fetch("https://api.jikan.moe/v4/anime?page=3"); // Fetch additional anime
      const data1 = await res1.json();
      const data2 = await res2.json();
      const data3 = await res3.json();

      // Combine anime from all pages and ensure no duplicates
      const combinedProducts = [...data1.data, ...data2.data, ...data3.data].filter(
        (anime, index, self) =>
          index === self.findIndex((a) => a.mal_id === anime.mal_id)
      );

      setProducts(combinedProducts.slice(0, 70)); // Increased to 70
      setFilteredProducts(combinedProducts.slice(0, 70)); // Increased to 70
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search query and genre filter
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filter === "" || product.genres.some((genre) => genre.name === filter))
    );
    setFilteredProducts(filtered);
  }, [searchQuery, filter, products]);

  const handleAddToFavorites = (product) => {
    addToFavorites(product); // Add to favorites
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tous les Produits</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un anime..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
      </div>

      {/* Filtres avancés */}
      <div className="mb-4">
        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
          Filtrer par genre :
        </label>
        <select
          id="genre"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Tous</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          {/* Ajoutez d'autres genres si nécessaire */}
        </select>
      </div>

      {/* Liste des produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Link href={`/produits/${product.mal_id}`} key={product.mal_id}>
            <div className="bg-gradient-to-r from-blue-800 via-blue-900 to-black dark:from-gray-900 dark:via-gray-800 dark:to-black rounded p-4 relative">
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
                  handleAddToFavorites(product); // Handle add to favorites
                }}
                className={`absolute top-2 right-2 p-1 rounded-full shadow ${
                  favorites.some((fav) => fav.mal_id === product.mal_id)
                    ? "bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 text-white"
                    : "bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                ⭐
              </button>
              <img
                src={product.images.jpg.image_url}
                alt={product.title}
                className="w-64 h-64 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2 text-black dark:text-white">{product.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{product.synopsis.substring(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
