import { Customer } from '../models/Customer.js';

function escapeRegex(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function generateVoucherCode(prefixInput = 'VOUCHER') {
    const raw = String(prefixInput || '').trim() || 'VOUCHER';

    // Simple formatting:
    // - If input ends with zeros, treat them as padding width.
    //   Example: 'VOUCHER-0000' => prefix 'VOUCHER-' + 4-digit number.
    const mPad = raw.match(/^(.*?)(0+)$/);
    const prefix = (mPad?.[1] ?? raw).trim() || 'VOUCHER';
    const padWidth = mPad ? mPad[2].length : 0;

    // Find vouchers like PREFIX123 (digits only, may include leading zeros)
    const regex = new RegExp(`^${escapeRegex(prefix)}(\\d+)$`);
    const docs = await Customer.find({ voucher: { $regex: regex } }).select('voucher');

    const used = new Set();
    for (const doc of docs) {
        const m = String(doc.voucher || '').match(regex);
        if (!m) continue;
        const n = Number(m[1]);
        if (Number.isInteger(n) && n > 0) used.add(n);
    }

    let candidate = 1;
    while (used.has(candidate)) candidate += 1;

    const suffix = padWidth > 0 ? String(candidate).padStart(padWidth, '0') : String(candidate);
    return `${prefix}${suffix}`;
}
