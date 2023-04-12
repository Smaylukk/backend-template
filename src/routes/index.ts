import Router from 'koa-router'
import { Next, Context } from 'koa'
import userRouter from './userRouter'
import todoRouter from './todoRouter'
import authMiddleware from '../middlewares/authMiddleware'

const router = new Router()

router.use('/api/user', userRouter.routes())
router.use('/api/todo', authMiddleware, todoRouter.routes())
router.get('/', (ctx: Context, next: Next) => {
  ctx.status = 200
  ctx.body = 'It work!'
  next()
})

export default router
