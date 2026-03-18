import mongoose from 'mongoose';

export async function connectDb(mongoUri) {
    if (!mongoUri) {
        throw new Error('Missing MONGODB_URI');
    }

    mongoose.set('strictQuery', true);

    await mongoose.connect(mongoUri, {
        autoIndex: true
    });

    // Cleanup legacy indexes from older schema versions.
    // Some databases may still have a unique index on accounts.email,
    // which breaks inserts when email is missing (null) => E11000 dup key.
    try {
        const conn = mongoose.connection;
        const accounts = conn.collection('accounts');

        // Remove legacy field from documents (safe even if field doesn't exist)
        await accounts.updateMany(
            { email: { $exists: true } },
            { $unset: { email: '' } }
        );

        const indexes = await accounts.indexes();
        const emailIndexes = indexes.filter((idx) => {
            const key = idx?.key || {};
            return Object.prototype.hasOwnProperty.call(key, 'email');
        });

        for (const idx of emailIndexes) {
            if (idx?.name) {
                await accounts.dropIndex(idx.name);
            }
        }
    } catch {
        // ignore (collection may not exist yet, or lacking permissions)
    }

    return mongoose.connection;
}
