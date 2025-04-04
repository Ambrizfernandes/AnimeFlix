"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext"; // Import the CartContext

export default function AnimeDetail({ params }) {
  const { id } = params;
  const { addToFavorites } = useCart(); // Use the addToFavorites function
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await res.json();
      setAnime(data.data);
    };

    fetchAnime();
  }, [id]);

  if (!anime) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div>
      <h1>{anime.title}</h1>
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 rounded shadow-2xl p-4 relative">
        <button
          onClick={() => addToFavorites(anime)} // Add to favorites
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-200"
        >
          ⭐
        </button>
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-64 h-64 object-cover rounded"
        />
      </div>
      <p>{anime.synopsis}</p>
      <ul>
        <li>Score: {anime.score}</li>
        <li>Episodes: {anime.episodes}</li>
        <li>Status: {anime.status}</li>
      </ul>
    </div>
  );
}
