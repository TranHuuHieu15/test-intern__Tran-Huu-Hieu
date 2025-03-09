import {z} from 'zod';

export const userSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').max(50, 'Name must be at most 50 characters'),
    email: z.string().email('Invalid email format'),
    age: z.number().int().min(18, 'Age must be at least 18').max(130, 'Age must be at most 130'),
    address: z.string().min(3, 'Address must be at least 3 characters').default("no address") // có thể không cần nhập thì giá trị mặc định là "no address"
})