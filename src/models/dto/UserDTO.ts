export interface IUserDTO {
  id?: number
  email: string
  name: string
  password: string
}

export class UserDTO implements IUserDTO {
  email = ''

  name = ''

  password = ''

  constructor(data) {
    Object.assign(this, data)
  }
}
