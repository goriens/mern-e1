const ErrorHandler = require("../Utils/errorHandle");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid:${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }
  // wrong JWT error
  if (err.code === "jsonWebTokenError") {
    const message = `json web token is invalid, try again later`;
    err = new ErrorHandler(message, 400);
  }
  // Jwt  expire error
  if (err.code === "TokenExpiredError") {
    const message = `json web token is expired, try again later`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
