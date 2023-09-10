import { Module } from '@nestjs/common'
import { StartService } from './start.service'
import { UserModule } from '../../user/user.module'
import { TodoModule } from '../../todo/todo.module'

@Module({
  imports: [UserModule, TodoModule],
  providers: [StartService],
  exports: [StartService],
})
export class StartModule {}
