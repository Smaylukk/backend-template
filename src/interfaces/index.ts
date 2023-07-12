import { FastifyRequest } from 'fastify'
import { IUserDTO } from '../models/dto/UserDTO'

export interface IUserRequest<Body = unknown, Params = unknown> extends FastifyRequest<{ Body: Body; Params: Params }> {
  user: IUserDTO
}

export interface RegistrationPayload {
  email: string
  name: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface TodoPayload {
  title: string
  complete: boolean
}
