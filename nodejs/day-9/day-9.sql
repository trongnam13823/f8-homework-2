-- ============================================
-- BÀI 1: SỬA THIẾT KẾ BẢNG order_items
-- ============================================

-- 1. Thêm cột lưu giá tại thời điểm mua
ALTER TABLE order_items
ADD COLUMN price_at_purchase DECIMAL(10,2) NOT NULL AFTER product_id;

-- 2. Cập nhật giá từ bảng products
UPDATE order_items oi
JOIN products p ON oi.product_id = p.id
SET oi.price_at_purchase = p.current_price;

-- 3. Tính tổng doanh thu hệ thống
SELECT 
SUM(quantity * price_at_purchase) AS total_revenue
FROM order_items;



-- ============================================
-- BÀI 2: TOP 5 KHÁCH HÀNG CHI TIÊU NHIỀU NHẤT
-- THÁNG 1/2026
-- ============================================

SELECT 
u.id,
u.full_name,
SUM(oi.quantity * oi.price_at_purchase) AS total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
WHERE o.status = 'completed'
AND o.order_date >= '2026-01-01'
AND o.order_date < '2026-02-01'
GROUP BY u.id, u.full_name
ORDER BY total_spent DESC
LIMIT 5;



-- ============================================
-- BÀI 3: 5 USER CÓ NHIỀU COMMENT NHẤT
-- THÁNG 1/2026
-- ============================================

SELECT 
u.id,
u.username,
COUNT(c.id) AS total_comments
FROM users u
JOIN comments c ON u.id = c.user_id
WHERE c.created_at >= '2026-01-01'
AND c.created_at < '2026-02-01'
GROUP BY u.id, u.username
ORDER BY total_comments DESC
LIMIT 5;



-- ============================================
-- BÀI 4: DANH SÁCH SẢN PHẨM + SỐ COMMENT
-- ============================================

SELECT 
p.id,
p.name,
p.current_price,
COUNT(c.id) AS total_comments
FROM products p
LEFT JOIN comments c ON p.id = c.product_id
GROUP BY p.id, p.name, p.current_price
ORDER BY total_comments DESC;



-- ============================================
-- BÀI 5: KHÁCH HÀNG CHI TIÊU > TRUNG BÌNH
-- THÁNG 1/2026
-- ============================================

SELECT 
u.id,
u.full_name,
SUM(oi.quantity * oi.price_at_purchase) AS total_spent,
(
SELECT AVG(user_total)
FROM (
    SELECT 
    SUM(oi2.quantity * oi2.price_at_purchase) AS user_total
    FROM orders o2
    JOIN order_items oi2 ON o2.id = oi2.order_id
    WHERE o2.status = 'completed'
    AND o2.order_date >= '2026-01-01'
    AND o2.order_date < '2026-02-01'
    GROUP BY o2.user_id
) avg_table
) AS avg_spent
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
WHERE o.status = 'completed'
AND o.order_date >= '2026-01-01'
AND o.order_date < '2026-02-01'
GROUP BY u.id, u.full_name
HAVING total_spent >
(
SELECT AVG(user_total)
FROM (
    SELECT 
    SUM(oi2.quantity * oi2.price_at_purchase) AS user_total
    FROM orders o2
    JOIN order_items oi2 ON o2.id = oi2.order_id
    WHERE o2.status = 'completed'
    AND o2.order_date >= '2026-01-01'
    AND o2.order_date < '2026-02-01'
    GROUP BY o2.user_id
) avg_table
);



-- ============================================
-- BÀI 6: SẢN PHẨM BÁN NHIỀU NHẤT MỖI DANH MỤC
-- ============================================

SELECT 
category,
name,
total_quantity
FROM (
    SELECT 
    p.category,
    p.name,
    SUM(oi.quantity) AS total_quantity,
    RANK() OVER (PARTITION BY p.category ORDER BY SUM(oi.quantity) DESC) AS rnk
    FROM products p
    JOIN order_items oi ON p.id = oi.product_id
    GROUP BY p.category, p.name
) ranked
WHERE rnk = 1;



-- ============================================
-- BÀI 7: BÁO CÁO TỔNG HỢP KHÁCH HÀNG
-- THÁNG 1/2026
-- ============================================

SELECT 
u.full_name,
COUNT(DISTINCT o.id) AS total_orders,
SUM(oi.quantity * oi.price_at_purchase) AS total_spent,
COUNT(DISTINCT c.id) AS total_comments,
ROUND(SUM(oi.quantity * oi.price_at_purchase) / COUNT(DISTINCT o.id),2) AS avg_order_value
FROM users u
LEFT JOIN orders o 
ON u.id = o.user_id
AND o.status = 'completed'
AND o.order_date >= '2026-01-01'
AND o.order_date < '2026-02-01'
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN comments c 
ON u.id = c.user_id
AND c.created_at >= '2026-01-01'
AND c.created_at < '2026-02-01'
GROUP BY u.id, u.full_name
ORDER BY total_spent DESC;



-- ============================================
-- BÀI 8: SẢN PHẨM CHƯA TỪNG ĐƯỢC BÁN
-- ============================================

SELECT 
p.id,
p.name,
p.current_price,
p.category
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.id IS NULL;



-- ============================================
-- BÀI 9: DOANH THU THEO THÁNG
-- ============================================

SELECT 
DATE_FORMAT(o.order_date,'%Y-%m') AS month,
SUM(oi.quantity * oi.price_at_purchase) AS total_revenue,
COUNT(DISTINCT o.id) AS total_orders,
ROUND(SUM(oi.quantity * oi.price_at_purchase) / COUNT(DISTINCT o.id),2) AS avg_order_value
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE o.status = 'completed'
GROUP BY DATE_FORMAT(o.order_date,'%Y-%m')
ORDER BY month;



-- ============================================
-- BÀI 10: KHÁCH HÀNG TRUNG THÀNH
-- ============================================

SELECT 
u.full_name,
COUNT(DISTINCT o.id) AS total_orders,
SUM(oi.quantity * oi.price_at_purchase) AS total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
WHERE o.status = 'completed'
AND o.order_date >= '2026-01-01'
AND o.order_date < '2026-02-01'
GROUP BY u.id, u.full_name
HAVING 
COUNT(DISTINCT o.id) >= 2
AND SUM(oi.quantity * oi.price_at_purchase) >= 30000000
ORDER BY total_spent DESC;