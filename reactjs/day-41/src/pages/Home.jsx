import { useState } from "react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../services/product";
import ProductModal from "../components/ProductModal";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const { data, isLoading, error, refetch } = useGetProductsQuery(currentPage);
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(formData).unwrap();
      } else {
        await createProduct(formData).unwrap();
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      // Force refetch để cập nhật giao diện
      await refetch();
    } catch (err) {
      console.error("Failed to save product:", err);
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (product) => {
    if (window.confirm(`Bạn có chắc muốn xóa sản phẩm "${product.title}"?`)) {
      try {
        await deleteProduct(product.id).unwrap();
        // Force refetch để cập nhật giao diện
        await refetch();
      } catch (err) {
        console.error("Failed to delete product:", err);
        alert("Có lỗi xảy ra khi xóa sản phẩm!");
      }
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">Lỗi khi tải dữ liệu: {error.message || "Unknown error"}</div>
      </div>
    );
  }

  // Lấy data từ response
  const products = data?.items || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination.last_page || 1;
  const currentPageFromApi = pagination.current_page || 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
        <button
          onClick={handleAddNew}
          disabled={isCreating || isUpdating || isDeleting}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium disabled:bg-gray-400"
        >
          {isCreating ? "Đang thêm..." : "Thêm sản phẩm"}
        </button>
      </div>

      {/* Hiển thị loading khi đang thực hiện action */}
      {(isCreating || isUpdating || isDeleting) && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">Đang xử lý...</div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Chưa có sản phẩm nào. Hãy thêm sản phẩm mới!</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML = '<div class="text-gray-400 text-sm">Không có ảnh</div>';
                      }}
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">Không có ảnh</div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">{product.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                    {product.description || "Không có mô tả"}
                  </p>

                  <div className="mb-3">
                    <span className="text-xl font-bold text-blue-600">${product.price}</span>
                    {product.discountPercentage > 0 && (
                      <span className="ml-2 text-sm text-red-500">-{product.discountPercentage}%</span>
                    )}
                  </div>

                  <div className="text-sm text-gray-500 mb-3">
                    <div>Brand: {product.brand}</div>
                    <div>Stock: {product.stock}</div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      disabled={isCreating || isUpdating || isDeleting}
                      className="flex-1 px-3 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm font-medium disabled:bg-gray-400"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      disabled={isCreating || isUpdating || isDeleting}
                      className="flex-1 px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium disabled:bg-gray-400"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded font-medium bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
              >
                ← Trước
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded font-medium ${
                    currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded font-medium bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
              >
                Sau →
              </button>
            </div>
          )}

          {/* Pagination info */}
          <div className="text-center mt-4 text-gray-600 text-sm">
            Trang {currentPageFromApi} / {totalPages} (Tổng: {pagination.total || 0} sản phẩm)
          </div>
        </>
      )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Home;
