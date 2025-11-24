import { IUserRepo } from '@modules/users/repos/userRepos';
import { User } from '../../domain/user';
import { UpdateUserDTO } from './UpdateUserDTO';

export class UpdateUserUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(request: UpdateUserDTO): Promise<User> {
    const { userId, username, email } = request;

    const user = await this.userRepo.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (email && email !== user.email) {
      const emailExists = await this.userRepo.exists(email);
      if (emailExists) {
        throw new Error('Email already in use');
      }
    }

    user.updateDetails({ username, email });

    await this.userRepo.save(user);

    return user;
  }
}
