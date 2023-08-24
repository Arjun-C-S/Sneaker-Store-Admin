import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { AuthTable } from './schema/auth.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [TypeOrmModule.forFeature([AuthTable]), SessionModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
