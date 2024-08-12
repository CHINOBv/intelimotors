import {create} from 'zustand';
import {Ad} from "@/modules/ads/domain/Ad";
import {AdsActions, AdsState} from "@/modules/ads/domain/interfaces/AdsStoreInterfaces";
import {ListAdsUseCase} from "@/modules/ads/application/ListAdsUseCase";
import {AdRepositoryImpl} from "@/modules/ads/infrastructure/AdRepositoryImpl";
import {CreateAdUseCase} from "@/modules/ads/application/CreateAdUseCase";
import {CreateAdRequest} from "@/modules/ads/domain/requests/CreateAdRequest";

const listAdsUseCase = new ListAdsUseCase(new AdRepositoryImpl());
const createAdUseCase = new CreateAdUseCase(new AdRepositoryImpl());

export const useAdsStore = create<AdsState & AdsActions>((set) => ({
    ads: [],
    isLoading: false,
    isCreatingAd: false,

    setAds: (ads: Ad[]) => set({ads}),
    setIsLoading: (isLoading: boolean) => set({isLoading}),

    fetchAds: async () => {
        try {
            set({isLoading: true})
            const ads = await listAdsUseCase.execute();
            set({ads});
        } catch (e) {
            console.error('Error fetching ads: ', e);
        } finally {
            set({isLoading: false});
        }
    },
    addAd: async (ad: CreateAdRequest) => {

        set({isCreatingAd: true});
        try {
            await createAdUseCase.execute(ad);

        } catch (e) {
            console.error('Error creating ad: ', e);
        } finally {
            const ads = await listAdsUseCase.execute();
            set({ads, isCreatingAd: false});
        }

    },
}));
