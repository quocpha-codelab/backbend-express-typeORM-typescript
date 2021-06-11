import * as Joi from 'joi';

import { TaskStatus } from './../enums/Task';

export const getTasksSchema = Joi.object().keys({
  userId: Joi.number().integer().min(1).required(),
  skip: Joi.number().integer().min(0).required(),
  take: Joi.number().integer().min(0).required(),
});

export const addTaskSchema = Joi.object().keys({
  userId: Joi.number().integer().min(1).required(),
  title: Joi.string().trim().min(2).max(63).required(),
  content: Joi.string().trim().max(255).required(),
});

export const updateTaskSchema = Joi.object().keys({
  userId: Joi.number().integer().min(1).required(),
  taskId: Joi.number().integer().min(1).required(),
  status: Joi.valid(TaskStatus),
  title: Joi.string().trim().min(2).max(63).required(),
  content: Joi.string().trim().max(255).required(),
});
