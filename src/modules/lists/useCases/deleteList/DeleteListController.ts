import { BaseController } from '@shared/infra/http/BaseController';
import { Request, Response } from 'express';
import { DeleteListUseCase } from './DeleteListUseCase';

export class DeleteListController extends BaseController {
  constructor(private useCase: DeleteListUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const { id } = req.params;
      await this.useCase.execute(id, req.user!);

      return this.ok(res, { message: 'List deleted' });
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes('owner')) {
        return this.forbidden(res, err.message);
      }
      return this.fail(res, err as Error);
    }
  }
}
