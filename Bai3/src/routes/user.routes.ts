import express from 'express'
import * as controllers from '../controllers/user.controllers'

const router = express.Router()

router.get('/', controllers.getAllUsers)
router.get('/:id', controllers.getUserById)
router.post('/', controllers.createUser)
router.put('/:id', controllers.updateUser)
router.delete('/:id', controllers.deleteUser)

export default router
