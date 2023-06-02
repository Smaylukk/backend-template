import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsString({ message: 'name має бути в строковому форматі' })
  @IsNotEmpty({ message: 'name має бути заповненим' })
  name: string

  @IsString({ message: 'email має бути в строковому форматі' })
  @IsNotEmpty({ message: 'email має бути заповненим' })
  @IsEmail({}, { message: 'email має бути в форматі електронної пошти' })
  email: string

  @IsString({ message: 'password має бути в строковому форматі' })
  @IsNotEmpty({ message: 'password має бути заповненим' })
  @Length(6, undefined, { message: 'Мінімальна довжина паролю - 6 символів' })
  password: string
}
