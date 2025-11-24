import { IUserContext } from '@shared/core/IUserContext';
import { IBoardRepo } from '../../../boards/repos/boardRepo';
import { ICardRepo } from '../../repos/cardRepo';

export class DeleteCardUseCase {
  constructor(
    private cardRepo: ICardRepo,
    private boardRepo: IBoardRepo,
  ) {}

  public async execute(cardId: string, user: IUserContext): Promise<void> {
    const card = await this.cardRepo.getCardById(cardId);
    if (!card) throw new Error('Card not found');

    const board = await this.boardRepo.getBoardById(card.boardId);
    if (!board) throw new Error('Board not found');

    const hasPermission =
      board.ownerId === user.userId ||
      board.memberIds.includes(user.userId) ||
      user.role === 'admin';

    if (!hasPermission) {
      throw new Error('You do not have permission to delete this card');
    }

    await this.cardRepo.delete(cardId);
  }
}
