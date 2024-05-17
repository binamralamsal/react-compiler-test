import { useRef } from "react";

export function Interval() {
  // Here we are using refs to store interval id so that we can stop that interval anywhere
  // We can't use normal variables using let here because that will get cleared in each render.
  // useState() is too heavy for this since we don't need re-rendering behavior.
  // We can use useRef() to store something that will persist even after re-rendering because
  // it's value won't be affected and it won't cause re-render if we change it's value.
  // not only interval value you can store any constant. // you can also pass initial value here
  // you can also store some kind of variable which persists after re-render too but doesn't
  // cause re-render while changing itself.
  const intervalRef = useRef();

  function handleIntervalStart() {
    intervalRef.current = setInterval(() => {
      console.log("Interval is running");
    }, 1000);
  }

  function handleIntervalStop() {
    clearInterval(intervalRef.current);
  }

  return (
    <div>
      <button onClick={handleIntervalStart}>Start</button>
      <button onClick={handleIntervalStop}>Stop</button>
    </div>
  );
}
