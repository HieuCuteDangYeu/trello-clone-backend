import { mongoBoardRepo } from '@modules/boards/useCases';
import { mongoCardRepo } from '@modules/cards/useCases';
import { MongoListRepo } from '@modules/lists/repos/mongoListRepo';
import { CreateListController } from '@modules/lists/useCases/createList/CreateListController';
import { CreateListUseCase } from '@modules/lists/useCases/createList/CreateListUseCase';
import { DeleteListController } from '@modules/lists/useCases/deleteList/DeleteListController';
import { DeleteListUseCase } from '@modules/lists/useCases/deleteList/DeleteListUseCase';
import { GetListsByBoardController } from '@modules/lists/useCases/getListsByBoard/GetListsByBoardController';
import { GetListsByBoardUseCase } from '@modules/lists/useCases/getListsByBoard/GetListsByBoardUseCase';
import { UpdateListController } from '@modules/lists/useCases/updateList/UpdateListController';
import { UpdateListUseCase } from '@modules/lists/useCases/updateList/UpdateListUseCase';

export const mongoListRepo = new MongoListRepo();

const createListUseCase = new CreateListUseCase(mongoListRepo, mongoBoardRepo);
const createListController = new CreateListController(createListUseCase);

const getListsByBoardUseCase = new GetListsByBoardUseCase(
  mongoListRepo,
  mongoBoardRepo,
);
const getListsByBoardController = new GetListsByBoardController(
  getListsByBoardUseCase,
);

const updateListUseCase = new UpdateListUseCase(mongoListRepo, mongoBoardRepo);
const updateListController = new UpdateListController(updateListUseCase);

const deleteListUseCase = new DeleteListUseCase(
  mongoListRepo,
  mongoBoardRepo,
  mongoCardRepo,
);
const deleteListController = new DeleteListController(deleteListUseCase);

export {
  createListController,
  deleteListController,
  getListsByBoardController,
  updateListController,
};
