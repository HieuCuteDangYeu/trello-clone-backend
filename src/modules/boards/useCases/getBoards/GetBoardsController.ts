import { BaseController } from '@shared/infra/http/BaseController';
import { Request, Response } from 'express';
import { BoardMap } from '../../mappers/boardMap';
import { GetBoardsUseCase } from './GetBoardsUseCase';

export class GetBoardsController extends BaseController {
  constructor(private useCase: GetBoardsUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const userId = req.user!.userId;
      const boards = await this.useCase.execute(userId);
      const boardsDTO = boards.map((b) => BoardMap.toPersistence(b));

      return this.ok(res, boardsDTO);
    } catch (err: unknown) {
      return this.fail(res, err as Error);
    }
  }
}
