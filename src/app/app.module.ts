import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/config/middlewares/logger.middleware';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/dev.env`,
    }),
    MongooseModule.forRootAsync({
      connectionName: 'TH Logistic',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('MONGO_INITDB_HOST')}:${configService.get('MONGO_INITDB_PORT')}`,
        dbName: configService.get('MONGO_INITDB_DATABASE'),
        auth: {
          username: configService.get('MONGO_INITDB_ROOT_USERNAME'),
          password: configService.get('MONGO_INITDB_ROOT_USERNAME')
        }
      }),
    })
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      LoggerMiddleware
    ).forRoutes({
      path: "",
      method: RequestMethod.ALL
    });
  }
}
