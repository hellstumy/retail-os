import { Module } from '@nestjs/common';
import { StoreNetService } from './store-net.service.js';
import { StoreNetController } from './store-net.controller.js';

@Module({
  controllers: [StoreNetController],
  providers: [StoreNetService],
})
export class StoreNetModule {}
