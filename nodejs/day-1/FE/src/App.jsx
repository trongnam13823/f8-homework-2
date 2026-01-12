import { useState, useEffect } from "react";
import "./App.css";

// Sử dụng biến môi trường từ Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/tasks";
const BYPASS_CORS_URL = import.meta.env.VITE_BYPASS_CORS_URL || "http://localhost:3000/bypass-cors";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // States cho bypass-cors test
  const [bypassUrl, setBypassUrl] = useState("https://api-gateway.fullstack.edu.vn/api/analytics");
  const [bypassLoading, setBypassLoading] = useState(false);
  const [bypassResult, setBypassResult] = useState(null);
  const [bypassError, setBypassError] = useState(null);

  // Fetch tasks từ API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load tasks khi component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Thêm task mới
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      return;
    }

    try {
      setError(null);
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTaskTitle.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add task");
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    } catch (err) {
      setError(err.message);
      console.error("Error adding task:", err);
    }
  };

  // Toggle trạng thái completed
  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: !currentStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update task");
      }

      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    } catch (err) {
      setError(err.message);
      console.error("Error updating task:", err);
    }
  };

  // Xóa task
  const handleDeleteTask = async (taskId) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete task");
      }

      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError(err.message);
      console.error("Error deleting task:", err);
    }
  };

  // Test bypass-cors
  const handleTestBypassCors = async (e) => {
    e.preventDefault();
    if (!bypassUrl.trim()) {
      setBypassError("Vui lòng nhập URL");
      return;
    }

    try {
      setBypassLoading(true);
      setBypassError(null);
      setBypassResult(null);

      const testUrl = `${BYPASS_CORS_URL}?url=${encodeURIComponent(bypassUrl.trim())}`;
      const response = await fetch(testUrl);

      if (!response.ok) {
        const errorData = await response.text();
        try {
          const jsonError = JSON.parse(errorData);
          throw new Error(jsonError.error || "Failed to fetch");
        } catch {
          throw new Error(errorData || "Failed to fetch");
        }
      }

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
        setBypassResult(JSON.stringify(data, null, 2));
      } else {
        data = await response.text();
        setBypassResult(data);
      }
    } catch (err) {
      setBypassError(err.message);
      console.error("Error testing bypass-cors:", err);
    } finally {
      setBypassLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Todo List</h1>

        {/* Form thêm task mới */}
        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Nhập task mới..."
            className="task-input"
          />
          <button type="submit" className="add-button">
            Thêm Task
          </button>
        </form>

        {/* Hiển thị lỗi */}
        {error && <div className="error-message">{error}</div>}

        {/* Danh sách tasks */}
        {loading ? (
          <div className="loading">Đang tải...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-message">Chưa có task nào. Hãy thêm task mới!</div>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className={`task-item ${task.isCompleted ? "completed" : ""}`}>
                <label className="task-checkbox-label">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => handleToggleComplete(task.id, task.isCompleted)}
                    className="task-checkbox"
                  />
                  <span className="task-title">{task.title}</span>
                </label>
                <button onClick={() => handleDeleteTask(task.id)} className="delete-button">
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Section test bypass-cors */}
        <div className="bypass-section">
          <h2>Test Bypass CORS</h2>
          <form onSubmit={handleTestBypassCors} className="bypass-form">
            <input
              type="url"
              value={bypassUrl}
              onChange={(e) => setBypassUrl(e.target.value)}
              placeholder="Nhập URL để test..."
              className="bypass-input"
            />
            <button type="submit" className="test-button" disabled={bypassLoading}>
              {bypassLoading ? "Đang test..." : "Test"}
            </button>
          </form>

          {bypassError && <div className="error-message">{bypassError}</div>}

          {bypassResult && (
            <div className="bypass-result">
              <div className="result-header">
                <strong>Kết quả:</strong>
                <button onClick={() => setBypassResult(null)} className="clear-button">
                  Xóa
                </button>
              </div>
              <pre className="result-content">{bypassResult}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
