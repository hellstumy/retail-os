import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { StoreNetModule } from './store-net/store-net.module.js';
import { StoreModule } from './store/store.module.js';

@Module({
  imports: [PrismaModule, AuthModule, StoreNetModule, StoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
