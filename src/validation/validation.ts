import { ValidationError, validationResult } from 'express-validator'
import { Request } from 'express'
import ApiError from '../errors/ApiError'

const errorFormatter = (error: ValidationError) => {
  switch (error.type) {
    case 'field':
      // this is a FieldValidationError
      return `${error.path}: ${error.msg}`
    default:
      // Not a known type.
      return `Unexpected error ${error.type}: ${error.msg}`
  }
}

export const checkValidationError = (req: Request) => {
  const errors = validationResult(req).formatWith(errorFormatter)
  if (!errors.isEmpty()) {
    throw ApiError.badRequestError(`Помилки валідації -  ${errors.array().join(';')}`)
  }
}
