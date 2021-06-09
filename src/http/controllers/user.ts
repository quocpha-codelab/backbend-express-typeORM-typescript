import { Request, Response } from "express";

import auth from '../middlewares/auth';
import { getAllUser } from "../services/user";
import { APP, Get } from '../../helper/decorator';

@APP('/users')
export default class UserController {
  @Get('/', [auth])
	async all(request: Request, response: Response): Promise<void> {
		const res = await getAllUser();

		response.status(200).send(res);
	}
}