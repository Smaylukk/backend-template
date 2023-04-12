import { Next, Context } from 'koa'
import Joi from 'joi'

export default (schema: Joi.ObjectSchema) => async (ctx: Context, next: Next) => {
  const { error } = schema.validate(ctx.request.body, { abortEarly: false })
  if (error) {
    const messages = error.details.map((detail) => detail.message)
    ctx.status = 400
    ctx.body = { messages }
  } else {
    await next()
  }
}
