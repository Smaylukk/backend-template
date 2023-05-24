import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { RedisModule } from '@nestjs-modules/ioredis'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { JwtServ } from './jwt/jwtServ.service'

@Module({
  imports: [
    UserModule,
    JwtModule.register({}),
    RedisModule.forRoot({
      config: {
        url: '',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtServ],
})
export class AuthModule {}
