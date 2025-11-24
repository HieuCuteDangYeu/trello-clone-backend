import { validateZod } from '@shared/infra/http/utils/validateZod';
import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/infra/http/BaseController';
import { LoginDTO, loginSchema } from './LoginDTO';
import { LoginUseCase } from './LoginUseCase';

export class LoginController extends BaseController {
  private useCase: LoginUseCase;

  constructor(useCase: LoginUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const error = validateZod(loginSchema, req.body);
      if (error) {
        return this.clientError(res, error);
      }

      const dto = req.body as LoginDTO;
      const result = await this.useCase.execute(dto);

      return this.ok(res, result);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'Invalid email or password') {
        return this.unauthorized(res, err.message);
      }
      return this.fail(res, err as Error);
    }
  }
}
