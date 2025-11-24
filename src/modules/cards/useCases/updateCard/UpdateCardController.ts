import { BaseController } from '@shared/infra/http/BaseController';
import { validateZod } from '@shared/infra/http/utils/validateZod';
import { Request, Response } from 'express';
import { CardMap } from '../../mappers/cardMap';
import { UpdateCardDTO, updateCardSchema } from './UpdateCardDTO';
import { UpdateCardUseCase } from './UpdateCardUseCase';

export class UpdateCardController extends BaseController {
  constructor(private useCase: UpdateCardUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const { id } = req.params;
      const error = validateZod(updateCardSchema, req.body);
      if (error) return this.clientError(res, error);

      const dto = req.body as UpdateCardDTO;

      const card = await this.useCase.execute(id, req.user!, dto);

      return this.ok(res, CardMap.toPersistence(card));
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes('permission')) {
        return this.forbidden(res, err.message);
      }
      return this.fail(res, err as Error);
    }
  }
}
