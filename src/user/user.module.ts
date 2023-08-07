import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserService } from './user.service'
import { User } from './models/user.model'

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}