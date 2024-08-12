import {IAdRepository} from "@/modules/ads/domain/IAdRepository";
import {CreateAdRequest} from "@/modules/ads/domain/requests/CreateAdRequest";

export class CreateAdUseCase {
    constructor(private adRepository: IAdRepository) {}

    async execute(data: CreateAdRequest): Promise<void> {
        return await this.adRepository.createAd(data);
    }
}
