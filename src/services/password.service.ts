import brcrypt from 'bcrypt';

const SALT_ROUNDS: number = 10;

export const hashPassword = async (password: string): Promise<string> => {
	return await brcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
	return await brcrypt.compare(password, hash);
};
