import { useRef } from "react";

export function UncontrolledInputExample() {
  const nameRef = useRef();
  // Here, we are using uncontrolled input, it's state is not being controlled by props or by react. It's being controlled by DOM or browser. We are just referencing it with a ref, we are referencing actual DOM element and whenever we need it we can just access it.
  // Since, it doesn't cause re-render on every keystroke, it might be good here. Think about using what you prefer.
  // Controlled inputs aren't necessarily slower than uncontrolled, difference between them is neglegible most of the times if used correctly. In fact, React.js recommends you to use controlled inputs most of the time.
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Your name is", nameRef.current.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} />
      </form>
      <HeavyComponent />
    </div>
  );
}

function HeavyComponent() {
  const arrayLength = 5000;
  const data = Array.from({ length: arrayLength }, () =>
    Math.floor(Math.random() * 100)
  );

  return (
    <ul>
      {data.map((d, index) => (
        <li key={index}>{d}</li>
      ))}
    </ul>
  );
}
