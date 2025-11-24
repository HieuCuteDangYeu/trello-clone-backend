import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/infra/http/BaseController';
import { validateZod } from '../../../../shared/infra/http/utils/validateZod';
import { RegisterDTO, registerSchema } from './RegisterDTO';
import { RegisterUseCase } from './RegisterUseCase';

interface TokenResponse {
  accessToken: string;
}

export class RegisterController extends BaseController {
  private useCase: RegisterUseCase;

  constructor(useCase: RegisterUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const error = validateZod(registerSchema, req.body);
      if (error) return this.clientError(res, error);

      const dto = req.body as RegisterDTO;
      await this.useCase.execute(dto);

      return this.ok(res, {
        message:
          'User created. Please check your email to verify your account.',
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes('already associated')) {
        return this.conflict(res, err.message);
      }
      return this.fail(res, err as Error);
    }
  }

  public createdToken(res: Response, token: TokenResponse) {
    return res.status(201).json(token);
  }
}
