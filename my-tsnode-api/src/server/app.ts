import express from 'express';
import cors from 'cors';
import { router as testRouter } from "./routes/order";

const app = express();

// CORS with allowlist
const allowed = (process.env.CORS_ORIGINS || '').split(',').filter(Boolean);
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

app.use('/api/order', testRouter);

export default app;