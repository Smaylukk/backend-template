import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    try {
      // checkValidationError(req)

      const { email, password } = body
      return await this.authService.login(email, password)
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      // const mes = !(error.message + error.errors) ? '' : error.errors.map((item) => JSON.stringify(item)).join(', ')
      // throw new HttpException(mes, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('reg')
  async registration(@Body() body) {
    try {
      // checkValidationError(req)

      const { email, name, password } = body
      return await this.authService.registration(email, name, password)
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get('auth')
  @UseGuards(AuthGuard)
  async check(@Body() body) {
    try {
      // checkValidationError(req)

      const user = body.user
      const accessToken = await this.authService.check(user)
      return { accessToken }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('refresh')
  async refresh(@Body() body) {
    try {
      // checkValidationError(req)

      const { refreshToken } = body
      const accessToken = await this.authService.refreshAccessToken(refreshToken)
      return { accessToken }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
