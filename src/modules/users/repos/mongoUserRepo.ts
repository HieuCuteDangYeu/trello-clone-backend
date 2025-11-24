import {
  IUserRepo,
  UserSearchOptions,
  UserSearchResult,
} from '@modules/users/repos/userRepos';
import { User } from '../domain/user';
import { UserModel } from '../infra/userModel';
import { UserMap } from '../mappers/userMap';

type UserQueryFilter = {
  $or?: Array<
    | { email: { $regex: string; $options: string } }
    | { username: { $regex: string; $options: string } }
  >;
};

export class MongoUserRepo implements IUserRepo {
  async exists(email: string): Promise<boolean> {
    const user = await UserModel.findOne({ email });
    return !!user;
  }

  async save(user: User): Promise<void> {
    const rawUser = UserMap.toPersistence(user);

    await UserModel.findByIdAndUpdate(user.id, rawUser, {
      upsert: true,
      new: true,
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    return UserMap.toDomain(user);
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = await UserModel.findById(userId);
    if (!user) return null;
    return UserMap.toDomain(user);
  }

  async getAllUsers({
    page,
    limit,
    searchTerm,
  }: UserSearchOptions): Promise<UserSearchResult> {
    const skip = (page - 1) * limit;

    const query: UserQueryFilter = {};

    if (searchTerm) {
      query.$or = [
        { email: { $regex: searchTerm, $options: 'i' } },
        { username: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    const [users, total] = await Promise.all([
      UserModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      UserModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: users.map((u) => UserMap.toDomain(u)),
      total,
      totalPages,
    };
  }

  async delete(userId: string): Promise<void> {
    await UserModel.findByIdAndDelete(userId);
  }

  async getUserByVerificationToken(token: string): Promise<User | null> {
    const user = await UserModel.findOne({ emailVerificationToken: token });
    if (!user) return null;
    return UserMap.toDomain(user);
  }

  async getUserByPasswordResetToken(token: string): Promise<User | null> {
    const user = await UserModel.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) return null;
    return UserMap.toDomain(user);
  }
}
