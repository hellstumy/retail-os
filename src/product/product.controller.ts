import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto.js';
import type { JwtPayloadOwner } from '../types/jwt-payload.type.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createProduct(
    @Body() data: CreateProductDto,
    @CurrentUser() user: JwtPayloadOwner,
  ) {
    return this.productService.createProduct(data, user);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getProduct(@Param('id') id: string, @CurrentUser() user: JwtPayloadOwner) {
    return this.productService.getProduct(id, user);
  }
  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productService.updateProduct(id, data);
  }
}
