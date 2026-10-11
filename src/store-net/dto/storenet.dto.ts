import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStoreNetDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description?: string;
}
export class UpdateStoreNetDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
