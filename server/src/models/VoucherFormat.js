import mongoose from 'mongoose';

const voucherFormatSchema = new mongoose.Schema(
    {
        key: { type: String, required: true, unique: true, default: 'default' },
        format: { type: String, required: true, trim: true, default: 'VOUCHER' },
    },
    { timestamps: true }
);

export const VoucherFormat = mongoose.model('VoucherFormat', voucherFormatSchema);
