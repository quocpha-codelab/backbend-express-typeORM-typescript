import { getRepository } from 'typeorm';

import Users from "../entities/Users";

export async function getAllUser() : Promise<object> {
	const userRepository = getRepository(Users);
	const response = await userRepository.find();

	return response;
}

export async function getUserProfile(userId: number) : Promise<object> {
	const profile = await getRepository(Users)
		.createQueryBuilder('user')
		.where('user.id = :id', { id: userId })
		.select([
			'user.id id',
			'user.username username',
			'user.fullName fullName',
		])
		.getRawOne();

	return profile;
}