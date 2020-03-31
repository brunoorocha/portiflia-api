import { IsString, IsNotEmpty } from 'class-validator';

export class UserAuthenticationDTO {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
