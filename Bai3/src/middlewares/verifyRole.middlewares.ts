import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS } from '../constants/httpStatus.constants'

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user?.role_code !== 'R1') {
        res.status(HTTP_STATUS.FORBIDDEN).json({
            err: 1,
            message: 'You are not allowed to access this route',
        })
    }
    next()
}

export const isAdminOrModerator = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user?.role_code !== 'R1' && req.user?.role_code !== 'R3') {
        res.status(HTTP_STATUS.FORBIDDEN).json({
            err: 1,
            message:
                'You are not allowed to access this route, please login with admin or moderator account',
        })
    }
    next()
}
