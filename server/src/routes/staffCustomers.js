import { Router } from 'express';
import { Customer } from '../models/Customer.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find({})
            .select('name phone voucher voucherUsed createdAt updatedAt')
            .sort({ createdAt: -1 });
        return res.json(customers);
    } catch (err) {
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

router.patch('/:id/voucher-used', async (req, res) => {
    try {
        const { id } = req.params;
        const { voucherUsed } = req.body ?? {};

        if (typeof voucherUsed !== 'boolean') {
            return res.status(400).json({ error: 'voucherUsed must be boolean' });
        }

        if (voucherUsed === false) {
            return res.status(400).json({ error: 'cannot revert voucherUsed' });
        }

        // One-way transition: only update when currently false.
        const updated = await Customer.findOneAndUpdate(
            { _id: id, voucherUsed: false },
            { $set: { voucherUsed: true } },
            { new: true, runValidators: true }
        ).select('name phone voucher voucherUsed createdAt updatedAt');

        if (!updated) {
            const existing = await Customer.findById(id).select('_id voucherUsed');
            if (!existing) {
                return res.status(404).json({ error: 'customer not found' });
            }
            if (existing.voucherUsed === true) {
                return res.status(409).json({ error: 'voucher already used' });
            }
            return res.status(500).json({ error: 'Internal error' });
        }

        return res.json(updated);
    } catch (err) {
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

export default router;
