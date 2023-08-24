import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthTable } from '../schema/auth.schema';
import { Repository } from 'typeorm';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthTable)
    private authTable: Repository<AuthTable>,
  ) {}

  async signIn(email: string, password: string) {
    const scrypt = promisify(_scrypt);
    const user = await this.authTable.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('Invalid email !!!');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid password !!!');
    }
    return { message: 'admin logged in successfully', userId: user.id };
  }
}
