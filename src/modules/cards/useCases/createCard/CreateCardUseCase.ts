import { IUserContext } from '@shared/core/IUserContext';
import { IBoardRepo } from '../../../boards/repos/boardRepo';
import { Card } from '../../domain/card';
import { ICardRepo } from '../../repos/cardRepo';
import { CreateCardDTO } from './CreateCardDTO';

export class CreateCardUseCase {
  constructor(
    private cardRepo: ICardRepo,
    private boardRepo: IBoardRepo,
  ) {}

  public async execute(
    props: CreateCardDTO,
    user: IUserContext,
  ): Promise<Card> {
    // Check Board Access
    const board = await this.boardRepo.getBoardById(props.boardId);
    if (!board) throw new Error('Board not found');

    if (
      board.ownerId !== user.userId &&
      !board.memberIds.includes(user.userId) &&
      user.role !== 'admin'
    ) {
      throw new Error('Permission denied');
    }

    // Calculate Position
    const currentMax = await this.cardRepo.getMaxPosition(props.listId);
    const newPosition = currentMax + 1024;

    const card = Card.create({
      title: props.title,
      listId: props.listId,
      boardId: props.boardId,
      position: newPosition,
    });

    await this.cardRepo.save(card);

    return card;
  }
}
