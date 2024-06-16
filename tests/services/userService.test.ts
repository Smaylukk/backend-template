import UserService from '../../src/repositories/userRepository'
import { UserDTO } from '../../src/models/dto/UserDTO'
import { connectDb, disconnectDb } from '../../src/services/dbConnector'

let userData = new UserDTO({
  email: 'user@tests.org',
  name: 'test user',
  password: 'test',
})

beforeAll(async () => {
  await connectDb(true)
})

afterAll(async () => {
  await disconnectDb()
})

describe('Test User service', () => {
  let userId = ''

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
    expect(deletedUser.id).toBe(userId)
  })
})
