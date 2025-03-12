import * as services from '../services/user.services'
import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS, HTTP_MESSAGE } from '../constants/httpStatus.constants'
import { userSchema } from '../validations/user.validations'
import bcrypt from 'bcrypt'

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

        const { email, name, password } = req.body

        // Validate chỉ các trường được gửi lên
        const validationResult = userSchema
            .pick({ email: true, name: true, password: true }) // chỉ lấy các trường này
            .partial() // cho phép không gửi đủ các trường
            .safeParse({ email, name, password })
        if (!validationResult.success) {
            console.log(validationResult.error.errors)
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                err: 1,
                msg: validationResult.error.errors[0].message,
            })
            return
        }
        // Nếu có password mới => Hash password trước khi cập nhật
        if (password) {
            const SALT = process.env.SALT || 10
            const hashedPassword = await bcrypt.hash(password, SALT)
            validationResult.data.password = hashedPassword
        }
        // Cập nhật user, giữ nguyên các trường không được phép sửa
        const updatedUser = await services.updateUser(userId, {
            email: email ?? user.email,
            name: name ?? user.name,
            password: password ?? user.password,
            role_code: user.role_code, // Giữ nguyên role_code
            point: user.point, // Giữ nguyên point
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

export const getTopUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await services.getTopUsers()
        res.status(HTTP_STATUS.SUCCESS).json({
            err: 0,
            msg: HTTP_MESSAGE.SUCCESS,
            data: users,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const updateTopUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = req.body
        if (!Array.isArray(users) || users.length === 0) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                err: 1,
                msg: 'Data is invalid',
            })
            return
        }
        await services.updateTopUsers(users)

        res.status(HTTP_STATUS.SUCCESS).json({
            err: 0,
            msg: HTTP_MESSAGE.SUCCESS,
        })
    } catch (error) {
        next(error)
    }
}
