import Joi from 'joi'

export const todoPostSchema = Joi.object({
  title: Joi.string().required().messages({ 'any.required': 'Title is required' }),
})
