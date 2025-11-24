import { BoardSearchResult, IBoardRepo } from '../../repos/boardRepo';

interface RequestDTO {
  page: number;
  limit: number;
}

export class GetAllBoardsSystemUseCase {
  constructor(private boardRepo: IBoardRepo) {}

  public async execute(req: RequestDTO): Promise<BoardSearchResult> {
    return await this.boardRepo.findAll(req.page, req.limit);
  }
}
