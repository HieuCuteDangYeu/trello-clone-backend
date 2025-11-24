import { BaseController } from '@shared/infra/http/BaseController';
import { validateZod } from '@shared/infra/http/utils/validateZod';
import { Request, Response } from 'express';
import { BoardMap } from '../../mappers/boardMap';
import { CreateBoardDTO, createBoardSchema } from './CreateBoardDTO';
import { CreateBoardUseCase } from './CreateBoardUseCase';

export class CreateBoardController extends BaseController {
  constructor(private useCase: CreateBoardUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      if (!req.user || !req.user.userId) {
        return this.unauthorized(res, 'User not authenticated');
      }

      const error = validateZod(createBoardSchema, req.body);
      if (error) return this.clientError(res, error);

      const dto = req.body as CreateBoardDTO;
      const userId = req.user.userId;

      const board = await this.useCase.execute(dto, userId);

      return this.created(res, BoardMap.toPersistence(board));
    } catch (err: unknown) {
      return this.fail(res, err as Error);
    }
  }
}
