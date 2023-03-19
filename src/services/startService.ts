/// <reference lib="dom" />
import bcrypt from 'bcrypt'
import userService from './userService'
import { UserDTO } from '../models/dto/UserDTO'
import postService from './postService'
import { PostDTO } from '../models/dto/PostDTO'
import { PostModel, UserModel } from '../models/model'

export class StartService {
  async initValue() {
    // create admin user
    const users = await userService.getAllUsers()
    if (!users.length) {
      const newUsers = [
        {
          email: 'admin@mail.com',
          name: 'admin',
          password: bcrypt.hashSync('admin', 5),
        },
        {
          email: 'user@mail.com',
          name: 'user',
          password: bcrypt.hashSync('user', 5),
        },
        {
          email: 'master@mail.com',
          name: 'master',
          password: bcrypt.hashSync('master', 5),
        },
        {
          email: 'audit@mail.com',
          name: 'audit',
          password: bcrypt.hashSync('audit', 5),
        },
        {
          email: 'art@mail.com',
          name: 'art',
          password: bcrypt.hashSync('art', 5),
        },
      ]

      for (const rec of newUsers) {
        const userData = new UserDTO(rec)
        await UserModel.create(userData)
      }

      // create fake post
      const posts = await postService.getAllPosts()
      if (posts.count === 0) {
        await fetch('https://jsonplaceholder.typicode.com/posts?limit=1')
          .then(async (response) => response.json())
          .then(async (json: { body: string }[]) => {
            for (const rec of json) {
              // create post
              const postData = new PostDTO({
                body: rec.body,
                userId: Math.floor(Math.random() * 4) + 1,
              })
              await PostModel.create(postData)
            }
          })
      }
    }
  }
}
