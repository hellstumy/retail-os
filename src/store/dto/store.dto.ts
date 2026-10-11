import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsString()
  number?: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsUrl()
  @IsOptional()
  map_url?: string;
  @IsNotEmpty()
  @IsString()
  store_net_id: string;
}
