import { CreateTodoDto } from './create-todo.dto'
import { IsString, IsBoolean, IsOptional } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsBoolean()
  completed?: boolean
}
