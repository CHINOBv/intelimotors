import {IAdRepository} from '../domain/IAdRepository';
import {Ad} from '../domain/Ad';
import AdsAPI from './AdsAPI';
import {CreateAdRequest} from "@/modules/ads/domain/requests/CreateAdRequest";

export class AdRepositoryImpl implements IAdRepository {
    async createAd(data: CreateAdRequest): Promise<void> {
        const formData = new FormData();
        formData.append("price", data.price.toString());
        formData.append("description", data.description);
        data.images.forEach((image) => formData.append("images", image));

        await AdsAPI.post('/publicar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    async getAds(): Promise<Ad[]> {
        const response = await AdsAPI.get<Ad[]>('/user-ads');
        return response.data;
    }
}
