import { BaseController } from '@shared/infra/http/BaseController';
import { validateZod } from '@shared/infra/http/utils/validateZod';
import { Request, Response } from 'express';
import { ListMap } from '../../mappers/listMap';
import { UpdateListDTO, updateListSchema } from './UpdateListDTO';
import { UpdateListUseCase } from './UpdateListUseCase';

export class UpdateListController extends BaseController {
  constructor(private useCase: UpdateListUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const { id } = req.params;
      const error = validateZod(updateListSchema, req.body);
      if (error) return this.clientError(res, error);

      const dto = req.body as UpdateListDTO;
      const list = await this.useCase.execute(id, req.user!, dto);

      return this.ok(res, ListMap.toPersistence(list));
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes('permission')) {
        return this.forbidden(res, err.message);
      }
      return this.fail(res, err as Error);
    }
  }
}
