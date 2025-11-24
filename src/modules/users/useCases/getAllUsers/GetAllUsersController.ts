import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/infra/http/BaseController';
import { UserMap } from '../../mappers/userMap';
import { getAllUsersQuerySchema } from './GetAllUsersDTO';
import { GetAllUsersUseCase } from './GetAllUsersUseCase';

export class GetAllUsersController extends BaseController {
  private useCase: GetAllUsersUseCase;

  constructor(useCase: GetAllUsersUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const validation = getAllUsersQuerySchema.safeParse(req.query);

      if (!validation.success) {
        return this.clientError(res, 'Invalid pagination params');
      }

      const { page, limit, q } = validation.data;

      const result = await this.useCase.execute({
        page,
        limit,
        searchTerm: q,
      });

      const usersDTO = result.data.map((user) => UserMap.toPersistence(user));

      return this.ok(res, {
        data: usersDTO,
        meta: {
          page,
          limit,
          total: result.total,
          totalPages: result.totalPages,
        },
      });
    } catch (err: unknown) {
      return this.fail(res, err as Error);
    }
  }
}
