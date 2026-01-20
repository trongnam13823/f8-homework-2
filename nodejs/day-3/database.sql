-- Tạo database
CREATE DATABASE IF NOT EXISTS todo_dev;

-- Sử dụng database
USE todo_dev;

-- Tạo bảng tasks
CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Demo queries 

-- Find all
SELECT * FROM tasks ORDER BY created_at DESC;

-- Find one
SELECT * FROM tasks WHERE id = 1;

-- Insert
INSERT INTO tasks (title, completed) VALUES ('Sample Task', FALSE);

-- Update
UPDATE tasks SET title = 'Updated Task', completed = TRUE WHERE id = 1;

-- Delete
DELETE FROM tasks WHERE id = 1;
