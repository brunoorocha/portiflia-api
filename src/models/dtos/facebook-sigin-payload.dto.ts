
export class OAuthSignInDTO {
  constructor (
    readonly name: string,
    readonly email: string,
    readonly photoUrl: string,
    readonly facebookId?: string,
    readonly googleId?: string,
  ) {}

  get username () {
    const emailSplit = this.email.split('@');
    return emailSplit[0];
  }
}
