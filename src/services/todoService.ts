import { TodoModel } from '../models/model'
import { ITodoDTO } from '../models/dto/TodoDTO'
import TodoRepository from '../repositories/todoRepository'

class TodoService {
  async getAllTodos(userId) {
    return TodoRepository.getAll(userId)
  }

  async getOneTodo(userId, id: number) {
    return TodoRepository.getOne(userId, id)
  }

  async createTodo(userId: number, data: ITodoDTO) {
    return TodoRepository.create(userId, data)
  }

  async updateTodo(userId: number, id: number, data) {
    return TodoRepository.update(userId, id, data)
  }

  async deleteTodo(userId: number, id: number) {
    return TodoRepository.delete(userId, id)
  }

  async deleteTodoByTitle(title: string) {
    return TodoModel.destroy({ where: { title } })
  }
}

export default new TodoService()
