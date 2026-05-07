import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.name === product.name);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (name) => {
    setWishlistItems((prev) => prev.filter((item) => item.name !== name));
  };

  const isInWishlist = (name) => {
    return wishlistItems.some((item) => item.name === name);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
