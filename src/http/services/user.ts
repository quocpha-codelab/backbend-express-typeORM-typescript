import { getRepository } from 'typeorm';

import Users from "../entities/Users";

export async function getAllUser() : Promise<object> {
	const userRepository = getRepository(Users);
	const response = await userRepository.find();

	return response;
}