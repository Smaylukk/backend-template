import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './models/user.model'

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(user: CreateUserDto) {
    return this.userModel.create({ ...user })
  }

  async findAll() {
    return this.userModel.findAll()
  }

  async findById(id: number) {
    return this.userModel.findByPk(id)
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } })
  }

  async update(id: number, updateUser: UpdateUserDto) {
    const user = await this.findById(id)
    if (user) {
      await user.update(updateUser)
    }
    return user
  }

  async delete(id: number) {
    return this.userModel.destroy({ where: { id } })
  }

  async deleteByEmail(email: string) {
    return this.userModel.destroy({ where: { email } })
  }
}
