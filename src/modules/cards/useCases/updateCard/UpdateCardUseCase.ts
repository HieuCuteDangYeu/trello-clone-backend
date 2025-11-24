import { IUserContext } from '@shared/core/IUserContext';
import { IBoardRepo } from '../../../boards/repos/boardRepo';
import { IListRepo } from '../../../lists/repos/listRepo';
import { Card } from '../../domain/card';
import { ICardRepo } from '../../repos/cardRepo';
import { UpdateCardDTO } from './UpdateCardDTO';

export class UpdateCardUseCase {
  constructor(
    private cardRepo: ICardRepo,
    private boardRepo: IBoardRepo,
    private listRepo: IListRepo,
  ) {}

  public async execute(
    cardId: string,
    user: IUserContext,
    props: UpdateCardDTO,
  ): Promise<Card> {
    const card = await this.cardRepo.getCardById(cardId);
    if (!card) throw new Error('Card not found');

    // Check Permissions (via Board)
    const board = await this.boardRepo.getBoardById(card.boardId);
    if (!board) throw new Error('Board not found');

    const hasPermission =
      board.ownerId === user.userId ||
      board.memberIds.includes(user.userId) ||
      user.role === 'admin';

    if (!hasPermission) {
      throw new Error('You do not have permission to edit this card');
    }

    // Handle Moving to a different List
    if (props.listId && props.listId !== card.listId) {
      const targetList = await this.listRepo.getListById(props.listId);
      if (!targetList) throw new Error('Target list not found');

      // Ensure target list belongs to the SAME board
      if (targetList.boardId !== card.boardId) {
        throw new Error('Cannot move card to a list on a different board');
      }
    }

    if (props.title || props.description !== undefined) {
      card.updateDetails({
        title: props.title,
        description: props.description,
      });
    }

    if (props.listId || props.position !== undefined) {
      const newListId = props.listId || card.listId;
      const newPosition =
        props.position !== undefined ? props.position : card.position;
      card.move(newListId, newPosition);
    }

    await this.cardRepo.save(card);

    return card;
  }
}
