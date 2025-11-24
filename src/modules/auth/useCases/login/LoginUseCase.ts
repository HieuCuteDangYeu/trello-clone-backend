import { IRoleRepo } from '@modules/auth/repos/roleRepo';
import { AuthService } from '@modules/auth/services/authService';
import { LoginDTO } from '@modules/auth/useCases/login/LoginDTO';
import { IUserRepo } from '@modules/users/repos/userRepos';
import bcrypt from 'bcryptjs';

interface LoginResult {
  accessToken: string;
  refreshToken: string;
}

export class LoginUseCase {
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

  public async execute(request: LoginDTO): Promise<LoginResult> {
    const { email, password } = request;

    const user = await this.userRepo.getUserByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    if (!user.isEmailVerified) {
      throw new Error('Please verify your email address first.');
    }

    const role = await this.roleRepo.getRoleById(user.roleId);
    const roleName = role ? role.name : 'user';

    const accessToken = this.authService.signAccessToken(user, roleName);
    const refreshToken = this.authService.signRefreshToken(user.id);

    return { accessToken, refreshToken };
  }
}
