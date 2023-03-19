import { DataTypes, Model } from 'sequelize'
import sequelize from '../db'

interface UserAttributes {
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

interface PostAttributes {
  id: number
  body: string
  userId: number
}
class PostModel extends Model<PostAttributes> implements PostAttributes {
  public id!: number

  public body!: string

  public userId!: number

  public readonly createdAt!: Date

  public readonly updatedAt!: Date
}
PostModel.init(
  {
    // Здесь определяются атрибуты модели
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    body: {
      type: DataTypes.STRING,
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
    tableName: 'post',
    timestamps: true,
  },
)

UserModel.hasMany(PostModel, { foreignKey: 'userId' })
PostModel.belongsTo(UserModel, { foreignKey: 'userId' })

export { UserModel, PostModel }
