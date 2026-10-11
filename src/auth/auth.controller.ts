import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginOwnerDto, RegisterOwnerDto } from './dto/auth.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import type { JwtPayloadOwner } from '../types/jwt-payload.type.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() data: RegisterOwnerDto) {
    return this.authService.registerOwner(data);
  }

  @Post('login')
  logibUser(@Body() data: LoginOwnerDto) {
    return this.authService.loginOwner(data);
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: JwtPayloadOwner) {
    return user;
  }
}
