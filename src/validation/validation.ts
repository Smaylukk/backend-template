import { ValidationError, validationResult } from 'express-validator'
import { Request } from 'express'
import ApiError from '../errors/ApiError'

const errorFormatter = ({ msg, param }: ValidationError) => `${param}: ${msg}`

export const checkValidationError = (req: Request) => {
  const errors = validationResult(req).formatWith(errorFormatter)
  if (!errors.isEmpty()) {
    throw ApiError.badRequestError(JSON.stringify(errors.array()))
  }
}
