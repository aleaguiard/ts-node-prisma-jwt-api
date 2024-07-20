import { Request, Response } from 'express';
import { hashPassword } from '../services/password.service';
import prisma from '../models/user';

export const register = async (req: Request, res: Response) => {
	const { email, password, name } = req.body;

	try {
		const hashedPassword = await hashPassword(password);

		const user = await prisma.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		});

		const token = user.generateJwt(user);
		res.status(200).send({ token });
	} catch (error) {
		// TODO: handle errors
		res.status(400).send('Error');
	}
};
