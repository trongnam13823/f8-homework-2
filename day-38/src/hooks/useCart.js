import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const useCart = () => {
  const context = useContext(CartContext);
  return context;
};

export default useCart;
