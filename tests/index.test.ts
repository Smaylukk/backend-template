import supertest from 'supertest'
import { server } from '../src'
import { TodoDTO } from '../src/models/dto/TodoDTO'
import UserService from '../src/repositories/userRepository'
import { log } from 'console'
import exp from 'constants'

process.env.NODE_ENV = 'test'

const api = supertest(server)
const todoData = {
  title: 'tests todo',
}
let token = ''

beforeAll((done) => {
  server.events.on('start', () => {
    done()
  })
})
afterAll((done) => {
  server.events.on('stop', () => {
    done()
  })

  server.stop()
})
describe('Test Auth API', () => {
  test('Login error', async () => {
    const data = await server.inject({
      method: 'POST',
      url: '/api/user/login',
      payload: { email: 'error', password: 'error' },
    })
    expect(data.statusCode).toBe(400)
  })
  test('Login', async () => {
    const data = await server.inject({
      method: 'POST',
      url: '/api/user/login',
      payload: { email: 'admin@mail.com', password: 'admin' },
    })
    expect(data.statusCode).toBe(200)
    expect(data.result).toHaveProperty('accessToken')
    expect(data.result).toHaveProperty('refreshToken')
  })
  test('Registration', async () => {
    const data = await server.inject({
      method: 'POST',
      url: '/api/user/reg',
      payload: { email: 'tests@tests.com', name: 'test', password: 'test' },
    })
    expect(data.statusCode).toBe(200)
    expect(data.result).toHaveProperty('accessToken')
    expect(data.result).toHaveProperty('refreshToken')

    await UserService.deleteUserByEmail('tests@tests.com')
  })
  test('Check', async () => {
    const { result: tokens } = await server.inject<{ accessToken: string; refreshToken: string }>({
      method: 'POST',
      url: '/api/user/login',
      payload: { email: 'admin@mail.com', password: 'admin' },
    })

    const res = await server.inject({
      method: 'GET',
      url: '/api/user/auth',
      headers: {
        authorization: 'Bearer ' + tokens?.accessToken,
      },
    })
    expect(res.result).toHaveProperty('accessToken')
  })
  test('Refresh', async () => {
    const { result: tokens } = await server.inject<{ accessToken: string; refreshToken: string }>({
      method: 'POST',
      url: '/api/user/login',
      payload: { email: 'admin@mail.com', password: 'admin' },
    })

    const res = await server.inject<{ accessToken: string }>({
      method: 'POST',
      url: '/api/user/refresh',
      payload: { refreshToken: tokens?.refreshToken },
    })
    expect(res.result).toHaveProperty('accessToken')
  })
})

describe('Test todo API', () => {
  beforeAll(async () => {
    const { result } = await server.inject<{ accessToken: string; refreshToken: string }>({
      method: 'POST',
      url: '/api/user/login',
      payload: { email: 'admin@mail.com', password: 'admin' },
    })
    expect(result).toBeDefined()
    if (result) {
      token = result.accessToken
    }
  })

  let todoId

  test('todo api - POST', async () => {
    const res = await server.inject<{ id: number; title: string; userId: number }>({
      method: 'POST',
      url: '/api/todo',
      headers: {
        authorization: 'Bearer ' + token,
      },
      payload: todoData,
    })

    expect(res.result).toBeDefined()
    if (res.result) {
      todoId = res.result?.id
      expect(res.statusCode).toBe(200)
      expect(res.headers['content-type']).toMatch('application/json')
      expect(res.result.title).toBe(todoData.title)
    }
  })
  test('todo api - GET all', async () => {
    const res = await server.inject<any[]>({
      method: 'GET',
      url: '/api/todo',
      headers: {
        authorization: 'Bearer ' + token,
      },
    })

    expect(res.result).toBeDefined()
    if (res.result) {
      expect(res.statusCode).toBe(200)
      expect(res.headers['content-type']).toMatch('application/json')
      expect.arrayContaining(res.result)
    }
  })

  test('todo api - GET one', async () => {
    const res = await server.inject<any[]>({
      method: 'GET',
      url: `/api/todo/${todoId}`,
      headers: {
        authorization: 'Bearer ' + token,
      },
    })

    expect(res.result).toBeDefined()
    if (res.result) {
      expect(res.statusCode).toBe(200)
      expect(res.headers['content-type']).toMatch('application/json')
    }
  })

  test('todo api - PUT', async () => {
    const res = await server.inject<{ id: number; title: string; userId: number }>({
      method: 'PUT',
      url: `/api/todo/${todoId}`,
      headers: {
        authorization: 'Bearer ' + token,
      },
      payload: {
        title: 'new body',
      },
    })

    expect(res.result).toBeDefined()
    if (res.result) {
      expect(res.statusCode).toBe(200)
      expect(res.headers['content-type']).toMatch('application/json')
      expect(res.result.title).toBe('new body')
    }
  })

  test('todo api - DELETE', async () => {
    const res = await server.inject<{ id: number; title: string; userId: number }>({
      method: 'DELETE',
      url: `/api/todo/${todoId}`,
      headers: {
        authorization: 'Bearer ' + token,
      },
    })

    expect(res.statusCode).toBe(200)
  })

  test('todo api - POST with error', async () => {
    const res = await server.inject<{ id: number; title: string; userId: number }>({
      method: 'POST',
      url: '/api/todo',
      headers: {
        authorization: 'Bearer ' + token,
      },
      payload: {},
    })

    expect(res.statusCode).toBe(400)
  })
})
