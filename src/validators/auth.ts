import * as Joi from 'joi';

export const signUpSchema = Joi.object().keys({
  username: Joi.string().min(2).max(31).required(),
  fullName: Joi.string().max(31).required(),
  password: Joi.string().min(3).required(),
});
