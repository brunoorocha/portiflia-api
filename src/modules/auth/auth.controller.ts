import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor (private service: AuthService) {}

  @Get()
  async getAll (@Res() res) {
    const users = this.service.getAll();
    return res.status(HttpStatus.OK).json(users);
  }
}
