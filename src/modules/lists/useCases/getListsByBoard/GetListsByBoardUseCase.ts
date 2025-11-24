import { IUserContext } from '@shared/core/IUserContext';
import { IBoardRepo } from '../../../boards/repos/boardRepo';
import { List } from '../../domain/list';
import { IListRepo } from '../../repos/listRepo';

export class GetListsByBoardUseCase {
  constructor(
    private listRepo: IListRepo,
    private boardRepo: IBoardRepo,
  ) {}

  public async execute(boardId: string, user: IUserContext): Promise<List[]> {
    const board = await this.boardRepo.getBoardById(boardId);

    if (!board) {
      throw new Error('Board not found');
    }

    // Permission Check: Admin, Owner, Member, or Public Board
    const hasAccess =
      board.ownerId === user.userId ||
      board.memberIds.includes(user.userId) ||
      user.role === 'admin' ||
      !board.isPrivate;

    if (!hasAccess) {
      throw new Error('You do not have permission to view this board');
    }

    const lists = await this.listRepo.getListsByBoardId(boardId);

    return lists;
  }
}
