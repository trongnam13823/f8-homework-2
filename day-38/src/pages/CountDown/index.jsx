import { useEffect, useState } from "react";

const CountDown = () => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (count === 0) return;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  const handleReset = () => {
    setCount(10);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>CountDown</h1>
      <h2 style={{ fontSize: "48px", color: count === 0 ? "red" : "#333" }}>Count is {count}</h2>
      <button
        onClick={handleReset}
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          cursor: "pointer",
          backgroundColor: "#FF5722",
          color: "white",
          border: "none",
          borderRadius: "4px",
          marginTop: "20px",
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default CountDown;
