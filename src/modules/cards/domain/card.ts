import { Entity } from '@shared/core/Entity';

interface CardProps {
  title: string;
  description?: string;
  listId: string;
  boardId: string; // Denormalized for permission checks
  position: number;
  memberIds: string[];
  createdAt: Date;
}

export class Card extends Entity<CardProps> {
  get title(): string {
    return this.props.title;
  }
  get description(): string | undefined {
    return this.props.description;
  }
  get listId(): string {
    return this.props.listId;
  }
  get boardId(): string {
    return this.props.boardId;
  }
  get position(): number {
    return this.props.position;
  }
  get memberIds(): string[] {
    return this.props.memberIds;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }

  private constructor(props: CardProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: {
      title: string;
      listId: string;
      boardId: string;
      position: number;
      description?: string;
    },
    id?: string,
  ): Card {
    if (props.title.length < 1) {
      throw new Error('Card title cannot be empty.');
    }

    return new Card(
      {
        ...props,
        memberIds: [],
        createdAt: new Date(),
      },
      id,
    );
  }

  public move(newListId: string, newPosition: number): void {
    this.props.listId = newListId;
    this.props.position = newPosition;
  }

  public updateDetails(props: { title?: string; description?: string }): void {
    if (props.title) this.props.title = props.title;
    if (props.description !== undefined)
      this.props.description = props.description;
  }
}
