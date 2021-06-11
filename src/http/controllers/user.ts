import { Request, Response } from 'express';

import auth from '../middlewares/auth';
import { getAllUser, getUserProfile } from '../services/user';
import { APP, Get } from '../../helper/decorator';

@APP('/users', [auth])
export default class UserController {
  @Get('/')
  async getAllUser(request: Request, response: Response): Promise<void> {
    const res = await getAllUser();

    response.status(200).send(res);
  }

  @Get('/profile')
  async getUserProfile(req: Request, res: Response): Promise<void> {
    const responseData = await getUserProfile(req['user'].id);

    res.status(200).send(responseData);
  }
}
