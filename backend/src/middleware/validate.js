// Small shared validators. Kept here rather than inline in each route so the
// error shape (a JSON 400) is identical everywhere.

/**
 * An error carrying an HTTP status, so route code can `throw` instead of
 * threading `res` through helpers. The fallback handler in index.js reads
 * `.status`; anything without one is treated as a 500.
 */
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

/**
 * Route middleware: require `:name` to be a positive integer and coerce it.
 *
 * Without this, `GET /api/courses/abc` reaches Postgres as a malformed integer
 * literal and surfaces as a 500 carrying the raw driver message.
 */
export function intParam(name) {
  return (req, res, next) => {
    const raw = String(req.params[name] ?? "");
    if (!/^[0-9]+$/.test(raw)) {
      return res.status(400).json({ error: `Invalid ${name}` });
    }
    const value = Number(raw);
    if (!Number.isSafeInteger(value) || value < 1) {
      return res.status(400).json({ error: `Invalid ${name}` });
    }
    req.params[name] = value;
    next();
  };
}

// Deliberately permissive: this rejects the shapes that are definitely not
// addresses (no @, no dot in the domain, whitespace) without pretending to
// implement RFC 5322. Real verification is a confirmation email, not a regex.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return typeof email === "string" && email.length <= 254 && EMAIL_RE.test(email);
}

// One password policy, applied at registration *and* at change. Previously
// registration accepted a single character while change demanded eight.
export const PASSWORD_MIN_LENGTH = 8;

export function passwordProblem(password) {
  if (typeof password !== "string") return "Password must be text";
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  }
  if (password.length > 200) return "Password must be at most 200 characters";
  return null;
}
