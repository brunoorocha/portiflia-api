import { User } from "../entities/user.entity";
import { Project } from "../entities/project.entity";

export class UserDetailsDTO {
  constructor (
    readonly id: number,
    readonly name: string,
    readonly username: string,
    readonly email: string,
    readonly projects?: Project[]
  ) {}

  static fromUserEntity (userEntity: User) {
    const { id, name, username, email } = userEntity;
    return new UserDetailsDTO(id, name, username, email);
  }
}