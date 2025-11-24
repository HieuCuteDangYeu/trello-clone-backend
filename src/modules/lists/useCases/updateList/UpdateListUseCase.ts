import { IUserContext } from '@shared/core/IUserContext';
import { IBoardRepo } from '../../../boards/repos/boardRepo';
import { List } from '../../domain/list';
import { IListRepo } from '../../repos/listRepo';
import { UpdateListDTO } from './UpdateListDTO';

export class UpdateListUseCase {
  constructor(
    private listRepo: IListRepo,
    private boardRepo: IBoardRepo,
  ) {}

  public async execute(
    listId: string,
    user: IUserContext,
    props: UpdateListDTO,
  ): Promise<List> {
    const list = await this.listRepo.getListById(listId);
    if (!list) throw new Error('List not found');

    const board = await this.boardRepo.getBoardById(list.boardId);
    if (!board) throw new Error('Board not found');

    const hasPermission =
      board.ownerId === user.userId ||
      board.memberIds.includes(user.userId) ||
      user.role === 'admin';

    if (!hasPermission) {
      throw new Error('You do not have permission to edit this list');
    }

    if (props.title) {
      list.updateTitle(props.title);
    }

    if (props.position !== undefined) {
      list.move(props.position);
    }

    await this.listRepo.save(list);

    return list;
  }
}
