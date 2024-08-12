import puppeteer, { Browser, Page } from 'puppeteer';
import { IPublishService } from '../IPublishService';
import {AdDetails} from "../../dto/AdDetails";

export class MercadoLibrePublishService implements IPublishService {
    private browser: Browser | null = null;
    private page: Page | null = null;

    private username: string;
    private password: string;

    constructor(username: string = "", password: string = "") {
        this.username = username;
        this.password = password;
    }

    async init() {
        this.browser = await puppeteer.launch({ headless: true });
        this.page = await this.browser.newPage();
    }

    async login(username?: string, password?: string) {
        if (!this.page) throw new Error('Puppeteer page not initialized');

        if(!this.username.trim() || !this.password.trim() && !username?.trim() || !password?.trim()) {
            throw new Error('Username and password must be provided');
        }else if(username && password) {
            this.username = username;
            this.password = password;
        }

        await this.page.goto('https://www.mercadolibre.com/jms/mlm/lgz/login');
        await this.page.type('input[name="user_id"]', this.username);
        await this.page.type('input[name="password"]', this.password);
        await this.page.click('button[type="submit"]');
        await this.page.waitForNavigation();
    }

    async createAd(adDetails: AdDetails, screenshotPath: string): Promise<string> {
        if (!this.page) throw new Error('Puppeteer page not initialized');

        await this.page.goto('https://www.mercadolibre.com.mx/publicar');
        const screenshot = await this.page.screenshot({ path: 'screenshot-mercadolibre.png' });
        return 'screenshot-mercadolibre.png';
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}
