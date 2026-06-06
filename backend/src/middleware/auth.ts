import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, ApiResponse } from '../types/express';
import { AppError } from './errorHandler';
import { config } from '../config';

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('No token provided', 401);
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      userId: string;
      email: string;
      role: string;
    };
    
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role as 'ADMIN' | 'TEACHER' | 'STUDENT',
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('Not authenticated', 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError('Not authorized', 403);
    }

    next();
  };
};
