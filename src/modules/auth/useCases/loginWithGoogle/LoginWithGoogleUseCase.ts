import { IUserRepo } from '@modules/users/repos/userRepos';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../users/domain/user';
import { Role } from '../../domain/role';
import { IRoleRepo } from '../../repos/roleRepo';
import { AuthService } from '../../services/authService';
import { GoogleAuthService } from '../../services/googleAuthService';
import { LoginWithGoogleDTO } from './LoginWithGoogleDTO';

export class LoginWithGoogleUseCase {
  constructor(
    private userRepo: IUserRepo,
    private roleRepo: IRoleRepo,
    private authService: AuthService,
    private googleAuthService: GoogleAuthService,
  ) {}

  public async execute(request: LoginWithGoogleDTO) {
    const googleUser = await this.googleAuthService.verifyIdToken(
      request.idToken,
    );

    let user = await this.userRepo.getUserByEmail(googleUser.email);

    if (!user) {
      let clientRole = await this.roleRepo.getRoleByName('user');
      if (!clientRole) {
        clientRole = Role.create({ name: 'user' });
        await this.roleRepo.save(clientRole);
      }

      const randomPassword = uuidv4() + uuidv4();
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = User.create({
        email: googleUser.email,
        username: googleUser.name.replace(/\s/g, ''),
        password: hashedPassword,
        roleId: clientRole.id,
      });

      user.verifyEmail();

      await this.userRepo.save(user);
    }

    const role = await this.roleRepo.getRoleById(user.roleId);
    const roleName = role ? role.name : 'user';

    const accessToken = this.authService.signAccessToken(user, roleName);
    const refreshToken = this.authService.signRefreshToken(user.id);

    user.setRefreshToken(refreshToken);
    await this.userRepo.save(user);

    return { accessToken, refreshToken };
  }
}
