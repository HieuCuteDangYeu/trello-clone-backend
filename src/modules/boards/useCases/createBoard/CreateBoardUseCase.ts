import { Board } from '../../domain/board';
import { IBoardRepo } from '../../repos/boardRepo';
import { CreateBoardDTO } from './CreateBoardDTO';

export class CreateBoardUseCase {
  constructor(private boardRepo: IBoardRepo) {}

  public async execute(props: CreateBoardDTO, userId: string): Promise<Board> {
    const board = Board.create({
      title: props.title,
      description: props.description,
      isPrivate: props.isPrivate,
      ownerId: userId,
    });

    await this.boardRepo.save(board);

    return board;
  }
}
