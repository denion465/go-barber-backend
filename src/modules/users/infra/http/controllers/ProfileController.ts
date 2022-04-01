import { container } from 'tsyringe';

import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

interface User {
  password?: string;
}

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const createUser = container.resolve(ShowProfileService);

    const user: User = await createUser.execute({ user_id });

    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const createUser = container.resolve(UpdateProfileService);

    const user: User = await createUser.execute({
      user_id,
      name,
      email,
      old_password,
      password
    });

    delete user.password;

    return response.json(user);
  }
}
