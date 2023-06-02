import bcrypt from 'bcrypt'
import { UserModel } from '../models/model'
import { IUserDTO, UserDTO } from '../models/dto/UserDTO'

class UserRepository {
  async getAllUsers() {
    return UserModel.findAll()
  }

  async getOneUser(id: number) {
    return UserModel.findByPk(id)
  }

  async getOneUserByEmail(email: string) {
    return UserModel.findOne({ where: { email } })
  }

  async createUser(data: IUserDTO) {
    const candidate = await UserModel.findOne({ where: { email: data.email } })
    if (candidate) {
      throw new Error(`User with email ${data.email} created ${candidate.email}`)
    }
    const userData = new UserDTO(data)
    userData.password = bcrypt.hashSync(data.password, 5)
    return UserModel.create(userData, {})
  }

  async updateUser(id: number, data: IUserDTO) {
    const user = await UserModel.findByPk(id)
    if (user) {
      await user.update(data)
    }
    return user
  }

  async deleteUser(id: number) {
    return UserModel.destroy({ where: { id } })
  }

  async deleteUserByEmail(email: string) {
    return UserModel.destroy({ where: { email } })
  }
}

export default new UserRepository()
