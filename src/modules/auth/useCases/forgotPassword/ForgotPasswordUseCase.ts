import { IUserRepo } from '@modules/users/repos/userRepos';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../../services/mailService';

export class ForgotPasswordUseCase {
  constructor(
    private userRepo: IUserRepo,
    private mailService: MailService,
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.userRepo.getUserByEmail(email);

    if (!user) return;

    const token = uuidv4();
    user.setPasswordResetToken(token);
    await this.userRepo.save(user);
    await this.mailService.sendPasswordResetEmail(email, token);
  }
}
