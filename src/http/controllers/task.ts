import { getTasksSchema, updateTaskSchema } from './../../validators/task';
import { validate } from './../../helper/validate';
import { Request, Response } from 'express';

import * as taskService from '../services/task';
import { APP, Post, Get, Put } from '../../helper/decorator';
import auth from '../middlewares/auth';

@APP('/tasks', [auth])
export default class UserController {
  @Post('/')
  async addTask(req: Request, res: Response): Promise<void> {
    const params = {
      userId: req['user'].id,
      title: String(req.query.title),
      content: String(req.query.content),
    };
    await taskService.addTask(params);

    res.status(201).send();
  }

  @Get('/')
  async getTasks(req: Request, res: Response): Promise<void> {
    const params = {
      userId: req['user'].id,
      skip: +req.query.skip,
      take: +req.query.take,
    };

    validate(getTasksSchema, params);

    const responseData = await taskService.getTaskList(params);

    res.status(200).send(responseData);
  }

  @Put('/:taskId')
  async updateTask(req: Request, res: Response): Promise<void> {
    const params = {
      userId: req['user'].id,
      taskId: +req.params.taskId,
      status: +req.query.status,
      title: String(req.query.title),
      content: String(req.query.content),
    };

    validate(updateTaskSchema, params);
    await taskService.updateTask(params);

    res.sendStatus(204);
  }
}
