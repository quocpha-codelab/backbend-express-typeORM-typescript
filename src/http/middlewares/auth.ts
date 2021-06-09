import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { UserStatus } from '../../enums/user';
import * as jwt from '../../helper/jwt';
import Users from '../entities/Users';

async function getUser(req: Request) {
	const userRepository = getRepository(Users);

	const authorization = req.headers.authorization || '';
	if (authorization === '') return false;
	if (!authorization.startsWith('Bearer ')) return false;
	const token = authorization.slice(7, authorization.length);
	const payload = jwt.parse(token);
	if (payload === false) return false;
	const user = await userRepository.findOne(payload.userId);
	if (!user) return false;
	return user;
}

async function auth(req: Request, res: Response, next: Function): Promise<any> {
	const user = await getUser(req);
	if (!user || user.status === UserStatus.INACTIVE) {
		return res.status(401).send({
			message: 'You must be logged in',
		});
	}

	req["user"] = user;
	return next();
}

export default auth;
