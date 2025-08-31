import type { Request, Response, NextFunction, RequestHandler } from 'express';

export const logHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    const { method, originalUrl } = req;

    res.on('finish', () => {
        const duration = Date.now() - start;
        const itemCount = (res.locals.itemCount as number) || 0;

        console.log(JSON.stringify({
            method,
            path: originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            itemCount,
            timeStamp: new Date().toISOString()
        }));
    });

    next();
}