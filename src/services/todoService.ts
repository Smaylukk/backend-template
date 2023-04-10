import { TodoModel, UserModel } from '../models/model'
import { ITodoDTO, TodoDTO } from '../models/dto/TodoDTO'

class TodoService {
  async getAllTodos(userId, limit = 25, offset = 0) {
    return TodoModel.findAndCountAll({
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
      where: { userId },
    })
  }

  async getOneTodo(userId, id: number) {
    const todo = await TodoModel.findByPk(id, {
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
    if (todo.userId === userId) {
      return todo
    }
    return null
  }

  async createTodo(userId: number, data: ITodoDTO) {
    const todoData = new TodoDTO({ ...data, userId })
    return TodoModel.create(todoData, {})
  }

  async updateTodo(userId: number, id: number, data) {
    const todo = await TodoModel.findByPk(id)
    if (todo && todo.userId === userId) {
      await todo.update(data)
    }
    return todo
  }

  async deleteTodo(userId: number, id: number) {
    return TodoModel.destroy({ where: { id, userId } })
  }

  async deleteTodoByTitle(title: string) {
    return TodoModel.destroy({ where: { title } })
  }
}

export default new TodoService()
