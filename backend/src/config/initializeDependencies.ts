import 'reflect-metadata';
import { container } from 'tsyringe';
import { AppDataSource } from './dataSource';

import { UserRepository } from '../modules/auth/domain/UserRepository';
import { UserRepositoryImpl } from '../modules/auth/infrastructure/UserRepositoryImpl';
import { AdRepository } from '../modules/ads/domain/AdRepository';
import { AdRepositoryImpl } from '../modules/ads/infrastructure/AdRepositoryImpl';

export const initializeDependencies = async () => {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    container.register<UserRepository>('UserRepository', UserRepositoryImpl);
    container.register<AdRepository>('AdRepository', AdRepositoryImpl);
};
