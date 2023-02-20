import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'Name field cannot be empty' })
  @MinLength(2, {message: 'Name field cannot be shorter than 2 characters'})
  name: string;

  @IsNotEmpty({ message: 'Email field cannot be empty' })
  @IsEmail({ message: 'Enter a valid email adress' })
  email: string;

  @IsNotEmpty({ message: 'Password field cannot be empty' })
  @MinLength(8, {message: 'Password field cannot be shorter than 8 characters'})
  password: string;

  @ApiHideProperty()
  refreshToken: string
}
