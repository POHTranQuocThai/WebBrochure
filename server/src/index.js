import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectDb } from './db.js';
import accountsRouter from './routes/accounts.js';
import customersRouter from './routes/customers.js';
import adminCustomersRouter from './routes/adminCustomers.js';
import adminVoucherFormatRouter from './routes/adminVoucherFormat.js';
import { requireAuth } from './middleware/auth.js';

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ ok: true });
});

app.use('/api/accounts', accountsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/admin/customers', requireAuth, adminCustomersRouter);
app.use('/api/admin/voucher-format', requireAuth, adminVoucherFormatRouter);

await connectDb(MONGODB_URI);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${PORT}`);
});
