import supertest from 'supertest'
import { server } from '../src'
import { TodoDTO } from '../src/models/dto/TodoDTO'
import UserService from '../src/services/userService'

process.env.NODE_ENV = 'test'

const api = supertest(server)
const todoData = new TodoDTO({
  title: 'tests todo',
  userId: 1,
})
let token

afterAll(async () => {
  server.close()
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
  let todoId

  test('todo api - POST', async () => {
    const res = await api.post('/api/todo').auth(token, { type: 'bearer' }).send(todoData)
    todoId = res.body.id
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch('application/json')
    expect(res.body.title).toBe(todoData.title)
    expect(res.body.userId).toBe(todoData.userId)
  })
  test('todo api - GET all', async () => {
    await api
      .get('/api/todo')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('rows')
        expect(res.body).toHaveProperty('count')
      })
  })

  test('todo api - GET one', async () => {
    await api
      .get('/api/todo/' + todoId)
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
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
