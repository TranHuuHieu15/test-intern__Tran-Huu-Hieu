import * as services from '../services/user.services'
import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS, HTTP_MESSAGE } from '../constants/httpStatus.constants'
import { userSchema } from '../validations/user.validations'

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await services.getAllUsers()
        res.status(HTTP_STATUS.SUCCESS).json({
            err: 0,
            msg: HTTP_MESSAGE.SUCCESS,
            data: users,
        })
    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number.parseInt(req.params.id)
        const user = await services.getUserById(userId)

        // Kiểm tra xem user có tồn tại không
        if (!user) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                err: 1,
                msg: 'User not found',
            })
            return // nếu không tồn tại thì dừng hàm
        }

        // Nếu user tồn tại, trả về thông tin user
        res.status(HTTP_STATUS.SUCCESS).json({
            err: 0,
            msg: HTTP_MESSAGE.SUCCESS,
            data: user,
        })
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let userId = Number.parseInt(req.params.id)
        const user = await services.getUserById(userId)

        if (!user) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                err: 1,
                msg: 'User not found',
            })
            return
        }

        // Validate chỉ các trường được gửi lên
        const validationResult = userSchema.partial().safeParse(req.body)
        if (!validationResult.success) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                err: 1,
                msg: validationResult.error.errors[0].message,
            })
            return
        }

        // Kết hợp dữ liệu cũ với dữ liệu mới
        const updatedUser = await services.updateUser(userId, {
            ...user, // giữ nguyên các trường cũ
            ...validationResult.data, // ghi đè các trường được gửi lên
        })

        res.status(HTTP_STATUS.SUCCESS).json({
            err: 0,
            msg: HTTP_MESSAGE.SUCCESS,
            data: updatedUser,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let userId = Number.parseInt(req.params.id)
        const user = await services.getUserById(userId)

        if (!user) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                err: 1,
                msg: 'User not found',
            })
            return
        }

        await services.deleteUser(userId)

        res.status(HTTP_STATUS.SUCCESS).json({
            err: 0,
            msg: HTTP_MESSAGE.SUCCESS,
        })
    } catch (error) {
        next(error)
    }
}
