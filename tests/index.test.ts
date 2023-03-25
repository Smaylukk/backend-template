import supertest from 'supertest'
import { server } from '../src'
import { PostDTO } from '../src/models/dto/PostDTO'
import UserService from '../src/services/userService'

process.env.NODE_ENV = 'test'

const api = supertest(server)
const postData = new PostDTO({
  body: 'tests post',
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
    expect(res.body).toHaveProperty('token')
  })
  test('Refresh', async () => {
    const tokens = await api
      .post('/api/user/login')
      .send({ email: 'admin@mail.com', password: 'admin' })
      .then((res) => res.body)

    const res = await api.post('/api/user/refresh').send({ refreshToken: tokens.refreshToken }).expect(200)
    expect(res.body).toHaveProperty('token')
  })
})

describe('Test Post API', () => {
  beforeAll(async () => {
    const response = await api.post('/api/user/login').send({ email: 'admin@mail.com', password: 'admin' })
    token = response.body.accessToken
  })
  let postId

  test('Post api - POST', async () => {
    const res = await api.post('/api/post').auth(token, { type: 'bearer' }).send(postData)
    postId = res.body.id
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch('application/json')
    expect(res.body.body).toBe(postData.body)
    expect(res.body.userId).toBe(postData.userId)
  })
  test('Post api - GET all', async () => {
    await api
      .get('/api/post')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('rows')
        expect(res.body).toHaveProperty('count')
      })
  })

  test('Post api - GET one', async () => {
    await api
      .get('/api/post/' + postId)
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Post api - PUT', async () => {
    const res = await api.put(`/api/post/${postId}`).auth(token, { type: 'bearer' }).send({
      body: 'new body',
    })
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch('application/json')
    expect(res.body.body).toBe('new body')
  })

  test('Post api - DELETE', async () => {
    const res = await api.delete(`/api/post/${postId}`).auth(token, { type: 'bearer' })

    expect(res.status).toBe(200)
  })

  test('Post api - POST with error', async () => {
    const res = await api.post('/api/post').auth(token, { type: 'bearer' }).send({})

    expect(res.status).toBe(400)
  })
})
