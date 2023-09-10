import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserService } from './user.service'
import { User } from './models/user.model'
import { UserRepository } from './user.repository'

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
