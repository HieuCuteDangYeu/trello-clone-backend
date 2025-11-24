import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/infra/http/BaseController';
import { DeleteUserUseCase } from './DeleteUserUseCase';

export class DeleteUserController extends BaseController {
  private useCase: DeleteUserUseCase;

  constructor(useCase: DeleteUserUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    const { id } = req.params;

    try {
      await this.useCase.execute({ userId: id });
      return this.ok(res, { message: 'User deleted successfully' });
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'User not found') {
        return this.notFound(res, err.message);
      }
      return this.fail(res, err as Error);
    }
  }
}
