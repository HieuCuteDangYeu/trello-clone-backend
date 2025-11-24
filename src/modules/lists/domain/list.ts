import { Entity } from '@shared/core/Entity';

interface ListProps {
  title: string;
  boardId: string;
  position: number;
  createdAt: Date;
}

export class List extends Entity<ListProps> {
  get title(): string {
    return this.props.title;
  }
  get boardId(): string {
    return this.props.boardId;
  }
  get position(): number {
    return this.props.position;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }

  private constructor(props: ListProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: {
      title: string;
      boardId: string;
      position: number;
    },
    id?: string,
  ): List {
    if (props.title.length < 1) {
      throw new Error('List title cannot be empty.');
    }

    return new List(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );
  }

  // Method to move the list (drag and drop)
  public move(newPosition: number): void {
    this.props.position = newPosition;
  }

  public updateTitle(newTitle: string): void {
    if (newTitle.length < 1) throw new Error('Title too short');
    this.props.title = newTitle;
  }
}
