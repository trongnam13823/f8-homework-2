// Load environment variables
require("dotenv").config();

const http = require("http");
const url = require("url");

// Dữ liệu
let tasks = [
  { id: 1, title: "Learn Node.js", isCompleted: false },
  { id: 2, title: "Build REST API", isCompleted: true },
  { id: 3, title: "Create Todo App", isCompleted: false },
];
let nextId = 4;

// CORS - Load từ biến môi trường
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173", "https://[github-username].github.io"];

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
}

const server = http.createServer((req, res) => {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const method = req.method;
  const requestUrl = req.url;

  // Xử lý bypass-cors
  if (requestUrl.startsWith("/bypass-cors")) {
    const parsedUrl = url.parse(requestUrl, true);
    const targetUrl = parsedUrl.query.url;

    if (!targetUrl) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing url parameter" }));
      return;
    }

    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", async () => {
      try {
        const response = await fetch(targetUrl, {
          method: method,
          body: body || undefined,
        });

        const data = await response.text();

        res.writeHead(response.status || 200, {
          "Content-Type": response.headers.get("content-type"),
        });
        res.end(data);
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Request failed" }));
      }
    });
    return;
  }

  // Xử lý API tasks
  const tasksApi = "/api/tasks";
  if (requestUrl.startsWith(tasksApi)) {
    switch (method) {
      case "GET":
        {
          const id = Number(requestUrl.replace(`${tasksApi}/`, ""));

          if (id) {
            const task = tasks.find((t) => t.id === id);
            if (task) {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(task));
            } else {
              res.writeHead(404, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Task not found" }));
            }
            return;
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(tasks));
        }
        break;

      case "POST":
        {
          let body = "";
          req.on("data", (chunk) => (body += chunk.toString()));
          req.on("end", () => {
            try {
              const data = JSON.parse(body);

              if (!data.title || typeof data.title !== "string" || data.title.trim() === "") {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Title is required" }));
                return;
              }

              const newTask = {
                id: nextId++,
                title: data.title.trim(),
                isCompleted: false,
              };

              tasks.push(newTask);

              res.writeHead(201, { "Content-Type": "application/json" });
              res.end(JSON.stringify(newTask));
            } catch (error) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
          });
        }
        break;

      case "PUT":
        {
          let body = "";
          req.on("data", (chunk) => (body += chunk.toString()));
          req.on("end", () => {
            try {
              const data = JSON.parse(body);

              const id = Number(requestUrl.replace(`${tasksApi}/`, ""));
              const taskIndex = tasks.findIndex((t) => t.id === id);

              if (taskIndex === -1) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Task not found" }));
                return;
              }

              const task = tasks[taskIndex];

              if (data.title !== undefined) {
                if (typeof data.title !== "string" || data.title.trim() === "") {
                  res.writeHead(400, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ error: "Title must be a non-empty string" }));
                  return;
                }
                task.title = data.title.trim();
              }

              if (data.isCompleted !== undefined) {
                if (typeof data.isCompleted !== "boolean") {
                  res.writeHead(400, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ error: "isCompleted must be a boolean" }));
                  return;
                }
                task.isCompleted = data.isCompleted;
              }

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(task));
            } catch (error) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
          });
        }
        break;

      case "DELETE":
        {
          const id = Number(requestUrl.replace(`${tasksApi}/`, ""));
          const taskIndex = tasks.findIndex((t) => t.id === id);

          if (taskIndex === -1) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Task not found" }));
            return;
          }

          tasks.splice(taskIndex, 1);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Task deleted successfully" }));
        }
        break;

      default:
        break;
    }
  }
});

// Port từ biến môi trường, mặc định 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Allowed Origins: ${ALLOWED_ORIGINS.join(", ")}`);
  console.log(`GET    /api/tasks`);
  console.log(`GET    /api/tasks/:id`);
  console.log(`POST   /api/tasks`);
  console.log(`PUT    /api/tasks/:id`);
  console.log(`DELETE /api/tasks/:id`);
  console.log(`*      /bypass-cors?url=[target-url]`);
});
