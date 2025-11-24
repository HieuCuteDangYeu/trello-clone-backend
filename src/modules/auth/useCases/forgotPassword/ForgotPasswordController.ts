import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/infra/http/BaseController';
import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

export class ForgotPasswordController extends BaseController {
  constructor(private useCase: ForgotPasswordUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    const { email } = req.body;
    if (!email) return this.clientError(res, 'Email is required');

    try {
      await this.useCase.execute(email);
      return this.ok(res, {
        message: 'If that email exists, we sent a reset link.',
      });
    } catch (err: unknown) {
      return this.fail(res, err as Error);
    }
  }
}
