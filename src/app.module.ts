import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/category/category.module';
import { CategoryTable } from './modules/category/schema/category.schema';
import { DatabaseConfig } from 'env.interface';
import { AuthModule } from './modules/auth/auth.module';
import { AuthTable } from './modules/auth/schema/auth.schema';
import { SessionModule } from './modules/session/session.module';
import { SessionTable } from './modules/session/schema/session.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<DatabaseConfig>) => {
        return {
          type: 'mariadb',
          host: config.get('MARIADB_HOST', { infer: true }),
          port: config.get('MARIADB_PORT', { infer: true }),
          username: config.get('MARIADB_USER', { infer: true }),
          password: config.get('MARIADB_PASSWORD', { infer: true }),
          database: config.get('MARIADB_DATABASE', { infer: true }),
          entities: [CategoryTable, AuthTable, SessionTable],
          synchronize: config.get('APP_ENV', { infer: true }) === 'development',
        };
      },
    }),
    CategoryModule,
    AuthModule,
    SessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
