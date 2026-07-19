import { z } from "zod";

export const goalSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(50, "Title cannot exceed 50 characters"),

    icon: z
        .string()
        .trim()
        .default("Target"),

    targetAmount: z.coerce
        .number()
        .min(1, "Target amount must be at least ₹1"),

    currentAmount: z.coerce
        .number()
        .min(0, "Current amount cannot be negative")
        .default(0),

    archived: z
        .boolean()
        .default(false),
});