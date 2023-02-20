import {
  ClassSerializerInterceptor,
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RefreshJwtAuthGuard } from './guard/refreshJwt-auth.guard';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthDto } from './dto/auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Use this interceptor to exclude password from the response
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signup(@Body() userDto: UserDto) {
    return this.authService.signUp(userDto);
  }

  @Post('signin')
  signin(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @ApiBearerAuth()
  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Request() req: any) {
    this.authService.logout(req.user.id);
  }

  @ApiBearerAuth() // check this
  @UseGuards(RefreshJwtAuthGuard)
  @Get('refresh')
  refreshTokens(@Request() req: any) {
    const id = req.user.id;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(id, refreshToken);
  }
}
