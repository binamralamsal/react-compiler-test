import { useState } from "react";

export function Accordion() {
  // Now, Panel is controlled component since we are controlling it from outside or parent component.
  // We are using the concept called "lifting the state up"
  // Uncontrolled components are easier to use within their parents because they require less configuration. But they’re less flexible when you want to coordinate them together. Controlled components are maximally flexible, but they require the parent components to fully configure them with props.
  // each component usually has some mix of both local state and props. However, this is a useful way to talk about how components are designed and what capabilities they offer.
  // When writing a component, consider which information in it should be controlled (via props), and which information should be uncontrolled (via state). But you can always change your mind and refactor later.

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Panel
        title="What is Thapa Technical?"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, cumque.
      </Panel>
      <Panel
        title="Why choose us?"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dolor
        voluptates maxime explicabo aut, delectus molestias quidem pariatur
        voluptatibus maiores voluptatum cupiditate repellat quibusdam distinctio
        nobis, earum architecto laborum at?
      </Panel>
    </>
  );
}

function Panel({ title, children, isActive, onShow }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? <p>{children}</p> : <button onClick={onShow}>Show</button>}
    </section>
  );
}
