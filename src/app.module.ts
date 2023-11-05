import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { TodoModule } from './todo/todo.module'
import { config } from './config/config'
import { RedisModule } from '@nestjs-modules/ioredis'
import { StartModule } from './utils/start/start.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          dialect: 'mariadb',
          host: configService.get('DatabaseConfig.dbHost'),
          port: configService.get<number>('DatabaseConfig.dbPort'),
          database: configService.get('DatabaseConfig.dbName'),
          username: configService.get('DatabaseConfig.dbUser'),
          password: configService.get('DatabaseConfig.dbPassword'),
          autoLoadModels: true,
          synchronize: true,
        }
      },
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          config: {
            url: configService.get('RedisConfig.redisHost'),
            port: configService.get('RedisConfig.redisPort'),
          },
        }
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    TodoModule,
    StartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
