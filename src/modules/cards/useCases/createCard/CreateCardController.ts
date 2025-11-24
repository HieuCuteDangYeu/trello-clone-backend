import { BaseController } from '@shared/infra/http/BaseController';
import { validateZod } from '@shared/infra/http/utils/validateZod';
import { Request, Response } from 'express';
import { CardMap } from '../../mappers/cardMap';
import { CreateCardDTO, createCardSchema } from './CreateCardDTO';
import { CreateCardUseCase } from './CreateCardUseCase';

export class CreateCardController extends BaseController {
  constructor(private useCase: CreateCardUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const error = validateZod(createCardSchema, req.body);
      if (error) return this.clientError(res, error);

      const dto = req.body as CreateCardDTO;
      const card = await this.useCase.execute(dto, req.user!);

      return this.created(res, CardMap.toPersistence(card));
    } catch (err: unknown) {
      return this.fail(res, err as Error);
    }
  }
}
