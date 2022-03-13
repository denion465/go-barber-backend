import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import uploadCoonfig from '../config/upload';
import UpadateUserAvatarService from '../services/UpdateUserAvatarService';

interface User {
  password?: string;
}

const usersRouter = Router();
const upload = multer(uploadCoonfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user: User = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);

  } catch (err) {
    return response.status(400).json({ error: err });
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpadateUserAvatarService();

      const user: User = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file?.filename
      });

      delete user.password;

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error });

    }
  });

export default usersRouter;
