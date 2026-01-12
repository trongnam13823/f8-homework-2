import { useRef, useState } from "react";
import { useDispatch, useSelector } from "../../libs/react-redux/";
import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "../../store/constants";

export default function TodoApp() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const inputRef = useRef();

  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    inputRef.current.focus();

    if (!text.trim()) {
      setError("Please enter a todo item");
      return;
    }

    dispatch({
      type: ADD_TODO,
      payload: { title: text.trim() },
    });

    setText("");
    setError("");
  };

  const handleEdit = (todo) => {
    const newTitle = prompt("Edit your todo:", todo.title);
    if (newTitle === null) return;

    const value = newTitle.trim();
    if (!value) return;

    dispatch({
      type: EDIT_TODO,
      payload: { id: todo.id, title: value },
    });
  };

  const handleDelete = (todo) => {
    const ok = confirm("Are you sure you want to delete this todo?");
    if (!ok) return;

    dispatch({
      type: DELETE_TODO,
      payload: { id: todo.id },
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>

      <form onSubmit={handleAdd}>
        <input ref={inputRef} placeholder="Enter your todo..." value={text} onChange={(e) => setText(e.target.value)} />
        <button>Add Todo</button>
      </form>

      {error && <p style={{ color: "red", marginTop: 5 }}>{error}</p>}

      <div style={{ marginTop: 20 }}>
        {todos.length === 0 ? (
          <p>The todo list is empty.</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} style={{ marginBottom: 10 }}>
                {todo.title}

                <button style={{ marginLeft: 10 }} onClick={() => handleEdit(todo)}>
                  Edit
                </button>

                <button style={{ marginLeft: 10 }} onClick={() => handleDelete(todo)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
