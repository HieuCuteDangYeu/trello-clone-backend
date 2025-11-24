import { BaseController } from '@shared/infra/http/BaseController';
import { Request, Response } from 'express';
import { BoardMap } from '../../mappers/boardMap';
import { GetBoardByIdUseCase } from './GetBoardByIdUseCase';

export class GetBoardByIdController extends BaseController {
  constructor(private useCase: GetBoardByIdUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const { id } = req.params;
      const board = await this.useCase.execute(id, req.user!);

      return this.ok(res, BoardMap.toPersistence(board));
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes('permission')) {
        return this.forbidden(res, err.message);
      }
      if (err instanceof Error && err.message === 'Board not found') {
        return this.notFound(res, err.message);
      }
      return this.fail(res, err as Error);
    }
  }
}
