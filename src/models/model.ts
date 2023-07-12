import { DataTypes, Model } from 'sequelize'
import sequelize from '../services/db'

export interface UserAttributes {
  id: number
  name: string
  password: string
  email: string
}
class UserModel extends Model<UserAttributes> implements UserAttributes {
  public id!: number

  public name!: string

  public password!: string

  public email!: string

  public readonly createdAt!: Date

  public readonly updatedAt!: Date
}
UserModel.init(
  {
    // Здесь определяются атрибуты модели
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user',
    timestamps: true,
  },
)

interface TodoAttributes {
  id: number
  title: string
  completed: boolean
  userId: number
}
class TodoModel extends Model<TodoAttributes> implements TodoAttributes {
  public id!: number

  public title!: string

  public completed!: boolean

  public userId!: number

  public readonly createdAt!: Date

  public readonly updatedAt!: Date
}
TodoModel.init(
  {
    // Здесь определяются атрибуты модели
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'todo',
    timestamps: true,
  },
)

UserModel.hasMany(TodoModel, { foreignKey: 'userId', as: 'todos' })
TodoModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' })

export { UserModel, TodoModel }
