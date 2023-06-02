import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { User } from './user.decorator'
import { UserPaylod } from './jwt/jwtServ.service'
import { CreateUserDto } from '../user/dto/create-user.dto'

@Controller('api/user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: { email: string; password: string }) {
    try {
      // checkValidationError(req)

      return await this.authService.login(body.email, body.password)
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      // const mes = !(error.message + error.errors) ? '' : error.errors.map((item) => JSON.stringify(item)).join(', ')
      // throw new HttpException(mes, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('reg')
  @HttpCode(200)
  async registration(@Body() body: CreateUserDto) {
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
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async check(@User() user: UserPaylod) {
    try {
      // checkValidationError(req)

      const accessToken = await this.authService.check(user)
      return { accessToken }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Post('refresh')
  @HttpCode(200)
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
