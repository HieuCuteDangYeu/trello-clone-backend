import {
  IUserRepo,
  UserSearchOptions,
  UserSearchResult,
} from '@modules/users/repos/userRepos';

export class GetAllUsersUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(options: UserSearchOptions): Promise<UserSearchResult> {
    return await this.userRepo.getAllUsers(options);
  }
}
