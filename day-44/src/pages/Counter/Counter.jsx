import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 active:scale-95 transition"
    >
      Count is {count}
    </button>
  );
}
