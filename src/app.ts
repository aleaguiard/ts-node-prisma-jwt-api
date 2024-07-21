import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
	res.json({ message: 'API deployed successfully' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

export default app;
