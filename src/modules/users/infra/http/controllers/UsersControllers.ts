import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';

interface User {
  password?: string;
}

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user: User = await createUser.execute({ name, email, password });

    delete user.password;

    return res.json(user);
  }
}
