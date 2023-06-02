import { Injectable } from '@nestjs/common'
import { Todo } from './entities/todo.model'
import { InjectModel } from '@nestjs/sequelize'
import { User } from '../user/models/user.model'

@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel(Todo)
    private readonly todoModel: typeof Todo,
  ) {}
  async create(userId: number, todo: Partial<Todo>): Promise<Todo> {
    return this.todoModel.create(todo)
  }

  async findAll(userId, limit, offset): Promise<Todo[]> {
    return this.todoModel.findAll({
      include: {
        model: User,
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      },
      limit,
      offset,
      order: [['createdAt', 'desc']],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: { userId },
    })
  }

  async findById(id: number, userId: number): Promise<Todo | null> {
    const todo = await this.todoModel.findOne({
      where: { id, userId },
      include: [
        {
          model: User,
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

  async update(id: number, userId: number, todo: Partial<Todo>): Promise<[number, Todo[]]> {
    return this.todoModel.update(todo, {
      where: { id, userId },
      returning: true,
    })
  }

  async delete(id: number, userId: number): Promise<number> {
    return this.todoModel.destroy({ where: { id, userId } })
  }
}
