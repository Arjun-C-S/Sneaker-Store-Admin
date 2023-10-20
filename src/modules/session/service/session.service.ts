import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionTable } from '../schema/session.schema';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionTable)
    private sessionTable: Repository<SessionTable>,
  ) {}

  async createSession(userId: number) {
    try {
      const sessionId = randomBytes(8).toString('hex');
      const session = this.sessionTable.create({ sessionId, userId });
      await this.sessionTable.save(session);
      return sessionId;
    } catch (error) {
      throw new UnprocessableEntityException('Error in creating session');
    }
  }

  async deleteSession(sessionId: string) {
    try {
      await this.sessionTable.delete({ sessionId });
      return { message: 'Session deleted successfully' };
    } catch (error) {
      throw new UnprocessableEntityException('Error in deleting session');
    }
  }

  async verifySession(sessionId: string) {
    try {
      const session = await this.sessionTable.findOneBy({ sessionId });
      if (!session) {
        throw new NotFoundException('Session not found');
      }
      const isExpired = session.expires_at < new Date();
      if (isExpired) {
        this.deleteSession(sessionId);
        throw new NotFoundException('Session expired');
      }
      return { message: 'Session Verified' };
    } catch (error) {
      throw new UnprocessableEntityException('Session verification failed');
    }
  }
}
