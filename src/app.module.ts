import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
          entities: [],
          synchronize: config.get('APP_ENV') === 'development',
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
