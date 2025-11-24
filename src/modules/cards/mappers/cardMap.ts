import { Card } from '../domain/card';

export interface ICardPersistence {
  _id: string;
  title: string;
  description?: string | null;
  listId: string;
  boardId: string;
  position: number;
  memberIds: string[];
  createdAt: Date;
}

export class CardMap {
  public static toPersistence(card: Card): ICardPersistence {
    return {
      _id: card.id,
      title: card.title,
      description: card.description,
      listId: card.listId,
      boardId: card.boardId,
      position: card.position,
      memberIds: card.memberIds,
      createdAt: card.createdAt,
    };
  }

  public static toDomain(raw: ICardPersistence): Card {
    return Card.create(
      {
        title: raw.title,
        description: raw.description || undefined,
        listId: raw.listId,
        boardId: raw.boardId,
        position: raw.position,
      },
      raw._id,
    );
  }
}
