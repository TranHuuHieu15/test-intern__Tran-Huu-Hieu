import { Request } from 'express'
import { User } from '../../src/types/user'

declare module 'express-serve-static-core' {
    export interface Request {
        user?: User
    }
}
