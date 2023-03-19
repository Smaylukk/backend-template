import bcrypt from 'bcrypt'
import { UserModel } from '../models/model'
import { IUserDTO, UserDTO } from '../models/dto/UserDTO'

class UserService {
  async getAllUsers() {
    return UserModel.findAll()
  }

  async getOneUser(id: number | null) {
    return UserModel.findByPk(id)
  }

  async getOneUserByEmail(email: string) {
    return UserModel.findOne({ where: { email } })
  }

  async createUser(data: IUserDTO) {
    const candidate = await UserModel.findOne({ where: { email: data.email } })
    if (candidate) {
      throw new Error(
        `User with email ${data.email} created ${candidate.email}`,
      )
    }
    const userData = new UserDTO(data)
    userData.password = bcrypt.hashSync(data.password, 5)
    return UserModel.create(userData, {})
  }

  async updateUser(id: number | null, data: IUserDTO) {
    const user = await UserModel.findByPk(id)
    if (user) {
      await user.update(data)
    }
    return user
  }

  async deleteUser(id: number) {
    await UserModel.destroy({ where: { id } })
  }
}

export default new UserService()
