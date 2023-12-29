/// <reference lib="dom" />
import * as bcrypt from 'bcrypt'
import { UserDTO } from '../models/dto/UserDTO'
import { TodoDTO } from '../models/dto/TodoDTO'
import UserRepository from '../repositories/userRepository'
import TodoRepository from '../repositories/todoRepository'

export class StartService {
  async initValue() {
    // create admin user
    const createdUsers: string[] = []
    const users = await UserRepository.getAllUsers()
    if (!users.length) {
      const adminData = new UserDTO({
        name: 'admin',
        email: 'admin@mail.com',
        password: bcrypt.hashSync('admin', 5),
      })
      const admin = await UserRepository.createUser(adminData)
      createdUsers.push(admin.id)
      // prettier-ignore
      const newUsers = await fetch('https://jsonplaceholder.typicode.com/users')
        .then(async (response) => response.json())

      for (const rec of newUsers) {
        delete rec.id
        rec.password = bcrypt.hashSync('password', 5)
        const userData = new UserDTO(rec)
        const user = await UserRepository.createUser(userData)
        createdUsers.push(user.id)
      }

      // create fake todo
      const todos = await TodoRepository.getAllOfThem()
      if (todos.length === 0) {
        await fetch('https://jsonplaceholder.typicode.com/todos')
          .then(async (response) => response.json())
          .then(async (json: { title: string; completed: boolean; userId: number }[]) => {
            for (const rec of json) {
              // create todo
              const todoData = new TodoDTO({
                title: rec.title,
                completed: rec.completed,
              })
              const id = Math.floor(Math.random() * createdUsers.length)
              await TodoRepository.create(createdUsers[id], todoData)
            }
          })
      }
    }
  }
}
