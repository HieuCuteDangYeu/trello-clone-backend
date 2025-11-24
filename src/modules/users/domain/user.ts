import { Entity } from '@shared/core/Entity';

interface UserProps {
  email: string;
  username: string;
  password: string;
  isEmailVerified: boolean;
  roleId: string;
  createdAt: Date;
  lastLogin?: Date;
  refreshToken?: string;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  get email(): string {
    return this.props.email;
  }
  get username(): string {
    return this.props.username;
  }
  get password(): string {
    return this.props.password;
  }
  get roleId(): string {
    return this.props.roleId;
  }
  get isEmailVerified(): boolean {
    return this.props.isEmailVerified;
  }
  get refreshToken(): string | undefined {
    return this.props.refreshToken;
  }
  get emailVerificationToken(): string | undefined {
    return this.props.emailVerificationToken;
  }
  get passwordResetToken(): string | undefined {
    return this.props.passwordResetToken;
  }
  get passwordResetExpires(): Date | undefined {
    return this.props.passwordResetExpires;
  }

  public static create(
    props: {
      email: string;
      username: string;
      password: string;
      roleId: string;
    },
    id?: string,
  ): User {
    if (props.username.length < 3 || props.username.length > 20) {
      throw new Error('Username must be between 3 and 20 characters.');
    }

    return new User(
      {
        ...props,
        isEmailVerified: false,
        createdAt: new Date(),
      },
      id,
    );
  }

  public static reconstitute(props: UserProps, id: string): User {
    return new User(props, id);
  }

  public updateDetails(props: { username?: string; email?: string }): void {
    if (props.username) {
      if (props.username.length < 3 || props.username.length > 20) {
        throw new Error('Username must be between 3 and 20 characters.');
      }
      this.props.username = props.username;
    }

    if (props.email) {
      if (!props.email.includes('@')) {
        throw new Error('Invalid email address.');
      }
      this.props.email = props.email;
      this.props.isEmailVerified = false;
    }
  }

  public setRefreshToken(token: string): void {
    this.props.refreshToken = token;
  }

  public setEmailVerificationToken(token: string): void {
    this.props.emailVerificationToken = token;
  }

  public verifyEmail(): void {
    this.props.isEmailVerified = true;
    this.props.emailVerificationToken = undefined;
  }

  public setPasswordResetToken(
    token: string,
    expiresIn: number = 3600000,
  ): void {
    this.props.passwordResetToken = token;
    this.props.passwordResetExpires = new Date(Date.now() + expiresIn);
  }

  public changePassword(newPasswordHash: string): void {
    this.props.password = newPasswordHash;
    this.props.passwordResetToken = undefined;
    this.props.passwordResetExpires = undefined;
  }
}
