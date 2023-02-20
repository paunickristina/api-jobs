import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthDto } from './dto/auth.dto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // SIGN USER UP
  async signUp(userDto: UserDto) {
    // check if user with this email already exists
    const userExists = await this.userService.findByEmail(userDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    try {
      // hash password
      userDto.password = await this.hashData(userDto.password);
      // create user
      const createdUser = await this.userService.create(userDto);
      const tokens = await this.getTokens(createdUser.id, createdUser.name);
      // update user with refresh token
      await this.updateRefreshToken(createdUser.id, tokens.refreshToken);
      const { password, refreshToken, ...user } = createdUser;
      return { user, tokens };
    } catch (err) {
      throw new Error(err);
    }
  }

  // SIGN USER IN
  async signIn(authDto: AuthDto) {
    try {
      const signedInUser = await this.userService.findByEmail(authDto.email);
      const isPasswordMatching = this.verify(
        authDto.password,
        signedInUser.password,
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      const tokens = await this.getTokens(signedInUser.id, signedInUser.name);
      await this.updateRefreshToken(signedInUser.id, tokens.refreshToken);
      const { password, refreshToken, ...user } = signedInUser;
      return { user, tokens };
    } catch (err) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // LOG USER OUT
  async logout(id: number) {
    return this.userService.update(id, { refreshToken: null });
  }

  // REFRESH TOKENS
  async refreshTokens(id: number, refreshToken: string) {
    const user = await this.userService.findOne(id);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }
    const isRefreshTokenMatching = this.verify(refreshToken, user.refreshToken);
    if (!isRefreshTokenMatching) {
      throw new ForbiddenException('Access denied');
    }
    const tokens = await this.getTokens(user.id, user.name);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  // HELPER FUNCTIONS:
  async hashData(data: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(data, salt);
  }

  async verify(plainText: string, hashedText: string) {
    const isMatching = await bcrypt.compare(plainText, hashedText);
    return isMatching;
  }

  async getTokens(id: number, name: string) {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          {
            id,
            name,
          },
          {
            secret: jwtConstants.secret,
            expiresIn: '15m',
          },
        ),
        this.jwtService.signAsync(
          {
            id,
            name,
          },
          {
            secret: jwtConstants.refreshSecret,
            expiresIn: '7d',
          },
        ),
      ]);

      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(id, { refreshToken: hashedRefreshToken });
  }
}
