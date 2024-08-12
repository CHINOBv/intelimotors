import { Ad } from "@/modules/ads/domain/Ad";
import {CreateAdRequest} from "@/modules/ads/domain/requests/CreateAdRequest";

export interface AdsState {
    ads: Ad[];
    isLoading: boolean;
    isCreatingAd: boolean;
}

export interface AdsActions {
    setAds: (ads: Ad[]) => void;
    addAd: (ad: CreateAdRequest) => Promise<void>;
    setIsLoading: (value: boolean) => void;
    fetchAds: () => void;
}
