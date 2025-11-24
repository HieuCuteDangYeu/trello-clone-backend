import { User } from '@modules/users/domain/user';
import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../../../config';

export class AuthService {
  public signAccessToken(user: User, roleName: string): string {
    const payload = {
      userId: user.id,
      email: user.email,
      roleId: user.roleId,
      role: roleName,
    };

    const options: SignOptions = {
      expiresIn: config.jwtExpiresIn as SignOptions['expiresIn'],
    };

    return jwt.sign(payload, config.jwtSecret, options);
  }

  public signRefreshToken(userId: string): string {
    const payload = { userId };

    const options: SignOptions = {
      expiresIn: config.jwtRefreshExpiresIn as SignOptions['expiresIn'],
    };

    return jwt.sign(payload, config.jwtRefreshSecret, options);
  }

  public verifyRefreshToken(token: string): string {
    try {
      const decoded = jwt.verify(token, config.jwtRefreshSecret) as {
        userId: string;
      };
      return decoded.userId;
    } catch {
      throw new Error('Invalid refresh token');
    }
  }
}
