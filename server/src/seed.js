import 'dotenv/config';

import { connectDb } from './db.js';
import { Account } from './models/Account.js';
import { Customer } from './models/Customer.js';

const MONGODB_URI = process.env.MONGODB_URI;

await connectDb(MONGODB_URI);

// Upsert sample account
const sampleUsername = 'thai';
const samplePassword = 'password123';

const existing = await Account.findOne({ username: sampleUsername });
if (!existing) {
    await Account.createWithPassword({
        username: sampleUsername,
        password: samplePassword
    });
    // eslint-disable-next-line no-console
    console.log(`Seeded account: ${sampleUsername} / ${samplePassword}`);
} else {
    // eslint-disable-next-line no-console
    console.log(`Account already exists: ${sampleUsername}`);
}

// Upsert sample staff account
const staffUsername = 'staff';
const staffPassword = '12345';

const existingStaff = await Account.findOne({ username: staffUsername });
if (!existingStaff) {
    await Account.createWithPassword({
        username: staffUsername,
        password: staffPassword,
        role: 'staff'
    });
    // eslint-disable-next-line no-console
    console.log(`Seeded staff account: ${staffUsername} / ${staffPassword}`);
} else {
    // eslint-disable-next-line no-console
    console.log(`Staff account already exists: ${staffUsername}`);
}

// Upsert sample customer
await Customer.findOneAndUpdate(
    { phone: '0901234567' },
    { $set: { name: 'Nguyen Van A', phone: '0901234567', voucher: 'SALE10', voucherUsed: false } },
    { upsert: true, new: true }
);

// eslint-disable-next-line no-console
console.log('Seeded customer: 0901234567 -> SALE10');

process.exit(0);
