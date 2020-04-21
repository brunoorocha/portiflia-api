import { User } from '../entities/user.entity';

export class UserDetailsDTO {
  constructor (
    readonly id: number,
    readonly name: string,
    readonly username: string,
    readonly email: string,
    readonly profileImage?: string,
    readonly likedCount?: number,
    readonly projectsCount?: number
  ) {}

  static fromUserEntity (userEntity: User) {
    const { id, name, username, email, photoUrl, likedCount, projectsCount } = userEntity;
    return new UserDetailsDTO(id, name, username, email, photoUrl, likedCount, projectsCount);
  }
}