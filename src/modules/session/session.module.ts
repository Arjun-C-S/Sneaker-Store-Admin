import { Module } from '@nestjs/common';
import { SessionService } from './service/session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionTable } from './schema/session.schema';

@Module({
  imports: [TypeOrmModule.forFeature([SessionTable])],
  controllers: [],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
