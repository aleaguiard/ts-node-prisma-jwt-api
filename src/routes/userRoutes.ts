import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
		return res.status(401).json({ error: 'not authorized' });
	}

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			console.error('Error on authentication: ', err);
			return res.status(403).json({ error: 'not authorized' });
		}

		next();
	});
};

router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);

export default router;
