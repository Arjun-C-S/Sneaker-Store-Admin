import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDTO } from './dto/sign-in.dto';
import { SessionInterceptor } from '../interceptors/create-session.interceptor';

@ApiTags('Auth')
@UseInterceptors(SessionInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signIn(@Body() signInDetails: SignInDTO) {
    return await this.authService.signIn(
      signInDetails.email,
      signInDetails.password,
    );
  }
}
