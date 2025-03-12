import * as services from '../services'
import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS, HTTP_MESSAGE } from '../constants/httpStatus.constants'
import { shoppingSchema } from '../validations/shopping.validations'

export const createShopping = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id

        if (typeof userId !== 'number') {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                err: 1,
                msg: 'Unauthorized',
            })
            return
        }

        // Validate dữ liệu đầu vào
        const validationResult = shoppingSchema.safeParse(req.body)
        if (!validationResult.success) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                err: 1,
                msg: validationResult.error.errors[0].message,
            })
            return
        }

        // Kiểm tra user có tồn tại không
        const user = await services.getUserById(userId)
        if (!user) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                err: 1,
                msg: 'User not found',
            })
            return
        }

        // Tạo đơn hàng
        const shoppingItem = await services.createShopping({
            ...validationResult.data, // ✅ Dữ liệu đã được validate
            user_id: userId,
        })

        // Tăng point của user lên 1
        await services.updateUser(userId, { point: user.point + 1 })

        res.status(HTTP_STATUS.SUCCESS).json({
            err: 0,
            msg: HTTP_MESSAGE.SUCCESS,
            data: shoppingItem,
        })
    } catch (error) {
        next(error)
    }
}
