import puppeteer, { Browser, Page } from 'puppeteer';
import { IPublishService } from '../IPublishService';
import { SEMINUEVOS_SELECTORS } from './selectors';
import { AdDetails } from '../../dto/AdDetails';
import path from 'path';
import fs from 'fs';

export class SeminuevosPublishService implements IPublishService {
    private browser: Browser | null = null;
    private page: Page | null = null;
    private username: string;
    private password: string;

    constructor(username?: string, password?: string) {
        this.username = username || '';
        this.password = password || '';
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
            args: ['--start-maximized'],
        });
        this.page = await this.browser.newPage();
        this.page.setDefaultTimeout(0);
    }

    async login(username?: string, password?: string) {
        if (!this.page) throw new Error('Puppeteer page not initialized');

        if (
            (!this.username.trim() || !this.password.trim()) &&
            (!username?.trim() || !password?.trim())
        ) {
            throw new Error(
                'Username and password must be provided in the constructor or as arguments'
            );
        } else if (username?.trim() && password?.trim()) {
            this.username = username;
            this.password = password;
        }

        await this.page.goto('https://admin.seminuevos.com/login');
        await this.page.type(SEMINUEVOS_SELECTORS.login.username, this.username);
        await this.page.type(SEMINUEVOS_SELECTORS.login.password, this.password);
        await this.page.click(SEMINUEVOS_SELECTORS.login.submit);
        await this.page.waitForNavigation();
        await this.page.waitForNavigation();
    }

    async waitForOverlayToDisappear() {
        await this.page!.waitForSelector(
            '#wizard > div > div > div.transition-opacity.loading-area',
            { hidden: true }
        );
    }

    async searchAndClickItem(page: Page, selector: string, item: string) {
        await page.waitForSelector(selector);
        const list = await page.$$(selector);
        const MAX_ITEMS = 100;
        for (let i = 0; i < Math.min(list.length, MAX_ITEMS); i++) {
            const element = list[i];
            const text = await element.evaluate((node) => node.textContent);
            if (text?.trim().toLowerCase() === item.trim().toLowerCase()) {
                await element.$eval('a', (el) => el.click());
                break;
            }
        }
    }

    async uploadImages(page: Page, images: string[]) {
        await page.waitForSelector(SEMINUEVOS_SELECTORS.createAd.fileInput);
        const input: any = await page.$(SEMINUEVOS_SELECTORS.createAd.fileInput);
        if (!input) throw new Error('File input not found');

        await Promise.all(images.map(image => input.uploadFile(image)));
    }

    async createAd(adDetails: AdDetails, screenshotPath: string): Promise<string> {
        if (!this.page) throw new Error('Puppeteer page not initialized');
        if (!adDetails.images?.length) throw new Error('At least one image is required');

        await this.page.goto('https://www.seminuevos.com/wizard', {
            waitUntil: 'networkidle2',
        });

        await this.waitForOverlayToDisappear();

        await this.page.type(SEMINUEVOS_SELECTORS.createAd.type, adDetails.type);

        await this.page.waitForSelector('#dropdown_brands > div > div > ul');

        await this.searchAndClickItem(
            this.page,
            SEMINUEVOS_SELECTORS.createAd.brandsList,
            adDetails.brand
        );
        await this.searchAndClickItem(
            this.page,
            SEMINUEVOS_SELECTORS.createAd.modelsList,
            adDetails.model
        );
        await this.searchAndClickItem(
            this.page,
            SEMINUEVOS_SELECTORS.createAd.subtypeList,
            adDetails.subtype
        );
        await this.searchAndClickItem(
            this.page,
            SEMINUEVOS_SELECTORS.createAd.statesList,
            adDetails.state
        );
        await this.searchAndClickItem(
            this.page,
            SEMINUEVOS_SELECTORS.createAd.citiesList,
            adDetails.city
        );
        await this.searchAndClickItem(
            this.page,
            SEMINUEVOS_SELECTORS.createAd.yearList,
            adDetails.year.toString()
        );
        await this.page.type(
            SEMINUEVOS_SELECTORS.createAd.mileage,
            adDetails.mileage.toString()
        );
        await this.page.type(SEMINUEVOS_SELECTORS.createAd.price, adDetails.price.toString());

        await this.page.click(SEMINUEVOS_SELECTORS.createAd.submit);

        await this.page.waitForNavigation();

        await this.waitForOverlayToDisappear();

        await this.page.waitForSelector(SEMINUEVOS_SELECTORS.createAd.description);
        await this.page.type(SEMINUEVOS_SELECTORS.createAd.description, adDetails.description);

        await this.uploadImages(this.page, adDetails.images);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        await this.page.$eval('.next-button:nth-child(2)', (element: any) => element.click());

        await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        const tempDir = path.join(__dirname, '../../../temp');
        const tempScreenshotPath = path.join(tempDir, 'screenshot_result.jpg');

        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        await this.page.screenshot({ path: tempScreenshotPath });
        return tempScreenshotPath;
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}
