import { IsString, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  readonly name: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}