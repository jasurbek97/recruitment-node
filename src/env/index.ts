import * as dotenv from 'dotenv';

dotenv.config();
const PORT = +process.env.PORT || 3005;
const JWT_SECRET = process.env.JWT_SECRET || '';
const EXPIRES_IN = process.env.EXPIRES_IN || '10h';

export { PORT, JWT_SECRET, EXPIRES_IN };
