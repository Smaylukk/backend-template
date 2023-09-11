import { Injectable } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { Todo } from './models/todo.model'
import { TodoRepository } from './todo.repository'

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}
  async create(userId: number, todo: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.create(userId, todo)
  }

  async findAll(userId: number, limitParam: number, pageParam: number): Promise<Todo[]> {
    const limit = limitParam ? +limitParam : 25
    const page = pageParam ? +pageParam : 1
    const offset = (page - 1) * limit || 0
    return this.todoRepository.findAll(userId, limit, offset)
  }

  findOne(userId: number, id: number): Promise<Todo | null> {
    return this.todoRepository.findById(id, userId)
  }

  update(userId: number, id: number, updateTodo: UpdateTodoDto): Promise<Todo> {
    return this.todoRepository.update(id, userId, updateTodo)
  }

  remove(userId: number, id: number): Promise<number> {
    return this.todoRepository.delete(id, userId)
  }
}
