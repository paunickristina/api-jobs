import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'Email field cannot be empty' })
  @IsEmail({ message: 'Enter a valid email adress' })
  email: string;

  @IsNotEmpty({ message: 'Password field cannot be empty' })
  @MinLength(8, {message: 'Password field cannot be shorter than 8 characters'})
  password: string;
}
