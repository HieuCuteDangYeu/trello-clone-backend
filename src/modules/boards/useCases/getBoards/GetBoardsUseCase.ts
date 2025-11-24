import { Board } from '../../domain/board';
import { IBoardRepo } from '../../repos/boardRepo';

export class GetBoardsUseCase {
  constructor(private boardRepo: IBoardRepo) {}

  public async execute(userId: string): Promise<Board[]> {
    return await this.boardRepo.getBoardsByOwnerId(userId);
  }
}
