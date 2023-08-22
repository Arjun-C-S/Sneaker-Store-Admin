import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { CategoryTable } from './category/schema/category.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mariadb',
          host: config.get('MARIADB_HOST'),
          port: +config.get('MARIADB_PORT'),
          username: config.get('MARIADB_USER'),
          password: config.get('MARIADB_PASSWORD'),
          database: config.get('MARIADB_DATABASE'),
          entities: [CategoryTable],
          synchronize: config.get('APP_ENV') === 'development',
        };
      },
    }),
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
