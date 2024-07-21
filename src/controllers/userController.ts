import { Request, Response } from 'express';
import { hashPassword } from '../services/password.service';
import prisma from '../models/user';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema';

export const createUser = async (req: Request, res: Response): Promise<void> => {
	const parseResult = createUserSchema.safeParse(req.body);

	if (!parseResult.success) {
		res.status(400).json({ errors: parseResult.error.errors });
		return;
	}

	const { email, password } = parseResult.data;

	try {
		const hashedPassword = await hashPassword(password);
		const user = await prisma.create({
			data: {
				email,
				password: hashedPassword,
			},
		});
		res.status(201).json(user);
	} catch (error: any) {
		if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
			res.status(400).json({ message: 'Email already exists' });
		}
		console.log(error);
		res.status(500).json({ error: 'There was an error, try again later' });
	}
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users = await prisma.findMany();
		res.status(200).json(users);
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ error: 'There was an error, try again later' });
	}
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
	const userId = parseInt(req.params.id);
	try {
		const user = await prisma.findUnique({
			where: {
				id: userId,
			},
		});
		if (!user) {
			res.status(404).json({ error: 'User not found' });
			return;
		}
		res.status(200).json(user);
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ error: 'There was an error, try again later' });
	}
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
	const userId = parseInt(req.params.id);
	const parseResult = updateUserSchema.safeParse(req.body);

	if (!parseResult.success) {
		res.status(400).json({ errors: parseResult.error.errors });
		return;
	}

	const dataToUpdate = parseResult.data;

	try {
		if (dataToUpdate.password) {
			dataToUpdate.password = await hashPassword(dataToUpdate.password);
		}

		const user = await prisma.update({
			where: {
				id: userId,
			},
			data: dataToUpdate,
		});

		res.status(200).json(user);
	} catch (error: any) {
		if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
			res.status(400).json({ error: 'Email already exists' });
		} else if (error?.code == 'P2025') {
			res.status(404).json('User not found');
		} else {
			console.log(error);
			res.status(500).json({ error: 'There was an error, try again later' });
		}
	}
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
	const userId = parseInt(req.params.id);
	try {
		await prisma.delete({
			where: {
				id: userId,
			},
		});

		res.status(200)
			.json({
				message: `User ${userId} has been deleted`,
			})
			.end();
	} catch (error: any) {
		if (error?.code == 'P2025') {
			res.status(404).json('User not found');
		} else {
			console.log(error);
			res.status(500).json({ error: 'There was an error, try again later' });
		}
	}
};
