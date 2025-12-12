import { ICardRepo } from '@modules/cards/repos/cardRepo';
import { IListRepo } from '@modules/lists/repos/listRepo';
import { IUserContext } from '@shared/core/IUserContext';
import { IBoardRepo } from '../../repos/boardRepo';

export class DeleteBoardUseCase {
  constructor(
    private boardRepo: IBoardRepo,
    private listRepo: IListRepo,
    private cardRepo: ICardRepo,
  ) {}

  public async execute(boardId: string, user: IUserContext): Promise<void> {
    const board = await this.boardRepo.getBoardById(boardId);
    if (!board) throw new Error('Board not found');

    if (board.ownerId !== user.userId && user.role !== 'admin') {
      throw new Error('Only the owner can delete this board');
    }

    await this.cardRepo.deleteByBoardId(boardId);

    await this.listRepo.deleteByBoardId(boardId);

    await this.boardRepo.delete(boardId);
  }
}
