import propTypes from "prop-types";
import useCart from "../../hooks/useCart";

const CartDropdown = ({ isOpen }) => {
  const { items, totalPrice, totalQuantity, updateQuantity, removeFromCart, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "60px",
        right: "0",
        width: "350px",
        maxHeight: "500px",
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 1000,
        overflow: "auto",
      }}
    >
      {totalQuantity === 0 ? (
        <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Your cart is empty.</div>
      ) : (
        <>
          <div style={{ padding: "16px", maxHeight: "350px", overflowY: "auto" }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "600", marginBottom: "4px" }}>{item.name}</div>
                  <div style={{ color: "#FF5722", fontSize: "14px" }}>{item.price.toLocaleString("vi-VN")}đ</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      width: "28px",
                      height: "28px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      cursor: "pointer",
                      backgroundColor: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: "30px", textAlign: "center", color: "black" }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      width: "28px",
                      height: "28px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      cursor: "pointer",
                      backgroundColor: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      width: "28px",
                      height: "28px",
                      border: "1px solid #f44336",
                      borderRadius: "4px",
                      cursor: "pointer",
                      backgroundColor: "#f44336",
                      color: "white",
                      marginLeft: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "16px",
              borderTop: "2px solid #ddd",
              backgroundColor: "#f9f9f9",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "12px",
              }}
            >
              <span style={{ color: "black" }}>Total:</span>
              <span style={{ color: "#FF5722" }}>{totalPrice.toLocaleString("vi-VN")}đ</span>
            </div>
            <button
              onClick={clearCart}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

CartDropdown.propTypes = {
  isOpen: propTypes.bool.isRequired,
};

export default CartDropdown;
