import { List } from '../domain/list';

export interface IListPersistence {
  _id: string;
  title: string;
  boardId: string;
  position: number;
  createdAt: Date;
}

export class ListMap {
  public static toPersistence(list: List): IListPersistence {
    return {
      _id: list.id,
      title: list.title,
      boardId: list.boardId,
      position: list.position,
      createdAt: list.createdAt,
    };
  }

  public static toDomain(raw: IListPersistence): List {
    return List.create(
      {
        title: raw.title,
        boardId: raw.boardId,
        position: raw.position,
      },
      raw._id,
    );
  }
}
