import UserService from '../../src/repositories/userRepository'
import sequelize from '../../src/services/db'
import { UserDTO } from '../../src/models/dto/UserDTO'

let userData = new UserDTO({
  email: 'user@tests.org',
  name: 'test user',
  password: 'test',
})

beforeAll(async () => {
  await sequelize.authenticate()
  await sequelize.sync({ logging: false })
})

afterAll(async () => {
  await sequelize.close()
})

describe('Test User service', () => {
  let userId = 0

  test('createUser', async () => {
    const user = await UserService.createUser(userData)
    userId = user.id
    expect(user.id).toBeDefined()
    expect(user.email).toBe(userData.email)
    expect(user.name).toBe(userData.name)
    expect(user.password).toBeDefined()
    await UserService.deleteUser(userId)
  })
  test('getOne', async () => {
    const user = await UserService.createUser(userData)
    userId = user.id
    const saveUser = await UserService.getOneUser(userId)
    expect(saveUser.email).toBe(userData.email)
    expect(saveUser.name).toBe(userData.name)
    expect(user.password).toBeDefined()
    await UserService.deleteUser(userId)
  })
  test('getAll', async () => {
    const user = await UserService.createUser(userData)
    userId = user.id
    const users = await UserService.getAllUsers()
    expect.arrayContaining(users)
    await UserService.deleteUser(userId)
  })
  test('delete', async () => {
    const user = await UserService.createUser(userData)
    userId = user.id
    const deletedUser = await UserService.deleteUser(userId)
    expect(deletedUser).toBe(1)
  })
})
