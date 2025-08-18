const requestLogger = (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const endpoint = req.originalUrl;
    console.log(`${timestamp} - ${method} ${endpoint}`);
  }

  next();
};

module.exports = requestLogger;
