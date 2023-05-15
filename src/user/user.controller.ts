import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './models/user.model'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user)
  }

  @Get()
  findAll() {
    return this.userService.getAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(+id, data)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(+id)
  }
}
