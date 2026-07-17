import { z } from "zod";

export const transactionSchema = z.object({
    title: z.string().min(1),
    amount: z.coerce.number().positive(),
    category: z.string().min(1),

    type: z.enum([
        "income",
        "expense",
    ]),

    goalId: z.string().optional(),
    createdAt: z.coerce.date().optional(),
});