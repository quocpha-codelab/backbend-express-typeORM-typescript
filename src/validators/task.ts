import * as Joi from 'joi';

// import { TaskStatus } from './../enums/Task';x

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

export const updateTaskRankSchema = Joi.object().keys({
  userId: Joi.number().integer().min(1).required(),
  taskId: Joi.number().integer().min(1).required(),
  rank: Joi.number().integer().required(),
});
