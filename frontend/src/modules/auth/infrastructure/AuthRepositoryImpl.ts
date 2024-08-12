import { AuthRepository } from "../domain/AuthRepository";
import AuthAPI from "./AuthAPI";
import {AuthResponse} from "@/modules/auth/domain/AuthResponse";

export class AuthRepositoryImpl implements AuthRepository {
    async login(username: string, password: string): Promise<AuthResponse> {
        const response = await AuthAPI.post<AuthResponse>('/auth/login', { username, password });
        return response.data;
    }

    async register(username: string, password: string): Promise<AuthResponse> {
        const response = await AuthAPI.post('/auth/register', {username, password });
        return response.data;
    }
}
