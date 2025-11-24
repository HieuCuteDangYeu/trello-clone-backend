import { IUserContext } from '@shared/core/IUserContext';
import { Board } from '../../domain/board';
import { IBoardRepo } from '../../repos/boardRepo';
import { UpdateBoardDTO } from './UpdateBoardDTO';

export class UpdateBoardUseCase {
  constructor(private boardRepo: IBoardRepo) {}

  public async execute(
    boardId: string,
    user: IUserContext,
    props: UpdateBoardDTO,
  ): Promise<Board> {
    const board = await this.boardRepo.getBoardById(boardId);

    if (!board) throw new Error('Board not found');

    const isAdmin = user.role === 'admin';

    // Only Owner and Admin can update settings
    if (board.ownerId !== user.userId && !isAdmin) {
      throw new Error('Only the owner or admin can update this board');
    }

    board.update(props);

    await this.boardRepo.save(board);

    return board;
  }
}
