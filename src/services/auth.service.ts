import { User } from '../models/user.interface';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';

export const generateJwt = (user: User): string => {
	if (!JWT_SECRET) {
		throw new Error('JWT_SECRET is not defined');
	}
	return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
		expiresIn: '1h',
	});
};
