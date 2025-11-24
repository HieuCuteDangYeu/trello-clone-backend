import { BaseController } from '@shared/infra/http/BaseController';
import { Request, Response } from 'express';
import { DeleteCardUseCase } from './DeleteCardUseCase';

export class DeleteCardController extends BaseController {
  constructor(private useCase: DeleteCardUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const { id } = req.params;
      await this.useCase.execute(id, req.user!);

      return this.ok(res, { message: 'Card deleted' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('permission'))
          return this.forbidden(res, err.message);
        if (err.message === 'Card not found')
          return this.notFound(res, err.message);
      }
      return this.fail(res, err as Error);
    }
  }
}
