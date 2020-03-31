import { IsString, IsEmail, Validate } from 'class-validator';
import { IsUsernameAlreadyInUse } from 'src/modules/user/validators/isUsernameAlreadyInUse';
import { IsEmailAlreadyInUse } from 'src/modules/user/validators/isEmailAlreadyInUse';

export class CreateUserDTO {
  @IsString()
  readonly name: string;

  @IsString()
  @IsEmail()
  @Validate(IsEmailAlreadyInUse)
  readonly email: string;

  @IsString()
  @Validate(IsUsernameAlreadyInUse)
  readonly username: string;

  @IsString()
  readonly password: string;
}