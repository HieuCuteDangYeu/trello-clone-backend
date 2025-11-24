import express from 'express';
import { ensureAuthenticated } from '../../../../auth/infra/http/middleware/ensureAuthenticated';
import {
  createListController,
  deleteListController,
  getListsByBoardController,
  updateListController,
} from '../../../useCases';

const listRouter = express.Router();

listRouter.use(ensureAuthenticated);

listRouter.post('/', (req, res) => createListController.execute(req, res));
listRouter.get('/board/:boardId', (req, res) =>
  getListsByBoardController.execute(req, res),
);
listRouter.patch('/:id', (req, res) => updateListController.execute(req, res));
listRouter.delete('/:id', (req, res) => deleteListController.execute(req, res));

export { listRouter };
