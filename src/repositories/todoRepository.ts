import { TodoModel, UserModel } from '../models/model'
import { ITodoDTO, TodoDTO } from '../models/dto/TodoDTO'

class TodoRepository {
  async getAll(userId) {
    return TodoModel.findAll({
      include: {
        model: UserModel,
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      },
      order: [['createdAt', 'desc']],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: { userId },
    })
  }

  async getOne(userId, id: number) {
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

  async create(userId: number, data: ITodoDTO) {
    const todoData = new TodoDTO({ ...data, userId })
    return TodoModel.create(todoData, {})
  }

  async update(userId: number, id: number, data) {
    const todo = await TodoModel.findByPk(id)
    if (todo && todo.userId === userId) {
      await todo.update(data)
    }
    return todo
  }

  async delete(userId: number, id: number) {
    return TodoModel.destroy({ where: { id, userId } })
  }
}

export default new TodoRepository()
