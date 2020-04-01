import { User } from "../entities/user.entity";
import { Project } from "../entities/project.entity";

export class UserDetailsDTO {
  constructor (
    readonly name: string,
    readonly username: string,
    readonly email: string,
    readonly projects?: Project[]
  ) {}

  static fromUserEntity (userEntity: User) {
    const { name, username, email } = userEntity;
    return new UserDetailsDTO(name, username, email);
  }
}