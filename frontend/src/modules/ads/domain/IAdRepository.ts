import {Ad} from "@/modules/ads/domain/Ad";
import {CreateAdRequest} from "@/modules/ads/domain/requests/CreateAdRequest";

export interface IAdRepository {
    createAd(ad: CreateAdRequest): Promise<void>;
    getAds(): Promise<Ad[]>;
}
