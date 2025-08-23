function logInfo(message: string, meta: Record<string, any> = {}) {
  const timestamp = new Date().toISOString();
  console.log(
    JSON.stringify({
      level: "info",
      timestamp,
      message,
      ...meta,
    })
  );
}

function logError(message: string, meta: Record<string, any> = {}) {
  const timestamp = new Date().toISOString();
  console.error(
    JSON.stringify({
      level: "error",
      timestamp,
      message,
      ...meta,
    })
  );
}

module.exports.logInfo = logInfo;
module.exports.logError = logError;