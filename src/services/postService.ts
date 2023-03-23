import { PostModel, UserModel } from '../models/model'
import { IPostDTO, PostDTO } from '../models/dto/PostDTO'

class PostService {
  async getAllPosts(limit = 25, offset = 0) {
    return PostModel.findAndCountAll({
      include: {
        model: UserModel,
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      },
      limit,
      offset,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })
  }

  async getOnePost(id: number) {
    return PostModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })
  }

  async createPost(data: IPostDTO) {
    const postData = new PostDTO(data)
    return PostModel.create(postData, {})
  }

  async updatePost(id: number, data) {
    const post = await PostModel.findByPk(id)
    if (post) {
      await post.update(data)
    }
    return post
  }

  async deletePost(id: number) {
    return PostModel.destroy({ where: { id } })
  }

  async deletePostByBody(body: string) {
    return PostModel.destroy({ where: { body } })
  }
}

export default new PostService()
