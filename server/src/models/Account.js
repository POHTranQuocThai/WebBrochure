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
    password
}) {
    const passwordHash = await bcrypt.hash(password, 10);
    return this.create({ username, password: passwordHash });
};

export const Account = mongoose.model('Account', AccountSchema);
