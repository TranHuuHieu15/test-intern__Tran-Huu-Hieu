"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must be at most 50 characters'),
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password must be at most 50 characters'),
    role_code: zod_1.z.string().default('R2'), // có thể không cần nhập thì giá trị mặc định là "no address"
});
