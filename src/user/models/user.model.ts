import { Column, Model, Table, DataType, Unique, IsEmail } from 'sequelize-typescript'

@Table({
  tableName: 'user',
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Unique
  @IsEmail
  @Column
  email: string

  @Column
  name: string

  @Column
  password: number
}
