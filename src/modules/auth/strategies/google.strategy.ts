import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-token';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/modules/user/user.service';
import { OAuthSignInDTO } from 'src/models/dtos/facebook-sigin-payload.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google-token') {
  constructor (
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      clientID: configService.get<string>('google.clientID'),
      clientSecret: configService.get<string>('google.clientSecret')
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: any) {
    const { id, displayName, emails, picture, _json } = profile;
    const email = emails[0].value;
    const photoUrl = picture ?? _json.picture;
    const oAuthSignInDTO = new OAuthSignInDTO(displayName, email, photoUrl, null, id);

    const user = await this.userService.signInOrCreateUserFromSocialOAuth(oAuthSignInDTO);
    return done(null, user);
  }
}
