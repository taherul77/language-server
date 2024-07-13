import config from "../config/index.js";
import ApiError from "../utils/ApiError.js";


const globalErrorHandler = (err, _req, res, _next) => {
  console.log(`💀 Global Error Handler ~`, err);
  let statusCode = 500;
  let message = "Something went wrong !";
  let errorMessages = [];
  if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorMessages = err?.message
      ? [
          {
            path: "",
            message: err?.message,
          },
        ]
      : [];
  } else if (err?.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired please login again!";
    errorMessages = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err?.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please provide a valid token";
    errorMessages = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV !== "production" ? err?.stack : undefined,
  });
};

export default globalErrorHandler;