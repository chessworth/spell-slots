import express = require('express');
const logInfo = require("../utils/logger");

function requestLogger(req: express.Request, res: express.Response, next: express.NextFunction) {
  logInfo("Incoming request", {
    method: req.method,
    path: req.url,
    body: req.body,
  });
  next();
}
export = requestLogger;