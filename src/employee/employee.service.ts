import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { RegisterEmployeeDto } from './dto/employee.dto.js';
import type { JwtPayloadOwner } from '../types/jwt-payload.type.js';
import { ValidatorService } from '../validator/validator.service.js';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validate: ValidatorService,
  ) {}
  async createNewWorker(data: RegisterEmployeeDto, user: JwtPayloadOwner) {
    const password_hash = await bcrypt.hash(data.password, 10);
    const findWorker = await this.prisma.employee.findFirst({
      where: {
        login: data.login,
      },
    });
    if (findWorker) {
      throw new UnauthorizedException({
        message: 'The username is already taken.',
      });
    }
    await this.validate.validateStoreAccess(data.workplace_id, user);

    const newWorker = await this.prisma.employee.create({
      data: {
        login: data.login,
        email: data.email,
        phone_number: data.phone_number,
        first_name: data.first_name,
        second_name: data.second_name,
        last_name: data.last_name,
        password_hash,
        birth_date: new Date(data.birth_date),
        role: data.role,
        workplace_id: data.workplace_id,
      },
    });
    return newWorker;
  }
}
