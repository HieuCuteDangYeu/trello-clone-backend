import { UserMap } from '@modules/users/mappers/userMap';
import { BaseController } from '@shared/infra/http/BaseController';
import { Request, Response } from 'express';
import { GetMeUseCase } from './GetMeUseCase';

export class GetMeController extends BaseController {
  constructor(private useCase: GetMeUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const userId = req.user!.userId;
      const user = await this.useCase.execute(userId);

      return this.ok(res, {
        ...UserMap.toPersistence(user),
        role: req.user!.role,
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'User not found') {
        return this.notFound(res, err.message);
      }
      return this.fail(res, err as Error);
    }
  }
}
