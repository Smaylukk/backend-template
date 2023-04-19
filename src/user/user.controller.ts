import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './models/user.model'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<User>) {
    return this.userService.update(+id, data)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
