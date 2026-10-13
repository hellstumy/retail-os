import { Global, Module } from '@nestjs/common';
import { ValidatorService } from './validator.service.js';
import { ValidatorController } from './validator.controller.js';

@Global()
@Module({
  controllers: [ValidatorController],
  providers: [ValidatorService],
  exports: [ValidatorService],
})
export class ValidatorModule {}
