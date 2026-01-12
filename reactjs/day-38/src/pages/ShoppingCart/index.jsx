import { useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import ProductCard from "./ProductCard";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://api01.f8team.dev/api/products")
      .then((res) => res.json())
      .then(({ data }) => {
        setProducts(data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ marginBottom: "24px" }}>Products</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
