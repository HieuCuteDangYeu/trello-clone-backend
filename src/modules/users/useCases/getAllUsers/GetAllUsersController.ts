import { IRoleRepo } from '@modules/auth/repos/roleRepo';
import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/infra/http/BaseController';
import { UserMap } from '../../mappers/userMap';
import { getAllUsersQuerySchema } from './GetAllUsersDTO';
import { GetAllUsersUseCase } from './GetAllUsersUseCase';

export class GetAllUsersController extends BaseController {
  private useCase: GetAllUsersUseCase;
  private roleRepo: IRoleRepo;

  constructor(useCase: GetAllUsersUseCase, roleRepo: IRoleRepo) {
    super();
    this.useCase = useCase;
    this.roleRepo = roleRepo;
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

      const [userResult, roles] = await Promise.all([
        this.useCase.execute({ page, limit, searchTerm: q }),
        this.roleRepo.findAll(),
      ]);

      const roleMap = new Map(roles.map((r) => [r.id, r.name]));

      const usersDTO = userResult.data.map((user) => {
        const dto = UserMap.toPersistence(user);
        return {
          ...dto,
          role: roleMap.get(user.roleId),
        };
      });

      return this.ok(res, {
        data: usersDTO,
        meta: {
          page,
          limit,
          total: userResult.total,
          totalPages: userResult.totalPages,
        },
      });
    } catch (err: unknown) {
      return this.fail(res, err as Error);
    }
  }
}
