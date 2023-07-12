import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import ApiError from '../errors/ApiError'

export default (app: FastifyInstance, error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  app.log.error(error)

  if (error instanceof ApiError) {
    reply.status(error.status).send({ status: error.status, message: error.message })
  }

  if (error.validation) {
    const responseBody = {
      // validationContext will be 'body' or 'params' or 'headers' or 'query'
      message: `A validation error occurred when validating the ${error.validationContext}...`,
      // this is the result of your validation library...
      errors: error.validation,
    }
    reply.status(500).send(responseBody)
  }

  reply.status(500).send({ message: `Непередбачувана помилка - ${error}` })
}
