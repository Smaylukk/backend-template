import { Router } from 'express'
import userRouter from './userRouter'
import todoRouter from './todoRouter'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.use('/api/user', userRouter)
router.use('/api/todo', authMiddleware, todoRouter)
router.get('/', (req, res) => {
  res.status(200).send('It work!')
})

export default router
