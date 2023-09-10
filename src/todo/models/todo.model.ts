import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from '../../user/models/user.model'

@Table({
  tableName: 'todo',
})
export class Todo extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column
  title: string

  @Column
  completed: boolean

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number

  @BelongsTo(() => User)
  user: User
}
