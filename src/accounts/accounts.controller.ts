import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UserIdParamDto } from './dto/user-id-param.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  createAccount(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    body: CreateAccountDto,
  ) {
    const existing = this.accountsService.findByUserId(body.userId);
    if (existing) {
      throw new ConflictException('Account for this user already exists');
    }
    return this.accountsService.create(body);
  }

  @Get()
  getAccounts(@Query('userId') userId?: string) {
    return this.accountsService.findAll(userId);
  }

  @Get(':userId')
  getAccount(
    @Param(new ValidationPipe({ whitelist: true, transform: true })) params: UserIdParamDto,
  ) {
    const acc = this.accountsService.findByUserId(params.userId);
    if (!acc) {
      throw new NotFoundException('Account not found');
    }
    return acc;
  }

  @Patch(':userId')
  updateAccount(
    @Param(new ValidationPipe({ whitelist: true, transform: true })) params: UserIdParamDto,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    body: UpdateAccountDto,
  ) {
    const updated = this.accountsService.updateByUserId(params.userId, body);
    if (!updated) {
      throw new NotFoundException('Account not found');
    }
    return updated;
  }

  @Delete(':userId')
  deleteAccount(
    @Param(new ValidationPipe({ whitelist: true, transform: true })) params: UserIdParamDto,
  ) {
    const deleted = this.accountsService.removeByUserId(params.userId);
    if (!deleted) {
      throw new NotFoundException('Account not found');
    }
    return { message: 'Account deleted', userId: params.userId };
  }
}
