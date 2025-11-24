import { BaseController } from '@shared/infra/http/BaseController';
import { validateZod } from '@shared/infra/http/utils/validateZod';
import { Request, Response } from 'express';
import { UpdateBoardDTO, updateBoardSchema } from './UpdateBoardDTO';
import { UpdateBoardUseCase } from './UpdateBoardUseCase';

export class UpdateBoardController extends BaseController {
  constructor(private useCase: UpdateBoardUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const { id } = req.params;

      const error = validateZod(updateBoardSchema, req.body);
      if (error) return this.clientError(res, error);

      const dto = req.body as UpdateBoardDTO;

      await this.useCase.execute(id, req.user!, dto);
      return this.ok(res, { message: 'Board updated' });
    } catch (err: unknown) {
      return this.fail(res, err as Error);
    }
  }
}
