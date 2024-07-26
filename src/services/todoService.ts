import { ITodoDTO } from '../models/dto/TodoDTO'
import TodoRepository from '../repositories/todoRepository'

class TodoService {
  async getAllTodos(userId: string) {
    return TodoRepository.getAll(userId)
  }

  async getOneTodo(userId: string, id: string) {
    return TodoRepository.getOne(userId, id)
  }

  async createTodo(userId: string, data: ITodoDTO) {
    return TodoRepository.create(userId, data)
  }

  async updateTodo(userId: string, id: string, data) {
    return TodoRepository.update(userId, id, data)
  }

  async deleteTodo(userId: string, id: string) {
    return TodoRepository.delete(userId, id)
  }
}

export default new TodoService()
