import { Response } from 'express';
import { ApiResponse } from '../types/express';

export const successResponse = <T>(res: Response, data: T, message?: string, statusCode: number = 200): void => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
  };
  res.status(statusCode).json(response);
};

export const errorResponse = (res: Response, error: string, statusCode: number = 400): void => {
  const response: ApiResponse = {
    success: false,
    error,
  };
  res.status(statusCode).json(response);
};
