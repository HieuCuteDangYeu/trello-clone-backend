import { BaseController } from '@shared/infra/http/BaseController';
import { validateZod } from '@shared/infra/http/utils/validateZod';
import { Request, Response } from 'express';
import { ListMap } from '../../mappers/listMap';
import { CreateListDTO, createListSchema } from './CreateListDTO';
import { CreateListUseCase } from './CreateListUseCase';

export class CreateListController extends BaseController {
  constructor(private useCase: CreateListUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const error = validateZod(createListSchema, req.body);
      if (error) return this.clientError(res, error);

      const dto = req.body as CreateListDTO;

      const list = await this.useCase.execute(dto, req.user!);

      return this.created(res, ListMap.toPersistence(list));
    } catch (err: unknown) {
      return this.fail(res, err as Error);
    }
  }
}
