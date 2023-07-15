import { MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from 'src/config/middlewares/logger.middleware';
import { UserModule } from './user/user.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AppGuard } from 'src/config/guard/auth.guard';
import { HttpModule, HttpService } from '@nestjs/axios';
import { UserService } from './user/user.service';
import { Gender } from './user/entities/gender';
import { UserRole } from './user/entities/role';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/.env`,
      isGlobal: true,
    }),
    {
      ...HttpModule.register({}),
      global: true,
    },
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_INITDB_HOST}:${process.env.MONGO_INITDB_PORT}`, {
      dbName: process.env.MONGO_INITDB_DATABASE,
      auth: {
        username: process.env.MONGO_INITDB_ROOT_USERNAME,
        password: process.env.MONGO_INITDB_ROOT_PASSWORD
      }
    }),
    // MongooseModule.forRootAsync({
    //   connectionName: 'TH Logistic',
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: `mongodb://${configService.get('MONGO_INITDB_HOST')}:${configService.get('MONGO_INITDB_PORT')}`,
    //     dbName: configService.get('MONGO_INITDB_DATABASE'),
    //     auth: {
    //       username: configService.get('MONGO_INITDB_ROOT_USERNAME'),
    //       password: configService.get('MONGO_INITDB_ROOT_USERNAME')
    //     }
    //   }),
    // }),

    UserModule
  ],
  providers: [
    {
      useClass: AppGuard,
      provide: APP_GUARD,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {

  }


  async onApplicationBootstrap() {
    const rootUser = this.configService.get<string>("ROOT_USER")
    const rootPassword = this.configService.get<string>("ROOT_PASSWORD")

    const existedUser = await this.userService.findByUsernameNullable(rootUser);
    if (!existedUser) {
      const rootAccount = await this.userService.createUser({
        avatar: "admin",
        bankAccount: "adminBankAccount",
        bankName: "admin",
        birthday: new Date().getTime(),
        username: rootUser,
        password: rootPassword,
        email: "admin@thlogistic.com",
        gender: Gender.MALE,
        name: rootUser,
        phoneNumber: rootUser,
        role: UserRole.ADMIN
      })

      console.log("Root account created!")
      console.log("Root account created ", rootAccount)
    }
  }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(
  //     LoggerMiddleware
  //   ).forRoutes({
  //     path: "",
  //     method: RequestMethod.ALL
  //   });
  // }
}
