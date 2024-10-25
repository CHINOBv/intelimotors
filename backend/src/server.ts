import 'reflect-metadata';
import express from 'express';
import {initializeDependencies} from './config/initializeDependencies';
import {setupSwagger} from "./config/swagger";
import path from "path";
import morgan from "morgan";
import cors from 'cors';
import customHandler from "./middleware/customHandler";

const app = express();
const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await initializeDependencies();

        const {authRouter} = await import('./modules/auth/presentation/authRouter');
        const {adsRouter} = await import('./modules/ads/presentation/adsRouter');

        app.use(cors({
            origin: '*',
            credentials: true,
        }))
        app.use(express.urlencoded({extended: true}));
        app.use(express.json());
        app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
        app.use(morgan('combined'));
        app.use('/auth', authRouter);
        app.use('/ads', adsRouter);

        setupSwagger(app);
        app.use(customHandler);

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize server', error);
    }
};

startServer();
