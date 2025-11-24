import { Role } from '@modules/auth/domain/role';
import { IRoleRepo } from '@modules/auth/repos/roleRepo';
import { IUserRepo } from '@modules/users/repos/userRepos';
import bcrypt from 'bcryptjs';
import { User } from '../../domain/user';
import { CreateUserDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  private userRepo: IUserRepo;
  private roleRepo: IRoleRepo;

  constructor(userRepo: IUserRepo, roleRepo: IRoleRepo) {
    this.userRepo = userRepo;
    this.roleRepo = roleRepo;
  }

  public async execute(request: CreateUserDTO): Promise<User> {
    const { username, email, password } = request;

    const userAlreadyExists = await this.userRepo.exists(email);

    if (userAlreadyExists) {
      throw new Error(
        `The email ${email} is already associated with an account.`,
      );
    }

    let clientRole = await this.roleRepo.getRoleByName('user');

    if (!clientRole) {
      clientRole = Role.create({ name: 'user' });
      await this.roleRepo.save(clientRole);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userOrError = User.create({
      username,
      email,
      password: hashedPassword,
      roleId: clientRole.id,
    });

    await this.userRepo.save(userOrError);
    return userOrError;
  }
}
