import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import env from "../config/env";

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
    };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }

    try {
        const decoded = jwt.verify(token, env.auth.jwtSecret);
        req.user = decoded as { userId: string };
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid token', error: error});
    }
};
