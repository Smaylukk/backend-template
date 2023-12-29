import { Router } from 'express'
import { body } from 'express-validator'
import todoController from '../controllers/todoController'

const router = Router()

router.post('/', [body('title').notEmpty().withMessage('Title is required')], todoController.create)
router.put('/:id', todoController.update)
router.get('/', todoController.getAll)
router.get('/:id', todoController.getOne)
router.delete('/:id', todoController.delete)

export default router
