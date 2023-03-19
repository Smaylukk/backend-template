import { Router } from 'express'
import userRouter from './userRouter'
import postRouter from './postRouter'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.use('/api/user', userRouter)
router.use('/api/post', authMiddleware, postRouter)
router.get('/', (req, res) => {
  res.status(200).send('It work!')
})

export default router
