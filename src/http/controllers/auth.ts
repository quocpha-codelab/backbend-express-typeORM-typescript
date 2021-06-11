import { Request, Response } from "express";

import { signIn, signUp } from "../services/auth";
import { APP, Post } from '../../helper/decorator';

@APP('/auth')
export default class UserController {
  @Post('/sign-in')
	async signIn(req: Request, res: Response): Promise<void> {
		const responseData = await signIn(req.body);

		res.status(200).send(responseData);
	}

  @Post('/sign-up')
  async signUp(req: Request, res: Response): Promise<void> {
  	const responseData = await signUp(req.body);

  	res.status(200).send(responseData);
  }
}