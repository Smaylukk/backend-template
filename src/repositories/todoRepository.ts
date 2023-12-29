import { TodoDocument, TodoModel } from '../models/model'
import { ITodoDTO, TodoDTO } from '../models/dto/TodoDTO'

class TodoRepository {
  async getAll(user: string): Promise<TodoDocument[]> {
    return TodoModel.find({
      user,
    })
  }

  async getAllOfThem(): Promise<TodoDocument[]> {
    return TodoModel.find()
  }

  async getOne(user: string, id: string): Promise<TodoDocument> {
    return TodoModel.findOne({ _id: id, user })
  }

  async create(user: string, data: ITodoDTO): Promise<TodoDocument> {
    const todoData = new TodoDTO({ ...data, user })
    const todo = new TodoModel(todoData, {})
    return todo.save()
  }

  async update(user: string, id: string, data): Promise<TodoDocument | null> {
    return TodoModel.findOneAndUpdate({ _id: id, user }, data, { new: true })
  }

  async delete(user: string, id: string): Promise<TodoDocument | null> {
    return TodoModel.findOneAndDelete({ _id: id, user }, {})
  }
}

export default new TodoRepository()
