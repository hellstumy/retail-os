import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Controller()
export class PrismaController {
  constructor(private readonly prismaService: PrismaService) {}
}
