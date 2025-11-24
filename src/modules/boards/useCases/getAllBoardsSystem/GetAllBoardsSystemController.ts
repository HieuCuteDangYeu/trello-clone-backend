import { BaseController } from '@shared/infra/http/BaseController';
import { Request, Response } from 'express';
import { BoardMap } from '../../mappers/boardMap';
import { getAllBoardsSystemSchema } from './GetAllBoardsSystemDTO';
import { GetAllBoardsSystemUseCase } from './GetAllBoardsSystemUseCase';

export class GetAllBoardsSystemController extends BaseController {
  constructor(private useCase: GetAllBoardsSystemUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const result = getAllBoardsSystemSchema.safeParse(req.query);

      if (!result.success) {
        return this.clientError(res, 'Invalid pagination parameters');
      }

      const { page, limit } = result.data;

      const dataResult = await this.useCase.execute({ page, limit });

      return this.ok(res, {
        data: dataResult.data.map((b) => BoardMap.toPersistence(b)),
        meta: {
          total: dataResult.total,
          page,
          limit,
          totalPages: Math.ceil(dataResult.total / limit),
        },
      });
    } catch (err: unknown) {
      return this.fail(res, err as Error);
    }
  }
}
