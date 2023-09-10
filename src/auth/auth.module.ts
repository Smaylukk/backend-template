import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { RedisModule } from '@nestjs-modules/ioredis'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { JwtServ } from './jwt/jwtServ.service'
import { AuthGuard } from './auth.guard'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [UserModule, JwtModule.register({}), ConfigModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService, JwtServ, AuthGuard],
  exports: [AuthGuard, JwtServ],
})
export class AuthModule {}
