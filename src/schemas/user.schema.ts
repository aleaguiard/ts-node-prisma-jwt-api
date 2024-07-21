import { z } from 'zod';

export const createUserSchema = z.object({
	email: z.string().email({ message: 'Email not valid' }),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const updateUserSchema = z.object({
	email: z.string().email({ message: 'Email not valid' }).optional(),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }).optional(),
});
