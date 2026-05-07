import { Controller, Post, Get, UseGuards, Req, Body, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshGuard } from './guards/refresh.guard';
import { CurrentUser } from './decorators/get-user.decorator';
import { Public } from './decorators/public.decorator';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @Public()
  @Throttle({ limit: 10, ttl: 3600000 } as any)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Throttle({ limit: 5, ttl: 900000 } as any)
  login(@CurrentUser() user: any) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@CurrentUser() user: any) {
    return this.authService.logout(user.sub);
  }

  @UseGuards(RefreshGuard)
  @Post('refresh')
  refresh(@Req() req: any) {
    const user = req.user;
    const refreshToken = req.refreshToken;
    return this.authService.refreshToken(user.sub, refreshToken);
  }

  @Get('verify-email')
  @Public()
  verifyEmail(@Req() req: any) {
    const token = req.query.token as string;
    if (!token) {
      throw new Error('Verification token is required');
    }
    return this.authService.verifyEmail(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    const fullUser = await this.usersService.findById(user.sub);
    if (!fullUser) {
      throw new NotFoundException('User not found');
    }
    const { password, refreshToken, verificationToken, verificationExpiry, ...safeUser } = fullUser;
    return safeUser;
  }
}
