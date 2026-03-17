import { Router } from 'express';
import { Customer } from '../models/Customer.js';

const router = Router();

function normalizePhone(value) {
    return String(value || '').replace(/\D/g, '');
}

router.post('/', async (req, res) => {
    try {
        const { name, phone, voucher } = req.body ?? {};

        if (!name || !phone || !voucher) {
            return res
                .status(400)
                .json({ error: 'name, phone, voucher are required' });
        }

        const normalizedPhone = normalizePhone(phone);

        const customer = await Customer.findOneAndUpdate(
            { phone: normalizedPhone },
            { $set: { name, phone: normalizedPhone, voucher } },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );

        return res.status(201).json(customer);
    } catch (err) {
        // Duplicate key edge case (race)
        if (err?.code === 11000) {
            return res.status(409).json({ error: 'phone already exists' });
        }
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

router.get('/by-phone/:phone', async (req, res) => {
    try {
        const { phone } = req.params;
        const normalizedPhone = normalizePhone(phone);
        const customer = await Customer.findOne({ phone: normalizedPhone });

        if (!customer) {
            return res.status(404).json({ error: 'customer not found' });
        }

        return res.json(customer);
    } catch (err) {
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

router.get('/by-phone/:phone/voucher', async (req, res) => {
    try {
        const { phone } = req.params;
        const normalizedPhone = normalizePhone(phone);
        const customer = await Customer.findOne({ phone: normalizedPhone }).select('voucher phone');

        if (!customer) {
            return res.status(404).json({ error: 'customer not found' });
        }

        return res.json({ phone: customer.phone, voucher: customer.voucher });
    } catch (err) {
        return res.status(500).json({ error: err?.message ?? 'Internal error' });
    }
});

export default router;
