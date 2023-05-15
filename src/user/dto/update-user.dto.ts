import { IsString, IsEmail, Length, IsOptional } from 'class-validator'

export class UpdateUserDto {
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
