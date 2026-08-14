// A small fixed-window rate limiter, in memory.
//
// Deliberately not `express-rate-limit`: the API runs as a single instance on
// Render's free tier, so a shared store would buy nothing, and this keeps the
// dependency list to what the project actually needs. The trade-off is real and
// worth stating — counters live in this process, so they reset on restart and
// would not be shared if the service were ever scaled to multiple instances.

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const SWEEP_MS = 5 * 60 * 1000;

/**
 * @param {object} opts
 * @param {number} opts.max        requests allowed per window per client
 * @param {number} [opts.windowMs]
 * @param {string} [opts.message]
 */
export function rateLimit({ max, windowMs = WINDOW_MS, message } = {}) {
  const hits = new Map(); // key -> { count, resetAt }

  // Without this the map grows once per unique IP forever. `unref()` so a
  // pending timer never holds the process open on shutdown.
  const sweeper = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }, SWEEP_MS);
  sweeper.unref?.();

  return (req, res, next) => {
    const key = req.ip || req.socket?.remoteAddress || "unknown";
    const now = Date.now();

    let entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(key, entry);
    }
    entry.count += 1;

    const remaining = Math.max(0, max - entry.count);
    res.setHeader("RateLimit-Limit", max);
    res.setHeader("RateLimit-Remaining", remaining);
    res.setHeader("RateLimit-Reset", Math.ceil((entry.resetAt - now) / 1000));

    if (entry.count > max) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      res.setHeader("Retry-After", retryAfter);
      return res.status(429).json({
        error: message || "Too many requests. Please try again shortly.",
      });
    }

    next();
  };
}

/**
 * The handful of headers helmet would set that actually matter for a JSON API
 * served over HTTPS. There is no HTML response to protect, so the CSP and
 * frame-ancestors machinery helmet brings would be inert here.
 */
export function securityHeaders(req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Frame-Options", "DENY");
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  res.removeHeader("X-Powered-By");
  next();
}
