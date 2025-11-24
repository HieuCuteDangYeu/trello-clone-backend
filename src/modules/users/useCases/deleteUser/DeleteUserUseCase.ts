import { IUserRepo } from '@modules/users/repos/userRepos';

interface DeleteUserDTO {
  userId: string;
}

export class DeleteUserUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(request: DeleteUserDTO): Promise<void> {
    const { userId } = request;

    const user = await this.userRepo.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepo.delete(userId);
  }
}
