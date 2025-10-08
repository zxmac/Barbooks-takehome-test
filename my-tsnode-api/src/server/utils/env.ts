// === FILE: src/server/utils/env.js ===
import dotenv from 'dotenv';
dotenv.config();
export const env: any = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '3000',
  CORS_ORIGINS: process.env.CORS_ORIGINS || '',
};