import { z } from 'zod'

export const shoppingSchema = z.object({
    name: z
        .string()
        .min(3, 'Name must be at least 3 characters')
        .max(255, 'Name must be at most 255 characters'),
    description: z
        .string()
        .max(255, 'Description must be at most 255 characters')
        .default('No description'),
})
