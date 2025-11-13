import { useCallback, useEffect, useReducer } from "react";
import CartContext from "./Context";
import CartReducer from "../../pages/ShoppingCart/reducer";

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: parsedCart });
      } catch (e) {
        console.error("Error loading cart:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addToCart = useCallback((product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
