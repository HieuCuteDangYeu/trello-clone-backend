import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/infra/http/BaseController';
import { validateZod } from '../../../../shared/infra/http/utils/validateZod';
import {
  LoginWithGoogleDTO,
  loginWithGoogleSchema,
} from './LoginWithGoogleDTO';
import { LoginWithGoogleUseCase } from './LoginWithGoogleUseCase';

export class LoginWithGoogleController extends BaseController {
  constructor(private useCase: LoginWithGoogleUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const error = validateZod(loginWithGoogleSchema, req.body);
      if (error) return this.clientError(res, error);

      const dto = req.body as LoginWithGoogleDTO;
      const result = await this.useCase.execute(dto);

      return this.ok(res, result);
    } catch (err: unknown) {
      console.log(err);
      return this.fail(res, err as Error);
    }
  }
}
