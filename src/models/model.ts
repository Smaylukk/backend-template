import * as mongoose from 'mongoose'

// USER
export interface UserDocument extends mongoose.Document {
  name: string
  email: string
  password: string
}
const userSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})
userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    // Перетворити _id в id
    /* eslint-disable */
    ret.id = ret._id
    delete ret._id
    /* eslint-enable */
    return ret
  },
})

const UserModel = mongoose.model<UserDocument>('User', userSchema)

// CAR
export interface TodoDocument extends mongoose.Document {
  title: string
  completed: boolean
  user: mongoose.Schema.Types.ObjectId
}
const todoSchema = new mongoose.Schema<TodoDocument>({
  title: { type: String, required: true },
  completed: { type: Boolean },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
})
todoSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    // Перетворити _id в id
    /* eslint-disable */
    ret.id = ret._id
    delete ret._id
    /* eslint-enable */
    return ret
  },
})

const TodoModel = mongoose.model<TodoDocument>('Todo', todoSchema)

export { UserModel, TodoModel }
