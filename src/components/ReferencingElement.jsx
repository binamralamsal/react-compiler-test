import { useRef } from "react";

export function ReferencingElement() {
  const paragraphRef = useRef();
  const divRef = useRef();
  const buttonRef = useRef();

  function handleButtonClick() {
    // now you can access the DOM element of paragraph, div and button just fine.
    // these are actual dom element that you get by using document.getElementBy___ or querySelector
    // but avoid doing some stuff like replacing innerHTML. Use this method as last resort.
    // Try to do in a react way, don't overuse it.
    // divRef.current.innerHTML = "Test";
    // console.log(divRef.current.classname);
    // console.log(divRef.current.clientLeft);
    // Doing this stuff is not recommended, we are just showing you that it can be done.
    // paragraphRef.current.innerText = "Thapa Technical";
    // and many other stuff
    // buttonRef.current.addEventListener
  }

  return (
    <div ref={divRef}>
      <p ref={paragraphRef}>Content</p>
      <button ref={buttonRef} onClick={handleButtonClick}>
        Click
      </button>
    </div>
  );
}
