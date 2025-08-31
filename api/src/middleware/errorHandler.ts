import type { Request, Response, NextFunction } from 'express';
import { ErrorResonse } from '../types';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error: ', error);

  const errorResonse: ErrorResonse = {
    error: error.name || 'Internal Server Errror',
    message: error.message || 'An unexpected error occurred',
    statusCode: 500
  };

  res.status(errorResonse.statusCode).json(errorResonse);
};
