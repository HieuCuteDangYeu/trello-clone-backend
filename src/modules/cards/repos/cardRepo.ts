import { Card } from '../domain/card';

export interface ICardRepo {
  save(card: Card): Promise<void>;
  getCardsByListId(listId: string): Promise<Card[]>;
  getMaxPosition(listId: string): Promise<number>;
  getCardById(cardId: string): Promise<Card | null>;
  delete(cardId: string): Promise<void>;
  deleteByListId(listId: string): Promise<void>;
  deleteByBoardId(boardId: string): Promise<void>;
}
