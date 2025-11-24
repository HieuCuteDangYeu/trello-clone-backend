import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/infra/http/BaseController';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

export class ResetPasswordController extends BaseController {
  constructor(private useCase: ResetPasswordUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return this.clientError(res, 'Token and new password required');
    }

    try {
      await this.useCase.execute({ token, newPassword });
      return this.ok(res, { message: 'Password has been reset successfully.' });
    } catch (err: unknown) {
      return this.clientError(res, (err as Error).message);
    }
  }
}
