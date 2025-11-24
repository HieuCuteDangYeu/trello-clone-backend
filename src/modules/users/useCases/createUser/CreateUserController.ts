import { UserMap } from '@modules/users/mappers/userMap';
import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/infra/http/BaseController';
import { CreateUserDTO } from './CreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;

  constructor(useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    try {
      const dto: CreateUserDTO = req.body as CreateUserDTO;

      if (!dto.email || !dto.password || !dto.username) {
        return this.clientError(res, 'Missing required fields');
      }

      const user = await this.useCase.execute(dto);

      return this.created(res, UserMap.toPersistence(user));
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('already associated')) {
          return this.conflict(res, err.message);
        }
        return this.fail(res, err);
      }

      return this.fail(res, 'An unexpected error occurred');
    }
  }
}
