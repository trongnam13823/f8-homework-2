import { useState } from "react";
import Counter from "./Counter";

export default function CounterPage() {
  const [reset, setReset] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center gap-6">
      <Counter key={reset} />

      <button
        onClick={() => setReset(!reset)}
        className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 active:scale-95 transition"
      >
        Reset
      </button>
    </div>
  );
}
