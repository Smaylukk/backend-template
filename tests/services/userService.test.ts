import UserService from '../../src/services/userService'
import sequelize from '../../src/db'
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
  beforeEach(async () => {
    await UserService.deleteUserByEmail(userData.email)
  })
  afterAll(async () => {
    await UserService.deleteUserByEmail(userData.email)
  })

  test('createUser', async () => {
    const user = await UserService.createUser(userData)
    expect(user.id).toBeDefined()
    expect(user.email).toBe(userData.email)
    expect(user.name).toBe(userData.name)
    expect(user.password).toBeDefined()
  })
  test('getOne', async () => {
    const user = await UserService.createUser(userData)
    const id = user.id
    const saveUser = await UserService.getOneUser(id)
    expect(saveUser.email).toBe(userData.email)
    expect(saveUser.name).toBe(userData.name)
    expect(user.password).toBeDefined()
  })
  test('getAll', async () => {
    const users = await UserService.getAllUsers()
    expect.arrayContaining(users)
  })
  test('delete', async () => {
    const user = await UserService.createUser(userData)
    const id = user.id
    const deletedUser = await UserService.deleteUser(id)
    expect(deletedUser).toBe(1)
  })
})
