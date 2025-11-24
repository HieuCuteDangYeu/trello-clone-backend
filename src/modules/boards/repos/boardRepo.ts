import { Board } from '../domain/board';

export interface BoardSearchResult {
  data: Board[];
  total: number;
}

export interface IBoardRepo {
  save(board: Board): Promise<void>;
  getBoardsByOwnerId(ownerId: string): Promise<Board[]>;
  getBoardById(boardId: string): Promise<Board | null>;
  delete(boardId: string): Promise<void>;
  findAll(page: number, limit: number): Promise<BoardSearchResult>;
}
