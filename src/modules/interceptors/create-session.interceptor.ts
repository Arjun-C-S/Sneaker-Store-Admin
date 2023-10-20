import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common';
import { SessionService } from '../session/service/session.service';
import { map } from 'rxjs';
import { Response } from 'express';
import { SESSION } from '../common/constants';

@Injectable()
export class SessionInterceptor implements NestInterceptor {
  constructor(private readonly sessionService: SessionService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    return next.handle().pipe(
      map(async (data) => {
        const response: Response = context.switchToHttp().getResponse();
        const userId = data.userId;
        delete data['userId'];
        const sessionId = await this.sessionService.createSession(userId);
        const cookieOptions = {
          expires: new Date(Date.now() + SESSION.SESSION_EXPIRY),
        };
        response.cookie(SESSION.SESSION_NAME, sessionId, cookieOptions);
        return data;
      }),
    );
  }
}
