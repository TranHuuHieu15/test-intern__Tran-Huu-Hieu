import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS, HTTP_MESSAGE } from '../constants/httpStatus.constants'

export const NotFoundError = (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({
        err: 1,
        msg: HTTP_MESSAGE.ROUTES_NOT_DEFINED,
    })
}
export const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    res.status(HTTP_STATUS.SERVER_ERROR).json({
        err: 1,
        msg: HTTP_MESSAGE.SERVER_ERROR,
    })
}
