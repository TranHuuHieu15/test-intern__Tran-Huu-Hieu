import * as services from '../services'
import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS, HTTP_MESSAGE } from '../constants/httpStatus.constants'
import { userSchema } from '../validations/user.validations'

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await services.login(email, password)
        if (user.error) {
            //FIXME:
            console.log('================', 'Lỗi ở đây nè')
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                err: 1,
                msg: user.message,
            })
            return
        }
        res.status(HTTP_STATUS.SUCCESS).json({
            err: 0,
            msg: HTTP_MESSAGE.SUCCESS,
            data: user,
        })
    } catch (error) {
        next(error)
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationResult = userSchema.safeParse(req.body)
        if (!validationResult.success) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                err: 1,
                msg: validationResult.error.errors[0].message,
            })
            return // nếu có lỗi thì dừng hàm
        }
        const user = await services.register(validationResult.data)
        res.status(HTTP_STATUS.SUCCESS).json({
            err: 0,
            msg: HTTP_MESSAGE.SUCCESS,
            data: { ...user, password: 'hidden' },
        })
    } catch (error) {
        next(error)
    }
}
