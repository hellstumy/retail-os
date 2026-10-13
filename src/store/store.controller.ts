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
import { StoreService } from './store.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import type { JwtPayloadOwner } from '../types/jwt-payload.type.js';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createStore(
    @Body() data: CreateStoreDto,
    @CurrentUser() user: JwtPayloadOwner,
  ) {
    return this.storeService.createStore(user, data);
  }
  @Get('/by-store-net/:id')
  @UseGuards(JwtAuthGuard)
  getAllStoresByStoreId(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayloadOwner,
  ) {
    return this.storeService.getAllStoresByNet(id, user);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  GetOneStoreById(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayloadOwner,
  ) {
    return this.storeService.getOneStore(id, user);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  UpdateStore(
    @Body() data: UpdateStoreDto,
    @Param('id') id: string,
    @CurrentUser() user: JwtPayloadOwner,
  ) {
    return this.storeService.updateStore(id, data, user);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  DeleteStore(@Param('id') id: string, @CurrentUser() user: JwtPayloadOwner) {
    return this.storeService.deleteStore(id, user);
  }
}
