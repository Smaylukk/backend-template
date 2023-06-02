import { IsString, IsBoolean, IsNotEmpty } from 'class-validator'

export class CreateTodoDto {
  @IsString({ message: 'title має бути в строковому форматі' })
  @IsNotEmpty({ message: 'title має бути заповненим' })
  title: string

  @IsBoolean()
  completed: boolean

  userId: number
}
