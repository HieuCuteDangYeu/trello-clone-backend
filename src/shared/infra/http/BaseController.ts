import { Request, Response } from 'express';

export abstract class BaseController {
  protected abstract executeImpl(
    req: Request,
    res: Response,
  ): Promise<void | Response>;

  public async execute(req: Request, res: Response): Promise<void> {
    try {
      await this.executeImpl(req, res);
    } catch (err: unknown) {
      console.log(err);
      this.fail(res, 'An unexpected error occurred');
    }
  }

  public ok<T>(res: Response, dto?: T) {
    if (dto) {
      res.type('application/json');
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created<T>(res: Response, dto?: T): Response {
    if (dto) {
      return res.status(201).json(dto);
    } else {
      return res.sendStatus(201);
    }
  }

  public clientError(res: Response, message?: string) {
    return res.status(400).json({ message: message ?? 'Bad Request' });
  }

  public unauthorized(res: Response, message?: string) {
    return res.status(401).json({ message: message ?? 'Unauthorized' });
  }

  public forbidden(res: Response, message?: string) {
    return res.status(403).json({ message: message ?? 'Forbidden' });
  }

  public notFound(res: Response, message?: string) {
    return res.status(404).json({ message: message ?? 'Not found' });
  }

  public conflict(res: Response, message?: string) {
    return res.status(409).json({ message: message ?? 'Conflict' });
  }

  public fail(res: Response, error: Error | string) {
    console.log(error);
    return res.status(500).json({
      message: error.toString(),
    });
  }
}
