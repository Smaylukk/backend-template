import Joi from 'joi'

export const userRegisterSchema = Joi.object({
  email: Joi.string().required().email().messages({
    'string.email': 'Email must be in email-format',
    'string.empty': 'Email must be in email-format',
  }),
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  password: Joi.string().required().min(4).messages({
    'string.min': 'The password must be at least 4 characters long',
    'string.empty': 'Password cannot be empty',
  }),
}).options({ abortEarly: false, allowUnknown: true })
export const userLoginSchema = Joi.object({
  email: Joi.string().required().email().messages({
    'string.email': 'Email must be in email-format',
    'string.empty': 'Email must be in email-format',
  }),
  password: Joi.string().messages({
    'string.empty': 'Password is required',
  }),
}).options({ abortEarly: false, allowUnknown: true })
