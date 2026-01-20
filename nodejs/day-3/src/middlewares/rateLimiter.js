// Rate Limiter Middleware
const requestStore = new Map();

// Tạo rate limiter middleware
function createRateLimiter(config) {
  const { windowMs, maxRequests, message } = config;

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    let ipData = requestStore.get(ip);

    // Reset counter nếu hết thời gian cửa sổ
    if (!ipData || now - ipData.windowStart >= windowMs) {
      ipData = {
        count: 0,
        windowStart: now
      };
      requestStore.set(ip, ipData);
    }

    ipData.count++;

    // Kiểm tra vượt quá giới hạn
    if (ipData.count > maxRequests) {
      return res.status(429).json({
        error: message
      });
    }

    next();
  };
}

// Rate limiter mặc định: 100 requests/phút
const apiRateLimiter = createRateLimiter({
  windowMs: 60000,
  maxRequests: 100,
  message: 'Too many requests'
});

module.exports = {
  createRateLimiter,
  apiRateLimiter
};
