import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { AuthGuard } from '../auth/auth.guard'
import { UserPaylod } from '../auth/jwt/jwtServ.service'
import { User } from '../auth/user.decorator'

@Controller('api/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createTodoDto: CreateTodoDto, @User() user: UserPaylod) {
    return this.todoService.create(user.id, createTodoDto)
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query('limit') limit, @Query('page') page, @User() user: UserPaylod) {
    try {
      return this.todoService.findAll(user.id, limit, page)
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @User() user: UserPaylod) {
    return this.todoService.findOne(user.id, +id)
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @User() user: UserPaylod) {
    return this.todoService.update(user.id, +id, updateTodoDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @User() user: UserPaylod) {
    return this.todoService.remove(user.id, +id)
  }
}
