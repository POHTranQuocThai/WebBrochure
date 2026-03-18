import { Router } from 'express';
import { Customer } from '../models/Customer.js';
import { generateVoucherCode } from '../lib/voucher.js';
import { VoucherFormat } from '../models/VoucherFormat.js';

const router = Router();

function normalizePhone(value) {
    return String(value || '').replace(/\D/g, '');
}

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find({}).sort({ createdAt: -1 });
        return res.json(customers);
    } catch (err) {
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, phone, voucher } = req.body ?? {};

        if (!name || !phone) {
            return res.status(400).json({ error: 'name and phone are required' });
        }

        const trimmedName = String(name || '').trim();
        const normalizedPhone = normalizePhone(phone);
        const rawVoucher = String(voucher || '').trim();

        if (!trimmedName || !normalizedPhone) {
            return res.status(400).json({ error: 'name and phone are required' });
        }

        // Note: allow duplicate names; rely on Mongo unique indexes to prevent duplicate phone/voucher.

        // Behavior:
        // - If `voucher` ends with digits => treat as full voucher code
        // - Else => auto-generate from saved voucher format (defaults to VOUCHER)
        if (rawVoucher && /\d+$/.test(rawVoucher)) {
            const created = await Customer.create({ name: trimmedName, phone: normalizedPhone, voucher: rawVoucher });
            return res.status(201).json(created);
        }

        const cfg = await VoucherFormat.findOne({ key: 'default' }).select('format');
        const formatToUse = String(cfg?.format || 'VOUCHER').trim() || 'VOUCHER';

        for (let attempt = 0; attempt < 5; attempt += 1) {
            const autoVoucher = await generateVoucherCode(formatToUse);
            try {
                const created = await Customer.create({ name: trimmedName, phone: normalizedPhone, voucher: autoVoucher });
                return res.status(201).json(created);
            } catch (err) {
                if (err?.code === 11000 && err?.keyPattern?.voucher) {
                    continue;
                }
                throw err;
            }
        }

        return res.status(409).json({ error: 'voucher already exists, please retry' });
    } catch (err) {
        if (err?.code === 11000) {
            if (err?.keyPattern?.phone) return res.status(409).json({ error: 'phone already exists' });
            if (err?.keyPattern?.voucher) return res.status(409).json({ error: 'voucher already exists' });
            return res.status(409).json({ error: 'duplicate key' });
        }
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, voucher } = req.body ?? {};

        const trimmedName = String(name || '').trim();
        const normalizedPhone = normalizePhone(phone);
        const trimmedVoucher = String(voucher || '').trim();

        if (!trimmedName || !normalizedPhone || !trimmedVoucher) {
            return res.status(400).json({ error: 'name, phone, voucher are required' });
        }

        // Note: allow duplicate names/phones checks here; unique index will still prevent duplicate phone/voucher.

        const updated = await Customer.findByIdAndUpdate(
            id,
            { $set: { name: trimmedName, phone: normalizedPhone, voucher: trimmedVoucher } },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ error: 'customer not found' });
        }

        return res.json(updated);
    } catch (err) {
        if (err?.code === 11000) {
            if (err?.keyPattern?.phone) return res.status(409).json({ error: 'phone already exists' });
            if (err?.keyPattern?.voucher) return res.status(409).json({ error: 'voucher already exists' });
            return res.status(409).json({ error: 'duplicate key' });
        }
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Customer.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'customer not found' });
        }

        return res.json({ ok: true });
    } catch (err) {
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

export default router;
