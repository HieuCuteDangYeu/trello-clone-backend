import { User } from '@modules/users/domain/user';
import { IUserRepo } from '@modules/users/repos/userRepos';

export class GetMeUseCase {
  constructor(private userRepo: IUserRepo) {}

  public async execute(userId: string): Promise<User> {
    const user = await this.userRepo.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
