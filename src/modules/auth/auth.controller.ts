import { Controller, Res, HttpStatus, Post, Body, UsePipes, ValidationPipe, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthenticationDTO } from 'src/models/dtos/user-authentication.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/helpers/decorators/user.decorator';
import { User as UserEntity } from 'src/models/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor (private readonly service: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async authenticate (@Res() res, @Body() credentials: UserAuthenticationDTO) {
    const token = await this.service.authenticate(credentials);
    return res.status(HttpStatus.OK).json({ accessToken: token });
  }

  @UseGuards(AuthGuard('facebook-token'))
  @Get('facebook')
  async facebookSignIn (@Req() req, @Res() res, @User() user: UserEntity) {
    const token = this.service.getTokenForUser(user);
    return res.status(HttpStatus.OK).json({ accessToken: token });
  }

  @UseGuards(AuthGuard('google-token'))
  @Get('google')
  async googleSignIn (@Req() req, @Res() res, @User() user: UserEntity) {
    const token = this.service.getTokenForUser(user);
    return res.status(HttpStatus.OK).json({ accessToken: token });
  }
}
