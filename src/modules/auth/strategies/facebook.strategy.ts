import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { use } from 'passport';
import { UserService } from 'src/modules/user/user.service';
import { OAuthSignInDTO } from 'src/models/dtos/facebook-sigin-payload.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const FacebookTokenStrategy = require('passport-facebook-token');

@Injectable()
export class FacebookStrategy {
  constructor (
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    this.init();
  }

  private init () {
    const facebookAppID = this.configService.get<string>('facebook.appID');
    const facebookAppSecret = this.configService.get<string>('facebook.appSecret');

    use(
      new FacebookTokenStrategy({
        clientID: facebookAppID,
        clientSecret: facebookAppSecret,
        fbGraphVersion: 'v3.0',
        profileFields: ['id', 'name', 'displayName', 'emails', 'photos']
      },
      async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        const { id, displayName, emails, photos } = profile;
        const email = emails[0].value;
        const photoUrl = photos[0].value;
        const oAuthSignInDTO = new OAuthSignInDTO(displayName, email, photoUrl, id);

        const user = await this.userService.signInOrCreateUserFromSocialOAuth(oAuthSignInDTO);
        return done(null, user);
      })
    )
  }
}
