import { ensureAdmin } from '@modules/auth/infra/http/middleware/ensureAdmin';
import { ensureAuthenticated } from '@modules/auth/infra/http/middleware/ensureAuthenticated';
import { ensureSelfOrAdmin } from '@modules/auth/infra/http/middleware/ensureSelfOrAdmin';
import express from 'express';
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  updateUserController,
} from '../../../useCases';

const userRouter = express.Router();

userRouter.use(ensureAuthenticated);

userRouter.post('/', ensureAdmin, (req, res) =>
  createUserController.execute(req, res),
);
userRouter.get('/', ensureAdmin, (req, res) =>
  getAllUsersController.execute(req, res),
);
userRouter.delete('/:id', ensureAdmin, (req, res) =>
  deleteUserController.execute(req, res),
);
userRouter.patch('/:id', ensureSelfOrAdmin, (req, res) =>
  updateUserController.execute(req, res),
);

export { userRouter };
