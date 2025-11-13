import { useState } from "react";
import Counter from "./pages/Counter";
import ShoppingCart from "./pages/ShoppingCart";
import Header from "./pages/ShoppingCart/Header";
import { CartProvider } from "./contexts/CartContext";
import CountDown from "./pages/CountDown";

const App = () => {
  const [page, setPage] = useState("shopping");

  return (
    <div style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <nav
        style={{
          backgroundColor: "#2196F3",
          padding: "12px 24px",
          display: "flex",
          gap: "16px",
        }}
      >
        <button
          onClick={() => setPage("shopping")}
          style={{
            padding: "8px 16px",
            backgroundColor: page === "shopping" ? "white" : "transparent",
            color: page === "shopping" ? "#2196F3" : "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Shopping Cart
        </button>
        <button
          onClick={() => setPage("counter")}
          style={{
            padding: "8px 16px",
            backgroundColor: page === "counter" ? "white" : "transparent",
            color: page === "counter" ? "#2196F3" : "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Counter
        </button>
        <button
          onClick={() => setPage("countdown")}
          style={{
            padding: "8px 16px",
            backgroundColor: page === "countdown" ? "white" : "transparent",
            color: page === "countdown" ? "#2196F3" : "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          CountDown
        </button>
      </nav>

      <CartProvider>
        {page === "shopping" && (
          <>
            <Header />
            <ShoppingCart />
          </>
        )}
        {page === "counter" && <Counter />}
        {page === "countdown" && <CountDown />}
      </CartProvider>
    </div>
  );
};

export default App;
