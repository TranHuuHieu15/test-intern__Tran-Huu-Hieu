import express from 'express'
import * as controllers from '../controllers'
import { verifyToken } from '../middlewares/verifyToken.middlewares'

const router = express.Router()

router.use(verifyToken)
router.post('/create', controllers.createShopping)

export default router
