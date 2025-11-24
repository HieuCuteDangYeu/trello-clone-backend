import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/infra/http/BaseController';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

export class RefreshTokenController extends BaseController {
  constructor(private useCase: RefreshTokenUseCase) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    const { refreshToken } = req.body;
    if (!refreshToken) return this.clientError(res, 'Refresh Token required');

    try {
      const result = await this.useCase.execute(refreshToken);
      return this.ok(res, result);
    } catch {
      return this.unauthorized(res, 'Invalid or expired refresh token');
    }
  }
}
