import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum AccountType {
  SAVINGS = 'SAVINGS',
}

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  accountName!: string;

  @IsNumber()
  @Type(() => Number)
  balance!: number;

  @IsEnum(AccountType)
  accountType!: AccountType;
}
