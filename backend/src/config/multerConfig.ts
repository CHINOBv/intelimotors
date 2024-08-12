import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

const storage = multer.diskStorage({
    destination: (req: AuthenticatedRequest, file, cb) => {
        const userId = req.user!.userId;
        const adId = req.params.adId || 'temp';
        const dir = path.join(__dirname, '../../uploads', userId, 'ads', adId, 'images');

        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req: Request, file: any, cb: any) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: The file must be an image');
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter
});

export default upload;
