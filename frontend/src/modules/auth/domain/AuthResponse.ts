import {User} from "@/modules/auth/domain/User";

export interface AuthResponse {
    token: string;
    user: User;
}
