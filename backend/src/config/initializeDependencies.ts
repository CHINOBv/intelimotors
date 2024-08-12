import 'reflect-metadata';
import { container } from 'tsyringe';
import { AppDataSource } from './dataSource';

import { UserRepository } from '../auth/domain/UserRepository';
import { UserRepositoryImpl } from '../auth/infrastructure/UserRepositoryImpl';
import { AdRepository } from '../ads/domain/AdRepository';
import { AdRepositoryImpl } from '../ads/infrastructure/AdRepositoryImpl';

export const initializeDependencies = async () => {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    container.register<UserRepository>('UserRepository', UserRepositoryImpl);
    container.register<AdRepository>('AdRepository', AdRepositoryImpl);
};
