const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to check if user is logged in
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from Authorization header (format: "Bearer TOKEN")
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Please log in" });
    }

    // Check if token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user info
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Add user info to request so routes can use it
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Login expired, please log in again" });
    }

    return res.status(401).json({ message: "Invalid login token" });
  }
};

module.exports = { authenticateToken };
