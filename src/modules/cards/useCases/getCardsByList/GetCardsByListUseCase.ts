import { IUserContext } from '@shared/core/IUserContext';
import { IBoardRepo } from '../../../boards/repos/boardRepo';
import { IListRepo } from '../../../lists/repos/listRepo';
import { Card } from '../../domain/card';
import { ICardRepo } from '../../repos/cardRepo';

export class GetCardsByListUseCase {
  constructor(
    private cardRepo: ICardRepo,
    private listRepo: IListRepo,
    private boardRepo: IBoardRepo,
  ) {}

  public async execute(listId: string, user: IUserContext): Promise<Card[]> {
    const list = await this.listRepo.getListById(listId);
    if (!list) {
      throw new Error('List not found');
    }

    const board = await this.boardRepo.getBoardById(list.boardId);
    if (!board) {
      throw new Error('Board not found');
    }

    const hasAccess =
      board.ownerId === user.userId ||
      board.memberIds.includes(user.userId) ||
      user.role === 'admin' ||
      !board.isPrivate;

    if (!hasAccess) {
      throw new Error('You do not have permission to view cards in this list');
    }

    return await this.cardRepo.getCardsByListId(listId);
  }
}
