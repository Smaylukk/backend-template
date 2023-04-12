import { Next, Context } from 'koa'
import ApiError from '../errors/ApiError'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async (ctx: Context, next: Next) => {
  try {
    await next()
  } catch (error) {
    if (error instanceof ApiError) {
      ctx.status = error.status
      ctx.body = { status: error.status, message: error.message }
      return ctx
    }
    ctx.status = 500
    ctx.body = { message: `Непередбачувана помилка - ${error}` }
    return ctx
  }
}
