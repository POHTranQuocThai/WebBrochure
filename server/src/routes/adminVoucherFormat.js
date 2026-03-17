import { Router } from 'express';
import { VoucherFormat } from '../models/VoucherFormat.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const doc = await VoucherFormat.findOne({ key: 'default' }).select('format');
        return res.json({ format: doc?.format || 'VOUCHER' });
    } catch (err) {
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

router.put('/', async (req, res) => {
    try {
        const raw = String(req.body?.format ?? '').trim();
        if (!raw) {
            return res.status(400).json({ error: 'format is required' });
        }

        const updated = await VoucherFormat.findOneAndUpdate(
            { key: 'default' },
            { $set: { format: raw } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        ).select('format');

        return res.json({ format: updated.format });
    } catch (err) {
        if (err?.code === 11000) {
            return res.status(409).json({ error: 'duplicate key' });
        }
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

export default router;
