import { User } from "../entities/user.entity";

export class UserDetailsDTO {
  constructor (
    readonly name: string,
    readonly username: string,
    readonly email: string
  ) {}

  static fromUserEntity (userEntity: User) {
    const { name, username, email } = userEntity;
    return new UserDetailsDTO(name, username, email);
  }
}