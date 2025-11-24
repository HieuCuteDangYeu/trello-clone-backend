import { IUserContext } from '@shared/core/IUserContext';
import { IBoardRepo } from '../../../boards/repos/boardRepo';
import { List } from '../../domain/list';
import { IListRepo } from '../../repos/listRepo';
import { CreateListDTO } from './CreateListDTO';

export class CreateListUseCase {
  constructor(
    private listRepo: IListRepo,
    private boardRepo: IBoardRepo,
  ) {}

  public async execute(
    props: CreateListDTO,
    user: IUserContext,
  ): Promise<List> {
    const board = await this.boardRepo.getBoardById(props.boardId);
    if (!board) throw new Error('Board not found');

    const isAdmin = user.role === 'admin';
    if (
      board.ownerId !== user.userId &&
      !board.memberIds.includes(user.userId) &&
      !isAdmin
    ) {
      throw new Error('Permission denied to add lists to this board');
    }

    // Calculate Position (Append to end)
    const currentMax = await this.listRepo.getMaxPosition(props.boardId);
    const newPosition = currentMax + 1024; // Spacing logic (like Jira/Trello)
    // Trello trick: Use large gaps (1024, 2048...) so you can insert items in between
    // without re-indexing everyone else.

    const list = List.create({
      title: props.title,
      boardId: props.boardId,
      position: newPosition,
    });

    await this.listRepo.save(list);

    return list;
  }
}
