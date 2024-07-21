import { Request, Response } from 'express';
import { comparePassword, hashPassword } from '../services/password.service';
import { generateJwt } from '../services/auth.service';
import prisma from '../models/user';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

export const register = async (req: Request, res: Response): Promise<void> => {
	const parseResult = registerSchema.safeParse(req.body);

	if (!parseResult.success) {
		res.status(400).json({ errors: parseResult.error.errors });
		return;
	}

	const { email, password } = parseResult.data;

	try {
		const hashedPassword = await hashPassword(password);

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});

		const token = generateJwt(user);
		res.status(201).json({ token });
	} catch (error: any) {
		console.error('Error on registration:', error);
		if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
			res.status(400).json({ message: 'Email already exists' });
		} else {
			res.status(500).json({ error: 'There was an error on registration' });
		}
	}
};

export const login = async (req: Request, res: Response): Promise<void> => {
	const parseResult = loginSchema.safeParse(req.body);

	if (!parseResult.success) {
		res.status(400).json({ errors: parseResult.error.errors });
		return;
	}

	const { email, password } = parseResult.data;

	try {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			res.status(404).json({ error: 'User not found' });
			return;
		}

		const passwordMatch = await comparePassword(password, user.password);
		if (!passwordMatch) {
			res.status(401).json({ error: 'User and password do not match' });
		}

		const token = generateJwt(user);
		res.status(200).json({ token });
	} catch (error: any) {
		console.log('Error: ', error);
	}
};
