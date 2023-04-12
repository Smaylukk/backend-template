import Router from 'koa-router'
import Joi from 'joi'
import userController from '../controllers/userController'
import authMiddleware from '../middlewares/authMiddleware'
import validationMiddleware from '../middlewares/validationMiddleware'

const schema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .messages({ 'string.email': 'Email має бути email-формат', 'any.required': 'Email обовязковий' }),
  name: Joi.string().required().messages({ 'any.required': 'Найменування обовязкове' }),
  password: Joi.string()
    .required()
    .min(4)
    .messages({ 'string.min': 'Пароль має бути довжиною від 4 символів', 'any.required': 'пароль обовязковий' }),
})
const router = new Router()

router.post('/reg', validationMiddleware(schema), userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.post('/refresh', userController.refresh)

export default router
