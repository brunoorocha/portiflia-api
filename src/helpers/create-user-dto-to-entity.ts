import { CreateUserDTO } from "src/models/dtos/create-user.dto";
import { User } from "src/models/entities/user.entity";

export const CreateUserDTOToUserEntity = (createUserDTO: CreateUserDTO): User => {
  const userEntity = new User();
  userEntity.name = createUserDTO.name;
  userEntity.email = createUserDTO.email;
  userEntity.username = createUserDTO.username;

  return userEntity;
}
