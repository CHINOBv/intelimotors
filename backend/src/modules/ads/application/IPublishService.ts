import { AdDetails } from '../dto/AdDetails';

export interface IPublishService {
    init(): Promise<void>;
    login(email?: string, password?: string): Promise<void>;
    createAd(adDetails: AdDetails, screenshotPath: string): Promise<string>;
    close(): Promise<void>;
}
