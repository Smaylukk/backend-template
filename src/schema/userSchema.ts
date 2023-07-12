import Joi from 'joi'

export const userRegisterSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .messages({ 'string.email': 'mail must be in email-format', 'any.required': 'Email is required' }),
  name: Joi.string().required().messages({ 'any.required': 'Name is required' }),
  password: Joi.string().required().min(4).messages({
    'string.min': 'The password must be at least 4 characters long',
    'any.required': 'Password is required',
  }),
})
export const userLoginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .messages({ 'string.email': 'Email must be in email-format', 'any.required': 'Email is required' }),
  password: Joi.string(),
})
