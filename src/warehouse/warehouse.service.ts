import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateWarehouseDto } from './dto/warehouse.dto.js';
import type { JwtPayloadOwner } from '../types/jwt-payload.type.js';
import { ValidatorService } from '../validator/validator.service.js';

@Injectable()
export class WarehouseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validate: ValidatorService,
  ) {}
  async createWarehouse(data: CreateWarehouseDto, user: JwtPayloadOwner) {
    await this.validate.validateStoreAccess(data.of_store_id, user);
    const newWarehouse = await this.prisma.warehouse.create({
      data: {
        name: data.name,
        of_store_id: data.of_store_id,
      },
    });
    return newWarehouse;
  }
  async getWarehouseById(id: string, user: JwtPayloadOwner) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }
    await this.validate.validateStoreAccess(warehouse.of_store_id, user);
    return warehouse;
  }
  async deleteWarehouse(id: string, user: JwtPayloadOwner) {
    const warehouse = await this.prisma.warehouse.findFirst({
      where: {
        id,
      },
      include: {
        store: true,
      },
    });
    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }
    await this.validate.validateStoreAccess(warehouse.of_store_id, user);
    await this.prisma.warehouse.delete({
      where: {
        id,
      },
    });
    return { message: 'warehouse was deletes' };
  }
}
