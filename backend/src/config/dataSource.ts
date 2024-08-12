import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../auth/domain/User';
import { Ad } from '../ads/domain/entity/Ad';
import {Image} from "../ads/domain/entity/Image";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: true,
    entities: [User, Ad, Image],
    migrations: [],
    subscribers: [],
});
