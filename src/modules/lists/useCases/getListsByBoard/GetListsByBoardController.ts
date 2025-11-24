import { BaseController } from '@shared/infra/http/BaseController';
import { Request, Response } from 'express';
import { ListMap } from '../../mappers/listMap';
import { GetListsByBoardUseCase } from './GetListsByBoardUseCase';

export class GetListsByBoardController extends BaseController {
  constructor(private useCase: GetListsByBoardUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const { boardId } = req.params;
      const lists = await this.useCase.execute(boardId, req.user!);
      const listsDTO = lists.map((list) => ListMap.toPersistence(list));

      return this.ok(res, listsDTO);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === 'Board not found')
          return this.notFound(res, err.message);
        if (err.message.includes('permission'))
          return this.forbidden(res, err.message);
      }
      return this.fail(res, err as Error);
    }
  }
}
