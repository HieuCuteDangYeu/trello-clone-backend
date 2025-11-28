import { MongoRoleRepo } from '../../auth/repos/mongoRoleRepo';
import { MongoUserRepo } from '../repos/mongoUserRepo';
import { CreateUserController } from './createUser/CreateUserController';
import { CreateUserUseCase } from './createUser/CreateUserUseCase';
import { DeleteUserController } from './deleteUser/DeleteUserController';
import { DeleteUserUseCase } from './deleteUser/DeleteUserUseCase';
import { GetAllUsersController } from './getAllUsers/GetAllUsersController';
import { GetAllUsersUseCase } from './getAllUsers/GetAllUsersUseCase';
import { UpdateUserController } from './updateUser/UpdateUserController';
import { UpdateUserUseCase } from './updateUser/UpdateUserUseCase';

export const mongoUserRepo = new MongoUserRepo();
const mongoRoleRepo = new MongoRoleRepo();

const createUserUseCase = new CreateUserUseCase(mongoUserRepo, mongoRoleRepo);
const createUserController = new CreateUserController(createUserUseCase);

const getAllUsersUseCase = new GetAllUsersUseCase(mongoUserRepo);
const getAllUsersController = new GetAllUsersController(
  getAllUsersUseCase,
  mongoRoleRepo,
);

const deleteUserUseCase = new DeleteUserUseCase(mongoUserRepo);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

const updateUserUseCase = new UpdateUserUseCase(mongoUserRepo);
const updateUserController = new UpdateUserController(updateUserUseCase);

export {
  createUserController,
  deleteUserController,
  getAllUsersController,
  updateUserController,
};
