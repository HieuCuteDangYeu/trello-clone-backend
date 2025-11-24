import { ensureAdmin } from '@modules/auth/infra/http/middleware/ensureAdmin';
import express from 'express';
import { ensureAuthenticated } from '../../../../auth/infra/http/middleware/ensureAuthenticated';
import {
  createBoardController,
  deleteBoardController,
  getAllBoardsSystemController,
  getBoardByIdController,
  getBoardsController,
  updateBoardController,
} from '../../../useCases';

const boardRouter = express.Router();

boardRouter.use(ensureAuthenticated);

boardRouter.post('/', (req, res) => createBoardController.execute(req, res));
boardRouter.get('/', (req, res) => getBoardsController.execute(req, res));
boardRouter.get('/admin/all', ensureAdmin, (req, res) =>
  getAllBoardsSystemController.execute(req, res),
);
boardRouter.get('/:id', (req, res) => getBoardByIdController.execute(req, res));
boardRouter.patch('/:id', (req, res) =>
  updateBoardController.execute(req, res),
);
boardRouter.delete('/:id', (req, res) =>
  deleteBoardController.execute(req, res),
);

export { boardRouter };
