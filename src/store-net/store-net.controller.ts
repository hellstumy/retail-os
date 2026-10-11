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
import { StoreNetService } from './store-net.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CreateStoreNetDto, UpdateStoreNetDto } from './dto/storenet.dto.js';
import type { JwtPayloadOwner } from '../types/jwt-payload.type.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';

@Controller('store-net')
export class StoreNetController {
  constructor(private readonly storeNetService: StoreNetService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  createStoreNet(
    @Body() data: CreateStoreNetDto,
    @CurrentUser() user: JwtPayloadOwner,
  ) {
    return this.storeNetService.createStoreNet(data, user);
  }
  @Get('')
  @UseGuards(JwtAuthGuard)
  getAllNets(@CurrentUser() user: JwtPayloadOwner) {
    return this.storeNetService.getAllNets(user);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOneNet(@Param('id') id: string, @CurrentUser() user: JwtPayloadOwner) {
    return this.storeNetService.getOneNet(id, user);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateNet(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayloadOwner,
    @Body() data: UpdateStoreNetDto,
  ) {
    return this.storeNetService.updateNet(id, data, user);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteNet(@Param('id') id: string, @CurrentUser() user: JwtPayloadOwner) {
    return this.storeNetService.deleteNet(id, user);
  }
}
