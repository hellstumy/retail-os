import { Controller } from '@nestjs/common';
import { ValidatorService } from './validator.service.js';

@Controller()
export class ValidatorController {
  constructor(private readonly validatorService: ValidatorService) {}
}
