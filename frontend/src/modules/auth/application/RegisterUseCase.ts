import { AuthRepository } from "../domain/AuthRepository";
import { AuthResponse } from "../domain/AuthResponse";

export class RegisterUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(username: string, password: string): Promise<AuthResponse> {
        return this.authRepository.register(username, password);
    }
}
