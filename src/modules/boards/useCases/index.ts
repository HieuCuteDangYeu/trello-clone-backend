import { GetAllBoardsSystemController } from '@modules/boards/useCases/getAllBoardsSystem/GetAllBoardsSystemController';
import { GetAllBoardsSystemUseCase } from '@modules/boards/useCases/getAllBoardsSystem/GetAllBoardsSystemUseCase';
import { MongoBoardRepo } from '../repos/mongoBoardRepo';
import { CreateBoardController } from './createBoard/CreateBoardController';
import { CreateBoardUseCase } from './createBoard/CreateBoardUseCase';
import { DeleteBoardController } from './deleteBoard/DeleteBoardController';
import { DeleteBoardUseCase } from './deleteBoard/DeleteBoardUseCase';
import { GetBoardByIdController } from './getBoardById/GetBoardByIdController';
import { GetBoardByIdUseCase } from './getBoardById/GetBoardByIdUseCase';
import { GetBoardsController } from './getBoards/GetBoardsController';
import { GetBoardsUseCase } from './getBoards/GetBoardsUseCase';
import { UpdateBoardController } from './updateBoard/UpdateBoardController';
import { UpdateBoardUseCase } from './updateBoard/UpdateBoardUseCase';

const mongoBoardRepo = new MongoBoardRepo();

const createBoardUseCase = new CreateBoardUseCase(mongoBoardRepo);
const createBoardController = new CreateBoardController(createBoardUseCase);

const getBoardsUseCase = new GetBoardsUseCase(mongoBoardRepo);
const getBoardsController = new GetBoardsController(getBoardsUseCase);

const getBoardByIdUseCase = new GetBoardByIdUseCase(mongoBoardRepo);
const getBoardByIdController = new GetBoardByIdController(getBoardByIdUseCase);

const updateBoardUseCase = new UpdateBoardUseCase(mongoBoardRepo);
const updateBoardController = new UpdateBoardController(updateBoardUseCase);

const deleteBoardUseCase = new DeleteBoardUseCase(mongoBoardRepo);
const deleteBoardController = new DeleteBoardController(deleteBoardUseCase);

const getAllBoardsSystemUseCase = new GetAllBoardsSystemUseCase(mongoBoardRepo);
const getAllBoardsSystemController = new GetAllBoardsSystemController(
  getAllBoardsSystemUseCase,
);

export {
  createBoardController,
  deleteBoardController,
  getAllBoardsSystemController,
  getBoardByIdController,
  getBoardsController,
  mongoBoardRepo,
  updateBoardController,
};
