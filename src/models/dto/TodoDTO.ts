export interface ITodoDTO {
  id?: number | null
  title: string
  completed: boolean
  user: string
}

export class TodoDTO implements ITodoDTO {
  title = ''

  user = ''

  completed = false

  constructor(data) {
    Object.assign(this, data)
  }
}
