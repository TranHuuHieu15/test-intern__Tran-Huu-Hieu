import express from 'express'
import userRouter from './user.routes'
import authRouter from './auth.routes'
import shoppingRouter from './shopping.routes'
import { NotFoundError, ErrorHandler } from '../middlewares/handleError.middlewares'

const router = (app: express.Application) => {
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/shopping', shoppingRouter)
    // Middleware xử lý lỗi 404
    app.use('*', NotFoundError)
    // middlesware xử lý lỗi tập trung
    app.use(ErrorHandler)
}

export default router
