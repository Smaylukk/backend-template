import { Router } from 'express'
import { body } from 'express-validator'
import userController from '../controllers/userController'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.post(
  '/reg',
  [
    body('email')
      .notEmpty()
      .withMessage('Email обовязковий')
      .isEmail()
      .withMessage('Email має бути email-формат'),
    body('name').notEmpty().withMessage('Найменування обовязкове'),
    body('password')
      .notEmpty()
      .withMessage('Пароль обовязковий')
      .isLength({ min: 4 })
      .withMessage('Довжина паролю від 4 символів'),
  ],
  userController.registration,
)
router.post(
  '/login',
  [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email must be in email-format'),
  ],
  userController.login,
)
router.get('/auth', authMiddleware, userController.check)

router.get('/', userController.getAll)
router.get('/:id', userController.getOne)

export default router
