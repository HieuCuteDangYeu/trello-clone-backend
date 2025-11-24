import { User } from '../domain/user';

export interface UserSearchOptions {
  page: number;
  limit: number;
  searchTerm?: string;
}

export interface UserSearchResult {
  data: User[];
  total: number;
  totalPages: number;
}

export interface IUserRepo {
  exists(email: string): Promise<boolean>;
  save(user: User): Promise<void>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(userId: string): Promise<User | null>;
  getAllUsers(options: UserSearchOptions): Promise<UserSearchResult>;
  delete(userId: string): Promise<void>;
  getUserByVerificationToken(token: string): Promise<User | null>;
  getUserByPasswordResetToken(token: string): Promise<User | null>;
}
