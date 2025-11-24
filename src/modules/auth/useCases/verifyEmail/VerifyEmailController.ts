import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/infra/http/BaseController';
import { VerifyEmailUseCase } from './VerifyEmailUseCase';

export class VerifyEmailController extends BaseController {
  constructor(private useCase: VerifyEmailUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    const token = req.query.token as string;
    if (!token) return this.clientError(res, 'Token required');

    try {
      await this.useCase.execute(token);
      return this.ok(res, {
        message: 'Email verified successfully. You can now login.',
      });
    } catch {
      return this.clientError(res, 'Invalid verification token');
    }
  }
}
