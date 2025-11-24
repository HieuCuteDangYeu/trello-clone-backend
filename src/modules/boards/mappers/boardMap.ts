import { Board } from '../domain/board';

export interface IBoardPersistence {
  _id: string;
  title: string;
  description?: string | null;
  ownerId: string;
  isPrivate: boolean;
  memberIds: string[];
  createdAt: Date;
}

export class BoardMap {
  public static toPersistence(board: Board): IBoardPersistence {
    return {
      _id: board.id,
      title: board.title,
      description: board.description,
      ownerId: board.ownerId,
      isPrivate: board.isPrivate,
      memberIds: board.memberIds,
      createdAt: board.createdAt,
    };
  }

  public static toDomain(raw: IBoardPersistence): Board {
    return Board.create(
      {
        title: raw.title,
        description: raw.description || undefined,
        ownerId: raw.ownerId,
        isPrivate: raw.isPrivate,
      },
      raw._id,
    );
  }
}
