import { SeminuevosPublishService } from './publishers/SeminuevosPublishService';
import { MercadoLibrePublishService } from './publishers/MercadoLibrePublishService';
import { IPublishService } from './IPublishService';
import env from "../../config/env";

export class PublishServiceFactory {
    static createService(site: string): IPublishService {
        switch (site) {
            case 'seminuevos':
                return new SeminuevosPublishService(env.publishers.seminuevos.email, env.publishers.seminuevos.password);
            case 'mercadolibre':
                return new MercadoLibrePublishService(env.publishers.mercadolibre.email, env.publishers.mercadolibre.password);
            default:
                throw new Error('Unknown site');
        }
    }
}
