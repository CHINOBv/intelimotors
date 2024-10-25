import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../modules/auth/domain/User';
import { Ad } from '../modules/ads/domain/entity/Ad';
import {Image} from "../modules/ads/domain/entity/Image";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: true,
    entities: [User, Ad, Image],
    migrations: [],
    subscribers: [],
});
