import { Entity } from '@shared/core/Entity';

interface BoardProps {
  title: string;
  description?: string;
  ownerId: string;
  isPrivate: boolean;
  memberIds: string[];
  createdAt: Date;
}

export class Board extends Entity<BoardProps> {
  get title(): string {
    return this.props.title;
  }
  get description(): string | undefined {
    return this.props.description;
  }
  get ownerId(): string {
    return this.props.ownerId;
  }
  get isPrivate(): boolean {
    return this.props.isPrivate;
  }
  get memberIds(): string[] {
    return this.props.memberIds;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }

  private constructor(props: BoardProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: {
      title: string;
      description?: string;
      ownerId: string;
      isPrivate?: boolean;
    },
    id?: string,
  ): Board {
    if (props.title.length < 3) {
      throw new Error('Board title must be at least 3 characters.');
    }

    const board = new Board(
      {
        ...props,
        isPrivate: props.isPrivate ?? true,
        memberIds: [props.ownerId],
        createdAt: new Date(),
      },
      id,
    );

    return board;
  }

  public update(props: {
    title?: string;
    description?: string;
    isPrivate?: boolean;
  }): void {
    if (props.title) {
      if (props.title.length < 3)
        throw new Error('Title must be at least 3 chars');
      this.props.title = props.title;
    }

    if (props.description !== undefined) {
      this.props.description = props.description;
    }

    if (props.isPrivate !== undefined) {
      this.props.isPrivate = props.isPrivate;
    }
  }
}
