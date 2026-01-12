import { useState } from "react";
import UserProfile from "./components/UserProfile";
import ProductList from "./components/ProductList";

const HOCDemo = () => {
  const [userLoading, setUserLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Demo HOC - withLoading Pattern</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setUserLoading(!userLoading)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Toggle User Loading
        </button>
        <button
          onClick={() => setProductLoading(!productLoading)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Toggle Product Loading
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">User Profile Component</h2>
          <UserProfile isLoading={userLoading} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Product List Component</h2>
          <ProductList isLoading={productLoading} />
        </div>
      </div>
    </div>
  );
};

export default HOCDemo;
