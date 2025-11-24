import { IUserContext } from '@shared/core/IUserContext';
import { Board } from '../../domain/board';
import { IBoardRepo } from '../../repos/boardRepo';

export class GetBoardByIdUseCase {
  constructor(private boardRepo: IBoardRepo) {}

  public async execute(boardId: string, user: IUserContext): Promise<Board> {
    const board = await this.boardRepo.getBoardById(boardId);

    if (!board) {
      throw new Error('Board not found');
    }

    // Security Check: Is the user allowed to see this?
    const isOwner = board.ownerId === user.userId;
    const isMember = board.memberIds.includes(user.userId);
    const isPublic = !board.isPrivate;
    const isAdmin = user.role === 'admin';

    if (!isOwner && !isMember && !isPublic && !isAdmin) {
      throw new Error('You do not have permission to view this board');
    }

    return board;
  }
}
