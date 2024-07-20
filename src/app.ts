import express from 'express';
import dotenv from 'dotenv';
import { env } from 'process';

dotenv.config();

const app = express();
app.use(express.json());

export default app;
