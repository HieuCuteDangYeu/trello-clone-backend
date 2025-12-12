import { MongoBoardRepo } from '@modules/boards/repos/mongoBoardRepo';
import { DeleteCardController } from '@modules/cards/useCases/deleteCard/DeleteCardController';
import { DeleteCardUseCase } from '@modules/cards/useCases/deleteCard/DeleteCardUseCase';
import { GetCardsByListController } from '@modules/cards/useCases/getCardsByList/GetCardsByListController';
import { GetCardsByListUseCase } from '@modules/cards/useCases/getCardsByList/GetCardsByListUseCase';
import { UpdateCardController } from '@modules/cards/useCases/updateCard/UpdateCardController';
import { UpdateCardUseCase } from '@modules/cards/useCases/updateCard/UpdateCardUseCase';
import { MongoListRepo } from '@modules/lists/repos/mongoListRepo';
import { MongoCardRepo } from '../repos/mongoCardRepo';
import { CreateCardController } from './createCard/CreateCardController';
import { CreateCardUseCase } from './createCard/CreateCardUseCase';

export const mongoCardRepo = new MongoCardRepo();
const mongoListRepo = new MongoListRepo();
const mongoBoardRepo = new MongoBoardRepo();

const createCardUseCase = new CreateCardUseCase(mongoCardRepo, mongoBoardRepo);
const createCardController = new CreateCardController(createCardUseCase);

const getCardsByListUseCase = new GetCardsByListUseCase(
  mongoCardRepo,
  mongoListRepo,
  mongoBoardRepo,
);
const getCardsByListController = new GetCardsByListController(
  getCardsByListUseCase,
);

const updateCardUseCase = new UpdateCardUseCase(
  mongoCardRepo,
  mongoBoardRepo,
  mongoListRepo,
);
const updateCardController = new UpdateCardController(updateCardUseCase);

const deleteCardUseCase = new DeleteCardUseCase(mongoCardRepo, mongoBoardRepo);
const deleteCardController = new DeleteCardController(deleteCardUseCase);

export {
  createCardController,
  deleteCardController,
  getCardsByListController,
  updateCardController,
};
