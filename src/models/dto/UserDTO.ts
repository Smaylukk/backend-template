export interface IUserDTO {
  id?: string
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
