import { NextFunction, Request, Response } from 'express';

export const ensureAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  return next();
};
