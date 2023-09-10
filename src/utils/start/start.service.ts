import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { UserService } from '../../user/user.service'
import { TodoService } from '../../todo/todo.service'

@Injectable()
export class StartService implements OnApplicationBootstrap {
  constructor(private readonly userService: UserService, private readonly todoService: TodoService) {}

  async onApplicationBootstrap() {
    // create admin user
    const users = await this.userService.getAll()
    if (!users.length) {
      const adminData = {
        name: 'admin',
        email: 'admin@mail.com',
        password: 'admin',
      }
      await this.userService.createUser(adminData)
      // prettier-ignore
      const newUsers = await fetch('https://jsonplaceholder.typicode.com/users')
        .then(async (response) => response.json())

      for (const rec of newUsers) {
        delete rec.id
        await this.userService.createUser({ name: rec.name, email: rec.email, password: rec.username })
      }

      // create fake todo
      await fetch('https://jsonplaceholder.typicode.com/todos')
        .then(async (response) => response.json())
        .then(async (json: { title: string; completed: boolean; userId: number }[]) => {
          for (const rec of json) {
            // create todo
            const todoData = {
              title: rec.title,
              completed: rec.completed,
              userId: rec.userId,
            }
            await this.todoService.create(rec.userId, todoData)
          }
        })
    }
  }
}
