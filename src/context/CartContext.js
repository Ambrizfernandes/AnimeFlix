"use client";

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  const addToFavorites = (item) => setFavorites((prev) => [...prev, item]);
  const removeFromFavorites = (id) => setFavorites((prev) => prev.filter((item) => item.mal_id !== id)); // Ensure removal by `mal_id`
  const clearFavorites = () => setFavorites([]);

  return (
    <CartContext.Provider value={{ cart, favorites, addToCart, removeFromCart, clearCart, addToFavorites, removeFromFavorites, clearFavorites }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}