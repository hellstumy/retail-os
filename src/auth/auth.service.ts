import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import { LoginOwnerDto, RegisterOwnerDto } from './dto/auth.dto.js';
import * as bcrypt from 'bcrypt';
import { JwtPayloadOwner } from '../types/jwt-payload.type.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async registerOwner(data: RegisterOwnerDto) {
    const password_hash = await bcrypt.hash(data.password, 10);
    const newOwner = await this.prisma.owner.create({
      data: {
        login: data.login,
        email: data.email,
        phone_number: data.phone_number,
        first_name: data.first_name,
        last_name: data.last_name,
        second_name: data.second_name,
        birth_date: new Date(data.birth_date),
        password_hash: password_hash,
      },
    });
    return newOwner;
  }

  async loginOwner(data: LoginOwnerDto) {
    const user = await this.prisma.owner.findFirst({
      where: {
        login: data.login,
      },
    });
    if (!user) {
      throw new UnauthorizedException({ message: 'User not found' });
    }
    const valid = await bcrypt.compare(data.password, user.password_hash);
    if (!valid) {
      throw new UnauthorizedException({ message: 'Password is incorrect' });
    }
    const payload = {
      sub: user.id,
      login: user.login,
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      token: accessToken,
    };
  }
}
