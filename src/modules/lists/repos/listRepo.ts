import { List } from '../domain/list';

export interface IListRepo {
  save(list: List): Promise<void>;
  getListsByBoardId(boardId: string): Promise<List[]>;
  getMaxPosition(boardId: string): Promise<number>;
  getListById(listId: string): Promise<List | null>;
  delete(listId: string): Promise<void>;
}
