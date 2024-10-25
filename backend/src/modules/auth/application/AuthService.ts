import { inject, injectable } from "tsyringe";
import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from "../../../config/env";
import { AuthLoginResponse } from "../domain/AuthLoginResponse";

@injectable()
export class AuthService {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async register(username: string, password: string): Promise<User> {
    const user = new User(username, password);
    await this.userRepository.save(user);
    return user;
  }

  async login(username: string, password: string): Promise<AuthLoginResponse> {
    const user = await this.userRepository.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id }, env.auth.jwtSecret, {
        expiresIn: env.auth.jwtExpiration,
      });
      return {
        token,
        user: {
          id: user.id,
          username: user.username,
        },
      };
    }
    throw new Error("Invalid username or password");
  }

  async verifyToken(token: string): Promise<string | object> {
    return jwt.verify(token, env.auth.jwtSecret);
  }

  async getUser(userId: string): Promise<User | null> {
    return await this.userRepository.findById(userId);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
