import propTypes from "prop-types";
import { memo } from "react";

const ProductCard = memo(({ product, onAddToCart }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <h3 style={{ fontSize: "18px", margin: "0 0 12px 0" }}>{product.name}</h3>
      <p style={{ fontSize: "20px", color: "#FF5722", fontWeight: "bold", margin: "12px 0" }}>
        {product.price.toLocaleString("vi-VN")}đ
      </p>
      <button
        onClick={() => onAddToCart(product)}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
});

ProductCard.propTypes = {
  product: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
  }).isRequired,
  onAddToCart: propTypes.func.isRequired,
};

ProductCard.displayName = "ProductCard";

export default ProductCard;
