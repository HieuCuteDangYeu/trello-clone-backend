import { IUserRepo } from '@modules/users/repos/userRepos';
import bcrypt from 'bcryptjs';

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export class ResetPasswordUseCase {
  constructor(private userRepo: IUserRepo) {}

  public async execute({
    token,
    newPassword,
  }: ResetPasswordRequest): Promise<void> {
    const user = await this.userRepo.getUserByPasswordResetToken(token);

    if (!user) {
      throw new Error('Token is invalid or has expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.changePassword(hashedPassword);
    await this.userRepo.save(user);
  }
}
