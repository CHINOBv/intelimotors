import { Ad } from './entity/Ad';

export interface AdRepository {
    findById(id: string): Promise<Ad | null>;
    findByUserId(userId: string): Promise<Ad[]>;
    save(ad: Ad): Promise<void>;
}
