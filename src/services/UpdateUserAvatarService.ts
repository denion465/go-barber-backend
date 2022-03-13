import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import uploadCoonfig from '../config/upload';

interface Request {
  user_id: string;
  avatarFilename?: string;
}

class UpadateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) throw new Error('Only authenticated users can change avatar');

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadCoonfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFilename as string;
    await usersRepository.save(user);

    return user;
  }
}

export default UpadateUserAvatarService;
