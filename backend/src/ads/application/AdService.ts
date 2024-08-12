import { inject, injectable } from 'tsyringe';
import { AdRepository } from '../domain/AdRepository';
import { Ad } from '../domain/entity/Ad';
import { UserRepository } from '../../auth/domain/UserRepository';
import { IPublishService } from "./IPublishService";
import { PublishServiceFactory } from "./PublishServiceFactory";
import { AdDetails } from '../dto/AdDetails';
import path from 'path';
import fs from 'fs';
import { Image } from '../domain/entity/Image';
import { validateOrReject } from "class-validator";
import { randomUUID } from "node:crypto";

@injectable()
export class AdService {
    constructor(
        @inject('AdRepository') private adRepository: AdRepository,
        @inject('UserRepository') private userRepository: UserRepository
    ) {}

    async publishAd(userId: string, adDetails: AdDetails, imagePaths: string[], site: string = 'seminuevos'): Promise<Ad> {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new Error('User not found');

        await validateOrReject(adDetails);

        const publishService: IPublishService = PublishServiceFactory.createService(site);

        await publishService.init();
        await publishService.login();

        let screenshotPath: string;
        try {
            screenshotPath = await publishService.createAd({ ...adDetails, images: imagePaths }, "");
        } catch (error) {
            await publishService.close();
            console.error(error);
            throw new Error(`Failed to publish ad: ${error}`);
        }

        const ad = new Ad(
            adDetails.type,
            adDetails.brand,
            adDetails.model,
            adDetails.subtype,
            adDetails.year,
            adDetails.state,
            adDetails.city,
            adDetails.mileage,
            adDetails.price,
            adDetails.transaction,
            adDetails.description,
            "",
            user,
            []
        );

        await this.adRepository.save(ad);

        const adId = ad.id;
        const screenshotResultPath = path.join(__dirname, '../../../uploads', userId, 'ads', adId, 'screenshot_result.jpg');

        if (!fs.existsSync(path.dirname(screenshotResultPath))) {
            fs.mkdirSync(path.dirname(screenshotResultPath), { recursive: true });
        }

        if (!fs.existsSync(screenshotPath)) {
            throw new Error(`Screenshot not found at path: ${screenshotPath}`);
        }

        try {
            fs.renameSync(screenshotPath, screenshotResultPath);
        } catch (error) {
            throw new Error(`Failed to move screenshot from ${screenshotPath} to ${screenshotResultPath}: ${error}`);
        }

        const adDir = path.join(__dirname, '../../../uploads', userId, 'ads', adId, 'images');
        if (!fs.existsSync(adDir)) {
            fs.mkdirSync(adDir, { recursive: true });
        }

        const movedImagePaths = imagePaths.map(imagePath => {
            const fileName = path.basename(imagePath);
            const newImagePath = path.join(adDir, fileName);
            fs.renameSync(imagePath, newImagePath);
            return newImagePath;
        });

        const images = movedImagePaths.map(imagePath => new Image(path.relative(path.join(__dirname, '../../../'), imagePath), ad));

        await publishService.close();

        ad.screenshot = path.relative(path.join(__dirname, '../../../'), screenshotResultPath);
        ad.images = images;

        await this.adRepository.save(ad);
        return ad;
    }

    async getAdsByUser(userId: string): Promise<Ad[]> {
        return await this.adRepository.findByUserId(userId);
    }
}
