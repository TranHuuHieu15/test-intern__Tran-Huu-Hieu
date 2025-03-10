import express from 'express'
import userRouter from './user.routes'
import authRouter from './auth.routes'
import { NotFoundError, ErrorHandler } from '../middlewares/handleError.middlewares'
import { verifyToken } from '../middlewares/verifyToken.middlewares'

const router = (app: express.Application) => {
    app.use('/auth', authRouter)

    // app.use(verifyToken)

    app.use('/user', verifyToken, userRouter)
    // Middleware xử lý lỗi 404
    app.use('*', NotFoundError)
    // middlesware xử lý lỗi tập trung
    app.use(ErrorHandler)
}

export default router
