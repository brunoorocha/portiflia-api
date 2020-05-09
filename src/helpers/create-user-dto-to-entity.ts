import { User } from "src/models/entities/user.entity";

interface UserDataDTO {
  name: string
  email: string
  username: string
  photoUrl?: string
  facebookId?: string
  googleId?: string
}

export const CreateUserEntity = (userData: UserDataDTO): User => {
  const userEntity = new User();
  userEntity.name = userData.name;
  userEntity.email = userData.email;
  userEntity.username = userData.username;
  userEntity.photoUrl = userData.photoUrl;
  userEntity.facebookId = userData.facebookId;
  userEntity.googleId = userData.googleId;

  return userEntity;
}
