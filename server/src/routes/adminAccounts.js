import { Router } from 'express';
import { Account } from '../models/Account.js';
import bcrypt from 'bcrypt';

const router = Router();

function sanitizeAccount(account) {
    return {
        id: account._id,
        username: account.username,
        role: account.role,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt
    };
}

async function countAdmins() {
    return Account.countDocuments({ role: 'admin' });
}

router.get('/', async (req, res) => {
    try {
        const accounts = await Account.find({}, { password: 0 }).sort({ createdAt: -1 });
        return res.json(accounts.map(sanitizeAccount));
    } catch (err) {
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { username, password, role } = req.body ?? {};

        if (!username || !password) {
            return res.status(400).json({ error: 'username and password are required' });
        }

        const normalizedRole = role === 'admin' || role === 'staff' ? role : 'staff';

        const existing = await Account.findOne({ username });
        if (existing) {
            return res.status(409).json({ error: 'username already exists' });
        }

        const account = await Account.createWithPassword({
            username,
            password,
            role: normalizedRole
        });

        return res.status(201).json(sanitizeAccount(account));
    } catch (err) {
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { password, role } = req.body ?? {};

        const account = await Account.findById(id);
        if (!account) {
            return res.status(404).json({ error: 'not found' });
        }

        const nextRole = role === 'admin' || role === 'staff' ? role : undefined;

        // Prevent removing the last admin.
        if (nextRole && account.role === 'admin' && nextRole !== 'admin') {
            const adminCount = await countAdmins();
            if (adminCount <= 1) {
                return res.status(409).json({ error: 'cannot remove last admin' });
            }
        }

        if (nextRole) account.role = nextRole;

        if (typeof password === 'string' && password.trim()) {
            const passwordHash = await bcrypt.hash(password, 10);
            account.password = passwordHash;
        }

        await account.save();
        return res.json(sanitizeAccount(account));
    } catch (err) {
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Prevent deleting self.
        if (String(req.user?.sub || '') === String(id)) {
            return res.status(409).json({ error: 'cannot delete self' });
        }

        const account = await Account.findById(id);
        if (!account) {
            return res.status(404).json({ error: 'not found' });
        }

        if (account.role === 'admin') {
            const adminCount = await countAdmins();
            if (adminCount <= 1) {
                return res.status(409).json({ error: 'cannot delete last admin' });
            }
        }

        await Account.deleteOne({ _id: id });
        return res.json({ ok: true });
    } catch (err) {
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

export default router;
