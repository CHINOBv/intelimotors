import { AuthRepository } from "../domain/AuthRepository";
import { AuthResponse } from "../domain/AuthResponse";

export class LoginUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(username: string, password: string): Promise<AuthResponse> {
        return this.authRepository.login(username, password);
    }
}
