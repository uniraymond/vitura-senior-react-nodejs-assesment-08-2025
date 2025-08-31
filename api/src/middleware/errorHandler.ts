import type { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error: ', error);

  const errorResponse: ErrorResponse = {
    error: error.name || 'Internal Server Errror',
    message: error.message || 'An unexpected error occurred',
    statusCode: 500
  };

  res.status(errorResponse.statusCode).json(errorResponse);
};
