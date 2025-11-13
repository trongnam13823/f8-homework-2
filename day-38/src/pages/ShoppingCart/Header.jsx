import { useEffect, useRef, useState } from "react";
import useCart from "../../hooks/useCart";
import CartDropdown from "./CartDropdown";

const Header = () => {
  const { totalQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen]);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <header
      style={{
        backgroundColor: "#333",
        color: "white",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <h1 style={{ margin: 0, fontSize: "24px" }}>Shopping Cart</h1>
      <div ref={cartRef} style={{ position: "relative" }}>
        <div onClick={toggleCart} style={{ position: "relative", cursor: "pointer" }}>
          <span style={{ fontSize: "32px" }}>🛒</span>
          {totalQuantity > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                backgroundColor: "#f44336",
                color: "white",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {totalQuantity}
            </span>
          )}
        </div>
        <CartDropdown isOpen={isCartOpen} />
      </div>
    </header>
  );
};

export default Header;
