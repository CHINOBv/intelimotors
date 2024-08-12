import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import { AppDataSource } from '../../config/dataSource';

@injectable()
export class UserRepositoryImpl implements UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async findById(id: string): Promise<User | null> {
        return this.repository.findOne({
            where: { id },
            relations: ["ads"]
        });
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.repository.findOne({
            where: { username },
            relations: ["ads"]
        });
    }

    async findAll(): Promise<User[]> {
        return this.repository.find({ relations: ["ads"] });
    }

    async save(user: User): Promise<void> {
        await this.repository.save(user);
    }
}
