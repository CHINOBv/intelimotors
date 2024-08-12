import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { AdRepository } from '../domain/AdRepository';
import { Ad } from '../domain/entity/Ad';
import { AppDataSource } from '../../config/dataSource';

@injectable()
export class AdRepositoryImpl implements AdRepository {
    private repository: Repository<Ad>;

    constructor() {
        this.repository = AppDataSource.getRepository(Ad);
    }

    async findById(id: string): Promise<Ad | null> {
        return this.repository.findOne({
            where: { id },
            relations: ["user"]
        });
    }

    async findByUserId(userId: string): Promise<Ad[]> {
        return this.repository.find({
            where: { user: { id: userId } },
            relations: ["user", "images"]
        });
    }

    async save(ad: Ad): Promise<void> {
        await this.repository.save(ad);
    }
}
