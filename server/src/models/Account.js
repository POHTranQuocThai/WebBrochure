import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const AccountSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['admin', 'staff'],
            default: 'staff',
            required: true
        }
    },
    {
        timestamps: true
    }
);

AccountSchema.methods.verifyPassword = async function verifyPassword(password) {
    return bcrypt.compare(password, this.password);
};

AccountSchema.statics.createWithPassword = async function createWithPassword({
    username,
    password,
    role = 'staff'
}) {
    const passwordHash = await bcrypt.hash(password, 10);
    return this.create({ username, password: passwordHash, role });
};

export const Account = mongoose.model('Account', AccountSchema);
