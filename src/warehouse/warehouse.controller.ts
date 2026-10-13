import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CreateWarehouseDto } from './dto/warehouse.dto.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import type { JwtPayloadOwner } from '../types/jwt-payload.type.js';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createWarehouse(
    @Body() data: CreateWarehouseDto,
    @CurrentUser() user: JwtPayloadOwner,
  ) {
    return this.warehouseService.createWarehouse(data, user);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getWarehouse(@Param('id') id: string, @CurrentUser() user: JwtPayloadOwner) {
    return this.warehouseService.getWarehouseById(id, user);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteWarehouse(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayloadOwner,
  ) {
    return this.warehouseService.deleteWarehouse(id, user);
  }
}
