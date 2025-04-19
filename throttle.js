const userTimestamps = {};

const throttle = (delay) => {
  return (req, res, next) => {
    const userIP = req.ip;
    const now = Date.now();

    if (!userTimestamps[userIP]) {
      userTimestamps[userIP] = now;
      return next();
    }

    const lastRequestTime = userTimestamps[userIP];

    if (now - lastRequestTime < delay) {
      const waitTime = delay - (now - lastRequestTime);
      return res.status(429).json({ message: `Tunggu ${waitTime}ms sebelum request lagi.` });
    }

    userTimestamps[userIP] = now;
    next();
  };
};

module.exports = throttle;
