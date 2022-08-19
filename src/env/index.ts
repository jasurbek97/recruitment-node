import * as dotenv from 'dotenv';

dotenv.config();
const PORT = +process.env.PORT || 3005;
const JWT_SECRET = process.env.JWT_SECRET || '';
const EXPIRES_IN = process.env.EXPIRES_IN || '10h';

const DB_HOST = process.env.DB_HOST || '';
const DB_USER = process.env.DB_USER || '';
const DB_PORT = +process.env.DB_PORT || 5432;
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || '';
const MAX_POOL = +process.env.MAX_POOL || 75;

export {
  PORT,
  JWT_SECRET,
  EXPIRES_IN,
  DB_PORT,
  DB_USER,
  DB_HOST,
  MAX_POOL,
  DB_NAME,
  DB_PASS,
};
