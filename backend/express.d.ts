import { User } from './src/auth/domain/User';

declare module 'express-serve-static-core' {
    interface Request {
        user?: { userId: string };
    }
}
