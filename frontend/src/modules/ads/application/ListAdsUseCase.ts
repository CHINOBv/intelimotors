import { IAdRepository } from '../domain/IAdRepository';
import { Ad } from '../domain/Ad';

export class ListAdsUseCase {
    constructor(private adRepository: IAdRepository) {}

    async execute(): Promise<Ad[]> {
        return await this.adRepository.getAds();
    }
}
