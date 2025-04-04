"use client";

import './globals.css';
import { CartProvider } from '@/context/CartContext'; // Import the CartProvider
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RootLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Ensure the `dark` class is applied on initial load based on the state
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <html lang="en">
      <body
        className={`${
          isDarkMode
            ? "bg-black text-gray-300" // Darker background and lighter text for dark mode
            : "bg-blue-500 text-black"
        }`}
        style={{
          backgroundImage: isDarkMode
            ? "url('https://wallpaperaccess.com/full/12072375.jpg')" // Dark mode background image
            : "url('https://cdn.pixabay.com/photo/2013/05/03/09/27/smoke-108664_1280.jpg')", // Light mode background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <CartProvider>
          <header className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-black text-black dark:text-gray-300">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <img
                  src="https://cdn.vectorstock.com/i/1000x1000/63/78/infinity-symbol-limitless-bright-multicolor-sign-vector-18496378.jpg" // Updated logo URL
                  alt="Logo AnimeFlix"
                  className="h-10 w-10 cursor-pointer shadow-lg transform hover:scale-110 transition-transform duration-300"
                />
              </Link>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 dark:from-red-400 dark:via-yellow-400 dark:to-green-400 shadow-lg transform hover:scale-110 transition-transform duration-300">
                AnimeFlix
              </h1>
            </div>
            <nav className="flex space-x-4">
              <Link href="/">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" // Home logo
                  alt="Home"
                  className="h-10 w-10 cursor-pointer shadow-lg transform hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 dark:from-blue-800 dark:via-purple-900 dark:to-pink-800 p-2 rounded-full"
                />
              </Link>
              <Link href="/produits">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1946/1946436.png" // Products logo
                  alt="Produits"
                  className="h-10 w-10 cursor-pointer shadow-lg transform hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 dark:from-blue-800 dark:via-purple-900 dark:to-pink-800 p-2 rounded-full"
                />
              </Link>
              <Link href="/favoris">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/833/833472.png" // Favorites logo
                  alt="Favoris"
                  className="h-10 w-10 cursor-pointer shadow-lg transform hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 dark:from-blue-800 dark:via-purple-900 dark:to-pink-800 p-2 rounded-full"
                />
              </Link>
              <img
                src={isDarkMode ? "https://cdn-icons-png.flaticon.com/512/581/581601.png" : "https://cdn-icons-png.flaticon.com/512/169/169367.png"} // Toggle logo
                alt="Toggle Dark Mode"
                onClick={toggleDarkMode}
                className="h-10 w-10 cursor-pointer shadow-lg transform hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 dark:from-blue-800 dark:via-purple-900 dark:to-pink-800 p-2 rounded-full"
              />
            </nav>
          </header>
          <main>
            {children}
          </main>
          <footer className="bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 dark:from-gray-900 dark:via-gray-800 dark:to-black text-black dark:text-gray-300 p-6 mt-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg font-bold">Contact Us</h2>
                <p>Email: <a href="mailto:contact@animeflix.com" className="underline">contact@animeflix.com</a></p>
                <p>Instagram: <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="underline">@animeflix</a></p>
                <p>LinkedIn: <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="underline">AnimeFlix</a></p>
                <p>YouTube: <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="underline">AnimeFlix Channel</a></p>
              </div>
              <div className="text-center">
                <h2 className="text-lg font-bold mb-2">Subscribe to Our Newsletter</h2>
                <form className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="p-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-yellow-500 dark:hover:bg-yellow-600"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold">Address</h2>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // Industry logo
                    alt="Industry Logo"
                    className="h-8 w-8"
                  />
                </div>
                <p>123 Anime Street</p>
                <p>Tokyo, Japan</p>
                <p>ZIP: 100-0001</p>
              </div>
            </div>
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-6">
              <div className="flex space-x-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" // Instagram logo
                  alt="Instagram"
                  className="h-10 w-10 cursor-pointer transform hover:scale-110 transition-transform duration-300"
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" // LinkedIn logo
                  alt="LinkedIn"
                  className="h-10 w-10 cursor-pointer transform hover:scale-110 transition-transform duration-300"
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" // YouTube logo
                  alt="YouTube"
                  className="h-10 w-10 cursor-pointer transform hover:scale-110 transition-transform duration-300"
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png" // Manga logo
                  alt="Manga"
                  className="h-10 w-10 cursor-pointer transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <h2 className="text-lg font-bold">Authentication</h2>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6815/6815042.png" // Authentication logo
                  alt="Authentication Logo"
                  className="h-8 w-8"
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <p>&copy; {new Date().getFullYear()} AnimeFlix. All rights reserved.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
