import { ICardRepo } from '@modules/cards/repos/cardRepo';
import { IUserContext } from '@shared/core/IUserContext';
import { IBoardRepo } from '../../../boards/repos/boardRepo';
import { IListRepo } from '../../repos/listRepo';

export class DeleteListUseCase {
  constructor(
    private listRepo: IListRepo,
    private boardRepo: IBoardRepo,
    private cardRepo: ICardRepo,
  ) {}

  public async execute(listId: string, user: IUserContext): Promise<void> {
    const list = await this.listRepo.getListById(listId);
    if (!list) throw new Error('List not found');

    const board = await this.boardRepo.getBoardById(list.boardId);
    if (!board) throw new Error('Board not found');

    if (board.ownerId !== user.userId && user.role !== 'admin') {
      throw new Error('Only the board owner or admin can delete lists');
    }

    await this.cardRepo.deleteByListId(listId);

    await this.listRepo.delete(listId);
  }
}
