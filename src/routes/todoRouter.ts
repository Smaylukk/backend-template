import Router from 'koa-router'
import Joi from 'joi'
import todoController from '../controllers/todoController'
import validationMiddleware from '../middlewares/validationMiddleware'

const schema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ 'string.empty': 'Заголовок обовязковий', 'any.required': 'Заголовок обовязковий' }),
  userId: Joi.string()
    .required()
    .messages({ 'number.empty': 'userId обовязковий', 'any.required': 'userId обовязковий' }),
}).unknown(true)
const router = new Router()

router.post('/', validationMiddleware(schema), todoController.create)
router.put('/:id', todoController.update)
router.get('/', todoController.getAll)
router.get('/:id', todoController.getOne)
router.delete('/:id', todoController.delete)

export default router
