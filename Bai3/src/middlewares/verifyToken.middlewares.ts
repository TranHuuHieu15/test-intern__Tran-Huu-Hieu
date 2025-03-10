import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS, HTTP_MESSAGE } from '../constants/httpStatus.constants'
import jwt from 'jsonwebtoken'

interface JwtUserPayload extends jwt.JwtPayload {
    id: number
    email: string
    password: string
    name: string
    role_code: string
    point: number
}

interface AuthRequest extends Request {
    user?: JwtUserPayload
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Please login' })
        return
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'love_NodeJS'

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: 'Access token maybe invalid or expired',
            })
            return
        }

        if (typeof decoded === 'object' && decoded !== null) {
            req.user = decoded as JwtUserPayload
            next() // Gọi next() để tiếp tục xử lý request
            return
        }

        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Invalid token format' })
    })
}
