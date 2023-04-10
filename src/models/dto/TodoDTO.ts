export interface ITodoDTO {
  id?: number | null
  title: string
  completed: boolean
  userId: number
}

export class TodoDTO implements ITodoDTO {
  title = ''

  userId = 0

  completed = false

  constructor(data) {
    Object.assign(this, data)
  }
}
