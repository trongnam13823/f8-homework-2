/* eslint-disable react-refresh/only-export-components */
import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";

const CounterA = memo(({ onIncrease }) => {
  console.log("CounterA rendered");
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
    onIncrease();
  };

  return (
    <div style={{ padding: "20px", border: "2px solid #4CAF50", margin: "10px", borderRadius: "8px" }}>
      <h2>Count A is {count}</h2>
      <button
        onClick={handleClick}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Increase Count A
      </button>
    </div>
  );
});

CounterA.propTypes = {
  onIncrease: PropTypes.func.isRequired,
};

CounterA.displayName = "CounterA";

const CounterB = memo(({ onIncrease }) => {
  console.log("CounterB rendered");
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
    onIncrease();
  };

  return (
    <div style={{ padding: "20px", border: "2px solid #2196F3", margin: "10px", borderRadius: "8px" }}>
      <h2>Count B is {count}</h2>
      <button
        onClick={handleClick}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Increase Count B
      </button>
    </div>
  );
});

CounterB.propTypes = {
  onIncrease: PropTypes.func.isRequired,
};

CounterB.displayName = "CounterB";

const Counter = () => {
  const handleIncreaseA = useCallback(() => {
    console.log("Count A increased");
  }, []);

  const handleIncreaseB = useCallback(() => {
    console.log("Count B increased");
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Counter</h1>
      <CounterA onIncrease={handleIncreaseA} />
      <CounterB onIncrease={handleIncreaseB} />
    </div>
  );
};

export default Counter;
