import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
	const usersRepository = getRepository(User);
	const users = await usersRepository.find();

	return response.json(users);
});

usersRouter.post('/', async (request, response) => {
	try {
		const { name, email, password } = request.body;

		const createUser = new CreateUserService();

		const user = await createUser.execute({
			name,
			email,
			password,
		});

		const userWithoutPassword = {
			id: user.id,
			name: user.name,
			email: user.email,
			created_at: user.created_at,
			updated_at: user.updated_at,
		};

		return response.json(userWithoutPassword);
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
});

export default usersRouter;