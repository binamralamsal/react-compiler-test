import { useEffect, useRef, useState } from "react";

export function SideEffectsExample() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  // useEffect takes a function as an argument, here if you provide a function then you can react to any state changes. This function will run when any of the state of this component changes. But that's useless, because you wouldn't want to run a code for every state changes.
  //   useEffect(() => {
  //     console.log("Re-rendered");
  //   });

  //   Since it's a hook you cannot put something like if statement before it, useEffect or any hooks must be top level of your component.

  // You can pass an array as second argument with dependencies
  // if you pass empty array then this function will only run when this component mounts or renders on the screen.
  // if you are seeing this same console log twice then it's because of how react.js works in development mode. We will learn why react.js does that. For something like functions passed to useState(), it was to prevent someone to run side effects, but you might think, useEffect is made to run sideeffects, why do they do with this? Well there is a reason which we will discuss.
  useEffect(() => {
    console.log("Component rendered");
    // Here you can perform anything on initial render.
  }, []);

  //   You can also have multiple useEffect in a single component, do not worry about that.
  // This function will always run initially when page mounts and runs after either of counter1 and counter2 changes. If you remove counter1 from dependency array then it won't run when counter1 changes.
  //   useEffect(() => {
  //     console.log("Counter changed");
  //   }, [counter1, counter2]);

  //   If you are using a state inside useEffect then react will always warn you to put that state inside dependency array, you need eslint extension to get that warning.
  // If you are using a state inside useEffect then you should always put that inside array dependency because it doesn't make sense not to do so. if one of those state changes then you will have outdated side effects inside useEffect.
  //   useEffect(() => {
  //     console.log(counter1);
  //   }, []);
  //   React Hook useEffect has a missing dependency: 'counter1'. Either include it or remove the dependency array

  // if you try to update a state inside useEffect which is part of dependency array then you will get infinite loop.
  //   Maximum update depth exceeded.
  // It's because when the state changes, the function passed to it will run, and if the function updates that state, then again it will cause re-render and the function will again be called and so on.....
  // Avoid doing that
  //   useEffect(() => {
  //     setCounter1((p) => p + 1);
  //   }, [counter1]);

  //   Since, useEffect can be used to for calling side effects, we can also use functions like setInterval inside useEffect.
  //   useEffect(() => {
  //     setInterval(() => {
  //       console.log("Inside interval");
  //     }, 1000);
  //   }, []);
  // but wait, we are facing a problem?
  // it's getting logged twice? Why?
  // it's because React.js first mounts all component then unmounts all component then again mounts all component during development mode. It simply runs our useEffect twice because our component will mount twice on loading it.
  // Why does it do that during development mode?

  // Well, imagine this SideEffects component might get unmounted, thne you will obviously want to clear your interval, many people might forget to do that. That's why react.js does this, so that everyone will clear such side effects or subscription before the component unmounts.

  // before discussion about how to clean up, let's see the problem in action.
  //   useEffect(() => {
  //     setInterval(
  //       () =>
  //         console.log(
  //           "I will run even when this component unmounts, try yourself"
  //         ),
  //       1000
  //     );
  //   });
  // you can see that if you click "Toggle show component" and remove this component then still the interval runs, then again if you click it then the interval will be added 4 times.

  // To prevent this, we can use clean up function.

  //   useEffect(() => {
  //     const intervalId = setInterval(
  //       () => console.log("I won't run after component unmounts"),
  //       1000
  //     );

  //     // This is called clean up function that you can return from useEffect, this will run before this component unmounts and also before any state that is part of dependency array changes.
  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }, []);

  // Now, it's fixed. Think yourself, if React.js didn't run our function twice during development mode, then you might have forgotten about clean up function, react.js did it deliberately to let you know about this.

  //   useEffect(() => {
  //     // Many people think that clean up function only runs during unmount, but it also runs before state part of dependency array changes.
  //     return () => {
  //       console.log("I also run before counter1 changes", counter1);
  //     };
  //   }, [counter1]);

  //   this hook is also good for adding event listeners to some element which you can't add directly from react.js
  //   useEffect(() => {
  //     function handleOnScroll() {
  //       console.log("Page is scrolling");
  //     }

  //     window.addEventListener("scroll", handleOnScroll);

  //     // of course, don't forget to clean it up.
  //     return () => window.removeEventListener("scroll", handleOnScroll);
  //   }, []);

  return (
    <div>
      <button onClick={() => setCounter1((p) => p + 1)}>
        Increment First Counter ({counter1})
      </button>{" "}
      <button onClick={() => setCounter2((p) => p + 1)}>
        Increment Second Counter ({counter2})
      </button>
    </div>
  );
}
