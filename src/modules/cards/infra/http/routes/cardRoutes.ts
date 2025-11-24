import express from 'express';
import { ensureAuthenticated } from '../../../../auth/infra/http/middleware/ensureAuthenticated';
import {
  createCardController,
  deleteCardController,
  getCardsByListController,
  updateCardController,
} from '../../../useCases';

const cardRouter = express.Router();

cardRouter.use(ensureAuthenticated);

cardRouter.post('/', (req, res) => createCardController.execute(req, res));
cardRouter.get('/list/:listId', (req, res) =>
  getCardsByListController.execute(req, res),
);
cardRouter.patch('/:id', (req, res) => updateCardController.execute(req, res));
cardRouter.delete('/:id', (req, res) => deleteCardController.execute(req, res));

export { cardRouter };
