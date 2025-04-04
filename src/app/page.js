"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext'; // Import the CartContext

export default function Home() {
  const [featuredAnimes, setFeaturedAnimes] = useState([]);
  const [topRatedAnimes, setTopRatedAnimes] = useState([]);
  const [randomAnimes, setRandomAnimes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const { addToFavorites } = useCart(); // Use the addToFavorites function
  const carouselRef = useRef(null); // Reference to the carousel
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  const [favorites, setFavorites] = useState([]); // State to track favorite animes
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message

  useEffect(() => {
    const fetchAnimes = async () => {
      const res = await fetch('https://api.jikan.moe/v4/anime', { cache: 'no-store' });
      const data = await res.json();

      // Fetch more anime for the carousel and featured sections
      const shuffled = [...data.data].sort(() => 0.5 - Math.random()).slice(0, 30); // Increased to 30
      const topRated = data.data.filter((anime) => anime.score >= 8).slice(0, 30); // Increased to 30

      setFeaturedAnimes(data.data.slice(0, 30)); // Increased to 30
      setTopRatedAnimes(topRated);
      setRandomAnimes(shuffled);
    };

    fetchAnimes();
  }, []);

  // Shuffle the randomAnimes array whenever it changes
  const shuffledAnimes = [...randomAnimes].sort(() => 0.5 - Math.random());

  const filteredAnimes = shuffledAnimes.filter((anime) =>
    anime.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const maxScrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
        if (carouselRef.current.scrollLeft >= maxScrollLeft) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" }); // Reset to the start
        } else {
          carouselRef.current.scrollBy({ left: 200, behavior: "smooth" }); // Scroll by 200px
        }
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleAddToFavorites = (anime) => {
    addToFavorites(anime); // Add to favorites
    setFavorites((prevFavorites) => [...prevFavorites, anime]); // Add anime to favorites
    setPopupMessage(`${anime.title} ajouté aux favoris !`); // Set popup message
    setShowPopup(true); // Show popup
    setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: isDarkMode
          ? "url('https://media.istockphoto.com/id/945982522/fr/photo/explosion-de-poudre-de-couleurs-multi-abstraite-sur-fond-blanc-figer-le-mouvement-des.jpg?s=2048x2048&w=is&k=20&c=He3XCY9-jfdToVHFc29Lf57W53-OK-fChOp8kKyKzpE=')" // Dark mode background image
          : "none", // No background image for light mode
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundColor: isDarkMode ? "black" : "transparent", // Ensure a fallback color for dark mode
      }}
    >
      {/* Popup Confirmation */}
      {showPopup && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 text-white p-4 rounded shadow-lg z-50">
          {popupMessage}
        </div>
      )}

      {/* Search Bar */}
      <section className="p-4">
        <input
          type="text"
          placeholder="Rechercher un anime..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-black dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-500 hover:to-pink-500 dark:hover:from-blue-800 dark:hover:via-purple-900 dark:hover:to-pink-800 transition-colors duration-300"
        />
      </section>

      {/* Carrousel */}
      <section className="flex items-center justify-center min-h-screen">
        <div className="p-4 relative w-full max-w-5xl">
          <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 dark:from-red-400 dark:via-yellow-400 dark:to-green-400 shadow-lg text-center">
            Best Anime
          </h1>
          <div className="relative">
            {/* Carousel */}
            <div
              id="carousel"
              ref={carouselRef} // Attach the ref to the carousel
              className="flex overflow-x-scroll space-x-4 scrollbar-hide"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {filteredAnimes.map((anime) => (
                <Link href={`/produits/${anime.mal_id}`} key={anime.mal_id}>
                  <div
                    className="min-w-[200px] bg-gradient-to-r from-blue-800 via-blue-900 to-black dark:from-gray-900 dark:via-gray-800 dark:to-black rounded shadow-2xl p-4 relative"
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevent navigation
                        handleAddToFavorites(anime); // Handle add to favorites
                      }}
                      className={`absolute top-2 right-2 p-1 rounded-full shadow ${
                        favorites.some((fav) => fav.mal_id === anime.mal_id)
                          ? "bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 text-white"
                          : "bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      ⭐
                    </button>
                    <img
                      src={anime.images.jpg.image_url}
                      alt={anime.title}
                      className="w-64 h-64 object-cover rounded"
                    />
                    <h3 className="text-lg font-semibold mt-2 text-black dark:text-white">{anime.title}</h3>
                  </div>
                </Link>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => {
                  const carousel = document.getElementById("carousel");
                  if (carousel) {
                    carousel.scrollBy({ left: -carousel.clientWidth, behavior: "smooth" });
                  }
                }}
                className="px-4 py-2 bg-gradient-to-r from-gray-800 via-purple-900 to-black text-white rounded hover:from-gray-700 hover:via-purple-800 hover:to-gray-900"
              >
                Précédent
              </button>
              <button
                onClick={() => {
                  const carousel = document.getElementById("carousel");
                  if (carousel) {
                    carousel.scrollBy({ left: carousel.clientWidth, behavior: "smooth" });
                  }
                }}
                className="px-4 py-2 bg-gradient-to-r from-gray-800 via-purple-900 to-black text-white rounded hover:from-gray-700 hover:via-purple-800 hover:to-gray-900"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section en avant */}
      <section className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 dark:from-red-400 dark:via-yellow-400 dark:to-green-400 shadow-lg">
          En Avant
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredAnimes.map((anime) => (
            <Link href={`/produits/${anime.mal_id}`} key={anime.mal_id}>
              <div className="bg-gradient-to-r from-blue-800 via-blue-900 to-black dark:from-gray-900 dark:via-gray-800 dark:to-black rounded shadow-2xl p-4 relative">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-64 h-64 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-2 text-black dark:text-white">{anime.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{anime.synopsis.substring(0, 100)}...</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section bien notés */}
      <section className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 dark:from-red-400 dark:via-yellow-400 dark:to-green-400 shadow-lg">
          Produits Bien Notés
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topRatedAnimes.map((anime) => (
            <Link href={`/produits/${anime.mal_id}`} key={anime.mal_id}>
              <div className="bg-gradient-to-r from-blue-800 via-blue-900 to-black dark:from-gray-900 dark:via-gray-800 dark:to-black rounded shadow-2xl p-4 relative">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="w-64 h-64 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-2 text-black dark:text-white">{anime.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Score : {anime.score}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}