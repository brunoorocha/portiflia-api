import { IsString, IsEmail, Validate } from 'class-validator';
import { IsUsernameAlreadyInUse } from 'src/modules/user/validators/isUsernameAlreadyInUse';

export class CreateUserDTO {
  @IsString()
  readonly name: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @Validate(IsUsernameAlreadyInUse)
  readonly username: string;

  @IsString()
  readonly password: string;
}