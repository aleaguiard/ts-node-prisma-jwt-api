import { z } from 'zod';

export const registerSchema = z.object({
	email: z.string().email({ message: 'Email not valid' }),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const loginSchema = z.object({
	email: z.string().email({ message: 'Email not valid' }),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});
