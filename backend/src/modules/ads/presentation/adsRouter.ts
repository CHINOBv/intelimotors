import { Router } from 'express';
import { container } from 'tsyringe';
import { AdService } from '../application/AdService';
import { authMiddleware, AuthenticatedRequest } from '../../../middleware/authMiddleware';
import { plainToInstance } from 'class-transformer';
import { Ad } from '../domain/entity/Ad';
import { validateOrReject } from 'class-validator';
import { CreateAdDto } from '../dto/CreateAdDto';
import upload from '../../../config/multerConfig';
import {AdDetails} from "../dto/AdDetails";

const router = Router();
const adService = container.resolve(AdService);

// ! /ads/publicar

router.post('/publicar', authMiddleware, upload.array('images', 3), async (req: AuthenticatedRequest, res) => {
    try {
        const createAdDto = plainToInstance(CreateAdDto, req.body);
        await validateOrReject(createAdDto);

        const userId = req.user!.userId;
        const files = req.files as Express.Multer.File[];
        const imagePaths = files.map(file => file.path);

        const fixedAdDetails: AdDetails = {
            type: "Auto",
            brand: "Acura",
            model: "ILX",
            subtype: "Sedán",
            year: 2018,
            state: "Nuevo León",
            city: "Monterrey",
            mileage: 20000,
            transaction: "Negociable",
            price: createAdDto.price,
            description: createAdDto.description,
            images: imagePaths
        };

        const ad = await adService.publishAd(userId, fixedAdDetails, imagePaths);
        res.json(plainToInstance(Ad, ad));
    } catch (error) {
        if (Array.isArray(error)) {
            return res.status(400).json({ errors: error });
        } else if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(400).json({ error: 'Error al publicar anuncio' });
    }
});

router.get('/user-ads', authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
        const userId = req.user!.userId;
        const ads = await adService.getAdsByUser(userId);
        res.json(ads.map(ad => plainToInstance(Ad, ad)));
    } catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ error: error.message });

        res.status(400).json({ error: 'Error al obtener anuncios' });
    }
});

export { router as adsRouter };
