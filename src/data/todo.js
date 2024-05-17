// With this, we are separating data layer from which you can access or update data
// with components. This is a great practice because if in future you want to update
// something then it will be much easier with this.

const todosKey = "todos";

export function getTodosFromLocalStorage() {
  const rawTodos = localStorage.getItem(todosKey);
  if (!rawTodos) return [];

  return JSON.parse(rawTodos);
}

export function updateTodosInLocalStorage(newTodos) {
  localStorage.setItem(todosKey, JSON.stringify(newTodos));
}
