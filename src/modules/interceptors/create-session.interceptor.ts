import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { SessionService } from '../session/service/session.service';
import { map } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class SessionInterceptor implements NestInterceptor {
  constructor(private readonly sessionService: SessionService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    return next.handle().pipe(
      map(async (data) => {
        const response: Response = context.switchToHttp().getResponse();
        const userId = data.userId;
        const sessionId = await this.sessionService.createSession(userId);
        const cookieOptions = {
          expires: new Date(Date.now() + 10 * 1000),
        };
        response.cookie('ADMIN_SESSION', sessionId, cookieOptions);
      }),
    );
  }
}
