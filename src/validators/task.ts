import * as Joi from 'joi';

import { TaskStatus } from './../enums/Task';

export const getTasksSchema = Joi.object().keys({
  userId: Joi.number().integer().min(1).required(),
  date: Joi.date().required(),
});

export const addTaskSchema = Joi.object().keys({
  userId: Joi.number().integer().min(1).required(),
  content: Joi.string().trim().max(255).required(),
  date: Joi.date().required(),
});

export const updateTaskContentSchema = Joi.object().keys({
  userId: Joi.number().integer().min(1).required(),
  taskId: Joi.number().integer().min(1).required(),
  content: Joi.string().trim().max(255).required(),
});

export const updateTaskDateSchema = Joi.object().keys({
  userId: Joi.number().integer().min(1).required(),
  taskId: Joi.number().integer().min(1).required(),
  date: Joi.date().required(),
});

export const updateTaskPositionSchema = Joi.object().keys({
  userId: Joi.number().integer().min(1).required(),
  taskId: Joi.number().integer().min(1).required(),
  position: Joi.number().integer().required(),
});

export const updateTaskStatusSchema = Joi.object().keys({
  userId: Joi.number().integer().min(1).required(),
  taskId: Joi.number().integer().min(1).required(),
  status: Joi.valid(TaskStatus.OPEN, TaskStatus.DONE),
});

export const removeTaskSchema = Joi.object().keys({
  userId: Joi.number().integer().min(1).required(),
  taskId: Joi.number().integer().min(1).required(),
});
