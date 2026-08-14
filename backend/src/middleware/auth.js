import jwt from 'jsonwebtoken';

// A development fallback is convenient, but silently falling back in production
// means the API happily signs tokens with a constant that is public in this
// repository — anyone could forge one for any user id and role. Refuse to boot
// instead: an unset secret is a deployment mistake, not a runtime condition.
const JWT_SECRET = process.env.JWT_SECRET || 'dev-only-secret';

if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error(
    'JWT_SECRET must be set in production. Add it as an environment variable ' +
      '(on Render: dashboard → Environment) — see backend/.env.example.',
  );
}

// Sign a token for a user record.
export function signToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Express middleware: require a valid Bearer token. Attaches req.user.
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing auth token' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Express middleware factory: require a specific role (e.g. requireRole('instructor')).
export function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: `Requires ${role} role` });
    }
    next();
  };
}
