import { UserDocument, UserModel } from '../models/model'

class UserRepository {
  async getAllUsers(): Promise<UserDocument[]> {
    return UserModel.find().exec()
  }

  async getOneUser(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id).exec()
  }

  async getOneUserByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email }).exec()
  }

  async createUser(data: Partial<UserDocument>): Promise<UserDocument> {
    const candidate = await this.getOneUserByEmail(data.email)
    if (candidate) {
      throw new Error(`User with email ${data.email} created ${candidate.email}`)
    }
    const userData = new UserModel(data)
    return userData.save()
  }

  async updateUser(id: string, data: Partial<UserDocument>): Promise<UserDocument | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  async deleteUser(id: string): Promise<UserDocument | null> {
    return UserModel.findByIdAndDelete(id, {}).exec()
  }

  async deleteUserByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOneAndDelete({ email }).exec()
  }
}

export default new UserRepository()
