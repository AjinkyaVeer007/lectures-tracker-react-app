const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;

    jwt.verify(token, "shhhhh");

    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: error.message + "Invalid Token",
    });
  }
};

module.exports = auth;
