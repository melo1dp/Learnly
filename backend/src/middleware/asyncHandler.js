// Wraps an async Express handler so a rejected promise reaches the error
// middleware in index.js instead of hanging the request or crashing the process.
export function asyncHandler(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}
