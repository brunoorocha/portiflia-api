import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable, Inject } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@ValidatorConstraint({ name: 'isUsernameAlreadyInUse', async: true })
@Injectable()
export class IsEmailAlreadyInUse implements ValidatorConstraintInterface {
  constructor (@Inject('UserService') private readonly userService: UserService) {}

  async validate (email: string) {
    const isAlreadyInUse = await this.userService.isEmailAlreadyInUse(email);
    return isAlreadyInUse;
  }

  defaultMessage(args: ValidationArguments) {
    return `The email ${args.value} is already in use`;
  }
}
