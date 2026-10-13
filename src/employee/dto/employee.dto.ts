import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegisterEmployeeDto {
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  phone_number: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsOptional()
  @IsString()
  second_name?: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @IsNotEmpty()
  @IsDateString()
  birth_date: string;
  @IsNotEmpty()
  @IsString()
  role: string;
  @IsNotEmpty()
  @IsString()
  workplace_id: string;
}
