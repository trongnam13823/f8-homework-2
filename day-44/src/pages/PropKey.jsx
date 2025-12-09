import { useEffect, useState } from "react";
import http from "../utils/http";
import { ReactSortable } from "react-sortablejs";
import truncateByWords from "../utils/truncateByWords";

export default function PropKey() {
  const [todo, setTodo] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    http.get("/todos").then((res) => setTodo(res.data));
  }, []);

  useEffect(() => {
    http.get("/posts").then((res) => setPost(res.data));
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* === TODO LIST === */}
      <h2 className="text-xl font-bold">Todo list</h2>

      <ul className="bg-white rounded border divide-y">
        {todo.map((item) => (
          <li key={item.id} className="p-3 hover:bg-gray-50 transition">
            <span className="font-semibold text-blue-600 mr-2">{item.id}</span>
            {truncateByWords(item.title, 8)}
          </li>
        ))}
      </ul>

      {/* === POST LIST (sortable) === */}
      <h2 className="text-xl font-bold">Post list</h2>

      <ul className="bg-white rounded border divide-y">
        <ReactSortable list={post} setList={setPost}>
          {post.map((item) => (
            <li key={item.id} className="p-3 hover:bg-gray-50 transition cursor-move">
              <span className="font-semibold text-purple-600 mr-2">{item.id}</span>
              {truncateByWords(item.title, 8)}
            </li>
          ))}
        </ReactSortable>
      </ul>
    </div>
  );
}
