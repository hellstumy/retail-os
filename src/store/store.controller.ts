import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CreateStoreDto } from './dto/store.dto.js';
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
}
