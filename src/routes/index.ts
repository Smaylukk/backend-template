import { ServerRoute, ReqRefDefaults } from '@hapi/hapi'
import * as userRouter from './userRouter'
import * as todoRouter from './todoRouter'

export const routes: ServerRoute<ReqRefDefaults>[] = [
  userRouter.userLogin,
  userRouter.userRegister,
  userRouter.userCheckToken,
  userRouter.userRefreshToken,
  todoRouter.todoCreate,
  todoRouter.todoUpdate,
  todoRouter.todoGetAll,
  todoRouter.todoGetOne,
  todoRouter.todoDelete,
]
