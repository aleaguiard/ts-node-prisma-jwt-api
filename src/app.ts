import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import prisma from './models/user';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', async (_req, res) => {
	try {
		await prisma.$connect();
		res.json({ message: 'API deployed successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Database connection failed' });
	}
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

export default app;
