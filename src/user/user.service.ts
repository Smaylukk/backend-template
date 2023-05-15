import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './models/user.model'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const candidate = await this.userModel.findOne({ where: { email: user.email } })
    if (candidate) {
      throw new Error(`User with email ${user.email} created`)
    }
    user.password = bcrypt.hashSync(user.password, 5)
    return this.userModel.create({ ...user })
  }

  getAll() {
    return this.userModel.findAll()
  }

  getOne(id: number) {
    return this.userModel.findByPk(id)
  }

  getOneUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } })
  }

  async updateUser(id: number, updateUser: UpdateUserDto) {
    const user = await this.userModel.findByPk(id)
    if (user) {
      await user.update(updateUser)
    }
    return user
  }

  deleteUser(id: number) {
    return this.userModel.destroy({ where: { id } })
  }

  deleteUserByEmail(email: string) {
    return this.userModel.destroy({ where: { email } })
  }
}
