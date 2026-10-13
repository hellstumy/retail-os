import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { StoreNetModule } from './store-net/store-net.module.js';
import { StoreModule } from './store/store.module.js';
import { WarehouseModule } from './warehouse/warehouse.module.js';
import { ValidatorModule } from './validator/validator.module.js';
import { ProductModule } from './product/product.module.js';
import { EmployeeModule } from './employee/employee.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    StoreNetModule,
    StoreModule,
    WarehouseModule,
    ValidatorModule,
    ProductModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
