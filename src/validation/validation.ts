import { FastifyRequest } from 'fastify'

export const checkValidationError = (req: FastifyRequest) => {
  if (req.validationError) {
    throw req.validationError
  }
}
