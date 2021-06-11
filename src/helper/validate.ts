import * as Joi from 'joi';
import { abort } from './error';

export const validate = async (schema: Joi.ObjectSchema<any>, data: any): Promise<void> => {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    abort(400, error);
  }
};
