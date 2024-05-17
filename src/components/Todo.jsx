import styles from "./Todo.module.css";

import { useState } from "react";
import { AddTodoForm } from "./TodoForm";
import {
  getTodosFromLocalStorage,
  updateTodosInLocalStorage,
} from "../data/todo";
import { cn } from "../utils/classnames";

export function Todo() {
  const [todos, setTodos] = useState(() => getTodosFromLocalStorage());

  function handleAddTodo(newTodo) {
    if (!newTodo.content) return;

    const newTodos = [newTodo, ...todos];
    updateTodosInLocalStorage(newTodos);
    setTodos(newTodos);
  }

  function handleDeleteTodo(id) {
    const newTodos = todos.filter((t) => t.id !== id);

    updateTodosInLocalStorage(newTodos);
    setTodos(newTodos);
  }

  function handleCompleteTodo(id) {
    const newTodos = todos.map((t) => {
      if (t.id !== id) return t;

      return { ...t, completed: true };
    });

    updateTodosInLocalStorage(newTodos);
    setTodos(newTodos);
  }

  return (
    <div>
      <h1 className={styles.title}>Todo Application</h1>

      {/* To replicate a problem, let's duplicate it. You might have some components with id
and if you reuse that component in same page then you will get into trouble as you can't
assign same id to more than one element in a page. */}
      <AddTodoForm onAddTodo={handleAddTodo} />
      <AddTodoForm onAddTodo={handleAddTodo} />

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDeleteTodo={handleDeleteTodo}
            onCompleteTodo={handleCompleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ todo, onDeleteTodo, onCompleteTodo }) {
  return (
    <li className={cn(styles.todoItem, todo.completed && styles.completed)}>
      <p>{todo.content}</p>

      {!todo.completed && (
        <button onClick={() => onCompleteTodo(todo.id)} className="btn">
          Complete
        </button>
      )}
      <button onClick={() => onDeleteTodo(todo.id)} className="btn">
        Delete
      </button>
    </li>
  );
}
