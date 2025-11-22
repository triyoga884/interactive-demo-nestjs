import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAccountDto {
  @IsString()
  @IsOptional()
  accountName?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  balance?: number;
}
