import { UserMap } from '@modules/users/mappers/userMap';
import { Request, Response } from 'express';
import { BaseController } from '../../../../shared/infra/http/BaseController';
import { UpdateUserDTO } from './UpdateUserDTO';
import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController extends BaseController {
  private useCase: UpdateUserUseCase;

  constructor(useCase: UpdateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response> {
    const { id } = req.params;
    const { username, email } = req.body;

    const dto: UpdateUserDTO = {
      userId: id,
      username,
      email,
    };

    try {
      const updatedUser = await this.useCase.execute(dto);
      return this.ok(res, UserMap.toPersistence(updatedUser));
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === 'User not found')
          return this.notFound(res, err.message);
        if (err.message === 'Email already in use')
          return this.conflict(res, err.message);
      }
      return this.fail(res, err as Error);
    }
  }
}
