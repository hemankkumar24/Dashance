import { z } from "zod";

export const onboardingSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    balance: z.coerce.number().min(0, "Balance cannot be negative"), // converts to number
    budget: z.coerce.number().min(0, "Budget cannot be negative"),
});
