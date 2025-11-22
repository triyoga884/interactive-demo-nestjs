import { Injectable } from '@nestjs/common';
import { AccountType, CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

export interface Account {
  id: string;
  userId: string;
  accountName: string;
  balance: number;
  accountType: AccountType;
}

@Injectable()
export class AccountsService {
  private accounts: Account[] = [
    {
      id: 'acc_1',
      userId: 'user123',
      accountName: 'Primary Savings',
      balance: 1000000,
      accountType: AccountType.SAVINGS,
    },
    {
      id: 'acc_2',
      userId: 'user123',
      accountName: 'Education Fund',
      balance: 5000000,
      accountType: AccountType.SAVINGS,
    },
  ];

  create(dto: CreateAccountDto): Account {
    const account: Account = { ...dto, id: this.generateId() };
    this.accounts.push(account);
    return account;
  }

  findAll(userId?: string): Account[] {
    return userId
      ? this.accounts.filter((a) => a.userId === userId)
      : this.accounts;
  }

  findOne(id: string): Account | undefined {
    return this.accounts.find((a) => a.id === id);
  }

  update(id: string, dto: UpdateAccountDto): Account | undefined {
    const idx = this.accounts.findIndex((a) => a.id === id);
    if (idx === -1) return undefined;
    const prev = this.accounts[idx];
    const updated: Account = { ...prev, ...dto };
    this.accounts[idx] = updated;
    return updated;
  }

  remove(id: string): boolean {
    const before = this.accounts.length;
    this.accounts = this.accounts.filter((a) => a.id !== id);
    return this.accounts.length < before;
  }

  private generateId(): string {
    return 'acc_' + Math.random().toString(36).slice(2, 10);
  }
}
