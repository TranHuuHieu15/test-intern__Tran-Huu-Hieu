import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS, HTTP_MESSAGE } from '../constants/httpStatus.constants'
import jwt from 'jsonwebtoken'
import { User } from '../types/user' // Import interface User từ types/user.ts

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Please login' })
        return
    }

    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined')
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as User
        req.user = decoded
        next()
    } catch (error) {
        res.status(HTTP_STATUS.FORBIDDEN).json({
            message: 'Access token invalid or expired',
        })
        return
    }
}
