import { IBoardRepo } from '../../repos/boardRepo';

export class DeleteBoardUseCase {
  constructor(private boardRepo: IBoardRepo) {}

  public async execute(boardId: string, userId: string): Promise<void> {
    const board = await this.boardRepo.getBoardById(boardId);
    if (!board) throw new Error('Board not found');

    if (board.ownerId !== userId) {
      throw new Error('Only the owner can delete this board');
    }

    await this.boardRepo.delete(boardId);
  }
}
