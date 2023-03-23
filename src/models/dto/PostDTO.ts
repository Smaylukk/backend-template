export interface IPostDTO {
  id?: number | null
  body: string
  userId: number
}

export class PostDTO implements IPostDTO {
  body = ''

  userId = 0

  constructor(data) {
    Object.assign(this, data)
  }
}
