import {Router} from 'express'
import { UserController } from './constrollers/UserController'
import { LoginController } from './constrollers/LoginController'
import { verifyAuth } from './middleware/VerifyAuth'

export const router = Router()
const userController = new UserController()
const loginController = new LoginController()

router.post('/user',userController.createUser)
router.get ('/user/:id_user', verifyAuth, userController.getUser)
router.post('/login',loginController.login)