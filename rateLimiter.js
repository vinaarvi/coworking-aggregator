const rateLimit = require('express-rate-limit');

//maksimal 5 request per 5 detik per IP
const limiter = rateLimit({
  windowMs: 5 * 1000, // 5 detik
  max: 5, // max 5 request per window
  message: {
    message: 'Terlalu banyak request, coba lagi nanti.'
  }
});

module.exports = limiter;
