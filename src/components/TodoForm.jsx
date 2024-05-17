import styles from "./TodoForm.module.css";
import { useId, useRef, useState } from "react";

export function AddTodoForm({ onAddTodo }) {
  const todoInputRef = useRef();
  const [counter, setCounter] = useState(0);

  function handleAddTodo(event) {
    event.preventDefault();

    onAddTodo({ id: Math.random(), content: todoInputRef.current.value });
    todoInputRef.current.value = "";
  }

  /* Imagine we need a label for an input, we can define id explicitly like this.
  Yes, it works fine but what if we have multiple TodoForm? Open Todo.jsx to see
  
  When you click on label, it should focus input box.
  
  But since we are rendering same component in the page twice, we are getting this problem.
  To fix that we need unique id.
  */
  // return (
  //   <div>
  //     <label htmlFor="todoInput">Task</label>
  //     <form onSubmit={handleAddTodo} className={styles.formWrapper}>
  //       <input
  //         type="text"
  //         className="input"
  //         ref={todoInputRef}
  //         id="todoInput"
  //       />
  //       <button className={styles.btn}>Add</button>
  //     </form>
  //   </div>
  // );

  // You might think of using something like this:
  // but the problem is, imagine you have some kind of state.
  // which if you update causes re-render, then todoInputId will have different value.
  // Hence, if you update any state or if this component re-renders because of some reasons,
  // this id will get changed, which is poor practice.
  // You might think of using useRef() to fix this, yes that kinda works but why do such kinds of hassle.
  // const todoInputId = Math.random();

  // return (
  //   <div>
  //     <label htmlFor={todoInputId}>Task</label>
  //     <form onSubmit={handleAddTodo} className={styles.formWrapper}>
  //       <input
  //         type="text"
  //         className="input"
  //         ref={todoInputRef}
  //         id={todoInputId}
  //       />
  //       <button className={styles.btn}>Add</button>
  //       <button
  //         className={styles.btn}
  //         type="button"
  //         onClick={() => setCounter(counter + 1)}
  //       >
  //         Increment ({counter})
  //       </button>
  //     </form>
  //   </div>
  // );

  // You can use useId hook for exact same problem.
  // This can be used to assign unique id to an element.
  // this can be used to generate id if needed.
  // but do not use it for doing stuff like keys in lists.
  const todoId = useId();

  return (
    <div>
      <label htmlFor={todoId}>Task</label>
      <form onSubmit={handleAddTodo} className={styles.formWrapper}>
        <input type="text" className="input" ref={todoInputRef} id={todoId} />
        <button className={styles.btn}>Add</button>
      </form>
    </div>
  );

  // if you have multiple elements which need id, then you can use same id.
  // Here we are reusing same id but appending our custom string to it, which is a good
  // practice if you have multiple input elements which need id.
  // return (
  //   <div>
  //     <input type="text" id={`${todoId}-firstInput`} />
  //     <input type="text" id={`${todoId}-secondInput`} />
  //   </div>
  // );
}
