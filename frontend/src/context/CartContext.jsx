import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Ngarko nga localStorage ne fillim
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });

  // Ruaj ne localStorage sa here ndryshon
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id || item.name === product.name,
      );
      const addQty = product.quantity || product.qty || 1;
      if (existing) {
        return prev.map((item) =>
          item.id === product.id || item.name === product.name
            ? {
                ...item,
                qty: (item.qty || 1) + addQty,
                quantity: (item.qty || 1) + addQty,
              }
            : item,
        );
      }
      return [...prev, { ...product, qty: addQty, quantity: addQty }];
    });
  };

  // Fshi sipas emrit (compat me popups)
  const removeFromCart = (name) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  // Fshi sipas product id (per ShoppingCartPage)
  const removeByProductId = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => String(item.id) !== String(productId)),
    );
  };

  // Ndrysho sasine
  const updateQuantity = (productId, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        String(item.id) === String(productId)
          ? { ...item, qty: newQty, quantity: newQty }
          : item,
      ),
    );
  };

  // Zevendeso krejt listen (per sync me backend)
  const replaceCart = (items) => {
    setCartItems(items || []);
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.qty || item.quantity || 1),
    0,
  );
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || item.quantity || 1),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        removeByProductId,
        updateQuantity,
        replaceCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
