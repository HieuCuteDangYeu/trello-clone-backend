import { IUserContext } from '@shared/core/IUserContext';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../../../../config';

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Token format is invalid' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as IUserContext;

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      roleId: decoded.roleId,
      role: decoded.role,
    };

    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
