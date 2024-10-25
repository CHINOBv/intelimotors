import {User} from "./User";

export interface AuthLoginResponse {
    token: string;
    user: {
        id: string;
        username: string;
    };
}
