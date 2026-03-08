-- Xóa database cũ nếu tồn tại
DROP DATABASE IF EXISTS ecommerce_practice;

-- Tạo database mới
CREATE DATABASE ecommerce_practice CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Sử dụng database
USE ecommerce_practice;

-- PHẦN 1: TẠO CÁC BẢNG
-- Bảng users: Lưu thông tin người dùng
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng products: Lưu thông tin sản phẩm
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    current_price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_price (current_price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng orders: Lưu thông tin đơn hàng
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_order_date (order_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng order_items: Chi tiết đơn hàng
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng comments: Bình luận sản phẩm
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_product_id (product_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- PHẦN 2: INSERT DỮ LIỆU MẪU
-- Insert Users (7 người dùng)
INSERT INTO users (username, email, full_name) VALUES
('nguyenvana', 'nguyenvana@email.com', 'Nguyễn Văn A'),
('tranthib', 'tranthib@email.com', 'Trần Thị B'),
('levanc', 'levanc@email.com', 'Lê Văn C'),
('phamthid', 'phamthid@email.com', 'Phạm Thị D'),
('hoangvane', 'hoangvane@email.com', 'Hoàng Văn E'),
('vuthif', 'vuthif@email.com', 'Vũ Thị F'),
('dangvang', 'dangvang@email.com', 'Đặng Văn G');

-- Insert Products (10 sản phẩm)
INSERT INTO products (name, description, current_price, category) VALUES
('iPhone 15 Pro Max', 'Smartphone cao cấp từ Apple với chip A17 Pro', 25000000, 'Electronics'),
('Samsung Galaxy S24 Ultra', 'Smartphone Android flagship với bút S-Pen', 22000000, 'Electronics'),
('MacBook Pro M3', 'Laptop cho developer và designer', 45000000, 'Electronics'),
('AirPods Pro 2', 'Tai nghe không dây chống ồn chủ động', 6000000, 'Electronics'),
('iPad Air M2', 'Máy tính bảng đa năng', 18000000, 'Electronics'),
('Nike Air Max 270', 'Giày thể thao nam nữ', 3500000, 'Fashion'),
('Adidas Ultra Boost 22', 'Giày chạy bộ cao cấp', 4200000, 'Fashion'),
('Áo khoác Uniqlo Ultra Light Down', 'Áo khoác mùa đông siêu nhẹ', 1200000, 'Fashion'),
('Quần Jean Levi\'s 501', 'Quần jean classic fit', 1800000, 'Fashion'),
('Balo The North Face Borealis', 'Balo đi học đi làm 28L', 2500000, 'Fashion');

-- Insert Orders
-- Tháng 1/2026: 10 đơn hàng
-- Tháng 12/2025: 2 đơn hàng (để so sánh theo tháng)
INSERT INTO orders (user_id, order_date, status) VALUES
-- THÁNG 1/2026
(1, '2026-01-15 10:30:00', 'completed'),  -- Order 1: User 1
(1, '2026-01-20 14:20:00', 'completed'),  -- Order 2: User 1
(2, '2026-01-10 09:15:00', 'completed'),  -- Order 3: User 2
(2, '2026-01-25 16:45:00', 'completed'),  -- Order 4: User 2
(3, '2026-01-05 11:00:00', 'completed'),  -- Order 5: User 3
(3, '2026-01-18 13:30:00', 'completed'),  -- Order 6: User 3
(4, '2026-01-12 10:10:00', 'completed'),  -- Order 7: User 4
(5, '2026-01-22 15:20:00', 'completed'),  -- Order 8: User 5
(6, '2026-01-08 12:00:00', 'completed'),  -- Order 9: User 6
(7, '2026-01-28 09:30:00', 'completed'),  -- Order 10: User 7
-- THÁNG 12/2025 (để có data so sánh)
(1, '2025-12-10 10:00:00', 'completed'),  -- Order 11: User 1
(2, '2025-12-15 14:00:00', 'completed');  -- Order 12: User 2

-- Insert Order Items (CHƯA có price_at_purchase - thiết kế ban đầu có vấn đề)
INSERT INTO order_items (order_id, product_id, quantity) VALUES
-- Order 1 (User 1 - Nguyễn Văn A)
(1, 1, 1),  -- iPhone x1
(1, 4, 2),  -- AirPods x2

-- Order 2 (User 1 - Nguyễn Văn A)
(2, 3, 1),  -- MacBook x1

-- Order 3 (User 2 - Trần Thị B)
(3, 2, 1),  -- Samsung x1
(3, 6, 2),  -- Nike x2

-- Order 4 (User 2 - Trần Thị B)
(4, 5, 1),  -- iPad x1

-- Order 5 (User 3 - Lê Văn C)
(5, 1, 2),  -- iPhone x2

-- Order 6 (User 3 - Lê Văn C)
(6, 7, 3),  -- Adidas x3

-- Order 7 (User 4 - Phạm Thị D)
(7, 8, 5),  -- Áo khoác x5

-- Order 8 (User 5 - Hoàng Văn E)
(8, 9, 3),  -- Quần jean x3

-- Order 9 (User 6 - Vũ Thị F)
(9, 10, 2),  -- Balo x2

-- Order 10 (User 7 - Đặng Văn G)
(10, 6, 1),  -- Nike x1
(10, 7, 1),  -- Adidas x1

-- THÁNG 12/2025
(11, 1, 1),  -- iPhone
(12, 2, 1);  -- Samsung

-- Insert Comments (14 bình luận)
INSERT INTO comments (user_id, product_id, content, created_at) VALUES
-- User 1 (3 comments - nhiều nhất)
(1, 1, 'Sản phẩm tuyệt vời! Camera chụp ảnh rất đẹp', '2026-01-16 10:00:00'),
(1, 1, 'Giao hàng nhanh, đóng gói cẩn thận', '2026-01-17 11:00:00'),
(1, 4, 'Chất lượng âm thanh tốt, chống ồn hiệu quả', '2026-01-16 12:00:00'),

-- User 2 (3 comments - nhiều nhất)
(2, 2, 'Màn hình đẹp, màu sắc sống động', '2026-01-11 09:00:00'),
(2, 2, 'Pin khỏe, dùng cả ngày không lo', '2026-01-12 10:00:00'),
(2, 6, 'Giày rất êm, phù hợp chạy bộ', '2026-01-11 13:00:00'),

-- User 3 (4 comments - NHIỀU NHẤT)
(3, 1, 'Đáng đồng tiền bát gạo', '2026-01-06 11:00:00'),
(3, 1, 'Camera xuất sắc, quay phim 4K mượt mà', '2026-01-07 12:00:00'),
(3, 1, 'Hiệu năng mượt mà, chơi game không giật lag', '2026-01-08 13:00:00'),
(3, 7, 'Giày bền, thiết kế đẹp', '2026-01-19 14:00:00'),

-- User 4, 5, 6, 7 (mỗi người 1 comment)
(4, 8, 'Ấm áp, nhẹ, dễ mang theo', '2026-01-13 10:00:00'),
(5, 9, 'Vừa vặn, chất liệu tốt', '2026-01-23 11:00:00'),
(6, 10, 'Nhiều ngăn, tiện lợi', '2026-01-09 12:00:00'),
(7, 6, 'Đẹp, giá hợp lý', '2026-01-28 13:00:00');