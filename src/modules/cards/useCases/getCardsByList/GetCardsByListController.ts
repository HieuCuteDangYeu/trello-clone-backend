import { BaseController } from '@shared/infra/http/BaseController';
import { Request, Response } from 'express';
import { CardMap } from '../../mappers/cardMap';
import { GetCardsByListUseCase } from './GetCardsByListUseCase';

export class GetCardsByListController extends BaseController {
  constructor(private useCase: GetCardsByListUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const { listId } = req.params;
      const cards = await this.useCase.execute(listId, req.user!);

      return this.ok(
        res,
        cards.map((c) => CardMap.toPersistence(c)),
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === 'List not found')
          return this.notFound(res, err.message);
        if (err.message.includes('permission'))
          return this.forbidden(res, err.message);
      }
      return this.fail(res, err as Error);
    }
  }
}
