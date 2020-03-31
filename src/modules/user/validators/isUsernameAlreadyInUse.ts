import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable, Inject } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@ValidatorConstraint({ name: 'isUsernameAlreadyInUse', async: true })
@Injectable()
export class IsUsernameAlreadyInUse implements ValidatorConstraintInterface {
  constructor (@Inject('UserService') private readonly userService: UserService) {}

  async validate (username: string) {
    const isAlreadyInUse = await this.userService.isUsernameAlreadyInUse(username);
    return isAlreadyInUse;
  }

  defaultMessage(args: ValidationArguments) {
    return `The username ${args.value} is already in use`;
  }
}
