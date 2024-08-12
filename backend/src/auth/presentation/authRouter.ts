import {Router} from 'express';
import {container} from 'tsyringe';
import {AuthService} from '../application/AuthService';
import {authMiddleware} from '../../middleware/authMiddleware';
import {plainToClass, plainToInstance} from 'class-transformer';
import {User} from '../domain/User';
import {validateOrReject} from 'class-validator';
import {CreateUserDto} from '../dto/CreateUserDto';

const router = Router();
const authService = container.resolve(AuthService);

router.post('/register', async (req, res) => {
    try {
        const createUserDto = plainToInstance(CreateUserDto, req.body);
        await validateOrReject(createUserDto);

        const {username, password} = createUserDto;
        const user = await authService.register(username, password);
        res.json(plainToClass(User, user));
    } catch (error) {
        if (Array.isArray(error)) {
            return res.status(400).json({errors: error});
        } else if (error instanceof Error) {
            return res.status(400).json({error: error.message});
        }

        res.status(400).json({error: 'Error while registering user'});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const data = await authService.login(username, password);
        res.json(data);
    } catch (error) {
        if (error instanceof Error)
            return res.status(400).json({error: error.message});

        res.status(400).json({error: 'Error while logging in'});
    }
});

router.get('/users', authMiddleware, async (req, res) => {
    try {
        const users = await authService.getUsers();
        res.json(users.map(user => plainToClass(User, user)));
    } catch (error) {
        if (error instanceof Error)
            return res.status(400).json({error: error.message});

        res.status(400).json({error: 'Error while fetching users'});
    }
});

export {router as authRouter};
