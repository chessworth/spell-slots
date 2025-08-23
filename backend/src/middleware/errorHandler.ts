import express = require('express');

interface ApiError extends Error {
  status?: number;
}

function errorHandler(
  err: ApiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.error(`[ERROR] ${req.method} ${req.url} → ${err.message}`);

  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      status: err.status || 500,
    },
  });
}

export = errorHandler;