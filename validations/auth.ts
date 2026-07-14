import { z } from "zod";

// ensure the correct schema is returned for every function
export const registerSchema = z.object({
    email: z
        .email(),

    password: z
        .string()
        .min(8)
        .max(128),
});

export const loginSchema = z.object({
    email: z
        .email(),

    password: z
        .string()
        .min(8)
        .max(128),
});