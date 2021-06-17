import { formatDate } from './../../helper/date';
import * as taskSchema from './../../validators/task';
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
      content: req.body.content,
      date: req.body.date,
    };

    await validate(taskSchema.addTaskSchema, params);
    await taskService.addTask(params);

    res.status(201).send();
  }

  @Get('/')
  async getTasks(req: Request, res: Response): Promise<void> {
    const params = {
      userId: req['user'].id,
      date: req.query.date,
    };

    await validate(taskSchema.getTasksSchema, params);

    const formatParams = {
      userId: req['user'].id,
      date: formatDate(String(req.query.date)),
    };
    const responseData = await taskService.getTaskList(formatParams);

    res.status(200).send(responseData);
  }

  @Put('/:taskId/content')
  async updateTaskContent(req: Request, res: Response): Promise<void> {
    const params = {
      userId: req['user'].id,
      taskId: req.params.taskId,
      content: req.body.content,
    };

    await validate(taskSchema.updateTaskContentSchema, params);

    const formatParams = {
      userId: req['user'].id,
      taskId: +req.params.taskId,
      content: req.body.content,
    };

    await taskService.updateTaskContent(formatParams);

    res.sendStatus(204);
  }

  @Put('/:taskId/position')
  async updateTaskPosition(req: Request, res: Response): Promise<void> {
    const params = {
      userId: req['user'].id,
      taskId: req.params.taskId,
      position: req.body.position,
    };

    await validate(taskSchema.updateTaskPositionSchema, params);

    const formatParams = {
      userId: req['user'].id,
      taskId: +req.params.taskId,
      position: req.body.position,
    };

    await taskService.updateTaskPosition(formatParams);

    res.sendStatus(204);
  }

  @Put('/:taskId/date')
  async updateTaskDate(req: Request, res: Response): Promise<void> {
    const params = {
      userId: req['user'].id,
      taskId: req.params.taskId,
      date: req.body.date,
    };

    await validate(taskSchema.updateTaskDateSchema, params);

    const formatParams = {
      userId: req['user'].id,
      taskId: +req.params.taskId,
      date: req.body.date,
    };

    await taskService.updateTaskDate(formatParams);

    res.sendStatus(204);
  }
}
