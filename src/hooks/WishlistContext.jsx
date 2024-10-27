import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    // Cargar wishlist desde localStorage al inicializar el contexto
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return storedWishlist;
  });

  // useEffect para actualizar el localStorage cuando cambia wishlistItems
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (newItem) => {
    setWishlistItems((prevItems) => [...prevItems, newItem]);
  };

  const removeFromWishlist = (courseId) => {
    setWishlistItems((prevItems) => prevItems.filter(item => item.courseId !== courseId));
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};