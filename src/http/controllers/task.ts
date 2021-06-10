import { Request, Response } from "express";

import * as taskService from "../services/task";
import { APP, Post, Get } from '../../helper/decorator';
import auth from "../middlewares/auth";

@APP('/tasks')
export default class UserController {
  @Post('/', [auth])
	async addTask(req: Request, res: Response) {
		const userId = req["user"].id;
		await taskService.addTask({ ...req.body, userId });

		return res.status(201).send();
	}

	@Get('/', [auth])
	async getTaskList(req: Request, res: Response) {
		const params = {
			userId: req["user"].id,
			skip: +req.query.skip,
			take: +req.query.take,
		}
		const responseData = await taskService.getTaskList(params);

		return res.status(200).send(responseData);
	}
}