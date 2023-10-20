import { NestInterceptor, ExecutionContext, CallHandler, Injectable, NotFoundException } from '@nestjs/common';
import { SessionService } from '../session/service/session.service';
import { Request } from 'express';

@Injectable()
export class ProxyAuthInterceptor implements NestInterceptor {
  constructor(private readonly sessionService: SessionService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const request: Request = context.switchToHttp().getRequest();
    const routePath = request.route.path;

    if (routePath === '/auth') {
      return next.handle();
    }

    const sessionId = request.cookies.ADMIN_SESSION;
    if (sessionId) {
      await this.sessionService.verifySession(sessionId);
      return next.handle();
    } else {
      throw new NotFoundException('Unauthorized Access');
    }
  }
}
