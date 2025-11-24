import { ensureAdmin } from '@modules/auth/infra/http/middleware/ensureAdmin';
import { ensureAuthenticated } from '@modules/auth/infra/http/middleware/ensureAuthenticated';
import express from 'express';
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  updateUserController,
} from '../../../useCases';

const userRouter = express.Router();

userRouter.use(ensureAuthenticated, ensureAdmin);

userRouter.post('/', (req, res) => createUserController.execute(req, res));
userRouter.get('/', (req, res) => getAllUsersController.execute(req, res));
userRouter.delete('/:id', (req, res) => deleteUserController.execute(req, res));
userRouter.patch('/:id', (req, res) => updateUserController.execute(req, res));

export { userRouter };
