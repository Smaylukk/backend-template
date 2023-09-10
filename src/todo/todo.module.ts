import { Module } from '@nestjs/common'
import { TodoService } from './todo.service'
import { TodoController } from './todo.controller'
import { AuthModule } from '../auth/auth.module'
import { TodoRepository } from './todo.repository'
import { Todo } from './models/todo.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [SequelizeModule.forFeature([Todo]), AuthModule],
  controllers: [TodoController],
  providers: [TodoRepository, TodoService],
  exports: [TodoRepository, TodoService],
})
export class TodoModule {}
