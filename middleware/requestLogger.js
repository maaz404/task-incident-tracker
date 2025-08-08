const fs = require("fs");
const path = require("path");

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const endpoint = req.originalUrl;
  const logMessage = `${timestamp} - ${method} ${endpoint}`;

  console.log(logMessage);

  const logFilePath = path.join(__dirname, "../logs.txt");
  fs.appendFile(logFilePath, logMessage + "\n", (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });

  next();
};

module.exports = requestLogger;
