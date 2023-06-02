import { PartialType } from '@nestjs/mapped-types'
import { IsString, IsEmail, Length, IsOptional } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  @Length(6, 20)
  password?: string
}
