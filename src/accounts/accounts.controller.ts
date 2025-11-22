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

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  createAccount(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    body: CreateAccountDto,
  ) {
    const duplicates = this.accountsService
      .findAll(body.userId)
      .some((a) => a.accountName === body.accountName);
    if (duplicates) {
      throw new ConflictException('Account with the same name already exists');
    }
    return this.accountsService.create(body);
  }

  @Get()
  getAccounts(@Query('userId') userId?: string) {
    return this.accountsService.findAll(userId);
  }

  @Get(':id')
  getAccount(@Param('id') id: string) {
    const acc = this.accountsService.findOne(id);
    if (!acc) {
      throw new NotFoundException('Account not found');
    }
    return acc;
  }

  @Patch(':id')
  updateAccount(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    body: UpdateAccountDto,
  ) {
    const updated = this.accountsService.update(id, body);
    if (!updated) {
      throw new NotFoundException('Account not found');
    }
    return updated;
  }

  @Delete(':id')
  deleteAccount(@Param('id') id: string) {
    const deleted = this.accountsService.remove(id);
    if (!deleted) {
      throw new NotFoundException('Account not found');
    }
    return { message: 'Account deleted', id };
  }
}
