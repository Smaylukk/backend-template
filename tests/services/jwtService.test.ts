import * as dotenv from 'dotenv'
import JwtService from '../../src/services/jwtService'

const envFile = `.env.test`
dotenv.config({ path: envFile })

let userData = {
  email: 'user@tests.org',
  name: 'test user',
  password: 'test',
}

describe('Test JWT service', () => {
  test('Generate access token', async () => {
    const token = JwtService.generateAccessToken(userData)
    expect(token).toBeDefined()

    const payload = JwtService.verifyToken(token)
    expect(payload).toMatchObject(userData)
  })

  test('Generate refresh token', async () => {
    const token = JwtService.generateRefreshToken(userData)
    expect(token).toBeDefined()

    const payload = JwtService.verifyRefreshToken(token)
    expect(payload).toMatchObject(userData)
  })
  test('Generate tokens pair', async () => {
    const pair = JwtService.createTokensPair(userData)
    expect(pair).toHaveProperty('accessToken')
    expect(pair).toHaveProperty('refreshToken')
  })
})
