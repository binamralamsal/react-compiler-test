import { useState } from "react";

export function Counter() {
  const [value, setValue] = useState(0);

  function incrementValue() {
    setValue((prev) => prev + 1);
  }

  function decrementValue() {
    setValue((prev) => prev - 1);
  }

  return (
    <div>
      <p>{value}</p>
      <button onClick={incrementValue}>Increment</button>
      <button onClick={decrementValue}>Increment</button>
    </div>
  );
}
