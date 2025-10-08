import express from 'express';
import cors from 'cors';
import { router as orderRouter } from "./routes/order";
import { router as summaryRouter } from "./routes/summary";
import { env } from './utils/env';

const app = express();

// CORS with allowlist
const allowed = (env.CORS_ORIGINS || '').split(',').filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// Body parsers with sensible limits
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

app.use('/api/orders', orderRouter);

app.use('/api/summary', summaryRouter);

export default app;