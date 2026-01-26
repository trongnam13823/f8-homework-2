CREATE DATABASE IF NOT EXISTS day4;
USE day4;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (name, email) VALUES
('Alice Smith', 'alice@example.com'),
('Bob Johnson', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com'),
('David Wilson', 'david@example.com'),
('Eve Davis', 'eve@example.com'),
('Frank Miller', 'frank@example.com'),
('Grace Lee', 'grace@example.com'),
('Hank Moore', 'hank@example.com'),
('Ivy Taylor', 'ivy@example.com'),
('Jack Anderson', 'jack@example.com');

INSERT INTO posts (user_id, title, content) VALUES
(1, 'Post 1', 'Content 1'),
(1, 'Post 2', 'Content 2'),
(1, 'Post 3', 'Content 3'),
(2, 'Post 4', 'Content 4'),
(2, 'Post 5', 'Content 5'),
(2, 'Post 6', 'Content 6'),
(3, 'Post 7', 'Content 7'),
(3, 'Post 8', 'Content 8'),
(3, 'Post 9', 'Content 9'),
(4, 'Post 10', 'Content 10'),
(4, 'Post 11', 'Content 11'),
(4, 'Post 12', 'Content 12'),
(5, 'Post 13', 'Content 13'),
(5, 'Post 14', 'Content 14'),
(5, 'Post 15', 'Content 15'),
(6, 'Post 16', 'Content 16'),
(6, 'Post 17', 'Content 17'),
(6, 'Post 18', 'Content 18'),
(7, 'Post 19', 'Content 19'),
(7, 'Post 20', 'Content 20'),
(7, 'Post 21', 'Content 21'),
(8, 'Post 22', 'Content 22'),
(8, 'Post 23', 'Content 23'),
(8, 'Post 24', 'Content 24'),
(9, 'Post 25', 'Content 25'),
(9, 'Post 26', 'Content 26'),
(9, 'Post 27', 'Content 27'),
(10, 'Post 28', 'Content 28'),
(10, 'Post 29', 'Content 29'),
(10, 'Post 30', 'Content 30');

INSERT INTO posts (user_id, title, content) VALUES
(1, 'Post 31', 'Content 31'),
(1, 'Post 32', 'Content 32'),
(1, 'Post 33', 'Content 33'),
(1, 'Post 34', 'Content 34'),
(1, 'Post 35', 'Content 35'),
(1, 'Post 36', 'Content 36'),
(1, 'Post 37', 'Content 37'),
(1, 'Post 38', 'Content 38'),
(1, 'Post 39', 'Content 39'),
(1, 'Post 40', 'Content 40'),
(1, 'Post 41', 'Content 41'),
(1, 'Post 42', 'Content 42'),
(1, 'Post 43', 'Content 43'),
(1, 'Post 44', 'Content 44'),
(1, 'Post 45', 'Content 45'),
(1, 'Post 46', 'Content 46'),
(1, 'Post 47', 'Content 47'),
(1, 'Post 48', 'Content 48'),
(1, 'Post 49', 'Content 49'),
(1, 'Post 50', 'Content 50'),
(1, 'Post 51', 'Content 51'),
(1, 'Post 52', 'Content 52'),
(1, 'Post 53', 'Content 53'),
(1, 'Post 54', 'Content 54'),
(1, 'Post 55', 'Content 55'),
(1, 'Post 56', 'Content 56'),
(1, 'Post 57', 'Content 57'),
(1, 'Post 58', 'Content 58'),
(1, 'Post 59', 'Content 59'),
(1, 'Post 60', 'Content 60');