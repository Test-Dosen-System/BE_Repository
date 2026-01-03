const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = {
  mustLogin: (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        return res.status(401).json({
          status: false,
          message: "authorization header missing!",
          data: null,
        });
      }

      const token = authHeader.split("Bearer ")[1];
      if (!token) {
        return res.status(401).json({
          status: false,
          message: "token missing!",
          data: null,
        });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;

      next();
    } catch (err) {
      if (err.message == "jwt malformed") {
        return res.status(401).json({
          status: false,
          message: err.message,
          data: null,
        });
      }

      next(err);
    }
  },

  mustAdmin: (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        return res.status(401).json({
          status: false,
          message: "authorization header missing!",
          data: null,
        });
      }

      const token = authHeader.split("Bearer ")[1];
      if (!token) {
        return res.status(401).json({
          status: false,
          message: "token missing!",
          data: null,
        });
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      if (decoded.roles !== "ADMIN") {
        return res.status(403).json({
          status: false,
          message: "You're not authorized!, Only admin can access",
          data: null,
        });
      }
      next();
    } catch (err) {
      if (err.message == "Jwt malformed") {
        return res.status(401).json({
          status: false,
          message: err.message,
          data: null,
        });
      }
      next(err);
    }
  },
};
