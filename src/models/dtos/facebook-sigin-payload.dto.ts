
export class FacebookSigInDTO {
  constructor (
    readonly name: string,
    readonly email: string,
    readonly facebookId: string,
    readonly photoUrl: string
  ) {}

  get username () {
    const emailSplit = this.email.split('@');
    return emailSplit[0];
  }
}
