/// <reference lib="dom" />
import { UserDTO } from '../models/dto/UserDTO'
import { TodoDTO } from '../models/dto/TodoDTO'
import { TodoModel, UserModel } from '../models/model'

export class StartService {
  async initValue() {
    // create admin user
    const users = await UserModel.findAll()
    if (!users.length) {
      const adminData = new UserDTO({
        name: 'admin',
        email: 'admin@mail.com',
        password: 'admin',
      })
      await UserModel.create(adminData)
      // prettier-ignore
      const newUsers = await fetch('https://jsonplaceholder.typicode.com/users')
        .then(async (response) => response.json())

      for (const rec of newUsers) {
        delete rec.id
        const userData = new UserDTO(rec)
        await UserModel.create(userData)
      }

      // create fake todo
      const todos = await TodoModel.findAll()
      if (todos.length === 0) {
        await fetch('https://jsonplaceholder.typicode.com/todos')
          .then(async (response) => response.json())
          .then(async (json: { title: string; completed: boolean; userId: number }[]) => {
            for (const rec of json) {
              // create todo
              const todoData = new TodoDTO({
                title: rec.title,
                completed: rec.completed,
                userId: rec.userId,
              })
              await TodoModel.create(todoData)
            }
          })
      }
    }
  }
}
