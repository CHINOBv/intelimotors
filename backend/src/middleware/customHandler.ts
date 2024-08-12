import { Request, Response, NextFunction } from 'express';

function customErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).reduce((acc: any, key) => {
            acc[key] = err.errors[key].message;
            return acc;
        }, {});

        return res.status(400).json(errors);
    }

    res.status(err.status || 500).json({
        message: err.message || 'An unexpected error occurred',
    });
}

export default customErrorHandler;
