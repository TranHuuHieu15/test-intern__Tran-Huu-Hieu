import express from 'express'
import * as controllers from '../controllers/user.controllers'
import { verifyToken } from '../middlewares/verifyToken.middlewares'
import { isAdmin, isAdminOrModerator } from '../middlewares/verifyRole.middlewares'

const router = express.Router()

router.use(verifyToken)
router.get('/', isAdmin, controllers.getAllUsers)
router.get('/:id', controllers.getUserById)
router.put('/:id', controllers.updateUser)
router.delete('/:id', isAdmin, controllers.deleteUser)

export default router
