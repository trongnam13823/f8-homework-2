import withLoading from "../../../hoc/withLoading";

const ProductList = withLoading(() => {
  const products = ["Laptop", "Điện thoại", "Máy tính bảng"];

  return (
    <div className="p-4 border rounded bg-green-50">
      <h3 className="font-bold text-lg mb-2">Danh sách sản phẩm</h3>
      <ul className="list-disc list-inside">
        {products.map((product, index) => (
          <li key={index}>{product}</li>
        ))}
      </ul>
    </div>
  );
});

export default ProductList;
