import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RegisterEmployeeDto } from './dto/employee.dto.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import type { JwtPayloadOwner } from '../types/jwt-payload.type.js';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createWorker(
    @Body() data: RegisterEmployeeDto,
    @CurrentUser() user: JwtPayloadOwner,
  ) {
    return this.employeeService.createNewWorker(data, user);
  }
}
