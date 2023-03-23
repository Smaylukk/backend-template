import { Router } from 'express'
import { body } from 'express-validator'
import postController from '../controllers/postController'

const router = Router()

router.post(
  '/',
  [
    body('body').notEmpty().withMessage('Body is required'),
    body('userId').notEmpty().withMessage('userId is required'),
  ],
  postController.create,
)
router.put('/:id', postController.update)
router.get('/', postController.getAll)
router.get('/:id', postController.getOne)
router.delete('/:id', postController.delete)

export default router
