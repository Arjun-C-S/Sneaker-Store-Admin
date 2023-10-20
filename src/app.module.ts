import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/category/category.module';
import { DatabaseConfig } from 'env.interface';
import { AuthModule } from './modules/auth/auth.module';
import { SessionModule } from './modules/session/session.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ProxyAuthInterceptor } from './modules/interceptors/verify-session.interface';
import { configureTypeorm } from './modules/common/setup/typeorm';
import { configureMongoose } from './modules/common/setup/mongoose';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<DatabaseConfig>) => configureTypeorm(configService),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<DatabaseConfig>) => configureMongoose(configService),
    }),
    CategoryModule,
    AuthModule,
    SessionModule,
    ProductModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ProxyAuthInterceptor,
    },
  ],
})
export class AppModule {}
