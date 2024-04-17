import supertest from 'supertest'
import { TodoDTO } from '../src/models/dto/TodoDTO'
import UserService from '../src/repositories/userRepository'
import { buildApp } from '../src/app'
import { FastifyInstance } from 'fastify'

let app: FastifyInstance
let api: supertest.SuperTest<supertest.Test>
const todoData = new TodoDTO({
  title: 'tests todo',
  complete: false,
})
let token: string

beforeAll(async () => {
  app = await buildApp()
  await app.ready()
  api = supertest(app.server)
})
afterAll(async () => {
  app.close()
})
describe('Test Auth API', () => {
  test('Login error', async () => {
    await api.post('/api/user/login').send({ email: 'error', password: 'error' }).expect(400)
  })
  test('Login', async () => {
    const res = await api.post('/api/user/login').send({ email: 'admin@mail.com', password: 'admin' }).expect(200)
    expect(res.body).toHaveProperty('accessToken')
    expect(res.body).toHaveProperty('refreshToken')
  })
  test('Registration', async () => {
    const res = await api
      .post('/api/user/reg')
      .send({ email: 'tests@tests.com', name: 'test', password: 'test' })
      .expect(200)
    expect(res.body).toHaveProperty('accessToken')
    expect(res.body).toHaveProperty('refreshToken')

    await UserService.deleteUserByEmail('tests@tests.com')
  })
  test('Check', async () => {
    const tokens = await api
      .post('/api/user/login')
      .send({ email: 'admin@mail.com', password: 'admin' })
      .then((res) => res.body)

    const res = await api.get('/api/user/auth').auth(tokens.accessToken, { type: 'bearer' }).expect(200)
    expect(res.body).toHaveProperty('accessToken')
  })
  test('Refresh', async () => {
    const tokens = await api
      .post('/api/user/login')
      .send({ email: 'admin@mail.com', password: 'admin' })
      .then((res) => res.body)

    const res = await api.post('/api/user/refresh').send({ refreshToken: tokens.refreshToken }).expect(200)
    expect(res.body).toHaveProperty('accessToken')
  })
})

describe('Test todo API', () => {
  beforeAll(async () => {
    const response = await api.post('/api/user/login').send({ email: 'admin@mail.com', password: 'admin' })
    token = response.body.accessToken
  })

  let todoId: string

  test('todo api - POST', async () => {
    const res = await api.post('/api/todo').auth(token, { type: 'bearer' }).send(todoData)

    todoId = res.body.id
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch('application/json')
    expect(res.body.title).toBe(todoData.title)
    expect(res.body.user).toBeDefined()
  })
  test('todo api - GET all', async () => {
    const res = await api.get('/api/todo').auth(token, { type: 'bearer' })

    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch('application/json')
    expect.arrayContaining(res.body)
  })

  test('todo api - GET one', async () => {
    const res = await api.get('/api/todo/' + todoId).auth(token, { type: 'bearer' })

    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch('application/json')
  })

  test('todo api - PUT', async () => {
    const res = await api.put(`/api/todo/${todoId}`).auth(token, { type: 'bearer' }).send({
      title: 'new body',
    })

    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch('application/json')
    expect(res.body.title).toBe('new body')
  })

  test('todo api - DELETE', async () => {
    const res = await api.delete(`/api/todo/${todoId}`).auth(token, { type: 'bearer' })

    expect(res.status).toBe(200)
  })

  test('todo api - POST with error', async () => {
    const res = await api.post('/api/todo').auth(token, { type: 'bearer' }).send({})

    expect(res.status).toBe(400)
  })
})
