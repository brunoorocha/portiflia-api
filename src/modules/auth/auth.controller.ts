import { Controller, Res, HttpStatus, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthenticationDTO } from 'src/models/dtos/user-authentication.dto';

@Controller('auth')
export class AuthController {
  constructor (private readonly service: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async authenticate (@Res() res, @Body() credentials: UserAuthenticationDTO) {
    const user = await this.service.authenticate(credentials);
    return res.status(HttpStatus.OK).json({ token: 'Bearer <user_token>', user });
  }
}
