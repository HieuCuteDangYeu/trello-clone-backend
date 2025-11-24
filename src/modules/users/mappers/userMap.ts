import { User } from '../domain/user';

interface IUserPersistence {
  _id: string;
  email: string;
  username: string;
  password: string;
  isEmailVerified: boolean;
  emailVerificationToken?: string | null;
  refreshToken?: string | null;
  roleId: string;
  createdAt: Date;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
}

export class UserMap {
  public static toPersistence(user: User): IUserPersistence {
    return {
      _id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      isEmailVerified: user.isEmailVerified,
      roleId: user.roleId,
      emailVerificationToken: user.emailVerificationToken,
      refreshToken: user.refreshToken,
      createdAt: user.props.createdAt,
      passwordResetToken: user.passwordResetToken,
      passwordResetExpires: user.passwordResetExpires,
    };
  }

  public static toDomain(raw: IUserPersistence): User {
    const user = User.reconstitute(
      {
        email: raw.email,
        username: raw.username,
        password: raw.password,
        isEmailVerified: raw.isEmailVerified,
        emailVerificationToken: raw.emailVerificationToken || undefined,
        refreshToken: raw.refreshToken || undefined,
        roleId: raw.roleId,
        createdAt: raw.createdAt,
        passwordResetToken: raw.passwordResetToken || undefined,
        passwordResetExpires: raw.passwordResetExpires || undefined,
      },
      raw._id,
    );

    return user;
  }
}
