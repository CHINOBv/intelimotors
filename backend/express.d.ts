import { User } from './src/modules/auth/domain/User';

declare module 'express-serve-static-core' {
    interface Request {
        user?: { userId: string };
    }
}
