import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { use } from 'passport';
import { UserService } from 'src/modules/user/user.service';

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
        console.log(profile);
        return done(null, {});
      })
    )
  }
}
