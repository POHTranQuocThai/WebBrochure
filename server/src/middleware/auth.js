import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
    const header = req.headers.authorization || '';
    const match = header.match(/^Bearer\s+(.+)$/i);
    const token = match?.[1];

    if (!token) {
        return res.status(401).json({ error: 'missing token' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ error: 'missing JWT_SECRET' });
    }

    try {
        const payload = jwt.verify(token, secret);
        req.user = payload;
        return next();
    } catch {
        return res.status(401).json({ error: 'invalid token' });
    }
}

export function requireRole(roles) {
    const allowed = Array.isArray(roles) ? roles : [roles];

    return (req, res, next) => {
        const role = req.user?.role;
        if (!role) {
            return res.status(403).json({ error: 'forbidden' });
        }

        if (!allowed.includes(role)) {
            return res.status(403).json({ error: 'forbidden' });
        }

        return next();
    };
}
