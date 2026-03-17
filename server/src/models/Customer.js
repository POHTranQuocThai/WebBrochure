import mongoose from 'mongoose';

function normalizePhone(value) {
    return String(value || '').replace(/\D/g, '');
}

const CustomerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            set: normalizePhone
        },
        voucher: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

export const Customer = mongoose.model('Customer', CustomerSchema);
