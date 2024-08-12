import {AuthResponse} from "@/modules/auth/domain/AuthResponse";

export interface AuthRepository {
    login(username: string, password: string): Promise<AuthResponse>;
    register(username: string, password: string): Promise<AuthResponse>;
}
