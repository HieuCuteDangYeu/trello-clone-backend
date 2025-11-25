import { NextFunction, Request, Response } from 'express';

export const ensureSelfOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const isSelf = req.user.userId === req.params.id;
  const isAdmin = req.user.role === 'admin';

  if (isSelf || isAdmin) {
    return next();
  }

  return res
    .status(403)
    .json({ message: 'You can only update your own profile' });
};
