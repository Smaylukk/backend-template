import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: CreateUserDto) {
    const candidate = await this.userRepository.findByEmail(user.email)
    if (candidate) {
      throw new Error(`User with email ${user.email} created`)
    }
    user.password = bcrypt.hashSync(user.password, 5)
    return this.userRepository.create({ ...user })
  }

  async getAll() {
    return this.userRepository.findAll()
  }

  async getOne(id: number) {
    return this.userRepository.findById(id)
  }

  async getOneUserByEmail(email: string) {
    return this.userRepository.findByEmail(email)
  }

  async updateUser(id: number, updateUser: UpdateUserDto) {
    return this.userRepository.update(id, updateUser)
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id)
  }

  async deleteUserByEmail(email: string) {
    return this.userRepository.deleteByEmail(email)
  }
}
