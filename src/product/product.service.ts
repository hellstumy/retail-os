import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto.js';
import type { JwtPayloadOwner } from '../types/jwt-payload.type.js';
import { ValidatorService } from '../validator/validator.service.js';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validate: ValidatorService,
  ) {}
  async createProduct(data: CreateProductDto, user: JwtPayloadOwner) {
    const checkWarehouse = await this.prisma.warehouse.findFirst({
      where: {
        id: data.warehouse_id,
      },
    });
    if (!checkWarehouse) {
      throw new NotFoundException('Warehouse not found');
    }
    await this.validate.validateStoreAccess(checkWarehouse.of_store_id, user);
    const newProduct = await this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        barcode: data.barcode,
        price: data.price,
        quantity: data.quantity,
        image: data.image,
        warehouse_id: data.warehouse_id,
      },
    });
    return newProduct;
  }
  async getProduct(id: string, user: JwtPayloadOwner) {
    const product = await this.prisma.product.findFirst({
      where: {
        id,
      },
      include: {
        warehouse: {
          select: {
            of_store_id: true,
          },
        },
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.validate.validateStoreAccess(
      product.warehouse.of_store_id,
      user,
    );
    return product;
  }

  //   TODO: add validation
  async updateProduct(id: string, data: UpdateProductDto) {
    const updatedProduct = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        barcode: data.barcode,
        price: data.price,
        quantity: data.quantity,
        image: data.image,
      },
    });
    return updatedProduct;
  }
}
