import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

dotenv.config();

// Init prisma client
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

export default app;
