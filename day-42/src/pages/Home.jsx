import DefaultLayout from "../layouts/DefaultLayout";

function Home() {
  return (
    <DefaultLayout>
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800">Home page</h1>
        <p className="mt-4 text-gray-600">Chào mừng bạn đến với trang chủ!</p>
      </div>
    </DefaultLayout>
  );
}
export default Home;
