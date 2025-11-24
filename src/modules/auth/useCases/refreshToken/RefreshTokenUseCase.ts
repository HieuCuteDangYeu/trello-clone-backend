import { IUserRepo } from '@modules/users/repos/userRepos';
import { IRoleRepo } from '../../repos/roleRepo';
import { AuthService } from '../../services/authService';

export class RefreshTokenUseCase {
  private userRepo: IUserRepo;
  private roleRepo: IRoleRepo;
  private authService: AuthService;

  constructor(
    userRepo: IUserRepo,
    roleRepo: IRoleRepo,
    authService: AuthService,
  ) {
    this.userRepo = userRepo;
    this.roleRepo = roleRepo;
    this.authService = authService;
  }

  public async execute(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const userId = this.authService.verifyRefreshToken(refreshToken);

    const user = await this.userRepo.getUserById(userId);
    if (!user) throw new Error('User not found');

    if (user.refreshToken !== refreshToken) {
      throw new Error('Invalid refresh token');
    }

    const role = await this.roleRepo.getRoleById(user.roleId);
    const roleName = role ? role.name : 'user';

    const newAccessToken = this.authService.signAccessToken(user, roleName);
    const newRefreshToken = this.authService.signRefreshToken(user.id);

    user.setRefreshToken(newRefreshToken);
    await this.userRepo.save(user);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
