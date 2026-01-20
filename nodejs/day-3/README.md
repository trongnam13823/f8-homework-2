# Express Todo API với MySQL

Dự án Express.js với MySQL để quản lý tasks, bao gồm middleware chuẩn hóa response, rate limiting, và CRUD operations.

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Cài đặt và cấu hình MySQL:
   - Cài đặt MySQL server
   - Tạo database `todo_dev`
   - Tạo bảng `tasks` với cấu trúc sau:

```sql
CREATE DATABASE todo_dev;

USE todo_dev;

CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

3. Cấu hình database connection trong `/src/config/database.js`:
   - Sửa `host`, `user`, `password` nếu cần

## Chạy ứng dụng

```bash
npm start
```

Hoặc với nodemon (auto-reload):
```bash
npm run dev
```

Server sẽ chạy tại `http://localhost:3000`

## API Endpoints

### Test Routes
- `GET /test-success` - Test middleware success response
- `GET /test-error` - Test exception handler

### Tasks API
- `GET /api/tasks` - Lấy tất cả tasks
- `GET /api/tasks/:id` - Lấy task theo id
- `POST /api/tasks` - Tạo task mới
  ```json
  {
    "title": "Task title",
    "completed": false
  }
  ```
- `PUT /api/tasks/:id` - Cập nhật task
  ```json
  {
    "title": "Updated title",
    "completed": true
  }
  ```
- `DELETE /api/tasks/:id` - Xóa task

## Response Format

### Success Response
```json
{
  "status": "success",
  "data": { ... }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error message",
  "error": { ... }
}
```

## Middleware

1. **responseFormat** - Chuẩn hóa response với `res.success()` và `res.error()`
2. **rateLimiter** - Giới hạn số lượng request (100 requests/phút mặc định)
3. **notFoundHandler** - Xử lý 404 errors
4. **exceptionHandler** - Xử lý exceptions

## Cấu trúc thư mục

```
├── server.js
├── package.json
└── src/
    ├── config/
    │   └── database.js
    ├── middlewares/
    │   ├── responseFormat.js
    │   ├── notFoundHandler.js
    │   ├── exceptionHandler.js
    │   └── rateLimiter.js
    ├── models/
    │   └── task.model.js
    ├── controllers/
    │   └── task.controller.js
    └── routes/
        └── task.routes.js
```
