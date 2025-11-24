import { IUserRepo } from '@modules/users/repos/userRepos';

export class VerifyEmailUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(token: string): Promise<void> {
    const user = await this.userRepo.getUserByVerificationToken(token);

    if (!user) {
      throw new Error('Invalid or expired verification token');
    }

    user.verifyEmail();

    await this.userRepo.save(user);
  }
}
