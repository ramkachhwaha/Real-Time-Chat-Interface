import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export const generateToken = (payload) => {
    return JWT.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export const verifyToken = (token) => {
    try {
        return JWT.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}