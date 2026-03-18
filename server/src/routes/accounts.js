import { Router } from 'express';
import { Account } from '../models/Account.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body ?? {};

        // Bootstrap-only registration: allow creating the VERY FIRST account only.
        // After at least one account exists, registration is disabled.
        const existingCount = await Account.estimatedDocumentCount();
        if (existingCount > 0) {
            return res.status(403).json({ error: 'registration disabled' });
        }

        // Optional extra safety: if BOOTSTRAP_TOKEN is set, require it for bootstrap.
        const bootstrapTokenRequired = String(process.env.BOOTSTRAP_TOKEN || '').trim();
        if (bootstrapTokenRequired) {
            const provided =
                String(req.get('x-bootstrap-token') || '').trim() ||
                String((req.body ?? {}).bootstrapToken || '').trim();

            if (!provided || provided !== bootstrapTokenRequired) {
                return res.status(403).json({ error: 'FORBIDDEN' });
            }
        }

        if (!username || !password) {
            return res.status(400).json({ error: 'username and password are required' });
        }

        const existing = await Account.findOne({ username });
        if (existing) {
            return res.status(409).json({ error: 'username already exists' });
        }

        // First account is always admin.
        const account = await Account.createWithPassword({ username, password, role: 'admin' });

        return res.status(201).json({
            id: account._id,
            username: account.username
        });
    } catch (err) {
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body ?? {};

        if (!username || !password) {
            return res.status(400).json({ error: 'username and password are required' });
        }

        const account = await Account.findOne({ username });
        if (!account) {
            return res.status(401).json({ error: 'invalid credentials' });
        }

        const ok = await account.verifyPassword(password);
        if (!ok) {
            return res.status(401).json({ error: 'invalid credentials' });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ error: 'missing JWT_SECRET' });
        }

        const token = jwt.sign(
            {
                sub: account._id.toString(),
                username: account.username,
                role: account.role || 'admin'
            },
            secret,
            { expiresIn: '7d' }
        );

        return res.json({ ok: true, username: account.username, role: account.role || 'admin', token });
    } catch (err) {
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

export default router;
