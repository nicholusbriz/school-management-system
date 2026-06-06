import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { asyncHandler, successResponse, errorResponse } from '../utils';
import prisma from '../config/database';
import { config } from '../config';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return errorResponse(res, 'Email is required', 400);
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: '7d' }
  );

  successResponse(res, { 
    token, 
    role: user.role.toLowerCase() as 'admin' | 'teacher' | 'student', 
    email: user.email, 
    name: user.name 
  }, 'Login successful');
});
