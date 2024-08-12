import { z } from 'zod';

export const LoginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const RegisterSchema = z.object({
    username: z.string().min(4, "Username is required and must be at least 4 characters long").max(20, "Username must be at most 20 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(20, "Password must be at most 20 characters long"),
});
